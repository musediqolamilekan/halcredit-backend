import { IsNotEmpty, IsString } from 'class-validator';
export class ResetPassword {
    @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}