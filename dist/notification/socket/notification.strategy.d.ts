import { NotificationGateway } from './notification.gateway';
import { NotificationDto } from '../dto/notification.dto';
export declare class NotificationStrategy {
    private gateway;
    private readonly logger;
    constructor(gateway: NotificationGateway);
    sendNotification(userId: string, message: NotificationDto): Promise<void>;
}
