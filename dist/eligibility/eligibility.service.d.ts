import { Model } from 'mongoose';
import { CreateEligibilityDto } from './dto/create-eligibility.dto';
import { Eligibility, EligibilityDocument } from './schemas/eligibility.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { EligibilityStrategy } from 'src/service/eligibility.strategy';
export declare class EligibilityService {
    private eligibilityModel;
    private userModel;
    private readonly eligibilityStrategy;
    private readonly logger;
    constructor(eligibilityModel: Model<EligibilityDocument>, userModel: Model<UserDocument>, eligibilityStrategy: EligibilityStrategy);
    create(createEligibilityDto: CreateEligibilityDto, user: Pick<User, '_id'>): Promise<{
        eligibilityStatus: string;
        eligibilityData: Eligibility;
    }>;
}
