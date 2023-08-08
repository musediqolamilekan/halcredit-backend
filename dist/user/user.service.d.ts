/// <reference types="multer" />
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { FileService } from '../service/file.service';
import { StoreUserTransactionPinDto } from './dto/transaction-pin.dto';
export declare class UserService {
    private userModel;
    private readonly fileService;
    private readonly logger;
    constructor(userModel: Model<UserDocument>, fileService: FileService);
    getUserById(user: Pick<User, '_id'>): Promise<User>;
    updateUser(updateUserDto: UpdateUserDto, user: Pick<User, '_id'>, file: Express.Multer.File): Promise<User>;
    validateUserPassword(email: string, password: string): Promise<User | null>;
    findOrCreate(userDto: {
        email: string;
        firstName: string;
        lastName: string;
    }): Promise<User>;
    storeUserTransactionPin(storeUserTransactionPinDto: StoreUserTransactionPinDto, user: Pick<User, '_id'>): Promise<{
        message: string;
        user: Omit<User, 'transactionPin'>;
    }>;
    getSubFromAuthorizationHeader(req: Request): string;
}
