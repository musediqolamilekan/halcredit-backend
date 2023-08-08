import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class TokenValidationService {
  getSubFromAuthorizationHeader(authorizationHeader: string): string {
    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException(
        'Token missing from Authorization header',
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY) as Record<
        string,
        any
      >;
      return decoded.sub;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
