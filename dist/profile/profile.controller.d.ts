import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';
import { Profile } from './schemas/profile.schema';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    create(createProfileDto: CreateProfileDto): Promise<Profile>;
    findAll(): Promise<Profile[]>;
    findOne(id: string): Promise<Profile>;
    update(id: string, updateProfileDto: CreateProfileDto): Promise<Profile>;
    delete(id: string): Promise<Profile>;
}
