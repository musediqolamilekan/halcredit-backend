import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BankTransferSchema } from './schemas/bankTransfer.schema';
import { BillsPaymentsSchema } from './schemas/billsPayments.schema';
import { NewCardSchema } from './schemas/newCard.schema';
import { SendFundsSchema } from './schemas/sendFunds.schema';
import { CreditTransactionSchema } from './schemas/creditTransaction.schema';
import { CreditTransactionController } from './controllers/creditTransaction.controller';
import { CreditTransactionService } from './services/creditTransaction.service';
import { AuthModule } from '../auth/auth.module';
import { UserSchema } from '../user/schemas/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BankTransfer', schema: BankTransferSchema },
      { name: 'BillsPayments', schema: BillsPaymentsSchema },
      { name: 'NewCard', schema: NewCardSchema },
      { name: 'SendFunds', schema: SendFundsSchema },
      { name: 'CreditTransaction', schema: CreditTransactionSchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [TransactionsController, CreditTransactionController],
  providers: [TransactionsService, CreditTransactionService],
})
export class TransactionsModule {}
