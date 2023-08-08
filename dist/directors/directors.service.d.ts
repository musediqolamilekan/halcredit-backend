/// <reference types="multer" />
import { Model } from 'mongoose';
import { CreateDirectorDto } from './dto/create-director.dto';
import { Directors, DirectorsDocument } from './schemas/directors.schema';
import { User } from '../user/schemas/user.schema';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { FileService } from '../service/file.service';
export declare class DirectorService {
    private directorModel;
    private readonly fileService;
    private readonly logger;
    constructor(directorModel: Model<DirectorsDocument>, fileService: FileService);
    create(createDirectorDto: CreateDirectorDto, user: Pick<User, '_id'>, photoFile?: Express.Multer.File): Promise<Directors>;
    findAll(user: Pick<User, '_id'>): Promise<Directors[]>;
    getDirectorById(id: string, user: Pick<User, '_id'>): Promise<Directors>;
    updateDirector(id: string, updateDirectorDto: UpdateDirectorDto, user: Pick<User, '_id'>): Promise<Directors>;
    deleteDirector(id: string, user: Pick<User, '_id'>): Promise<Directors>;
}
