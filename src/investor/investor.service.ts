import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { Investor, InvestorDocument } from './schemas/investor.schema';
import * as ejs from 'ejs';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import createLogger from '../service/winston.service';

@Injectable()
export class InvestorService {
  private readonly logger = createLogger('investor', 'investor.error.log');

  constructor(
    @InjectModel(Investor.name)
    private investorModel: Model<InvestorDocument>,
    private configService: ConfigService,
  ) {}

  async getInvestorByToken(token: string): Promise<Investor> {
    try {
      const foundInvestor = await this.investorModel.findOne({ token });
      if (!foundInvestor) {
        throw new NotFoundException(`Investor with token ${token} not found`);
      }
      return foundInvestor;
    } catch (error) {
      this.logger.error(`Failed to get investor: ${error.message}`);
      throw error;
    }
  }

  async create(createInvestorDto: CreateInvestorDto): Promise<Investor> {
    const createdInvestor = new this.investorModel({
      ...createInvestorDto,
    });

    try {
      let savedInvestor = await createdInvestor.save();

      // Refetch the investor from the database to get the updated investor with the token
      savedInvestor = await this.investorModel.findById(savedInvestor._id);

      // Attempt to send an email to the user
      try {
        await this.sendEmail(
          savedInvestor.email,
          savedInvestor.firstName,
          savedInvestor._id,
        );
      } catch (error) {
        this.logger.error(`Failed to send email to user: ${error.message}`);
        // Handle or throw error if necessary
      }

      // Attempt to send an email to the admin

      return savedInvestor;
    } catch (error) {
      this.logger.error(`Failed to create investor: ${error.message}`);
      throw error;
    }
  }

  async sendEmail(
    email: string,
    firstName: string,
    investorId: string,
  ): Promise<void> {
    try {
      const verificationToken = crypto.randomBytes(10).toString('hex');

      const verificationLink = `${this.configService.get<string>(
        'INVEST_MAIL_LINK',
      )}?token=${verificationToken}`;

      await this.investorModel.findByIdAndUpdate(
        investorId,
        {
          token: verificationToken,
        },
        { new: true },
      );

      ejs.renderFile(
        path.resolve(process.cwd(), 'views', 'investEmail.ejs'),
        { firstName: firstName, verificationLink: verificationLink },
        async (err, data) => {
          if (err) {
            this.logger.error(
              `ejs.renderFile failed for email: ${JSON.stringify(email)}`,
              err,
            );
            throw new InternalServerErrorException(
              'Unable to send email verification email' + err,
            );
          } else {
            const transporter = nodemailer.createTransport({
              host: 'smtp.zoho.com',
              port: 465,
              secure: true,
              auth: {
                user: this.configService.get<string>('INVEST_MAIL_HOST'),
                pass: this.configService.get<string>('INVEST_MAIL_PASS'),
              },
            });

            const mailOptions = {
              from:
                '"Halcredit Investment" <' +
                this.configService.get<string>('INVEST_MAIL_HOST') +
                '>',
              to: email,
              bcc: this.configService.get<string>('INVEST_MAIL_HOST'),
              subject: 'Next Steps',
              html: data,
            };

            await transporter.sendMail(mailOptions);
            this.logger.info('Email sent: ' + email);
          }
        },
      );
    } catch (error) {
      this.logger.error(
        `sendVerificationToken failed for email: ${JSON.stringify(email)}`,
        error,
      );
      throw new InternalServerErrorException(
        'Failed to process send verification token request',
      );
    }
  }

  async updateInvestor(
    updateInvestorDto: UpdateInvestorDto,
    token: string,
  ): Promise<Investor> {
    try {
      const updatedInvestor = await this.investorModel.findOneAndUpdate(
        { token: token },
        updateInvestorDto,
        { new: true },
      );

      if (!updatedInvestor) {
        throw new NotFoundException(`No investor found with token ${token}`);
      }

      try {
        await this.sendEmailToAdmin(
          this.configService.get<string>('INVEST_MAIL_HOST'), // replace with the actual admin email
          updatedInvestor.email,
          updatedInvestor.firstName,
          updatedInvestor.lastName,
          updatedInvestor._id,
          updatedInvestor.amount,
          updatedInvestor.passportID,
          updatedInvestor.countryPassport,
          updatedInvestor.country,
          updatedInvestor.gender,
          updatedInvestor.dateOfBirth,
          updatedInvestor.phone,
        );
      } catch (error) {
        this.logger.error(
          `Failed to send account update notification email to admin: ${error.message}`,
        );
        // Handle or throw error if necessary
      }

      return updatedInvestor;
    } catch (error) {
      this.logger.error(`Failed to update investor: ${error.message}`);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Unexpected error occurred when updating the investor',
        );
      }
    }
  }

  async sendEmailToAdmin(
    adminEmail: string,
    newUserEmail: string,
    firstName: string,
    lastName: string,
    investorId: string,
    amount: string,
    passportID: string,
    countryPassport: string,
    country: string,
    gender: string,
    dateOfBirth: string,
    phone: string,
  ): Promise<void> {
    try {
      ejs.renderFile(
        path.resolve(process.cwd(), 'views', 'adminNotificationEmail.ejs'),
        {
          fullName: firstName + ' ' + lastName,
          email: newUserEmail,
          investorId,
          amount,
          passportID,
          countryPassport,
          country,
          gender,
          dateOfBirth,
          phone,
        },
        async (err, data) => {
          if (err) {
            this.logger.error(
              `ejs.renderFile failed for email: ${JSON.stringify(
                newUserEmail,
              )}`,
              err,
            );
            throw new InternalServerErrorException(
              'Unable to send new user notification email to admin',
            );
          } else {
            const transporter = nodemailer.createTransport({
              host: 'smtp.zoho.com',
              port: 465,
              secure: true,
              auth: {
                user: this.configService.get<string>('INVEST_MAIL_HOST'),
                pass: this.configService.get<string>('INVEST_MAIL_PASS'),
              },
            });

            const mailOptions = {
              from:
                '"Halcredit Investment" <' +
                this.configService.get<string>('INVEST_MAIL_HOST') +
                '>',
              to: adminEmail,
              subject: 'New User Notification',
              html: data,
            };

            await transporter.sendMail(mailOptions);
            this.logger.info(
              'New user notification email sent to admin: ' + adminEmail,
            );
          }
        },
      );
    } catch (error) {
      this.logger.error(
        `sendEmailToAdmin failed for email: ${JSON.stringify(newUserEmail)}`,
        error,
      );
      throw new InternalServerErrorException(
        'Failed to process send new user notification email request',
      );
    }
  }
}
