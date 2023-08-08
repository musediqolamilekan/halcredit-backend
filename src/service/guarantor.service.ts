import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUp } from '../guarantors/schemas/signUp.schema';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class GuarantorStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(SignUp.name) private signupModel: Model<SignUp>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    const { sub } = payload;
    const user = await this.signupModel.findById(sub).select('-password');

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
