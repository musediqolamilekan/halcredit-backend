import { Test, TestingModule } from '@nestjs/testing';
import { MailinglistController } from './mailinglist.controller';
import { MailinglistService } from './mailinglist.service';

describe('MailinglistController', () => {
  let controller: MailinglistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailinglistController],
      providers: [MailinglistService],
    }).compile();

    controller = module.get<MailinglistController>(MailinglistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
