import {
  Controller,
  Get,
  Req,
  UseGuards,
  HttpStatus,
  HttpException,
  Param,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import createLogger from 'src/service/winston.service';
import { JwtAuthGuard } from 'src/service/jwt.guard';
import { Notification } from './schemas/notification.schema';

@Controller('notification')
export class NotificationController {
  private readonly logger = createLogger(
    'notification',
    'notification.error.log',
  );
  constructor(private readonly notificationService: NotificationService) {}

  private handleHttpException(
    error: Error,
    message: string,
    statusCode: HttpStatus,
  ) {
    this.logger.error(message, error);
    throw new HttpException(message || error.message, statusCode);
  }

  private async handleNotificationProcess(
    notificationPromise: Promise<any>,
    failureMessage: string,
    statusCode: HttpStatus,
  ) {
    try {
      return await notificationPromise;
    } catch (error) {
      this.handleHttpException(error, failureMessage, statusCode);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  async findAll(
    @Param('userId') userId: string,
    @Req() req,
  ): Promise<Notification[]> {
    try {
      // Check if the userId in the parameter matches the user's ID in the token
      if (userId !== req.user._id) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      return await this.notificationService.findAll(userId);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to fetch notifications',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
