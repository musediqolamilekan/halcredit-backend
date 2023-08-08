import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBankStatementDto } from './dto/bank_statement.dto';
import { BankStatements } from './schemas/bank_statements.schema';
import { BankStatementsService } from './bank_statements.service';
import { FileInterceptor } from '@nestjs/platform-express';
import createLogger from 'src/service/winston.service';

@Controller('bank-statements')
export class BankStatementsController {
  private readonly logger = createLogger(
    'bankStatement',
    'bankStatement-error.log',
  );
  constructor(private readonly bankStatementsService: BankStatementsService) {}

  private handleHttpException(
    error: Error,
    message: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    this.logger.error(message || error.message);
    throw new HttpException(message || error.message, statusCode);
  }

  private async handleStatementProcess(
    userPromise: Promise<any>,
    failureMessage: string,
  ) {
    try {
      return await userPromise;
    } catch (error) {
      this.handleHttpException(error, failureMessage);
    }
  }

  @Post('/request')
  @UseInterceptors(FileInterceptor('statement'))
  @UsePipes(new ValidationPipe())
  createOrUpdate(
    @Body() createBankStatementDto: CreateBankStatementDto,
    @UploadedFile() statement: Express.Multer.File,
    @Req() { user },
  ): Promise<BankStatements> {
    return this.handleStatementProcess(
      this.bankStatementsService.createOrUpdate(
        createBankStatementDto,
        user,
        statement,
      ),
      'Failed to upload statement.',
    );
  }
}
