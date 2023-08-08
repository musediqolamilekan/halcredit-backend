import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
  Req,
  HttpStatus,
  ValidationPipe,
  HttpException,
  UseInterceptors,
  UploadedFile,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '../service/jwt.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { StoreUserTransactionPinDto } from './dto/transaction-pin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import createLogger from '../service/winston.service';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class UserController {
  private readonly logger = createLogger('user', 'user.error.log');

  constructor(private readonly userService: UserService) {}

  private handleHttpException(
    error: Error,
    message: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    this.logger.error(message || error.message);
    throw new HttpException(message || error.message, statusCode);
  }

  private async handleUserProcess(
    userPromise: Promise<any>,
    failureMessage: string,
  ) {
    try {
      return await userPromise;
    } catch (error) {
      this.handleHttpException(error, failureMessage);
    }
  }

  @Get('/me')
  async getCurrentUser(@Req() { user }) {
    return this.handleUserProcess(
      this.userService.getUserById(user),
      'Failed to get current user.',
    );
  }

  @Put('/me')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() { user },
  ) {
    return this.handleUserProcess(
      this.userService.updateUser(updateUserDto, user, file),
      'Failed to update user.',
    );
  }

  @Put('/me/transaction-pin')
  @UsePipes(new ValidationPipe())
  async storeUserTransactionPin(
    @Body() storeUserTransactionPinDto: StoreUserTransactionPinDto,
    @Req() { user },
  ) {
    return this.handleUserProcess(
      this.userService.storeUserTransactionPin(
        storeUserTransactionPinDto,
        user,
      ),
      'Failed to store user transaction pin.',
    );
  }

  @Get('/sub')
  async getSubFromToken(@Req() req) {
    try {
      const sub = await this.userService.getSubFromAuthorizationHeader(req);
      return { sub };
    } catch (error) {
      this.logger.error(`Failed to get sub from token: ${error.message}`);
      throw new HttpException(
        'Failed to get sub from token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
