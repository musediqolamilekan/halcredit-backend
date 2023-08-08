import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice, InvoiceDocument } from './schemas/invoices.schema';
import { User } from '../user/schemas/user.schema';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import createLogger from '../service/winston.service';

@Injectable()
export class InvoiceService {
  private readonly logger = createLogger(
    'invoice-service',
    'invoice.error.log',
  );

  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
  ) {}

  async create(
    createInvoiceDto: CreateInvoiceDto,
    user: Pick<User, '_id'>,
  ): Promise<Invoice> {
    const createdInvoice = new this.invoiceModel({
      ...createInvoiceDto,
      user: user._id,
    });

    try {
      return await createdInvoice.save();
    } catch (error) {
      this.logger.error(`Failed to create invoice: ${error.message}`);
      throw error;
    }
  }

  async getInvoiceById(id: string, user: Pick<User, '_id'>): Promise<Invoice> {
    try {
      return await this.invoiceModel.findOne({ _id: id, user: user._id });
    } catch (error) {
      this.logger.error(`Failed to get invoice: ${error.message}`);
      throw error;
    }
  }

  async findAll(user: Pick<User, '_id'>): Promise<Invoice[]> {
    try {
      return await this.invoiceModel.find({ user: user._id });
    } catch (error) {
      this.logger.error(`Failed to get suppliers: ${error.message}`);
      throw error;
    }
  }

  async updateInvoice(
    id: string,
    updateInvoiceDto: UpdateInvoiceDto,
    user: Pick<User, '_id'>,
  ): Promise<Invoice> {
    try {
      return await this.invoiceModel.findOneAndUpdate(
        { _id: id, user: user._id },
        updateInvoiceDto,
        { new: true },
      );
    } catch (error) {
      this.logger.error(`Failed to update invoice: ${error.message}`);
      throw error;
    }
  }

  async deleteInvoice(id: string, user: Pick<User, '_id'>): Promise<Invoice> {
    try {
      return await this.invoiceModel.findOneAndRemove({
        _id: id,
        user: user._id,
      });
    } catch (error) {
      this.logger.error(`Failed to delete invoice: ${error.message}`);
      throw error;
    }
  }
}
