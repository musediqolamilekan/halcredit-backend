import { CreateMailinglistDto } from './dto/create-mailinglist.dto';
import { UpdateMailinglistDto } from './dto/update-mailinglist.dto';
import { MailingList } from './schemas/mailinglist.schema';
import * as mongoose from 'mongoose';
export declare class MailinglistService {
    private mailingListModel;
    constructor(mailingListModel: mongoose.Model<MailingList>);
    create(createMailinglistDto: CreateMailinglistDto): string;
    findAll(): Promise<MailingList[]>;
    findOne(id: number): string;
    update(id: number, updateMailinglistDto: UpdateMailinglistDto): string;
    remove(id: number): string;
}
