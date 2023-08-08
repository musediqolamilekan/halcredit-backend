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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsJwtGuard = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const tokenValidation_service_1 = require("./tokenValidation.service");
const winston_service_1 = require("./winston.service");
let WsJwtGuard = exports.WsJwtGuard = class WsJwtGuard {
    constructor(tokenValidationService) {
        this.tokenValidationService = tokenValidationService;
        this.logger = (0, winston_service_1.default)('user', 'user.error.log');
    }
    async canActivate(context) {
        const client = context.switchToWs().getClient();
        const authorizationHeader = client.handshake.headers.authorization ||
            client.handshake.query.authorization ||
            client.handshake.headers['authorization'];
        if (!authorizationHeader) {
            this.logger.error('Authorization header not found');
            throw new websockets_1.WsException('Authorization header not found');
        }
        try {
            const sub = await this.tokenValidationService.getSubFromAuthorizationHeader(authorizationHeader);
            if (!sub) {
                this.logger.error('User ID (sub) not found in token');
                throw new websockets_1.WsException('Unauthorized access');
            }
            client.userId = sub;
            this.logger.info(`Client authenticated with user ID: ${sub}`);
            return true;
        }
        catch (error) {
            this.logger.error(`Failed to authenticate WebSocket connection: ${error.message}`);
            throw new websockets_1.WsException('Unauthorized access');
        }
    }
};
exports.WsJwtGuard = WsJwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tokenValidation_service_1.TokenValidationService])
], WsJwtGuard);
//# sourceMappingURL=webSocket.guard.js.map