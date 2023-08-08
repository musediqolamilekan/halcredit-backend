import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInvoiceDto } from './dto/invoice.dto';
import {
  FinancingInvoice,
  FinancingInvoiceDocument,
} from './schemas/invoice.schema';
import { User } from '../user/schemas/user.schema';
import createLogger from '../service/winston.service';
import { FileService } from 'src/service/file.service';
import { CreateIpaDto, UpdateIpaDto } from './dto/ipa.dto';
import { IPA, IPADocument } from './schemas/ipa.schema';
import { RepaymentService } from 'src/service/repaymentPlan.service';

@Injectable()
export class GetFinancingService {
  private readonly logger = createLogger(
    'getFinancing-service',
    'getFinancing.error.log',
  );

  constructor(
    @InjectModel(FinancingInvoice.name)
    private invoiceModel: Model<FinancingInvoiceDocument>,
    @InjectModel(IPA.name) private IPAModel: Model<IPADocument>,
    private readonly fileService: FileService,
    private repaymentService: RepaymentService,
  ) {}

  async createInvoice(
    createInvoiceDto: CreateInvoiceDto,
    user: Pick<User, '_id'>,
    invoiceFile?: Express.Multer.File,
  ): Promise<FinancingInvoice> {
    if (invoiceFile) {
      const invoiceUrl = await this.fileService.uploadToS3(
        invoiceFile,
        'getFinancingInvoice',
      );
      createInvoiceDto.invoiceFile = invoiceUrl;
    }
    const createdInvoice = new this.invoiceModel({
      ...createInvoiceDto,
      user: user._id,
    });

    try {
      return await createdInvoice.save();
    } catch (error) {
      this.logger.error(`Failed to upload invoice: ${error.message}`);
      throw error;
    }
  }

  async createIPA(
    createIpaDto: CreateIpaDto,
    user: Pick<User, '_id'>,
  ): Promise<IPA> {
    const createdIPA = new this.IPAModel({
      ...createIpaDto,
      user: user._id,
    });

    try {
      return await createdIPA.save();
    } catch (error) {
      this.logger.error(`Failed to create IPA: ${error.message}`);
      throw error;
    }
  }

  async updateIPA(
    id: string,
    updateIpaDto: UpdateIpaDto,
    user: Pick<User, '_id'>,
  ): Promise<any> {
    try {
      const invoiceToUpdate = await this.IPAModel.findOne({
        _id: id,
        user: user._id,
      });
      if (!invoiceToUpdate) {
        throw new Error(`No invoice found for id ${id}`);
      }

      const principal = parseFloat(invoiceToUpdate.totalInvoiceAmount);

      const repaymentSchedule =
        this.repaymentService.calculateRepaymentByChoice(
          principal,
          updateIpaDto.repaymentPlan,
        );
      invoiceToUpdate.repaymentPlan = updateIpaDto.repaymentPlan;
      await invoiceToUpdate.save();

      return repaymentSchedule;
    } catch (error) {
      this.logger.error(`Failed to update IPA: ${error.message}`);
      throw error;
    }
  }
}
