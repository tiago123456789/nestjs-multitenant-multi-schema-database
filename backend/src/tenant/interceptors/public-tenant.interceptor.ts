import {
  CACHE_MANAGER,
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Tenant } from '../tenant.entity';
import { TenantService } from '../tenant.service';
import { Cache } from 'cache-manager';
import RequestWithTenantId from '../../common/contracts/request-with-tenantId.contract';

@Injectable()
export class PublicTenantInterceptor implements NestInterceptor {
  constructor(
    private tenantService: TenantService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: RequestWithTenantId = context.switchToHttp().getRequest();
    let origin = request.get('origin');
    origin = origin.replace(/(http:\/\/|https:\/\/)/, '');
    origin = origin.split(':')[0];

    const tenantId: string | undefined = await this.cacheManager.get(origin);
    if (tenantId) {
      request.tenantId = tenantId;
    } else {
      const tenant: Tenant = await this.tenantService.getByDomain(origin);
      if (tenant) {
        this.cacheManager.set(origin, tenant.getId(), 2 * 60);
        request.tenantId = tenant.getId();
      }
    }

    return next.handle();
  }
}
