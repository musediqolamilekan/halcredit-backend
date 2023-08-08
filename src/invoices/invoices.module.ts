import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { InvoiceService } from './invoices.service';
import { InvoiceController } from './invoices.controller';
import { InvoiceSchema } from './schemas/invoices.schema';
import { InvoiceItemSchema } from './schemas/invoiceItem.schema';
import { UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Invoice', schema: InvoiceSchema },
      { name: 'InvoiceItem', schema: InvoiceItemSchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoicesModule {}
