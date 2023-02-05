import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import RequestWithTenantId from 'src/common/contracts/request-with-tenantId.contract';
import { PrivateTenantInterceptor } from 'src/tenant/interceptors/private-tenant-interceptor';
import { PublicTenantInterceptor } from 'src/tenant/interceptors/public-tenant.interceptor';
import { ProductDto } from './product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseInterceptors(PublicTenantInterceptor)
  @Get('/products')
  getAllByTenantId(@Req() request: RequestWithTenantId): Promise<Product[]> {
    return this.productService.getAllByTenantId(request.tenantId);
  }

  @UseInterceptors(PrivateTenantInterceptor)
  @Post('/admin/products')
  create(@Req() request: RequestWithTenantId, @Body() productDto: ProductDto) {
    productDto.tenantId = request.tenantId;
    return this.productService.create(productDto);
  }

  @UseInterceptors(PrivateTenantInterceptor)
  @Get('/admin/products')
  getAllByTenantIdToShowAdmin(
    @Req() request: RequestWithTenantId,
  ): Promise<Product[]> {
    return this.productService.getAllByTenantId(request.tenantId);
  }
}
