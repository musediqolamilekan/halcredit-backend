import { Model } from 'mongoose';
import { CreditTransaction, CreditTransactionDocument } from '../schemas/creditTransaction.schema';
import { User } from '../../user/schemas/user.schema';
import { CreditTransactionDto } from '../dto/credit-transaction.dto';
export declare class CreditTransactionService {
    private transactionModel;
    private readonly logger;
    constructor(transactionModel: Model<CreditTransactionDocument>);
    create(createTransactionDto: CreditTransactionDto, user: Pick<User, '_id'>): Promise<CreditTransaction>;
    findAll(user: Pick<User, '_id'>): Promise<CreditTransaction[]>;
    remove(id: string, user: Pick<User, '_id'>): Promise<void>;
}
