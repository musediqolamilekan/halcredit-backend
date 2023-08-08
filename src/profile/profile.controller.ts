import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';
import { Profile } from './schemas/profile.schema';

@Controller('Profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('/create')
  async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(createProfileDto);
  }

  @Get('/getAll')
  async findAll(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Profile> {
    return this.profileService.findOne(id);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Profile> {
    return this.profileService.delete(id);
  }
}
