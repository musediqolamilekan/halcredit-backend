import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateIpaDto {
  @IsNotEmpty()
  @IsNumber()
  totalInvoiceAmount: number;

  @IsNotEmpty()
  @IsString()
  purchaseDuration: string;

  @IsNotEmpty()
  @IsString()
  averageProfitNaira: string;

  @IsNotEmpty()
  @IsNumber()
  averageProfitPtg: number;

  @IsNotEmpty()
  @IsString()
  salesDuration: string;
}

export class UpdateIpaDto {
  @IsNotEmpty()
  @IsString()
  repaymentPlan: string;
}
