import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schemas/user.schema';
import { DirectorService } from './directors.service';
import { DirectorController } from './directors.controller';
import { DirectorsSchema } from './schemas/directors.schema';
import { AuthModule } from '../auth/auth.module';
import { FileService } from '../service/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Directors', schema: DirectorsSchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [DirectorController],
  providers: [DirectorService, FileService],
})
export class DirectorsModule {}
