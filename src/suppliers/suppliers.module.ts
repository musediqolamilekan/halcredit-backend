import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SuppliersSchema } from './schemas/suppliers.schema';
import { AuthModule } from '../auth/auth.module';
import { UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Suppliers', schema: SuppliersSchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuplliersModule {}
