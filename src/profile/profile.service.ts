import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async create(dto: CreateProfileDto): Promise<Profile> {
    const createdProfile = new this.profileModel(dto);
    return createdProfile.save();
  }

  async findAll(): Promise<Profile[]> {
    return this.profileModel.find().exec();
  }

  async findOne(id: string): Promise<Profile> {
    return this.profileModel.findById(id).exec();
  }

  async update(id: string, dto: CreateProfileDto): Promise<Profile> {
    return this.profileModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<Profile> {
    return this.profileModel.findByIdAndDelete(id).exec();
  }
}
