import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailinglistModule } from './mailinglist/mailinglist.module';
import { DatabaseModule } from './database/database.module';
import { ProfileModule } from './profile/profile.module';
import { StaffModule } from './staff/staff.module';
import { DirectorsModule } from './directors/directors.module';
import { CompanyModule } from './company/company.module';
import { BankStatementsModule } from './bank_statements/bank_statements.module';
import { TransactionsModule } from './transactions/transactions.module';
import { GuarantorsModule } from './guarantors/guarantors.module';
import { InvoicesModule } from './invoices/invoices.module';
import { TermSheetModule } from './term_sheet/term_sheet.module';
import { ContractsModule } from './contracts/contracts.module';
import { SuplliersModule } from './suppliers/suppliers.module';
import { CustomersModule } from './customers/customers.module';
import { InventoryModule } from './inventory/inventory.module';
import { ContactModule } from './contact/contact.module';
import { DocumentsModule } from './documents/documents.module';
import { InvestorModule } from './investor/investor.module';
import { EligibilityModule } from './eligibility/eligibility.module';
import { GetFinancingModule } from './get_financing/get_financing.module';
import { NotificationModule } from './notification/notification.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule,
    AuthModule,
    MailinglistModule,
    DatabaseModule,
    ProfileModule,
    StaffModule,
    DirectorsModule,
    CompanyModule,
    BankStatementsModule,
    TransactionsModule,
    GuarantorsModule,
    InvoicesModule,
    TermSheetModule,
    ContractsModule,
    SuplliersModule,
    CustomersModule,
    InventoryModule,
    ContactModule,
    DocumentsModule,
    InvestorModule,
    EligibilityModule,
    GetFinancingModule,
    NotificationModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
