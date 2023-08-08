/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Documents, DocumentsDocument } from './schemas/documents.schema';
import { User } from '../user/schemas/user.schema';
import { FileService } from '../service/file.service';
import createLogger from '../service/winston.service';

@Injectable()
export class DocumentsService {
  private readonly logger = createLogger('document-service', 'document.error.log');
  constructor(@InjectModel(Documents.name) private documentsModel: Model<DocumentsDocument>, private readonly fileService: FileService,) {}

  async create(
    createDocumentDto: CreateDocumentDto,
    user: Pick<User, '_id'>,
    certificateFile?: Express.Multer.File,
    utilityBillFile?: Express.Multer.File,
  ): Promise<Documents> {
    try {
      if (certificateFile) {
        const certificateUrl = await this.fileService.uploadToS3(
          certificateFile,
          'certificateUrl',
        );
        createDocumentDto.certificate = certificateUrl;
      }
      if (utilityBillFile) {
        const utilityBillUrl = await this.fileService.uploadToS3(
          utilityBillFile,
          'utilityBillFile',
        );
        createDocumentDto.utilityBill = utilityBillUrl;
      }

      const createdDocument = new this.documentsModel({
        ...createDocumentDto,
        user: user._id,
      });

      return await createdDocument.save();
    } catch (error) {
      this.logger.error(`Failed to create document: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<Documents[]> {
    return this.documentsModel.find().exec();
  }

  async findOne(id: string): Promise<Documents> {
    return this.documentsModel.findById(id).exec();
  }

  async update(id: string, createDocumentDto: CreateDocumentDto): Promise<Documents> {
    return this.documentsModel.findByIdAndUpdate(id, createDocumentDto, { new: true });
  }

  async delete(id: string): Promise<Documents> {
    return this.documentsModel.findByIdAndRemove(id);
  }
}
