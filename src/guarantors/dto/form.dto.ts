import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumberString,
  Length,
} from 'class-validator';

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsNumberString({}, { message: 'BVN must be a number' })
  @Length(11, 11, { message: 'BVN must be exactly 11 digits' })
  @IsNotEmpty({ message: 'BVN should not be empty' })
  BVN: string;

  @IsString()
  @IsNotEmpty()
  workAddress: string;

  @IsString()
  @IsNotEmpty()
  workPlaceNumber: string;

  @IsString()
  @IsNotEmpty()
  workPlaceContact: string;

  @IsString()
  @IsOptional()
  proofOfAddress?: string;

  @IsString()
  @IsOptional()
  proofOfIdentification?: string;
}
