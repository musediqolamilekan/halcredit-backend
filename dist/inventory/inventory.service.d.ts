import { Model } from 'mongoose';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory, InventoryDocument } from './schemas/inventory.schema';
import { User } from '../user/schemas/user.schema';
export declare class InventoryService {
    private inventoryModel;
    private readonly logger;
    constructor(inventoryModel: Model<InventoryDocument>);
    create(createInventoryDto: CreateInventoryDto, user: Pick<User, '_id'>): Promise<Inventory>;
    getInventoryById(id: string, user: Pick<User, '_id'>): Promise<Inventory>;
    findAll(user: Pick<User, '_id'>): Promise<Inventory[]>;
    updateInventory(id: string, updateInventoryDto: UpdateInventoryDto, user: Pick<User, '_id'>): Promise<Inventory>;
    deleteInventory(id: string, user: Pick<User, '_id'>): Promise<Inventory>;
}
