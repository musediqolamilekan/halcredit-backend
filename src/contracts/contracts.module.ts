import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractsSchema } from './schemas/contracts.schema';
import { AuthModule } from '../auth/auth.module';
import { UserSchema } from '../user/schemas/user.schema';
import { FileService } from '../service/file.service';

//eeswu
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Contracts', schema: ContractsSchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [ContractsController],
  providers: [ContractsService, FileService],
})
export class ContractsModule {}
