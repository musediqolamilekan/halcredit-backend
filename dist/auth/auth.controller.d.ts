import { AuthService } from './auth.service';
import { SignUpDto, LoginDto, ForgotPassword, ResetPassword, VerifyEmailDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private authService;
    private configService;
    private readonly jwtService;
    private readonly logger;
    constructor(authService: AuthService, configService: ConfigService, jwtService: JwtService);
    private handleHttpException;
    private handleAuthProcess;
    signUp(signUpDto: SignUpDto): Promise<any>;
    login(loginDto: LoginDto): Promise<any>;
    forgotPassword(forgotPasswordDto: ForgotPassword): Promise<any>;
    resetPassword(resetPasswordDto: ResetPassword): Promise<any>;
    verifyEmail(verifyEmailDto: VerifyEmailDto): Promise<any>;
    deleteAccount(email: string): Promise<any>;
    handleGoogleSignIn(authorization: string): Promise<any>;
    resendToken(req: any): Promise<any>;
}
