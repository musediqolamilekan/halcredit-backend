/// <reference types="multer" />
import { Model } from 'mongoose';
import { CreateInvoiceDto } from './dto/invoice.dto';
import { FinancingInvoice, FinancingInvoiceDocument } from './schemas/invoice.schema';
import { User } from '../user/schemas/user.schema';
import { FileService } from 'src/service/file.service';
import { CreateIpaDto, UpdateIpaDto } from './dto/ipa.dto';
import { IPA, IPADocument } from './schemas/ipa.schema';
import { RepaymentService } from 'src/service/repaymentPlan.service';
export declare class GetFinancingService {
    private invoiceModel;
    private IPAModel;
    private readonly fileService;
    private repaymentService;
    private readonly logger;
    constructor(invoiceModel: Model<FinancingInvoiceDocument>, IPAModel: Model<IPADocument>, fileService: FileService, repaymentService: RepaymentService);
    createInvoice(createInvoiceDto: CreateInvoiceDto, user: Pick<User, '_id'>, invoiceFile?: Express.Multer.File): Promise<FinancingInvoice>;
    createIPA(createIpaDto: CreateIpaDto, user: Pick<User, '_id'>): Promise<IPA>;
    updateIPA(id: string, updateIpaDto: UpdateIpaDto, user: Pick<User, '_id'>): Promise<any>;
}
