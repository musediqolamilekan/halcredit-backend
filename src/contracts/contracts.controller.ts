import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { JwtAuthGuard } from '../service/jwt.guard';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contracts } from './schemas/contracts.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import createLogger from 'src/service/winston.service';

@Controller('contracts')
export class ContractsController {
  private readonly logger = createLogger('contracts', 'contracts.error.log');

  constructor(private readonly contractsService: ContractsService) {}

  private handleHttpException(
    error: Error,
    message: string,
    statusCode: HttpStatus,
  ) {
    this.logger.error(message, error);
    throw new HttpException(message || error.message, statusCode);
  }

  private async handleContractProcess(
    contractPromise: Promise<any>,
    failureMessage: string,
    statusCode: HttpStatus,
  ) {
    try {
      return await contractPromise;
    } catch (error) {
      this.handleHttpException(error, failureMessage, statusCode);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'supplierInvoice', maxCount: 1 },
      { name: 'bankStatements', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles() files,
    @Req() req,
    @Body(ValidationPipe) createContractDto: CreateContractDto,
  ) {
    const supplierInvoiceFile: Express.Multer.File = files.supplierInvoice
      ? files.supplierInvoice[0]
      : null;
    const bankStatementsFile: Express.Multer.File = files.bankStatements
      ? files.bankStatements[0]
      : null;

    return this.handleContractProcess(
      this.contractsService.create(
        createContractDto,
        req.user,
        supplierInvoiceFile,
        bankStatementsFile,
      ),
      'Failed to create contract.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getAll')
  async findAll(@Req() req) {
    return this.handleContractProcess(
      this.contractsService.findAll(req.user),
      'Failed to get all contracts.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findOne(@Param('id') id: string, @Req() req) {
    return this.handleContractProcess(
      this.contractsService.getContractById(id, req.user),
      'Failed to get contract.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateContractDto: UpdateContractDto,
    @Req() req,
  ): Promise<Contracts> {
    return this.handleContractProcess(
      this.contractsService.updateContract(id, updateContractDto, req.user),
      'Failed to update contract.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string, @Req() req): Promise<Contracts> {
    return this.handleContractProcess(
      this.contractsService.deleteContract(id, req.user),
      'Failed to delete contract.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
