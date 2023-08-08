import { PartialType } from '@nestjs/mapped-types';
import { CreateTermSheetDto } from './create-term_sheet.dto';

export class UpdateTermSheetDto extends PartialType(CreateTermSheetDto) {}
