"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const notification_service_1 = require("./notification.service");
const notification_controller_1 = require("./notification.controller");
const notification_gateway_1 = require("./socket/notification.gateway");
const notification_strategy_1 = require("./socket/notification.strategy");
const notification_schema_1 = require("./schemas/notification.schema");
const tokenValidation_service_1 = require("../service/tokenValidation.service");
const jwt_service_1 = require("../service/jwt.service");
const user_schema_1 = require("../user/schemas/user.schema");
const webSocket_guard_1 = require("../service/webSocket.guard");
let NotificationModule = exports.NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Notification', schema: notification_schema_1.NotificationSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
            ]),
        ],
        controllers: [notification_controller_1.NotificationController],
        providers: [
            notification_service_1.NotificationService,
            notification_gateway_1.NotificationGateway,
            notification_strategy_1.NotificationStrategy,
            tokenValidation_service_1.TokenValidationService,
            jwt_service_1.JwtStrategy,
            webSocket_guard_1.WsJwtGuard,
        ],
        exports: [notification_strategy_1.NotificationStrategy, notification_gateway_1.NotificationGateway],
    })
], NotificationModule);
//# sourceMappingURL=notification.module.js.map