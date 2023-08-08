import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
export declare class NotificationService {
    private notificationModel;
    private readonly logger;
    constructor(notificationModel: Model<NotificationDocument>);
    findAll(userId: string): Promise<Notification[]>;
}
