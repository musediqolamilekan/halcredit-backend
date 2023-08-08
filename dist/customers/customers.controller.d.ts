import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/customer.dto';
import { Customers } from './schemas/customers.schema';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(createCustomerDto: CreateCustomerDto): Promise<Customers>;
    findAll(): Promise<Customers[]>;
    findOne(id: string): Promise<Customers>;
    update(id: string, createCustomerDto: CreateCustomerDto): Promise<Customers>;
    delete(id: string): Promise<Customers>;
}
