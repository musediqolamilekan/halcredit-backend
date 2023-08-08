import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateInvestorDto, UpdateInvestorDto } from './dto';
import { InvestorService } from './investor.service';
import { JwtAuthGuard } from '../service/jwt.guard';
import createLogger from 'src/service/winston.service';

@Controller('investor')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe())
export class InvestorController {
  private readonly logger = createLogger('investor', 'investor.error.log');

  constructor(private readonly investorService: InvestorService) {}

  private handleHttpException(
    error: Error,
    message: string,
    statusCode: HttpStatus,
  ) {
    this.logger.error(message, error);
    throw new HttpException(message || error.message, statusCode);
  }

  private async handleInvestorProcess(
    investorPromise: Promise<any>,
    failureMessage: string,
    statusCode: HttpStatus,
  ) {
    try {
      return await investorPromise;
    } catch (error) {
      this.handleHttpException(error, failureMessage, statusCode);
    }
  }

  @Get('/update-kyc/:token')
  async getCurrentUser(@Param('token') token: string) {
    return this.handleInvestorProcess(
      this.investorService.getInvestorByToken(token),
      'Failed to get investor by token.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Post('/show-interest')
  async create(@Body() createInvestorDto: CreateInvestorDto) {
    return this.handleInvestorProcess(
      this.investorService.create(createInvestorDto),
      'Failed to create investor.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Patch('/update-kyc/:token')
  async update(
    @Param('token') token: string,
    @Body() updateInvestorDto: UpdateInvestorDto,
  ) {
    return this.handleInvestorProcess(
      this.investorService.updateInvestor(updateInvestorDto, token),
      'Failed to update investor.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
