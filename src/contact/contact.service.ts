import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto } from './dto/contact.dto';
import * as nodemailer from 'nodemailer';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class ContactService {
  private readonly logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
      }),
    ],
  });

  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
    private configService: ConfigService,
  ) {}

  async create(
    createContactDto: CreateContactDto,
    user: Pick<User, '_id' | 'email'>,
  ): Promise<Contact> {
    const createdContact = new this.contactModel({
      ...createContactDto,
      user: user._id,
    });

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get<string>('HALCREDIT_EMAIL'),
        pass: this.configService.get<string>('HALCREDIT_PASS'),
      },
    });

    const mailOptions = {
      from: user.email,
      to: this.configService.get<string>('HALCREDIT_EMAIL'),
      subject: createdContact.topic,
      text: createdContact.message,
    };

    try {
      await transporter.sendMail(mailOptions);
      this.logger.info(`Email sent to: ${mailOptions.to}`);
      return await createdContact.save();
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`);
      throw error;
    }
  }
}
