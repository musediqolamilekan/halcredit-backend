import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

@Injectable()
export class FileService {
  private readonly logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    defaultMeta: { service: 'file-service' },
    transports: [
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
      }),
    ],
  });
  s3;

  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
  }

  async uploadToS3(
    file: Express.Multer.File,
    filePath: string,
  ): Promise<string> {
    const validExtensions = ['jpg', 'jpeg', 'png', 'doc', 'pdf', 'xsl', 'doc'];
    const fileExtension = file.originalname.split('.').pop();

    if (!validExtensions.includes(fileExtension)) {
      throw new Error('Invalid file type. Only jpg, jpeg, and png are allowed');
    }

    const fileName = `${filePath}/${uuidv4()}.${fileExtension}`;
    const s3Params = {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Body: file.buffer,
      Key: fileName,
      ACL: 'public-read',
    };

    try {
      await this.s3.upload(s3Params).promise();

      return `https://${this.configService.get(
        'AWS_S3_BUCKET_NAME',
      )}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${fileName}`;
    } catch (error) {
      this.logger.error(
        `Failed to upload file to S3: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
