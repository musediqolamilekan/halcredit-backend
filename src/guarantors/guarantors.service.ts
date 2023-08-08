import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateGuarantorDto } from './dto/create-guarantor.dto';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import createLogger from '../service/winston.service';
import { Guarantor, GuarantorDocument } from './schemas/guarantors.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/signUp.dto';
import { SignUp, SignUpDocument } from './schemas/signUp.schema';
import { Form, FormDocument } from './schemas/form.schema';
import { FileService } from 'src/service/file.service';
import { CreateFormDto } from './dto/form.dto';
import { EmailService } from 'src/service/email.service';

@Injectable()
export class GuarantorsService {
  private readonly saltRounds: number;
  private readonly logger = createLogger(
    'guarantor-service',
    'guarantor.error.log',
  );

  constructor(
    @InjectModel(Guarantor.name)
    private guarantorModel: Model<GuarantorDocument>,
    @InjectModel(SignUp.name) private signUpModel: Model<SignUpDocument>,
    @InjectModel(Form.name) private formModel: Model<FormDocument>,
    private configService: ConfigService,
    private readonly fileService: FileService,
    private emailService: EmailService,
  ) {}

  private async createGuarantor(signUpDto: SignUpDto): Promise<SignUp> {
    const { email, password } = signUpDto;
    const saltRounds =
      parseInt(this.configService.get<string>('BCRYPT_SALT_ROUNDS')) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return await this.signUpModel.create({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });
  }

  private async excludePassword(guarantorId: any): Promise<SignUp> {
    return await this.signUpModel.findById(guarantorId).select('-password');
  }
  async create(
    createGuarantorDto: CreateGuarantorDto,
    user: Pick<User, '_id'>,
  ): Promise<Guarantor & { guarantorToken: string }> {
    const createdGuarantor = new this.guarantorModel({
      ...createGuarantorDto,
      user: user._id,
    });

    try {
      const savedGuarantor = await createdGuarantor.save();
      const guarantorToken = await this.sendGuarantorEmail(savedGuarantor._id);

      return {
        ...savedGuarantor.toObject(),
        guarantorToken,
      };
    } catch (error) {
      console.log(error);
      this.logger.error(`Failed to create guarantor: ${error.message}`);
      throw error;
    }
  }

  async findAll(user: Pick<User, '_id'>): Promise<Guarantor[]> {
    try {
      return await this.guarantorModel.find({ user: user._id });
    } catch (error) {
      this.logger.error(`Failed to get guarantor: ${error.message}`);
      throw error;
    }
  }

  async signUp(signUpDto: SignUpDto) {
    const { email } = signUpDto;

    const existingUser = await this.signUpModel.findOne({ email });
    if (existingUser) {
      this.logger.error(`User already exists: ${JSON.stringify(email)}`);
      throw new ConflictException('Guarantor already exists');
    }

    try {
      let user = await this.createGuarantor(signUpDto);
      user = await this.excludePassword(user._id);

      return { message: 'Success', user };
    } catch (error) {
      this.logger.error(
        `Sign up failed for email: ${JSON.stringify(email)}`,
        error,
      );
      throw new InternalServerErrorException('Sign Up Failed');
    }
  }

  async createForm(
    createFormDto: CreateFormDto,
    guarantorToken: string,
    proofOfAddressFile?: Express.Multer.File,
    proofOfIdentificationFile?: Express.Multer.File,
  ): Promise<Form> {
    try {
      const guarantor = await this.guarantorModel.findOne({ guarantorToken });

      if (!guarantor) {
        throw new NotFoundException('Invalid guarantor token');
      }

      if (proofOfAddressFile) {
        const proofOfAddressUrl = await this.fileService.uploadToS3(
          proofOfAddressFile,
          'proofOfAddress',
        );
        createFormDto.proofOfAddress = proofOfAddressUrl;
      }

      if (proofOfIdentificationFile) {
        const proofOfIdentificationUrl = await this.fileService.uploadToS3(
          proofOfIdentificationFile,
          'proofOfIdentification',
        );
        createFormDto.proofOfIdentification = proofOfIdentificationUrl;
      }

      const createdForm = new this.formModel({
        ...createFormDto,
        user: guarantor.user._id,
      });

      return await createdForm.save();
    } catch (error) {
      console.log(error);
      this.logger.error(`Failed to create form: ${error.message}`);
      throw error;
    }
  }

  async sendGuarantorEmail(guarantorId: any) {
    try {
      const guarantorToken = crypto.randomBytes(5).toString('hex');
      const guarantor = await this.guarantorModel.findById(guarantorId);

      if (!guarantor) {
        throw new UnauthorizedException('Invalid guarantor id');
      }

      guarantor.guarantorToken = guarantorToken;
      await guarantor.save();

      const guarantorLink = `${this.configService.get<string>(
        'VERIFICATION_BASE_URL',
      )}?guarantorToken=${guarantorToken}`;

      this.emailService.sendGuarantorLink(guarantor, guarantorLink);
      return guarantorToken;
    } catch (error) {
      this.logger.error(
        `sendGuarantorEmail failed for guarantor id: ${JSON.stringify(
          guarantorId,
        )}`,
        error,
      );
      throw new InternalServerErrorException(
        'Failed to process guarantor verification token request',
      );
    }
  }
}
