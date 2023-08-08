import { CreateInvoiceDto, UpdateInvoiceDto } from './dto';
import { InvoiceService } from './invoices.service';
import { Invoice } from './schemas/invoices.schema';
export declare class InvoiceController {
    private readonly invoiceService;
    private readonly logger;
    constructor(invoiceService: InvoiceService);
    private handleHttpException;
    private handleInvoiceProcess;
    create(createInvoiceDto: CreateInvoiceDto, { user }: {
        user: any;
    }): Promise<any>;
    findOne(id: string, { user }: {
        user: any;
    }): Promise<any>;
    findAll({ user }: {
        user: any;
    }): Promise<Invoice[]>;
    update(id: string, updateInvoiceDto: UpdateInvoiceDto, { user }: {
        user: any;
    }): Promise<any>;
    delete(id: string, { user }: {
        user: any;
    }): Promise<any>;
}
