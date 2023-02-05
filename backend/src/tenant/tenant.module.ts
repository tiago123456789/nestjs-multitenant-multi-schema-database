import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { Tenant } from './tenant.entity';
import { PublicTenantInterceptor } from './interceptors/public-tenant.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { PrivateTenantInterceptor } from './interceptors/private-tenant-interceptor';
import { ConfigService } from '@nestjs/config';

const cacheConfig = {
  store: 'memory',
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]),
    CacheModule.register(cacheConfig),
    JwtModule.registerAsync({
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get("JWT_SECRET")
        }
      },
      inject: [ConfigService]
    }),
  ],
  controllers: [TenantController],
  providers: [TenantService, PublicTenantInterceptor, PrivateTenantInterceptor],
  exports: [
    PublicTenantInterceptor,
    PrivateTenantInterceptor,
    TenantService,
    CacheModule.register(cacheConfig),
  ],
})
export class TenantModule { }
