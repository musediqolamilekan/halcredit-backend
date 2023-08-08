import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/service/jwt.guard';
import { CreditTransactionService } from './../services/creditTransaction.service';
import { CreditTransactionDto } from '../dto/credit-transaction.dto';
import createLogger from '../../service/winston.service';

@Controller('credit-transactions')
export class CreditTransactionController {
  private readonly logger = createLogger(
    'transaction',
    'transaction.error.log',
  );

  constructor(
    private readonly creditTransactionService: CreditTransactionService,
  ) {}

  private async handleTransactionProcess(
    transactionPromise: Promise<any>,
    failureMessage: string,
    statusCode: HttpStatus,
  ) {
    try {
      return await transactionPromise;
    } catch (error) {
      this.logger.error(failureMessage, error);
      throw new HttpException(error.message, statusCode);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(
    @Req() req,
    @Body(ValidationPipe) creditTransactionDto: CreditTransactionDto,
  ) {
    return this.handleTransactionProcess(
      this.creditTransactionService.create(creditTransactionDto, req.user),
      'Failed to create transaction.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get')
  async findAll(@Req() req) {
    return this.handleTransactionProcess(
      this.creditTransactionService.findAll(req.user),
      'Failed to fetch transactions.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async remove(@Req() req, @Param('id') id: string) {
    return this.handleTransactionProcess(
      this.creditTransactionService.remove(id, req.user),
      'Failed to remove transaction.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
