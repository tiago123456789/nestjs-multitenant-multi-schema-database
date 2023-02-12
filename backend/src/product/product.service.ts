import { Inject, Injectable } from '@nestjs/common';
import { CONNECTION } from 'src/common/types/tenant';
import { Repository, Connection } from 'typeorm';
import { ProductDto } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {

  private repository: Repository<Product>;

  constructor(
    @Inject(CONNECTION) private connection: Connection,
  ) {
    this.repository = this.connection.getRepository(Product)
  }

  getAll(): Promise<Product[]> {
    return this.repository.find({
      where: {}
    });
  }

  async create(productDto: ProductDto): Promise<Product> {
    const product = new Product();
    product.setName(productDto.name);
    product.setImage(productDto.image);
    product.setPrice(productDto.price);

    await this.repository.insert(product);
    return product;
  }
}
