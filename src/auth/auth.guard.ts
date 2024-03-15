import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from '../config/jwt.constants';
  import { Request } from 'express';
import { UserPermissionsService } from '../userPermissions/userPermissions.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private userPermissionsService: UserPermissionsService,
      private jwtService: JwtService
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
        request['permissions'] = await this.userPermissionsService.getAllPermissions(payload)
      } catch (e) {
        console.error('exception', e, jwtConstants.secret)
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }