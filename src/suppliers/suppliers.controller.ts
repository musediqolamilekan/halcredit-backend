import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../service/jwt.guard';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto, UpdateSupplierDto } from './dto';
import { Suppliers } from './schemas/suppliers.schema';
import createLogger from 'src/service/winston.service';

@Controller('suppliers')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe())
export class SuppliersController {
  private readonly logger = createLogger(
    'supplier-service',
    'supplier.error.log',
  );

  constructor(private readonly suppliersService: SuppliersService) {}

  private handleHttpException(
    error: Error,
    message: string,
    statusCode: HttpStatus,
  ) {
    this.logger.error(message, error);
    throw new HttpException(message || error.message, statusCode);
  }

  private async handleSupplierProcess(
    supplierPromise: Promise<any>,
    failureMessage: string,
    statusCode: HttpStatus,
  ) {
    try {
      return await supplierPromise;
    } catch (error) {
      this.handleHttpException(error, failureMessage, statusCode);
    }
  }

  @Post('/create')
  async create(
    @Body() createSupplierDto: CreateSupplierDto,
    @Req() { user },
  ): Promise<Suppliers> {
    return this.handleSupplierProcess(
      this.suppliersService.create(createSupplierDto, user),
      'Failed to create supplier.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Get('/getAll')
  async findAll(@Req() { user }): Promise<Suppliers[]> {
    return this.handleSupplierProcess(
      this.suppliersService.findAll(user),
      'Failed to get all suppliers.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Get('/:id')
  async findOne(@Param('id') id: string, @Req() { user }): Promise<Suppliers> {
    return this.handleSupplierProcess(
      this.suppliersService.getSupplierById(id, user),
      `Failed to get supplier by id: ${id}.`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
    @Req() { user },
  ): Promise<Suppliers> {
    return this.handleSupplierProcess(
      this.suppliersService.updateSupplier(id, updateSupplierDto, user),
      `Failed to update supplier: ${id}.`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Req() { user }): Promise<Suppliers> {
    return this.handleSupplierProcess(
      this.suppliersService.deleteSupplier(id, user),
      `Failed to delete supplier: ${id}.`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
