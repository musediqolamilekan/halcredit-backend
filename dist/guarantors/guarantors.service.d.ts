/// <reference types="multer" />
import { CreateGuarantorDto } from './dto/create-guarantor.dto';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { Guarantor, GuarantorDocument } from './schemas/guarantors.schema';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/signUp.dto';
import { SignUp, SignUpDocument } from './schemas/signUp.schema';
import { Form, FormDocument } from './schemas/form.schema';
import { FileService } from 'src/service/file.service';
import { CreateFormDto } from './dto/form.dto';
import { EmailService } from 'src/service/email.service';
export declare class GuarantorsService {
    private guarantorModel;
    private signUpModel;
    private formModel;
    private configService;
    private readonly fileService;
    private emailService;
    private readonly saltRounds;
    private readonly logger;
    constructor(guarantorModel: Model<GuarantorDocument>, signUpModel: Model<SignUpDocument>, formModel: Model<FormDocument>, configService: ConfigService, fileService: FileService, emailService: EmailService);
    private createGuarantor;
    private excludePassword;
    create(createGuarantorDto: CreateGuarantorDto, user: Pick<User, '_id'>): Promise<Guarantor & {
        guarantorToken: string;
    }>;
    findAll(user: Pick<User, '_id'>): Promise<Guarantor[]>;
    signUp(signUpDto: SignUpDto): Promise<{
        message: string;
        user: SignUp;
    }>;
    createForm(createFormDto: CreateFormDto, guarantorToken: string, proofOfAddressFile?: Express.Multer.File, proofOfIdentificationFile?: Express.Multer.File): Promise<Form>;
    sendGuarantorEmail(guarantorId: any): Promise<string>;
}
