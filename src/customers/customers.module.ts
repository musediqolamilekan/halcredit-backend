import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomersSchema } from './schemas/customers.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Customers', schema: CustomersSchema }])],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
