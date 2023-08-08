import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateInvoiceDto } from './dto/invoice.dto';
import { GetFinancingService } from './get_financing.service';
import { JwtAuthGuard } from '../service/jwt.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import createLogger from 'src/service/winston.service';
import { CreateIpaDto, UpdateIpaDto } from './dto/ipa.dto';

@Controller('financing')
export class GetFinancingController {
  private readonly logger = createLogger(
    'getFinancing-service',
    'getFinancing.error.log',
  );

  constructor(private readonly getFinancingService: GetFinancingService) {}

  private handleHttpException(
    error: Error,
    message: string,
    statusCode: HttpStatus,
  ) {
    this.logger.error(message, error);
    throw new HttpException(message || error.message, statusCode);
  }

  private async handleFinancingProcess(
    getFinancingPromise: Promise<any>,
    failureMessage: string,
    statusCode: HttpStatus,
  ) {
    try {
      return await getFinancingPromise;
    } catch (error) {
      this.handleHttpException(error, failureMessage, statusCode);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/invoice')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'invoiceFile', maxCount: 1 }]),
  )
  async create(
    @UploadedFiles() files,
    @Req() req,
    @Body(ValidationPipe) createInvoiceDto: CreateInvoiceDto,
  ) {
    const invoiceFile: Express.Multer.File = files.invoiceFile
      ? files.invoiceFile[0]
      : null;

    return this.handleFinancingProcess(
      this.getFinancingService.createInvoice(
        createInvoiceDto,
        req.user,
        invoiceFile,
      ),
      'Failed to upload invoice.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createIPA(
    @Req() req,
    @Body(ValidationPipe) createIpaDto: CreateIpaDto,
  ) {
    return this.handleFinancingProcess(
      this.getFinancingService.createIPA(createIpaDto, req.user),
      'Failed to create inventory.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/repaymentPlan/:id')
  async updateIPA(
    @Param('id') id: string,
    @Req() req,
    @Body(ValidationPipe) updateIpaDto: UpdateIpaDto,
  ) {
    return this.handleFinancingProcess(
      this.getFinancingService.updateIPA(id, updateIpaDto, req.user),
      'Failed to update IPA.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
