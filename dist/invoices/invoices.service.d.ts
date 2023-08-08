import { Model } from 'mongoose';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice, InvoiceDocument } from './schemas/invoices.schema';
import { User } from '../user/schemas/user.schema';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
export declare class InvoiceService {
    private invoiceModel;
    private readonly logger;
    constructor(invoiceModel: Model<InvoiceDocument>);
    create(createInvoiceDto: CreateInvoiceDto, user: Pick<User, '_id'>): Promise<Invoice>;
    getInvoiceById(id: string, user: Pick<User, '_id'>): Promise<Invoice>;
    findAll(user: Pick<User, '_id'>): Promise<Invoice[]>;
    updateInvoice(id: string, updateInvoiceDto: UpdateInvoiceDto, user: Pick<User, '_id'>): Promise<Invoice>;
    deleteInvoice(id: string, user: Pick<User, '_id'>): Promise<Invoice>;
}
