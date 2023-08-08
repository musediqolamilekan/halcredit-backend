import { IsNotEmpty, IsEmail, IsUrl } from 'class-validator';

export class CreateContractDto {
  @IsNotEmpty()
  businessName: string;

  @IsNotEmpty()
  @IsEmail()
  companyEmail: string;

  @IsNotEmpty()
  businessType: string;

  @IsNotEmpty()
  startedDate: Date;

  @IsNotEmpty()
  officeNumber: string;

  @IsNotEmpty()
  streetName: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  @IsUrl()
  companyWebsite: string;

  @IsNotEmpty()
  industry: string;

  @IsNotEmpty()
  description: string;

  bankStatement?: string;

  supplierInvoice?: string;
}
