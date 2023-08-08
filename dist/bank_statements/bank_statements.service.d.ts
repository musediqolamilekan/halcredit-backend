/// <reference types="multer" />
import { Model } from 'mongoose';
import { CreateBankStatementDto } from './dto/bank_statement.dto';
import { User } from '../user/schemas/user.schema';
import { BankStatements, BankStatementsDocument } from './schemas/bank_statements.schema';
import { FileService } from 'src/service/file.service';
export declare class BankStatementsService {
    private bankStatementModel;
    private readonly fileService;
    private readonly logger;
    constructor(bankStatementModel: Model<BankStatementsDocument>, fileService: FileService);
    createOrUpdate(createBankStatementDto: CreateBankStatementDto, user: Pick<User, '_id'>, statementFile: Express.Multer.File): Promise<BankStatements>;
}
