import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../service/jwt.guard';
import { Inventory } from './schemas/inventory.schema';
import createLogger from 'src/service/winston.service';

@Controller('inventory')
export class InventoryController {
  private readonly logger = createLogger('inventory', 'inventory.error.log');

  constructor(private readonly inventoryService: InventoryService) {}

  private handleHttpException(
    error: Error,
    message: string,
    statusCode: HttpStatus,
  ) {
    this.logger.error(message, error);
    throw new HttpException(message || error.message, statusCode);
  }

  private async handleInventoryProcess(
    inventoryPromise: Promise<any>,
    failureMessage: string,
    statusCode: HttpStatus,
  ) {
    try {
      return await inventoryPromise;
    } catch (error) {
      this.handleHttpException(error, failureMessage, statusCode);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async create(
    @Req() req,
    @Body(ValidationPipe) createInventoryDto: CreateInventoryDto,
  ) {
    return this.handleInventoryProcess(
      this.inventoryService.create(createInventoryDto, req.user),
      'Failed to create inventory.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findOne(@Param('id') id: string, @Req() req) {
    return this.handleInventoryProcess(
      this.inventoryService.getInventoryById(id, req.user),
      'Failed to get inventory.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getAll')
  async findAll(@Req() req): Promise<Inventory[]> {
    return this.handleInventoryProcess(
      this.inventoryService.findAll(req.user),
      'Failed to get all inventories.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Req() req,
    @Body(ValidationPipe) updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.handleInventoryProcess(
      this.inventoryService.updateInventory(id, updateInventoryDto, req.user),
      'Failed to update inventory.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string, @Req() req) {
    return this.handleInventoryProcess(
      this.inventoryService.deleteInventory(id, req.user),
      'Failed to delete inventory.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
