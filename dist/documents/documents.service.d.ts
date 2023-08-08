/// <reference types="multer" />
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Documents, DocumentsDocument } from './schemas/documents.schema';
import { User } from '../user/schemas/user.schema';
import { FileService } from '../service/file.service';
export declare class DocumentsService {
    private documentsModel;
    private readonly fileService;
    private readonly logger;
    constructor(documentsModel: Model<DocumentsDocument>, fileService: FileService);
    create(createDocumentDto: CreateDocumentDto, user: Pick<User, '_id'>, certificateFile?: Express.Multer.File, utilityBillFile?: Express.Multer.File): Promise<Documents>;
    findAll(): Promise<Documents[]>;
    findOne(id: string): Promise<Documents>;
    update(id: string, createDocumentDto: CreateDocumentDto): Promise<Documents>;
    delete(id: string): Promise<Documents>;
}
