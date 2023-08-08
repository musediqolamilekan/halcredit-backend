import { Test, TestingModule } from '@nestjs/testing';
import { TermSheetService } from './term_sheet.service';

describe('TermSheetService', () => {
  let service: TermSheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TermSheetService],
    }).compile();

    service = module.get<TermSheetService>(TermSheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
