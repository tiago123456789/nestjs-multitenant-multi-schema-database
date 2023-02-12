import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TenantModule } from 'src/tenant/tenant.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TenantModule,
    JwtModule.registerAsync({
      useFactory(config: ConfigService) {
        return {
          secret: config.get("JWT_SECRET")
        }
      },
      inject: [ConfigService]
    })
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
