import { Module } from '@nestjs/common';
import { BankStatementsService } from './bank_statements.service';
import { BankStatementsController } from './bank_statements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BankStatementsSchema } from './schemas/bank_statements.schema';
import { AuthModule } from '../auth/auth.module';
import { UserSchema } from '../user/schemas/user.schema';
import { FileService } from '../service/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BankStatements', schema: BankStatementsSchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [BankStatementsController],
  providers: [BankStatementsService, FileService],
})
export class BankStatementsModule {}
