import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Suppliers, SuppliersDocument } from './schemas/suppliers.schema';
export declare class SuppliersService {
    private supplierModel;
    private readonly logger;
    constructor(supplierModel: Model<SuppliersDocument>);
    create(createSupplierDto: CreateSupplierDto, user: Pick<User, '_id'>): Promise<Suppliers>;
    findAll(user: Pick<User, '_id'>): Promise<Suppliers[]>;
    getSupplierById(id: string, user: Pick<User, '_id'>): Promise<Suppliers>;
    updateSupplier(id: string, updateSupplierDto: UpdateSupplierDto, user: Pick<User, '_id'>): Promise<Suppliers>;
    deleteSupplier(id: string, user: Pick<User, '_id'>): Promise<Suppliers>;
}
