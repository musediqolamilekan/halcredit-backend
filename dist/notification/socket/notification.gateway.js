"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_schema_1 = require("../schemas/notification.schema");
const winston_service_1 = require("../../service/winston.service");
const notification_dto_1 = require("../dto/notification.dto");
const tokenValidation_service_1 = require("../../service/tokenValidation.service");
const webSocket_guard_1 = require("../../service/webSocket.guard");
const common_1 = require("@nestjs/common");
let NotificationGateway = exports.NotificationGateway = class NotificationGateway {
    constructor(notificationModel, tokenValidationService) {
        this.notificationModel = notificationModel;
        this.tokenValidationService = tokenValidationService;
        this.clients = {};
        this.logger = (0, winston_service_1.default)('notifications', 'notifications.error.log');
    }
    async saveNotification(userId, payload) {
        try {
            const notification = new this.notificationModel({
                ...payload,
                userId,
            });
            await notification.save();
        }
        catch (error) {
            console.log(error);
            this.logger.error(`Failed to save notification: ${error.message}`);
            throw new websockets_1.WsException('Failed to save notification');
        }
    }
    async handleConnection(client) {
        try {
            const userId = client.userId;
            if (!userId) {
                throw new Error('User ID not found');
            }
            this.logger.info('Client connected:', userId);
            this.clients[userId] = client;
        }
        catch (error) {
            console.log(error);
            this.logger.warn('Unauthorized connection. Disconnecting client:', client.id, 'Error:', error.message);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        const userId = client.userId;
        this.logger.info('Client disconnected:', userId);
        if (userId) {
            delete this.clients[userId];
        }
    }
    async handleNotification(client, payload) {
        const userId = client.userId;
        this.logger.info('Received notification from client:', client.id, 'Payload:', payload);
        if (!this.validatePayload(payload)) {
            throw new websockets_1.WsException('Invalid payload');
        }
        await this.saveNotification(userId, payload);
        const targetClient = this.clients[userId];
        if (targetClient) {
            targetClient.emit('notification', payload);
        }
        else {
            this.logger.warn('User not connected:', userId);
        }
    }
    sendNotificationToUser(userId, message) {
        if (typeof userId !== 'string') {
            this.logger.error('UserId is not a string:', userId);
            return;
        }
        if (Object.prototype.toString.call(userId) === '[object String]') {
            userId = userId.toString();
        }
        const client = this.clients[userId];
        if (client) {
            if (!this.validatePayload(message)) {
                this.logger.error('Invalid payload for user:', userId);
                throw new websockets_1.WsException('Invalid payload');
            }
            client.emit('notification', message);
        }
        else {
            this.logger.warn('Target user not connected:', userId);
        }
    }
    validatePayload(payload) {
        if (typeof payload !== 'object' || payload === null) {
            return false;
        }
        if (typeof payload.message !== 'string' ||
            typeof payload.title !== 'string') {
            return false;
        }
        if (payload.message.length < 1 || payload.title.length < 1) {
            return false;
        }
        return true;
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('notify'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, notification_dto_1.NotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationGateway.prototype, "handleNotification", null);
exports.NotificationGateway = NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    (0, common_1.UseGuards)(webSocket_guard_1.WsJwtGuard),
    __param(0, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        tokenValidation_service_1.TokenValidationService])
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map