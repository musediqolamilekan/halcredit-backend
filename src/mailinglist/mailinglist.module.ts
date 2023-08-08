import { Module } from '@nestjs/common';
import { MailinglistService } from './mailinglist.service';
import { MailinglistController } from './mailinglist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MailingListSchema } from './schemas/mailinglist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MailingList', schema: MailingListSchema },
    ]),
  ],
  controllers: [MailinglistController],
  providers: [MailinglistService],
})
export class MailinglistModule {}
