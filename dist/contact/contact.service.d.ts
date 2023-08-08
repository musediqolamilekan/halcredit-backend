import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto } from './dto/contact.dto';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/schemas/user.schema';
export declare class ContactService {
    private contactModel;
    private configService;
    private readonly logger;
    constructor(contactModel: Model<ContactDocument>, configService: ConfigService);
    create(createContactDto: CreateContactDto, user: Pick<User, '_id' | 'email'>): Promise<Contact>;
}
