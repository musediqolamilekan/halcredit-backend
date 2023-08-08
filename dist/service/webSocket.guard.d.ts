import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenValidationService } from './tokenValidation.service';
export declare class WsJwtGuard implements CanActivate {
    private tokenValidationService;
    private readonly logger;
    constructor(tokenValidationService: TokenValidationService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
