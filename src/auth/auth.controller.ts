import {
  Body,
  Controller,
  Post,
  Get,
  ValidationPipe,
  HttpStatus,
  HttpException,
  Headers,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignUpDto,
  LoginDto,
  ForgotPassword,
  ResetPassword,
  VerifyEmailDto,
} from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../service/jwt.guard';
import createLogger from 'src/service/winston.service';

@Controller('auth')
export class AuthController {
  private readonly logger = createLogger('auth', 'auth.error.log');

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private handleHttpException(
    error: Error,
    message: string,
    statusCode: HttpStatus,
  ) {
    this.logger.error(message, error);
    throw new HttpException(message || error.message, statusCode);
  }

  private async handleAuthProcess(
    authPromise: Promise<any>,
    failureMessage: string,
    statusCode: HttpStatus,
  ) {
    try {
      return await authPromise;
    } catch (error) {
      this.handleHttpException(error, failureMessage, statusCode);
    }
  }

  @Post('/signup')
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    return this.handleAuthProcess(
      this.authService.signUp(signUpDto),
      'Registration failed.',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post('/login')
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.handleAuthProcess(
      this.authService.login(loginDto),
      'Login failed.',
      HttpStatus.UNAUTHORIZED,
    );
  }

  @Post('/forgot-password')
  async forgotPassword(
    @Body(ValidationPipe) forgotPasswordDto: ForgotPassword,
  ) {
    return this.handleAuthProcess(
      this.authService.forgotPassword(forgotPasswordDto.email),
      'Forgot password failed.',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post('/reset-password')
  async resetPassword(@Body(ValidationPipe) resetPasswordDto: ResetPassword) {
    return this.handleAuthProcess(
      this.authService.resetPassword(
        resetPasswordDto.token,
        resetPasswordDto.newPassword,
      ),
      'Password reset failed.',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Get('/verify-email')
  async verifyEmail(@Query(ValidationPipe) verifyEmailDto: VerifyEmailDto) {
    return this.handleAuthProcess(
      this.authService.verifyEmail(verifyEmailDto.userId, verifyEmailDto.token),
      'Email verification failed.',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post('/delete-account')
  async deleteAccount(@Body('email') email: string) {
    return this.handleAuthProcess(
      this.authService.deleteAccount(email),
      'Account deletion failed.',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post('/google/auth')
  async handleGoogleSignIn(@Headers('authorization') authorization: string) {
    if (!authorization) {
      throw new HttpException(
        'No authorization header found',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const googleToken = authorization.replace('Bearer ', '');

    return this.handleAuthProcess(
      this.authService.findOrCreateFromGoogle({ googleToken }),
      'Google Sign In failed.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/resend-token')
  async resendToken(@Req() req) {
    return this.handleAuthProcess(
      this.authService.resendToken(req.user),
      'Resending token failed.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
