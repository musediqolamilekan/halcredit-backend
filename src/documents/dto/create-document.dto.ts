import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  businessReg: string;

  @IsString()
  @IsNotEmpty()
  tin: string;

  certificate?: string;

  utilityBill?: string;
}
