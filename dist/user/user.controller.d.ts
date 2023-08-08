/// <reference types="multer" />
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { StoreUserTransactionPinDto } from './dto/transaction-pin.dto';
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    private handleHttpException;
    private handleUserProcess;
    getCurrentUser({ user }: {
        user: any;
    }): Promise<any>;
    updateUser(updateUserDto: UpdateUserDto, file: Express.Multer.File, { user }: {
        user: any;
    }): Promise<any>;
    storeUserTransactionPin(storeUserTransactionPinDto: StoreUserTransactionPinDto, { user }: {
        user: any;
    }): Promise<any>;
    getSubFromToken(req: any): Promise<{
        sub: string;
    }>;
}
