import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/contact.dto';
import { User } from '../user/schemas/user.schema';
export declare class ContactController {
    private readonly contactService;
    private readonly logger;
    constructor(contactService: ContactService);
    create(createContactDto: CreateContactDto, req: {
        user: Pick<User, '_id' | 'email'>;
    }): Promise<import("./schemas/contact.schema").Contact>;
}
