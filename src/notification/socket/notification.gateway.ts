// notification.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Notification,
  NotificationDocument,
} from '../schemas/notification.schema';
import createLogger from 'src/service/winston.service';
import { NotificationDto } from '../dto/notification.dto';
import { TokenValidationService } from 'src/service/tokenValidation.service';
import { WsJwtGuard } from 'src/service/webSocket.guard';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway()
@UseGuards(WsJwtGuard)
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server;

  private clients: { [userId: string]: any } = {};
  private readonly logger = createLogger(
    'notifications',
    'notifications.error.log',
  );
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    private readonly tokenValidationService: TokenValidationService,
  ) {}

  private async saveNotification(userId: string, payload: NotificationDto) {
    try {
      const notification = new this.notificationModel({
        ...payload,
        userId, // Add userId here
      });
      await notification.save();
    } catch (error) {
      console.log(error);
      this.logger.error(`Failed to save notification: ${error.message}`);
      throw new WsException('Failed to save notification');
    }
  }

  async handleConnection(client: any) {
    try {
      const userId = client.userId;

      if (!userId) {
        throw new Error('User ID not found');
      }

      this.logger.info('Client connected:', userId);
      this.clients[userId] = client;
    } catch (error) {
      console.log(error);
      this.logger.warn(
        'Unauthorized connection. Disconnecting client:',
        client.id,
        'Error:',
        error.message,
      );
      client.disconnect();
    }
  }

  handleDisconnect(client: any) {
    const userId = client.userId; // Fix here
    this.logger.info('Client disconnected:', userId);
    if (userId) {
      delete this.clients[userId];
    }
  }

  @SubscribeMessage('notify')
  async handleNotification(client, payload: NotificationDto) {
    const userId = client.userId; // Fix here
    this.logger.info(
      'Received notification from client:',
      client.id,
      'Payload:',
      payload,
    );

    if (!this.validatePayload(payload)) {
      throw new WsException('Invalid payload');
    }

    await this.saveNotification(userId, payload);

    const targetClient = this.clients[userId];

    if (targetClient) {
      targetClient.emit('notification', payload);
    } else {
      this.logger.warn('User not connected:', userId);
    }
  }

  public sendNotificationToUser(userId: string, message: NotificationDto) {
    // Ensure userId is a primitive string
    if (typeof userId !== 'string') {
      this.logger.error('UserId is not a string:', userId);
      return;
    }

    // If userId is a string object, convert to primitive string
    if (Object.prototype.toString.call(userId) === '[object String]') {
      userId = userId.toString();
    }

    const client = this.clients[userId];
    if (client) {
      if (!this.validatePayload(message)) {
        this.logger.error('Invalid payload for user:', userId);
        throw new WsException('Invalid payload');
      }
      client.emit('notification', message);
    } else {
      this.logger.warn('Target user not connected:', userId);
    }
  }
  private validatePayload(payload: NotificationDto): boolean {
    if (typeof payload !== 'object' || payload === null) {
      return false;
    }
    if (
      typeof payload.message !== 'string' ||
      typeof payload.title !== 'string'
    ) {
      return false;
    }
    if (payload.message.length < 1 || payload.title.length < 1) {
      return false;
    }
    return true;
  }
}
