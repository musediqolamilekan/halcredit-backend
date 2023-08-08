import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class StoreUserTransactionPinDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 6, { message: 'Pin must be exactly 6 digits' })
  @Matches(/^[0-9]+$/, { message: 'Pin must contain only digits' })
  pin: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 6, { message: 'Confirm pin must be exactly 6 digits' })
  @Matches(/^[0-9]+$/, { message: 'Confirm pin must contain only digits' })
  confirmPin: string;
}
