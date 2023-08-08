import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contracts } from './schemas/contracts.schema';
export declare class ContractsController {
    private readonly contractsService;
    private readonly logger;
    constructor(contractsService: ContractsService);
    private handleHttpException;
    private handleContractProcess;
    create(files: any, req: any, createContractDto: CreateContractDto): Promise<any>;
    findAll(req: any): Promise<any>;
    findOne(id: string, req: any): Promise<any>;
    update(id: string, updateContractDto: UpdateContractDto, req: any): Promise<Contracts>;
    delete(id: string, req: any): Promise<Contracts>;
}
