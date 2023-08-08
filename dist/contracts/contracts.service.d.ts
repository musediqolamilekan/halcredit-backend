/// <reference types="multer" />
import { Model } from 'mongoose';
import { CreateContractDto } from './dto/create-contract.dto';
import { Contracts, ContractsDocument } from './schemas/contracts.schema';
import { User } from '../user/schemas/user.schema';
import { UpdateContractDto } from './dto/update-contract.dto';
import { FileService } from '../service/file.service';
export declare class ContractsService {
    private contractModel;
    private readonly fileService;
    private readonly logger;
    constructor(contractModel: Model<ContractsDocument>, fileService: FileService);
    create(createContractDto: CreateContractDto, user: Pick<User, '_id'>, supplierInvoiceFile?: Express.Multer.File, bankStatementsFile?: Express.Multer.File): Promise<Contracts>;
    findAll(user: Pick<User, '_id'>): Promise<Contracts[]>;
    getContractById(id: string, user: Pick<User, '_id'>): Promise<Contracts>;
    updateContract(id: string, updateContractDto: UpdateContractDto, user: Pick<User, '_id'>): Promise<Contracts>;
    deleteContract(id: string, user: Pick<User, '_id'>): Promise<Contracts>;
}
