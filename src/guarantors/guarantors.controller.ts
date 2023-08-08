import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpException,
  UseGuards,
  Req,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
  Param,
} from '@nestjs/common';
import { GuarantorsService } from './guarantors.service';
import { CreateGuarantorDto } from './dto/create-guarantor.dto';
import { JwtAuthGuard } from '../service/jwt.guard';
import { Guarantor } from './schemas/guarantors.schema';
import createLogger from 'src/service/winston.service';
import { SignUpDto } from './dto/signUp.dto';
import { CreateFormDto } from './dto/form.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('guarantors')
export class GuarantorsController {
  private readonly logger = createLogger('guarantor', 'guarantor.error.log');

  constructor(private readonly guarantorsService: GuarantorsService) {}

  private handleHttpException(
    error: Error,
    message: string,
    statusCode: HttpStatus,
  ) {
    this.logger.error(message, error);
    throw new HttpException(message || error.message, statusCode);
  }

  private async handleGuarantorProcess(
    guarantorPromise: Promise<any>,
    failureMessage: string,
    statusCode: HttpStatus,
  ) {
    try {
      return await guarantorPromise;
    } catch (error) {
      console.log(error);
      this.handleHttpException(error, failureMessage, statusCode);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async create(
    @Req() req,
    @Body(ValidationPipe) createGuarantorDto: CreateGuarantorDto,
  ) {
    return this.handleGuarantorProcess(
      this.guarantorsService.create(createGuarantorDto, req.user),
      'Failed to create inventory.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getAll')
  async findAll(@Req() req): Promise<Guarantor[]> {
    return this.handleGuarantorProcess(
      this.guarantorsService.findAll(req.user),
      'Failed to get all inventories.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Post('/signup')
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    return this.handleGuarantorProcess(
      this.guarantorsService.signUp(signUpDto),
      'Registration failed.',
      HttpStatus.BAD_REQUEST,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Post('/create/:guarantorToken')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'proofOfAddress', maxCount: 1 },
      { name: 'proofOfIdentification', maxCount: 1 },
    ]),
  )
  async createForm(
    @UploadedFiles() files,
    @Req() req,
    @Body(ValidationPipe) createFormDto: CreateFormDto,
    @Param('guarantorToken') guarantorToken: string,
  ) {
    const proofOfAddressFile: Express.Multer.File = files.proofOfAddress
      ? files.proofOfAddress[0]
      : null;
    const proofOfIdentificationFile: Express.Multer.File =
      files.proofOfIdentification ? files.proofOfIdentification[0] : null;

    return this.handleGuarantorProcess(
      this.guarantorsService.createForm(
        createFormDto,
        guarantorToken,
        proofOfAddressFile,
        proofOfIdentificationFile,
      ),
      'Failed to create contract.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
