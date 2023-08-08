import { Module } from '@nestjs/common';
import { GuarantorsService } from './guarantors.service';
import { GuarantorsController } from './guarantors.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { GuarantorSchema } from './schemas/guarantors.schema';
import { SignUpSchema } from './schemas/signUp.schema';
import { FileService } from 'src/service/file.service';
import { FormSchema } from './schemas/form.schema';
import { EmailService } from 'src/service/email.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Guarantor', schema: GuarantorSchema },
      { name: 'User', schema: UserSchema },
      { name: 'SignUp', schema: SignUpSchema },
      { name: 'Form', schema: FormSchema },
    ]),
    AuthModule,
  ],
  controllers: [GuarantorsController],
  providers: [GuarantorsService, FileService, EmailService],
  exports: [GuarantorsService],
})
export class GuarantorsModule {}
