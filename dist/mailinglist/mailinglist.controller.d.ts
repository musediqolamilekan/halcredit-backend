import { MailinglistService } from './mailinglist.service';
import { CreateMailinglistDto } from './dto/create-mailinglist.dto';
import { UpdateMailinglistDto } from './dto/update-mailinglist.dto';
export declare class MailinglistController {
    private readonly mailinglistService;
    constructor(mailinglistService: MailinglistService);
    create(createMailinglistDto: CreateMailinglistDto): string;
    findAll(): Promise<import("./schemas/mailinglist.schema").MailingList[]>;
    findOne(id: string): string;
    update(id: string, updateMailinglistDto: UpdateMailinglistDto): string;
    remove(id: string): string;
}
