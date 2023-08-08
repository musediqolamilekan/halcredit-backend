import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory, InventoryDocument } from './schemas/inventory.schema';
import { User } from '../user/schemas/user.schema';
import createLogger from '../service/winston.service';

@Injectable()
export class InventoryService {
  private readonly logger = createLogger(
    'inventory-service',
    'inventory.error.log',
  );

  constructor(
    @InjectModel(Inventory.name)
    private inventoryModel: Model<InventoryDocument>,
  ) {}

  async create(
    createInventoryDto: CreateInventoryDto,
    user: Pick<User, '_id'>,
  ): Promise<Inventory> {
    const createdInventory = new this.inventoryModel({
      ...createInventoryDto,
      user: user._id,
    });

    try {
      return await createdInventory.save();
    } catch (error) {
      this.logger.error(`Failed to create inventory: ${error.message}`);
      throw error;
    }
  }

  async getInventoryById(
    id: string,
    user: Pick<User, '_id'>,
  ): Promise<Inventory> {
    try {
      return await this.inventoryModel.findOne({ _id: id, user: user._id });
    } catch (error) {
      this.logger.error(`Failed to get inventory: ${error.message}`);
      throw error;
    }
  }

  async findAll(user: Pick<User, '_id'>): Promise<Inventory[]> {
    try {
      return await this.inventoryModel.find({ user: user._id });
    } catch (error) {
      this.logger.error(`Failed to get inventory: ${error.message}`);
      throw error;
    }
  }

  async updateInventory(
    id: string,
    updateInventoryDto: UpdateInventoryDto,
    user: Pick<User, '_id'>,
  ): Promise<Inventory> {
    try {
      return await this.inventoryModel.findOneAndUpdate(
        { _id: id, user: user._id },
        updateInventoryDto,
        { new: true },
      );
    } catch (error) {
      this.logger.error(`Failed to update inventory: ${error.message}`);
      throw error;
    }
  }

  async deleteInventory(
    id: string,
    user: Pick<User, '_id'>,
  ): Promise<Inventory> {
    try {
      return await this.inventoryModel.findOneAndRemove({
        _id: id,
        user: user._id,
      });
    } catch (error) {
      this.logger.error(`Failed to delete inventory: ${error.message}`);
      throw error;
    }
  }
}
