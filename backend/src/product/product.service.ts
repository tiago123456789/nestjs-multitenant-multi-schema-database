import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantService } from 'src/tenant/tenant.service';
import { Repository } from 'typeorm';
import { ProductDto } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
    private tenantService: TenantService,
  ) {}

  getAllByTenantId(tenantId: string): Promise<Product[]> {
    return this.repository.find({
      where: {
        tenant: { id: tenantId },
      },
    });
  }

  async create(productDto: ProductDto): Promise<Product> {
    const product = new Product();
    product.setName(productDto.name);
    product.setImage(productDto.image);
    product.setPrice(productDto.price);

    const tenant = await this.tenantService.getById(productDto.tenantId);
    if (!tenant) {
      throw new HttpException('Tenant not found', 404);
    }

    product.setTenant(tenant);
    await this.repository.insert(product);
    return product;
  }
}
