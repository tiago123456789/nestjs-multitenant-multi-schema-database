import { Tenant } from 'src/tenant/tenant.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column()
  private name: string;

  @Column({ type: 'decimal', scale: 2 })
  private price: number;

  @Column()
  private image: string;

  @ManyToOne((type) => Tenant, (tenant) => tenant.id)
  @JoinColumn({
    name: 'tenant_id',
  })
  private tenant: Tenant;

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getImage(): string {
    return this.image;
  }

  getTenant(): Tenant {
    return this.tenant;
  }

  setName(name: string) {
    this.name = name;
  }

  setPrice(price: number) {
    this.price = price;
  }

  setImage(image) {
    this.image = image;
  }

  setTenant(tenant: Tenant) {
    this.tenant = tenant;
  }
}
