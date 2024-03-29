import { Test, TestingModule } from '@nestjs/testing';
import { BankStatementsController } from './bank_statements.controller';
import { BankStatementsService } from './bank_statements.service';

describe('BankStatementsController', () => {
  let controller: BankStatementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankStatementsController],
      providers: [BankStatementsService],
    }).compile();

    controller = module.get<BankStatementsController>(BankStatementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
