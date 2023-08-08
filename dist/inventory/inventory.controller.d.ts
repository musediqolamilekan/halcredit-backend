import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryService } from './inventory.service';
import { Inventory } from './schemas/inventory.schema';
export declare class InventoryController {
    private readonly inventoryService;
    private readonly logger;
    constructor(inventoryService: InventoryService);
    private handleHttpException;
    private handleInventoryProcess;
    create(req: any, createInventoryDto: CreateInventoryDto): Promise<any>;
    findOne(id: string, req: any): Promise<any>;
    findAll(req: any): Promise<Inventory[]>;
    update(id: string, req: any, updateInventoryDto: UpdateInventoryDto): Promise<any>;
    delete(id: string, req: any): Promise<any>;
}
