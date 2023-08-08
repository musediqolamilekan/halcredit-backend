"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const uuid_1 = require("uuid");
const config_1 = require("@nestjs/config");
const winston = require("winston");
let FileService = exports.FileService = class FileService {
    constructor(configService) {
        this.configService = configService;
        this.logger = winston.createLogger({
            level: 'error',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            defaultMeta: { service: 'file-service' },
            transports: [
                new winston.transports.File({
                    filename: 'error.log',
                    level: 'error',
                }),
            ],
        });
        this.s3 = new AWS.S3({
            accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
            region: this.configService.get('AWS_REGION'),
        });
    }
    async uploadToS3(file, filePath) {
        const validExtensions = ['jpg', 'jpeg', 'png', 'doc', 'pdf', 'xsl', 'doc'];
        const fileExtension = file.originalname.split('.').pop();
        if (!validExtensions.includes(fileExtension)) {
            throw new Error('Invalid file type. Only jpg, jpeg, and png are allowed');
        }
        const fileName = `${filePath}/${(0, uuid_1.v4)()}.${fileExtension}`;
        const s3Params = {
            Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
            Body: file.buffer,
            Key: fileName,
            ACL: 'public-read',
        };
        try {
            await this.s3.upload(s3Params).promise();
            return `https://${this.configService.get('AWS_S3_BUCKET_NAME')}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${fileName}`;
        }
        catch (error) {
            this.logger.error(`Failed to upload file to S3: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FileService);
//# sourceMappingURL=file.service.js.map