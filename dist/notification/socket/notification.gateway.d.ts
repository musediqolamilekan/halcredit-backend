import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Model } from 'mongoose';
import { NotificationDocument } from '../schemas/notification.schema';
import { NotificationDto } from '../dto/notification.dto';
import { TokenValidationService } from '../../service/tokenValidation.service';
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private notificationModel;
    private readonly tokenValidationService;
    server: any;
    private clients;
    private readonly logger;
    constructor(notificationModel: Model<NotificationDocument>, tokenValidationService: TokenValidationService);
    private saveNotification;
    handleConnection(client: any): Promise<void>;
    handleDisconnect(client: any): void;
    handleNotification(client: any, payload: NotificationDto): Promise<void>;
    sendNotificationToUser(userId: string, message: NotificationDto): void;
    private validatePayload;
}
