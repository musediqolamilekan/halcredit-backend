// src/utils/sendEmail.ts
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import createLogger from '../service/winston.service';
import { InternalServerErrorException } from '@nestjs/common';

const configService = new ConfigService();
const logger = createLogger('email', 'email-error.log');

export async function sendEmail(
  email: string,
  templateName: string,
  subject: string,
  templateVariables: any,
) {
  try {
    ejs.renderFile(
      path.resolve(process.cwd(), 'views', templateName + '.ejs'),
      templateVariables,
      async (err, data) => {
        if (err) {
          logger.error(`ejs.renderFile failed for email: ${email}`, err);
          throw new InternalServerErrorException(
            'Unable to send ' + subject + ' email',
          );
        } else {
          const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true,
            auth: {
              user: configService.get<string>('HALCREDIT_EMAIL'),
              pass: configService.get<string>('HALCREDIT_PASS'),
            },
          });

          const mailOptions = {
            from:
              '"Halcredit" <' +
              configService.get<string>('HALCREDIT_EMAIL') +
              '>',
            to: email,
            subject: subject,
            html: data,
          };

          await transporter.sendMail(mailOptions);
          logger.info('Email sent: ' + email);
        }
      },
    );
  } catch (error) {
    logger.error(`sendEmail failed for email: ${email}`, error);
    throw new InternalServerErrorException(
      'Failed to send ' + subject + ' email',
    );
  }
}
