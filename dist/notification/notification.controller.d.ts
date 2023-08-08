import { NotificationService } from './notification.service';
import { Notification } from './schemas/notification.schema';
export declare class NotificationController {
    private readonly notificationService;
    private readonly logger;
    constructor(notificationService: NotificationService);
    private handleHttpException;
    private handleNotificationProcess;
    findAll(userId: string, req: any): Promise<Notification[]>;
}
