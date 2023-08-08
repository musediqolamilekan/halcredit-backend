import { JwtStrategy } from './../service/jwt.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from 'src/user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { LocalStrategy } from '../service/local.service';
import { FileService } from '../service/file.service';
import { EmailService } from '../service/email.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('TOKEN_KEY'),
          signOptions: {
            expiresIn: config.get<string | number>('TOKEN_EXPIRY'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    NotificationModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    FileService,
    EmailService,
  ],
  exports: [UserService, AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
