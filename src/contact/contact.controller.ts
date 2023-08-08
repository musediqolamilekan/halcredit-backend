import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/contact.dto';
import { AuthGuard } from '@nestjs/passport';
import * as winston from 'winston';
import { User } from '../user/schemas/user.schema';

@Controller('contact')
export class ContactController {
  private readonly logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    defaultMeta: { service: 'contact-service' },
    transports: [
      new winston.transports.File({ filename: 'combine.log', level: 'error' }),
    ],
  });

  constructor(private readonly contactService: ContactService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/send')
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createContactDto: CreateContactDto,
    @Req() req: { user: Pick<User, '_id' | 'email'> },
  ) {
    try {
      return await this.contactService.create(createContactDto, req.user);
    } catch (error) {
      console.log(error);
      this.logger.error(
        `contactService create method failed with dto: ${JSON.stringify(
          createContactDto,
        )}`,
        error,
      );
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
