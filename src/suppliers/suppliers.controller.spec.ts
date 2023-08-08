import { Test, TestingModule } from '@nestjs/testing';
import { SuplliersController } from './suppliers.controller';
import { SuplliersService } from './suppliers.service';

describe('SuplliersController', () => {
  let controller: SuplliersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuplliersController],
      providers: [SuplliersService],
    }).compile();

    controller = module.get<SuplliersController>(SuplliersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
