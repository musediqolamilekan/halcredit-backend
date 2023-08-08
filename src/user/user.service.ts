import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { FileService } from '../service/file.service';
import * as bcrypt from 'bcryptjs';
import { StoreUserTransactionPinDto } from './dto/transaction-pin.dto';
import createLogger from '../service/winston.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  private readonly logger = createLogger('user-service', 'user.error.log');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly fileService: FileService,
  ) {}

  async getUserById(user: Pick<User, '_id'>): Promise<User> {
    const id = user._id;
    try {
      const foundUser = await this.userModel.findById(id).select('-password');
      if (!foundUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return foundUser;
    } catch (error) {
      this.logger.error(`Failed to get user: ${error.message}`);
      throw error;
    }
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    user: Pick<User, '_id'>,
    file: Express.Multer.File,
  ): Promise<User> {
    const currentUserId = user._id;

    const foundUser = await this.userModel.findById(currentUserId);

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${currentUserId} not found`);
    }

    try {
      if (file) {
        const profileImageUrl = await this.fileService.uploadToS3(
          file,
          'picture',
        );
        updateUserDto.profilePicture = profileImageUrl;
      }

      const updatedUser = await this.userModel
        .findByIdAndUpdate(currentUserId, updateUserDto, { new: true })
        .select('-password');

      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${currentUserId} not found`);
      }

      return updatedUser;
    } catch (error) {
      this.logger.error(`Failed to update user: ${error.message}`);
      throw error;
    }
  }

  async validateUserPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        return null;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      return passwordMatch ? user : null;
    } catch (error) {
      this.logger.error(`Failed to validate user: ${error.message}`);
      throw error;
    }
  }

  async findOrCreate(userDto: {
    email: string;
    firstName: string;
    lastName: string;
  }): Promise<User> {
    const { email, firstName, lastName } = userDto;

    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = await this.userModel.create({
        firstName,
        lastName,
        email,
        status: 'active',
        isVerified: true,
        createdAt: new Date(),
      });
    }

    return user;
  }

  async storeUserTransactionPin(
    storeUserTransactionPinDto: StoreUserTransactionPinDto,
    user: Pick<User, '_id'>,
  ): Promise<{ message: string; user: Omit<User, 'transactionPin'> }> {
    const { pin, confirmPin } = storeUserTransactionPinDto;
    try {
      const existingUser = await this.userModel.findById(user._id);

      if (!existingUser) {
        throw new UnauthorizedException('Invalid user');
      }

      if (pin !== confirmPin) {
        throw new BadRequestException('Pin does not match the confirm pin');
      }

      // Hash the pin before storing
      const hashedPin = await bcrypt.hash(pin, 10);

      existingUser.transactionPin = hashedPin;
      await existingUser.save();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { transactionPin, ...userWithoutSensitiveData } =
        existingUser.toObject();

      return {
        message: 'Transaction pin successfully stored',
        user: userWithoutSensitiveData,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Pin does not match the confirm pin');
      }
      this.logger.error(
        `storeUserTransactionPin failed for user id: ${JSON.stringify(
          user._id,
        )}`,
        error,
      );
      throw new InternalServerErrorException(
        'Failed to store user transaction pin',
      );
    }
  }

  getSubFromAuthorizationHeader(req: Request): string {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the Bearer
    if (!token) {
      throw new UnauthorizedException(
        'Token missing from Authorization header',
      );
    }

    try {
      // Verify and decode the token (replace YOUR_SECRET with your actual secret key)
      const decoded = jwt.verify(token, process.env.TOKEN_KEY) as Record<
        string,
        any
      >;

      // Return the sub field (replace with your actual field if it's different)
      return decoded.sub;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
