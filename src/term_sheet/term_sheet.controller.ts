import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TermSheetService } from './term_sheet.service';
import { CreateTermSheetDto } from './dto/create-term_sheet.dto';
import { UpdateTermSheetDto } from './dto/update-term_sheet.dto';

@Controller('term-sheet')
export class TermSheetController {
  constructor(private readonly termSheetService: TermSheetService) {}

  @Post()
  create(@Body() createTermSheetDto: CreateTermSheetDto) {
    return this.termSheetService.create(createTermSheetDto);
  }

  @Get()
  findAll() {
    return this.termSheetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.termSheetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTermSheetDto: UpdateTermSheetDto) {
    return this.termSheetService.update(+id, updateTermSheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.termSheetService.remove(+id);
  }
}
