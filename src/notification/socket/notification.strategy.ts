import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { NotificationDto } from '../dto/notification.dto';
import createLogger from 'src/service/winston.service';

@Injectable()
export class NotificationStrategy {
  private readonly logger = createLogger(
    'notification',
    'notification.error.log',
  );

  constructor(private gateway: NotificationGateway) {}

  public async sendNotification(userId: string, message: NotificationDto) {
    try {
      this.gateway.sendNotificationToUser(userId, message);
      this.logger.info(`Successfully sent notification to user ${userId}`);
    } catch (error) {
      this.logger.error('Error sending notification', { error });
    }
  }
}
