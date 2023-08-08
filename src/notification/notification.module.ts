import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationGateway } from './socket/notification.gateway';
import { NotificationStrategy } from './socket/notification.strategy';
import { NotificationSchema } from './schemas/notification.schema';
import { TokenValidationService } from 'src/service/tokenValidation.service';
import { JwtStrategy } from 'src/service/jwt.service';
import { UserSchema } from 'src/user/schemas/user.schema';
import { WsJwtGuard } from 'src/service/webSocket.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Notification', schema: NotificationSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationGateway,
    NotificationStrategy,
    TokenValidationService,
    JwtStrategy,
    WsJwtGuard,
  ],
  exports: [NotificationStrategy, NotificationGateway],
})
export class NotificationModule {}
