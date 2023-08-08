import { CreateInvoiceDto } from './dto/invoice.dto';
import { GetFinancingService } from './get_financing.service';
import { CreateIpaDto, UpdateIpaDto } from './dto/ipa.dto';
export declare class GetFinancingController {
    private readonly getFinancingService;
    private readonly logger;
    constructor(getFinancingService: GetFinancingService);
    private handleHttpException;
    private handleFinancingProcess;
    create(files: any, req: any, createInvoiceDto: CreateInvoiceDto): Promise<any>;
    createIPA(req: any, createIpaDto: CreateIpaDto): Promise<any>;
    updateIPA(id: string, req: any, updateIpaDto: UpdateIpaDto): Promise<any>;
}
