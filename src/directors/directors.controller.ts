import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { DirectorService } from './directors.service';
import { JwtAuthGuard } from '../service/jwt.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import createLogger from 'src/service/winston.service';

@Controller('directors')
export class DirectorController {
  private readonly logger = createLogger('directors', 'directors.error.log');

  constructor(private readonly directorService: DirectorService) {}

  private handleHttpException(
    error: Error,
    message: string,
    statusCode: HttpStatus,
  ) {
    this.logger.error(message, error);
    throw new HttpException(message || error.message, statusCode);
  }

  private async handleDirectorProcess(
    directorPromise: Promise<any>,
    failureMessage: string,
    statusCode: HttpStatus,
  ) {
    try {
      return await directorPromise;
    } catch (error) {
      this.handleHttpException(error, failureMessage, statusCode);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  async create(
    @UploadedFiles() files,
    @Req() req,
    @Body(ValidationPipe) createDirectorDto: CreateDirectorDto,
  ) {
    const photo: Express.Multer.File = files.photo ? files.photo[0] : null;

    return this.handleDirectorProcess(
      this.directorService.create(createDirectorDto, req.user, photo),
      'Failed to create director.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findAll(@Req() req) {
    return this.handleDirectorProcess(
      this.directorService.findAll(req.user),
      'Failed to get all directors.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findOne(@Param('id') id: string, @Req() req) {
    return this.handleDirectorProcess(
      this.directorService.getDirectorById(id, req.user),
      'Failed to get director.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Req() req,
    @Body(ValidationPipe) updateDirectorDto: UpdateDirectorDto,
  ) {
    return this.handleDirectorProcess(
      this.directorService.updateDirector(id, updateDirectorDto, req.user),
      'Failed to update director.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string, @Req() req) {
    return this.handleDirectorProcess(
      this.directorService.deleteDirector(id, req.user),
      'Failed to delete director.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
