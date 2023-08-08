import { PartialType } from '@nestjs/mapped-types';
import { CreateMailinglistDto } from './create-mailinglist.dto';

export class UpdateMailinglistDto extends PartialType(CreateMailinglistDto) {}
