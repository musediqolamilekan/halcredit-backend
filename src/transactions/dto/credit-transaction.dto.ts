import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreditTransactionDto {
  @IsNotEmpty()
  @IsString()
  amount: string;

  @IsNotEmpty()
  @IsEnum(['credit disbursed', 'credit paid'])
  type: string;
}
