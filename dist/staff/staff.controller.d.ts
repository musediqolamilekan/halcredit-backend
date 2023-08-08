import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
export declare class StaffController {
    private readonly staffService;
    constructor(staffService: StaffService);
    create(createStaffDto: CreateStaffDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateStaffDto: UpdateStaffDto): string;
    remove(id: string): string;
}
