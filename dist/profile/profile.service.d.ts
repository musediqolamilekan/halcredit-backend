import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
export declare class ProfileService {
    private profileModel;
    constructor(profileModel: Model<ProfileDocument>);
    create(dto: CreateProfileDto): Promise<Profile>;
    findAll(): Promise<Profile[]>;
    findOne(id: string): Promise<Profile>;
    update(id: string, dto: CreateProfileDto): Promise<Profile>;
    delete(id: string): Promise<Profile>;
}
