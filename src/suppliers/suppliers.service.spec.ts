import { Test, TestingModule } from '@nestjs/testing';
import { SuplliersService } from './suppliers.service';

describe('SuplliersService', () => {
  let service: SuplliersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuplliersService],
    }).compile();

    service = module.get<SuplliersService>(SuplliersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
