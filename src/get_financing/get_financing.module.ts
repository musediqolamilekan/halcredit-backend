import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { GetFinancingService } from './get_financing.service';
import { GetFinancingController } from './get_financing.controller';
import { FinancingInvoiceSchema } from './schemas/invoice.schema';
import { UserSchema } from '../user/schemas/user.schema';
import { FileService } from 'src/service/file.service';
import { IPASchema } from './schemas/ipa.schema';
import { RepaymentService } from 'src/service/repaymentPlan.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FinancingInvoice', schema: FinancingInvoiceSchema },
      { name: 'IPA', schema: IPASchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [GetFinancingController],
  providers: [GetFinancingService, FileService, RepaymentService],
})
export class GetFinancingModule {}
