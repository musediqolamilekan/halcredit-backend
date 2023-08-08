import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto, UpdateSupplierDto } from './dto';
import { Suppliers } from './schemas/suppliers.schema';
export declare class SuppliersController {
    private readonly suppliersService;
    private readonly logger;
    constructor(suppliersService: SuppliersService);
    private handleHttpException;
    private handleSupplierProcess;
    create(createSupplierDto: CreateSupplierDto, { user }: {
        user: any;
    }): Promise<Suppliers>;
    findAll({ user }: {
        user: any;
    }): Promise<Suppliers[]>;
    findOne(id: string, { user }: {
        user: any;
    }): Promise<Suppliers>;
    update(id: string, updateSupplierDto: UpdateSupplierDto, { user }: {
        user: any;
    }): Promise<Suppliers>;
    delete(id: string, { user }: {
        user: any;
    }): Promise<Suppliers>;
}
