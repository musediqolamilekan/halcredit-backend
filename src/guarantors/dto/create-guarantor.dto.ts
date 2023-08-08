import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateGuarantorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  whatsappNumber: string;

  @IsOptional()
  guarantorToken: string;
}
