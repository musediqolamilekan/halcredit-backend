import { Model } from 'mongoose';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { Investor, InvestorDocument } from './schemas/investor.schema';
import { ConfigService } from '@nestjs/config';
export declare class InvestorService {
    private investorModel;
    private configService;
    private readonly logger;
    constructor(investorModel: Model<InvestorDocument>, configService: ConfigService);
    getInvestorByToken(token: string): Promise<Investor>;
    create(createInvestorDto: CreateInvestorDto): Promise<Investor>;
    sendEmail(email: string, firstName: string, investorId: string): Promise<void>;
    updateInvestor(updateInvestorDto: UpdateInvestorDto, token: string): Promise<Investor>;
    sendEmailToAdmin(adminEmail: string, newUserEmail: string, firstName: string, lastName: string, investorId: string, amount: string, passportID: string, countryPassport: string, country: string, gender: string, dateOfBirth: string, phone: string): Promise<void>;
}
