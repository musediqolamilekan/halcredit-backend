import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customers, CustomersDocument } from './schemas/customers.schema';
import { CreateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customers.name) private customerModel: Model<CustomersDocument>) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customers> {
    const createdCustomer = new this.customerModel(createCustomerDto);
    return createdCustomer.save();
  }

  async findAll(): Promise<Customers[]> {
    return this.customerModel.find().exec();
  }

  async findOne(id: string): Promise<Customers> {
    return this.customerModel.findById(id).exec();
  }

  async update(id: string, createCustomerDto: CreateCustomerDto): Promise<Customers> {
    return this.customerModel.findByIdAndUpdate(id, createCustomerDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Customers> {
    return this.customerModel.findByIdAndRemove(id).exec();
  }
}
