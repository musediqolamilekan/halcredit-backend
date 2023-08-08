import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateEligibilityDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  amountExpected: number;

  @IsNotEmpty()
  timeInBusiness: number;

  @IsNotEmpty()
  monthlyIncome: number;
}
