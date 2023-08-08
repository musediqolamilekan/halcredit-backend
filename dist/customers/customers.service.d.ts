import { Model } from 'mongoose';
import { Customers, CustomersDocument } from './schemas/customers.schema';
import { CreateCustomerDto } from './dto/customer.dto';
export declare class CustomersService {
    private customerModel;
    constructor(customerModel: Model<CustomersDocument>);
    create(createCustomerDto: CreateCustomerDto): Promise<Customers>;
    findAll(): Promise<Customers[]>;
    findOne(id: string): Promise<Customers>;
    update(id: string, createCustomerDto: CreateCustomerDto): Promise<Customers>;
    delete(id: string): Promise<Customers>;
}
