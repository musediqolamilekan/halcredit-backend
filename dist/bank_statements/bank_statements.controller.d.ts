/// <reference types="multer" />
import { CreateBankStatementDto } from './dto/bank_statement.dto';
import { BankStatements } from './schemas/bank_statements.schema';
import { BankStatementsService } from './bank_statements.service';
export declare class BankStatementsController {
    private readonly bankStatementsService;
    private readonly logger;
    constructor(bankStatementsService: BankStatementsService);
    private handleHttpException;
    private handleStatementProcess;
    createOrUpdate(createBankStatementDto: CreateBankStatementDto, statement: Express.Multer.File, { user }: {
        user: any;
    }): Promise<BankStatements>;
}
