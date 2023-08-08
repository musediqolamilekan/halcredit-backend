import { IsNotEmpty, IsDateString, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  customerEmail: string;

  @IsNotEmpty()
  @IsString()
  billFrom: string;

  @IsNotEmpty()
  @IsString()
  billTo: string;

  @IsNotEmpty()
  @IsString()
  billingAddress: string;

  @IsNotEmpty()
  @IsDateString()
  issuedOn: Date;

  @IsNotEmpty()
  @IsDateString()
  dueOn: Date;

  @IsNotEmpty()
  @IsString()
  description: string;
}
