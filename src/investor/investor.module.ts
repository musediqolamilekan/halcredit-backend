import { Module } from '@nestjs/common';
import { InvestorService } from './investor.service';
import { InvestorController } from './investor.controller';
import { InvestorSchema } from './schemas/investor.schema';
import { UserSchema } from '../user/schemas/user.schema';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Investor', schema: InvestorSchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [InvestorController],
  providers: [InvestorService],
})
export class InvestorModule {}
