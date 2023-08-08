import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBankStatementDto } from './dto/bank_statement.dto';
import { User } from '../user/schemas/user.schema';
import {
  BankStatements,
  BankStatementsDocument,
} from './schemas/bank_statements.schema';
import { FileService } from 'src/service/file.service';
import createLogger from 'src/service/winston.service';

@Injectable()
export class BankStatementsService {
  private readonly logger = createLogger(
    'bankStatement',
    'bankStatement-error.log',
  );
  constructor(
    @InjectModel(BankStatements.name)
    private bankStatementModel: Model<BankStatementsDocument>,
    private readonly fileService: FileService,
  ) {}

  async createOrUpdate(
    createBankStatementDto: CreateBankStatementDto,
    user: Pick<User, '_id'>,
    statementFile: Express.Multer.File,
  ): Promise<BankStatements> {
    const currentUserId = user._id;
    try {
      if (statementFile) {
        const statementUrl = await this.fileService.uploadToS3(
          statementFile,
          'statement',
        );
        createBankStatementDto.statement = statementUrl;
      }

      // Update if exists, else create a new one
      const uploadStatement = await this.bankStatementModel.findOneAndUpdate(
        { user: currentUserId }, // filter
        { ...createBankStatementDto, user: currentUserId }, // update document
        { new: true, upsert: true, useFindAndModify: false }, // options
      );

      return uploadStatement;
    } catch (error) {
      console.log(error);
      this.logger.error(`Failed to upload statement: ${error.message}`);
      throw error;
    }
  }
}
