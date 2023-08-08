import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MailinglistService } from './mailinglist.service';
import { CreateMailinglistDto } from './dto/create-mailinglist.dto';
import { UpdateMailinglistDto } from './dto/update-mailinglist.dto';

@Controller('mailinglist')
export class MailinglistController {
  constructor(private readonly mailinglistService: MailinglistService) {}

  @Post()
  create(@Body() createMailinglistDto: CreateMailinglistDto) {
    return this.mailinglistService.create(createMailinglistDto);
  }

  @Get()
  findAll() {
    return this.mailinglistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailinglistService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMailinglistDto: UpdateMailinglistDto,
  ) {
    return this.mailinglistService.update(+id, updateMailinglistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailinglistService.remove(+id);
  }
}
