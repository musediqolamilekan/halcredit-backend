import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { DocumentsService } from './documents.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/service/jwt.guard';
import createLogger from 'src/service/winston.service';

@Controller('documents')
export class DocumentsController {
  private readonly logger = createLogger(
    'document-service',
    'document.error.log',
  );

  constructor(private readonly documentsService: DocumentsService) {}

  private handleHttpException(
    error: Error,
    message: string,
    statusCode: HttpStatus,
  ) {
    this.logger.error(message, error);
    throw new HttpException(message || error.message, statusCode);
  }

  private async handleDocumentProcess(
    documentPromise: Promise<any>,
    failureMessage: string,
    statusCode: HttpStatus,
  ) {
    try {
      return await documentPromise;
    } catch (error) {
      this.handleHttpException(error, failureMessage, statusCode);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @UploadedFiles() files,
    @Req() req,
    @Body(ValidationPipe) createDocumentDto: CreateDocumentDto,
  ) {
    const supplierInvoiceFile = files.find(
      (file) => file.fieldname === 'supplierInvoice',
    );
    const bankStatementsFile = files.find(
      (file) => file.fieldname === 'bankStatements',
    );

    return this.handleDocumentProcess(
      this.documentsService.create(
        createDocumentDto,
        req.user,
        supplierInvoiceFile,
        bankStatementsFile,
      ),
      'Failed to create document.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
