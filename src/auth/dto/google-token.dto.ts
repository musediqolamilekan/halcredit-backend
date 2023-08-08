import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/schemas/user.schema';

export class GoogleTokenDto {
  @IsNotEmpty({ message: 'Last name is required' })
  googleToken: string;
}

export class GoogleUserResponse {
  user: User;
  accessToken: string;
}
