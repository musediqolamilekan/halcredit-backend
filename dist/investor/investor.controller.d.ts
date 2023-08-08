import { CreateInvestorDto, UpdateInvestorDto } from './dto';
import { InvestorService } from './investor.service';
export declare class InvestorController {
    private readonly investorService;
    private readonly logger;
    constructor(investorService: InvestorService);
    private handleHttpException;
    private handleInvestorProcess;
    getCurrentUser(token: string): Promise<any>;
    create(createInvestorDto: CreateInvestorDto): Promise<any>;
    update(token: string, updateInvestorDto: UpdateInvestorDto): Promise<any>;
}
