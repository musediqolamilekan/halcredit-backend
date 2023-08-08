import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Notification,
  NotificationDocument,
} from './schemas/notification.schema';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async findAll(userId: string): Promise<Notification[]> {
    try {
      return await this.notificationModel.find({ userId });
    } catch (error) {
      this.logger.error(`Failed to get notifications: ${error.message}`);
      throw error;
    }
  }
}
