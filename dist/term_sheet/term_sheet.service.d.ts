import { CreateTermSheetDto } from './dto/create-term_sheet.dto';
import { UpdateTermSheetDto } from './dto/update-term_sheet.dto';
export declare class TermSheetService {
    create(createTermSheetDto: CreateTermSheetDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTermSheetDto: UpdateTermSheetDto): string;
    remove(id: number): string;
}
