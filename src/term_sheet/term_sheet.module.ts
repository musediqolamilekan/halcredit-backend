import { Module } from '@nestjs/common';
import { TermSheetService } from './term_sheet.service';
import { TermSheetController } from './term_sheet.controller';

@Module({
  controllers: [TermSheetController],
  providers: [TermSheetService]
})
export class TermSheetModule {}
