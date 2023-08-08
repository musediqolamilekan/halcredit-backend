import { CreditTransactionService } from './../services/creditTransaction.service';
import { CreditTransactionDto } from '../dto/credit-transaction.dto';
export declare class CreditTransactionController {
    private readonly creditTransactionService;
    private readonly logger;
    constructor(creditTransactionService: CreditTransactionService);
    private handleTransactionProcess;
    create(req: any, creditTransactionDto: CreditTransactionDto): Promise<any>;
    findAll(req: any): Promise<any>;
    remove(req: any, id: string): Promise<any>;
}
