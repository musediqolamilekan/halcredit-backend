import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Suppliers, SuppliersDocument } from './schemas/suppliers.schema';
import createLogger from '../service/winston.service';

@Injectable()
export class SuppliersService {
  private readonly logger = createLogger(
    'supplier-service',
    'supplier.error.log',
  );

  constructor(
    @InjectModel(Suppliers.name)
    private supplierModel: Model<SuppliersDocument>,
  ) {}

  async create(
    createSupplierDto: CreateSupplierDto,
    user: Pick<User, '_id'>,
  ): Promise<Suppliers> {
    const createdSupplier = new this.supplierModel({
      ...createSupplierDto,
      user: user._id,
    });

    try {
      return await createdSupplier.save();
    } catch (error) {
      this.logger.error(`Failed to create supplier: ${error.message}`);
      throw error;
    }
  }

  async findAll(user: Pick<User, '_id'>): Promise<Suppliers[]> {
    try {
      return await this.supplierModel.find({ user: user._id });
    } catch (error) {
      this.logger.error(`Failed to get suppliers: ${error.message}`);
      throw error;
    }
  }

  async getSupplierById(
    id: string,
    user: Pick<User, '_id'>,
  ): Promise<Suppliers> {
    try {
      return await this.supplierModel.findOne({ _id: id, user: user._id });
    } catch (error) {
      this.logger.error(`Failed to get supplier: ${error.message}`);
      throw error;
    }
  }

  async updateSupplier(
    id: string,
    updateSupplierDto: UpdateSupplierDto,
    user: Pick<User, '_id'>,
  ): Promise<Suppliers> {
    try {
      return await this.supplierModel.findOneAndUpdate(
        { _id: id, user: user._id },
        updateSupplierDto,
        { new: true },
      );
    } catch (error) {
      this.logger.error(`Failed to update supplier: ${error.message}`);
      throw error;
    }
  }

  async deleteSupplier(
    id: string,
    user: Pick<User, '_id'>,
  ): Promise<Suppliers> {
    try {
      return await this.supplierModel.findOneAndRemove({
        _id: id,
        user: user._id,
      });
    } catch (error) {
      this.logger.error(`Failed to delete supplier: ${error.message}`);
      throw error;
    }
  }
}
