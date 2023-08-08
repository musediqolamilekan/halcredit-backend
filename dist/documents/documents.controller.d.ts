import { CreateDocumentDto } from './dto/create-document.dto';
import { DocumentsService } from './documents.service';
export declare class DocumentsController {
    private readonly documentsService;
    private readonly logger;
    constructor(documentsService: DocumentsService);
    private handleHttpException;
    private handleDocumentProcess;
    create(files: any, req: any, createDocumentDto: CreateDocumentDto): Promise<any>;
}
