import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreditTransaction,
  CreditTransactionDocument,
} from '../schemas/creditTransaction.schema';
import { User } from '../../user/schemas/user.schema';
import { CreditTransactionDto } from '../dto/credit-transaction.dto';
import createLogger from '../../service/winston.service';

@Injectable()
export class CreditTransactionService {
  private readonly logger = createLogger(
    'transaction-service',
    'transaction.error.log',
  );
  constructor(
    @InjectModel(CreditTransaction.name)
    private transactionModel: Model<CreditTransactionDocument>,
  ) {}

  async create(
    createTransactionDto: CreditTransactionDto,
    user: Pick<User, '_id'>,
  ): Promise<CreditTransaction> {
    try {
      const createdTransaction = new this.transactionModel({
        ...createTransactionDto,
        user: user._id,
      });

      return await createdTransaction.save();
    } catch (error) {
      this.logger.error(
        `Failed to create transaction for user id: ${JSON.stringify(user._id)}`,
        error,
      );
      throw new InternalServerErrorException('Failed to create transaction');
    }
  }

  async findAll(user: Pick<User, '_id'>): Promise<CreditTransaction[]> {
    try {
      return await this.transactionModel.find({ user: user._id }).exec();
    } catch (error) {
      this.logger.error(
        `Failed to fetch transactions for user id: ${JSON.stringify(user._id)}`,
        error,
      );
      throw new InternalServerErrorException('Failed to fetch transactions');
    }
  }

  async remove(id: string, user: Pick<User, '_id'>): Promise<void> {
    try {
      const transaction = await this.transactionModel.findById(id).exec();
      if (!transaction || String(transaction.user) !== String(user._id)) {
        throw new UnauthorizedException('Invalid transaction');
      }

      await this.transactionModel.findByIdAndRemove(id).exec();
    } catch (error) {
      this.logger.error(
        `Failed to delete transaction id: ${JSON.stringify(
          id,
        )} for user id: ${JSON.stringify(user._id)}`,
        error,
      );
      throw new InternalServerErrorException('Failed to delete transaction');
    }
  }
}
