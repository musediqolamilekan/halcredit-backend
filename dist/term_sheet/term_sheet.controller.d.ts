import { TermSheetService } from './term_sheet.service';
import { CreateTermSheetDto } from './dto/create-term_sheet.dto';
import { UpdateTermSheetDto } from './dto/update-term_sheet.dto';
export declare class TermSheetController {
    private readonly termSheetService;
    constructor(termSheetService: TermSheetService);
    create(createTermSheetDto: CreateTermSheetDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTermSheetDto: UpdateTermSheetDto): string;
    remove(id: string): string;
}
