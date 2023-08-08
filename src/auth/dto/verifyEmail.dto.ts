import { IsNotEmpty } from 'class-validator';

export class VerifyEmailDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  token: string;
}
