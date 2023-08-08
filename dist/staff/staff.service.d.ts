import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
export declare class StaffService {
    create(createStaffDto: CreateStaffDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateStaffDto: UpdateStaffDto): string;
    remove(id: number): string;
}
