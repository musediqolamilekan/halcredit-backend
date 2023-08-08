import { Injectable } from '@nestjs/common';
import { CreateMailinglistDto } from './dto/create-mailinglist.dto';
import { UpdateMailinglistDto } from './dto/update-mailinglist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MailingList } from './schemas/mailinglist.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class MailinglistService {
  constructor(
    @InjectModel(MailingList.name)
    private mailingListModel: mongoose.Model<MailingList>,
  ) {}

  create(createMailinglistDto: CreateMailinglistDto) {
    return 'This action adds a new mailinglist';
  }

  async findAll(): Promise<MailingList[]> {
    const mailinglist = await this.mailingListModel.find();
    return mailinglist;
  }

  findOne(id: number) {
    return `This action returns a #${id} mailinglist`;
  }

  update(id: number, updateMailinglistDto: UpdateMailinglistDto) {
    return `This action updates a #${id} mailinglist`;
  }

  remove(id: number) {
    return `This action removes a #${id} mailinglist`;
  }
}
