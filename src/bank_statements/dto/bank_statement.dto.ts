import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBankStatementDto {
  @IsString()
  @IsNotEmpty()
  statement: string;
}

export class UpdateBankStatementDto extends PartialType(
  CreateBankStatementDto,
) {}
