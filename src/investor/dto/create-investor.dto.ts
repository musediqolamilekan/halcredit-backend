import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateInvestorDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  gender: string;

  @IsNotEmpty()
  amount: string;

  @IsOptional()
  passportID: string;

  @IsOptional()
  countryPassport: string;

  @IsOptional()
  dateOfBirth: string;

  @IsOptional()
  role: string;

  @IsOptional()
  token: string;
}
