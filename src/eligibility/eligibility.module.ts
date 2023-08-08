import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UserSchema } from '../user/schemas/user.schema';
import { EligibilityService } from './eligibility.service';
import { EligibilityController } from './eligibility.controller';
import { EligibilitySchema } from './schemas/eligibility.schema';
import { EligibilityStrategy } from 'src/service/eligibility.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Eligibility', schema: EligibilitySchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [EligibilityController],
  providers: [EligibilityService, EligibilityStrategy],
})
export class EligibilityModule {}
