import { CreateEligibilityDto } from './dto/create-eligibility.dto';
import { EligibilityService } from './eligibility.service';
export declare class EligibilityController {
    private readonly eligibilityService;
    constructor(eligibilityService: EligibilityService);
    private handleHttpException;
    private handleProcess;
    create({ user }: {
        user: any;
    }, createEligibilityDto: CreateEligibilityDto): Promise<any>;
}
