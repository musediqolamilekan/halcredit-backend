import { Test, TestingModule } from '@nestjs/testing';
import { TermSheetController } from './term_sheet.controller';
import { TermSheetService } from './term_sheet.service';

describe('TermSheetController', () => {
  let controller: TermSheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TermSheetController],
      providers: [TermSheetService],
    }).compile();

    controller = module.get<TermSheetController>(TermSheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
