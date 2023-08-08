import { Injectable } from '@nestjs/common';
import { CreateTermSheetDto } from './dto/create-term_sheet.dto';
import { UpdateTermSheetDto } from './dto/update-term_sheet.dto';

@Injectable()
export class TermSheetService {
  create(createTermSheetDto: CreateTermSheetDto) {
    return 'This action adds a new termSheet';
  }

  findAll() {
    return `This action returns all termSheet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} termSheet`;
  }

  update(id: number, updateTermSheetDto: UpdateTermSheetDto) {
    return `This action updates a #${id} termSheet`;
  }

  remove(id: number) {
    return `This action removes a #${id} termSheet`;
  }
}
