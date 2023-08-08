import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/customer.dto';
import { Customers } from './schemas/customers.schema';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('/add')
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customers> {
    return this.customersService.create(createCustomerDto);
  }

  @Get('/getAll')
  async findAll(): Promise<Customers[]> {
    return this.customersService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Customers> {
    return this.customersService.findOne(id);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() createCustomerDto: CreateCustomerDto): Promise<Customers> {
    return this.customersService.update(id, createCustomerDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Customers> {
    return this.customersService.delete(id);
  }
}
