import {
  Controller,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  HttpException,
  Request,
} from '@nestjs/common';

import { CreateEligibilityDto } from './dto/create-eligibility.dto';
import { EligibilityService } from './eligibility.service';
import { JwtAuthGuard } from '../service/jwt.guard';

@Controller('eligibility')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe())
export class EligibilityController {
  constructor(private readonly eligibilityService: EligibilityService) {}

  private handleHttpException(
    error: Error,
    message: string,
    status: HttpStatus,
  ) {
    throw new HttpException(message || error.message, status);
  }

  private async handleProcess(
    promise: Promise<any>,
    failureMessage: string,
    statusCode: HttpStatus,
  ) {
    try {
      return await promise;
    } catch (error) {
      this.handleHttpException(error, failureMessage, statusCode);
    }
  }

  @Post('/add')
  async create(
    @Request() { user },
    @Body() createEligibilityDto: CreateEligibilityDto,
  ) {
    const createProcess = async () =>
      await this.eligibilityService.create(createEligibilityDto, user);

    return await this.handleProcess(
      createProcess(),
      `eligibilityService create method failed with dto: ${JSON.stringify(
        createEligibilityDto,
      )}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
