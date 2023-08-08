import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { TokenValidationService } from './tokenValidation.service';
import createLogger from './winston.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  private readonly logger = createLogger('user', 'user.error.log');

  constructor(private tokenValidationService: TokenValidationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();

    const authorizationHeader =
      client.handshake.headers.authorization ||
      client.handshake.query.authorization ||
      client.handshake.headers['authorization'];

    if (!authorizationHeader) {
      this.logger.error('Authorization header not found');
      throw new WsException('Authorization header not found');
    }

    try {
      const sub =
        await this.tokenValidationService.getSubFromAuthorizationHeader(
          authorizationHeader,
        );
      if (!sub) {
        this.logger.error('User ID (sub) not found in token');
        throw new WsException('Unauthorized access');
      }

      client.userId = sub;
      this.logger.info(`Client authenticated with user ID: ${sub}`);
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to authenticate WebSocket connection: ${error.message}`,
      );
      throw new WsException('Unauthorized access');
    }
  }
}
