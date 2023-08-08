/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
export declare class FileService {
    private configService;
    private readonly logger;
    s3: any;
    constructor(configService: ConfigService);
    uploadToS3(file: Express.Multer.File, filePath: string): Promise<string>;
}
