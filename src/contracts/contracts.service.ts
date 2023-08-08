import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContractDto } from './dto/create-contract.dto';
import { Contracts, ContractsDocument } from './schemas/contracts.schema';
import { User } from '../user/schemas/user.schema';
import { UpdateContractDto } from './dto/update-contract.dto';
import { FileService } from '../service/file.service';
import createLogger from '../service/winston.service';

@Injectable()
export class ContractsService {
  private readonly logger = createLogger('contract', 'contract-error.log');

  constructor(
    @InjectModel(Contracts.name)
    private contractModel: Model<ContractsDocument>,
    private readonly fileService: FileService,
  ) {}

  async create(
    createContractDto: CreateContractDto,
    user: Pick<User, '_id'>,
    supplierInvoiceFile?: Express.Multer.File,
    bankStatementsFile?: Express.Multer.File,
  ): Promise<Contracts> {
    try {
      if (supplierInvoiceFile) {
        const supplierInvoiceUrl = await this.fileService.uploadToS3(
          supplierInvoiceFile,
          'supplierInvoice',
        );
        createContractDto.supplierInvoice = supplierInvoiceUrl;
      }
      if (bankStatementsFile) {
        const bankStatementsUrl = await this.fileService.uploadToS3(
          bankStatementsFile,
          'bankStatements',
        );
        createContractDto.bankStatement = bankStatementsUrl;
      }

      const createdContract = new this.contractModel({
        ...createContractDto,
        user: user._id,
      });

      return await createdContract.save();
    } catch (error) {
      console.log(error);
      this.logger.error(`Failed to create contract: ${error.message}`);
      throw error;
    }
  }

  async findAll(user: Pick<User, '_id'>): Promise<Contracts[]> {
    try {
      return await this.contractModel.find({ user: user._id });
    } catch (error) {
      this.logger.error(`Failed to get contracts: ${error.message}`);
      throw error;
    }
  }

  async getContractById(
    id: string,
    user: Pick<User, '_id'>,
  ): Promise<Contracts> {
    try {
      return await this.contractModel.findOne({ _id: id, user: user._id });
    } catch (error) {
      this.logger.error(`Failed to get contract: ${error.message}`);
      throw error;
    }
  }

  async updateContract(
    id: string,
    updateContractDto: UpdateContractDto,
    user: Pick<User, '_id'>,
  ): Promise<Contracts> {
    try {
      return await this.contractModel.findOneAndUpdate(
        { _id: id, user: user._id },
        updateContractDto,
        { new: true },
      );
    } catch (error) {
      this.logger.error(`Failed to update contract: ${error.message}`);
      throw error;
    }
  }

  async deleteContract(
    id: string,
    user: Pick<User, '_id'>,
  ): Promise<Contracts> {
    try {
      return await this.contractModel.findOneAndRemove({
        _id: id,
        user: user._id,
      });
    } catch (error) {
      this.logger.error(`Failed to delete contract: ${error.message}`);
      throw error;
    }
  }
}
