import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpException,
  Req,
} from '@nestjs/common';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto';
import { InvoiceService } from './invoices.service';
import { JwtAuthGuard } from '../service/jwt.guard';
import { Invoice } from './schemas/invoices.schema';
import createLogger from 'src/service/winston.service';

@Controller('invoices')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe())
export class InvoiceController {
  private readonly logger = createLogger('invoice', 'invoice.error.log');

  constructor(private readonly invoiceService: InvoiceService) {}

  private handleHttpException(
    error: Error,
    message: string,
    statusCode: HttpStatus,
  ) {
    this.logger.error(message, error);
    throw new HttpException(message || error.message, statusCode);
  }

  private async handleInvoiceProcess(
    invoicePromise: Promise<any>,
    failureMessage: string,
    statusCode: HttpStatus,
  ) {
    try {
      return await invoicePromise;
    } catch (error) {
      this.handleHttpException(error, failureMessage, statusCode);
    }
  }

  @Post('/create')
  async create(@Body() createInvoiceDto: CreateInvoiceDto, @Req() { user }) {
    return this.handleInvoiceProcess(
      this.invoiceService.create(createInvoiceDto, user),
      'Failed to create invoice.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Get('/:id')
  async findOne(@Param('id') id: string, @Req() { user }) {
    return this.handleInvoiceProcess(
      this.invoiceService.getInvoiceById(id, user),
      'Failed to get invoice by id.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Get('/getAll')
  async findAll(@Req() { user }): Promise<Invoice[]> {
    return this.handleInvoiceProcess(
      this.invoiceService.findAll(user),
      'Failed to get all invoices.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
    @Req() { user },
  ) {
    return this.handleInvoiceProcess(
      this.invoiceService.updateInvoice(id, updateInvoiceDto, user),
      'Failed to update invoice.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Req() { user }) {
    return this.handleInvoiceProcess(
      this.invoiceService.deleteInvoice(id, user),
      'Failed to delete invoice.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
