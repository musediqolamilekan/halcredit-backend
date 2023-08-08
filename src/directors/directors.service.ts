import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDirectorDto } from './dto/create-director.dto';
import { Directors, DirectorsDocument } from './schemas/directors.schema';
import { User } from '../user/schemas/user.schema';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { FileService } from '../service/file.service';
import createLogger from '../service/winston.service';

@Injectable()
export class DirectorService {
  private readonly logger = createLogger(
    'director-service',
    'director.error.log',
  );

  constructor(
    @InjectModel(Directors.name)
    private directorModel: Model<DirectorsDocument>,
    private readonly fileService: FileService,
  ) {}

  async create(
    createDirectorDto: CreateDirectorDto,
    user: Pick<User, '_id'>,
    photoFile?: Express.Multer.File,
  ): Promise<Directors> {
    try {
      if (photoFile) {
        const photoUrl = await this.fileService.uploadToS3(
          photoFile,
          'photoUrl',
        );
        createDirectorDto.photo = photoUrl;
      }
      const createdDirector = new this.directorModel({
        ...createDirectorDto,
        user: user._id,
      });
      return await createdDirector.save();
    } catch (error) {
      this.logger.error(`Failed to create director: ${error.message}`);
      throw error;
    }
  }

  async findAll(user: Pick<User, '_id'>): Promise<Directors[]> {
    try {
      return await this.directorModel.find({ user: user._id });
    } catch (error) {
      this.logger.error(`Failed to get directors: ${error.message}`);
      throw error;
    }
  }

  async getDirectorById(
    id: string,
    user: Pick<User, '_id'>,
  ): Promise<Directors> {
    try {
      return await this.directorModel.findOne({ _id: id, user: user._id });
    } catch (error) {
      this.logger.error(`Failed to get director: ${error.message}`);
      throw error;
    }
  }

  async updateDirector(
    id: string,
    updateDirectorDto: UpdateDirectorDto,
    user: Pick<User, '_id'>,
  ): Promise<Directors> {
    try {
      return await this.directorModel.findOneAndUpdate(
        { _id: id, user: user._id },
        updateDirectorDto,
        { new: true },
      );
    } catch (error) {
      this.logger.error(`Failed to update director: ${error.message}`);
      throw error;
    }
  }

  async deleteDirector(
    id: string,
    user: Pick<User, '_id'>,
  ): Promise<Directors> {
    try {
      return await this.directorModel.findOneAndRemove({
        _id: id,
        user: user._id,
      });
    } catch (error) {
      this.logger.error(`Failed to delete director: ${error.message}`);
      throw error;
    }
  }
}
