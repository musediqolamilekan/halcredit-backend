import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { User } from 'src/user/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleTokenDto, GoogleUserResponse } from './dto/google-token.dto';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { EmailService } from '../service/email.service';
import axios from 'axios';
import createLogger from '../service/winston.service';
import { NotificationStrategy } from 'src/notification/socket/notification.strategy';
import { NotificationDto } from 'src/notification/dto/notification.dto';

@Injectable()
export class AuthService {
  private readonly logger = createLogger('auth', 'auth.error.log');
  private readonly saltRounds: number;
  private readonly oauthClient: OAuth2Client;
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
    private notificationStrategy: NotificationStrategy,
  ) {
    this.saltRounds =
      this.configService.get<number>('BCRYPT_SALT_ROUNDS') ?? 10;
    this.oauthClient = new OAuth2Client(
      this.configService.get<string>('GOOGLE_CLIENT_ID'),
    );
  }

  private async createUser(signUpDto: SignUpDto): Promise<User> {
    const { firstName, lastName, email, phone, password } = signUpDto;
    const saltRounds =
      parseInt(this.configService.get<string>('BCRYPT_SALT_ROUNDS')) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return await this.userModel.create({
      firstName,
      lastName,
      email,
      phone,
      status: 'active',
      isVerified: false,
      password: hashedPassword,
      createdAt: new Date(),
    });
  }

  private async generateJwt(user: User): Promise<string> {
    return this.jwtService.sign({
      sub: user._id.toString(),
      phone: user.phone,
      email: user.email,
      accessKey: 'User',
    });
  }

  private async excludePassword(userId: any): Promise<User> {
    return await this.userModel.findById(userId).select('-password');
  }

  async signUp(signUpDto: SignUpDto) {
    const { email } = signUpDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      this.logger.error(`User already exists: ${JSON.stringify(email)}`);
      throw new ConflictException('User already exists');
    }

    try {
      let user = await this.createUser(signUpDto);
      user = await this.excludePassword(user._id);

      const token = await this.generateJwt(user);

      await this.sendVerificationToken(user._id);

      const userId = user._id.toString();
      const notificationMessage = {
        message: 'Welcome to Halcredit',
        title: 'Registration',
      };
      this.notificationStrategy.sendNotification(userId, notificationMessage);

      return { message: 'Success', accessToken: token, user };
    } catch (error) {
      this.logger.error(
        `Sign up failed for email: ${JSON.stringify(email)}`,
        error,
      );
      throw new InternalServerErrorException('Sign Up Failed');
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      this.logger.error(`Invalid email: ${JSON.stringify(email)}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      this.logger.error(`Invalid password: ${JSON.stringify(email)}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    try {
      const token = await this.generateJwt(user);

      const userWithoutPassword = await this.excludePassword(user._id);

      return {
        message: 'Success',
        accessToken: token,
        user: userWithoutPassword,
      };
    } catch (error) {
      this.logger.error(
        `Login failed for email: ${JSON.stringify(email)}`,
        error,
      );
      throw new InternalServerErrorException('Login Failed');
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new UnauthorizedException('Invalid email');
      }

      const resetToken = crypto.randomInt(10000, 100000).toString();
      const hashedResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      user.passwordResetToken = hashedResetToken;
      user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      await user.save();

      this.emailService.sendForgotPasswordEmail(user, resetToken);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      this.logger.error(
        `forgotPassword failed for email: ${JSON.stringify(email)}`,
        error,
      );
      throw new InternalServerErrorException(
        'Failed to process forgot password request',
      );
    }
  }

  async resetPassword(resetToken: string, newPassword: string) {
    try {
      const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      const user = await this.userModel.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
        throw new UnauthorizedException('Token is invalid or has expired');
      }

      user.password = await bcrypt.hash(newPassword, 10);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      await user.save();
      const userId = user._id.toString();
      const notificationMessage = {
        title: 'Reset Password',
        message: `Dear ${user.firstName}, your password has been successfully reset. If you did not initiate this request, please contact support immediately.`,
      };
      this.notificationStrategy.sendNotification(userId, notificationMessage);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      this.logger.error(
        `resetPassword failed for token: ${JSON.stringify(resetToken)}`,
        error,
      );
      throw new InternalServerErrorException('Failed to reset password');
    }
  }

  async validateUser(id: string): Promise<any> {
    try {
      const user = await this.userModel
        .findOne({ _id: id })
        .select('-password');
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error(`Failed to validate user: ${error.message}`);
      throw error;
    }
  }

  async sendVerificationToken(userId: any) {
    try {
      const verificationToken = crypto.randomBytes(5).toString('hex');
      const user = await this.userModel.findById(userId);

      if (!user) {
        throw new UnauthorizedException('Invalid user id');
      }

      user.emailVerificationToken = verificationToken;
      await user.save();

      const verificationLink = `${this.configService.get<string>(
        'VERIFICATION_BASE_URL',
      )}?userId=${userId}&token=${verificationToken}`;

      this.emailService.sendEmailVerification(user, verificationLink);
    } catch (error) {
      this.logger.error(
        `sendVerificationToken failed for user id: ${JSON.stringify(userId)}`,
        error,
      );
      throw new InternalServerErrorException(
        'Failed to process send verification token request',
      );
    }
  }

  async verifyEmail(userId: string, verificationToken: string) {
    try {
      const user = await this.userModel.findById(userId);

      if (!user || user.emailVerificationToken !== verificationToken) {
        throw new UnauthorizedException('Invalid user or token');
      }

      user.isVerified = true;
      user.emailVerificationToken = undefined;

      await user.save();
      // Use the userId parameter directly
      const notificationMessage: NotificationDto = {
        title: 'Verify Email',
        message: `Dear ${user.firstName}, your email address has been successfully verified. Welcome to our service!`,
      };
      this.notificationStrategy.sendNotification(userId, notificationMessage);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      this.logger.error(
        `verifyEmail failed for user id: ${JSON.stringify(userId)}`,
        error,
      );
      throw new InternalServerErrorException('Failed to verify email');
    }
  }

  async deleteAccount(email: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userModel.deleteOne({ email });

    return { message: 'Account deleted successfully' };
  }

  async findOrCreateFromGoogle(
    googleTokenDto: GoogleTokenDto,
  ): Promise<GoogleUserResponse> {
    const { googleToken } = googleTokenDto;
    let userInfo;

    try {
      const googleApiUrl = this.configService.get<string>('GOOGLE_API_URL');
      const response = await axios.get(`${googleApiUrl}/oauth2/v3/userinfo`, {
        headers: { Authorization: `Bearer ${googleToken}` },
      });
      userInfo = response.data;
    } catch (error) {
      this.logger.error(`Failed to verify Google token: ${googleToken}`, error);
      throw new HttpException(
        'Failed to verify Google token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { email, given_name: firstName, family_name: lastName } = userInfo;

    try {
      let user = await this.userModel.findOne({ email }).select('-password');

      if (!user) {
        user = await this.userModel.create({
          firstName,
          lastName,
          email,
          status: 'active',
          isVerified: true,
          createdAt: new Date(),
        });

        // Notification for the newly created user
        const userId = user._id.toString();
        const notificationMessage = {
          title: 'Registration',
          message: `Welcome ${user.firstName}! Your account has been successfully created through Google Sign In.`,
        };
        this.notificationStrategy.sendNotification(userId, notificationMessage);
      }
      const token = await this.generateJwt(user);

      return { user: user, accessToken: token };
    } catch (error) {
      this.logger.error(
        `Failed to find or create user for email: ${email}`,
        error,
      );
      throw new HttpException(
        'Failed to find or create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resendToken(user: Pick<User, '_id'>): Promise<{ message: string }> {
    try {
      const userDoc = await this.userModel.findById(user._id);
      if (!userDoc) {
        throw new NotFoundException('User not found');
      }

      if (userDoc.isVerified) {
        return { message: 'User is already verified' };
      }

      await this.sendVerificationToken(userDoc._id);

      // Notification for the token resend
      const userId = user._id.toString();
      const notificationMessage = {
        title: 'Email Sent',
        message: `A new verification email has been sent to your email address. Please verify your account.`,
      };
      this.notificationStrategy.sendNotification(userId, notificationMessage);

      return { message: 'Verification email sent successfully' };
    } catch (error) {
      this.logger.error(
        `resendToken failed for user: ${JSON.stringify(user._id)}`,
        error,
      );
      throw new InternalServerErrorException(
        'Failed to process resend token request',
      );
    }
  }
}
