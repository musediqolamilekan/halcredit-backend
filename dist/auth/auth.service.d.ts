import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleTokenDto, GoogleUserResponse } from './dto/google-token.dto';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../service/email.service';
import { NotificationStrategy } from 'src/notification/socket/notification.strategy';
export declare class AuthService {
    private userModel;
    private readonly jwtService;
    private configService;
    private emailService;
    private notificationStrategy;
    private readonly logger;
    private readonly saltRounds;
    private readonly oauthClient;
    constructor(userModel: Model<User>, jwtService: JwtService, configService: ConfigService, emailService: EmailService, notificationStrategy: NotificationStrategy);
    private createUser;
    private generateJwt;
    private excludePassword;
    signUp(signUpDto: SignUpDto): Promise<{
        message: string;
        accessToken: string;
        user: User;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        accessToken: string;
        user: User;
    }>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(resetToken: string, newPassword: string): Promise<void>;
    validateUser(id: string): Promise<any>;
    sendVerificationToken(userId: any): Promise<void>;
    verifyEmail(userId: string, verificationToken: string): Promise<void>;
    deleteAccount(email: string): Promise<{
        message: string;
    }>;
    findOrCreateFromGoogle(googleTokenDto: GoogleTokenDto): Promise<GoogleUserResponse>;
    resendToken(user: Pick<User, '_id'>): Promise<{
        message: string;
    }>;
}
