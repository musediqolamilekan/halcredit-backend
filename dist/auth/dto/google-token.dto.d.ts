import { User } from 'src/user/schemas/user.schema';
export declare class GoogleTokenDto {
    googleToken: string;
}
export declare class GoogleUserResponse {
    user: User;
    accessToken: string;
}
