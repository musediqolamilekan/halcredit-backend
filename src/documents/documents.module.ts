/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentsSchema } from './schemas/documents.schema';
import { FileService } from '../service/file.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Documents', schema: DocumentsSchema }]),],
  controllers: [DocumentsController],
  providers: [DocumentsService, FileService ]
})
export class DocumentsModule {}
