import {
  CACHE_MANAGER,
  CallHandler,
  ExecutionContext,
  HttpException,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import RequestWithTenantId from '../../common/contracts/request-with-tenantId.contract';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PrivateTenantInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: RequestWithTenantId = context.switchToHttp().getRequest();
    let accessToken = request.get('Authorization');
    if (!accessToken) {
      throw new HttpException('You need informed accessToken', 403);
    }

    try {
      accessToken = accessToken.replace('Bearer ', '');
      const payload = this.jwtService.verify(accessToken);
      request.tenantId = payload.tenantId;
      return next.handle();
    } catch (error) {
      throw new HttpException('You need informed accessToken valid', 403);
    }
  }
}
