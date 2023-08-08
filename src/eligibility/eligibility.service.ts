import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEligibilityDto } from './dto/create-eligibility.dto';
import { Eligibility, EligibilityDocument } from './schemas/eligibility.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import createLogger from '../service/winston.service';
import { EligibilityStrategy } from 'src/service/eligibility.strategy';

@Injectable()
export class EligibilityService {
  private readonly logger = createLogger(
    'eligibility-service',
    'eligibility.error.log',
  );

  constructor(
    @InjectModel(Eligibility.name)
    private eligibilityModel: Model<EligibilityDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>, // Inject UserModel
    private readonly eligibilityStrategy: EligibilityStrategy,
  ) {}

  async create(
    createEligibilityDto: CreateEligibilityDto,
    user: Pick<User, '_id'>,
  ): Promise<{ eligibilityStatus: string; eligibilityData: Eligibility }> {
    try {
      const isEligible = this.eligibilityStrategy.checkEligibility(
        createEligibilityDto.timeInBusiness,
        createEligibilityDto.monthlyIncome,
      );

      const checkEligibility = new this.eligibilityModel({
        ...createEligibilityDto,
        user: user._id,
        isEligible: isEligible,
      });

      const savedEligibility = await checkEligibility.save();

      // Update isEligible field directly using Mongoose updateOne method
      await this.userModel.updateOne({ _id: user._id }, { isEligible });

      // Determine eligibility status in string format
      const eligibilityStatus = isEligible ? 'Eligible' : 'Not Eligible';

      // Return both eligibility status and eligibility data
      return { eligibilityStatus, eligibilityData: savedEligibility };
    } catch (error) {
      this.logger.error(`Failed to create eligibility: ${error.message}`);
      throw error;
    }
  }
}
