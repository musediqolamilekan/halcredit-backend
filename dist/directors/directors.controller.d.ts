import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { DirectorService } from './directors.service';
export declare class DirectorController {
    private readonly directorService;
    private readonly logger;
    constructor(directorService: DirectorService);
    private handleHttpException;
    private handleDirectorProcess;
    create(files: any, req: any, createDirectorDto: CreateDirectorDto): Promise<any>;
    findAll(req: any): Promise<any>;
    findOne(id: string, req: any): Promise<any>;
    update(id: string, req: any, updateDirectorDto: UpdateDirectorDto): Promise<any>;
    delete(id: string, req: any): Promise<any>;
}
