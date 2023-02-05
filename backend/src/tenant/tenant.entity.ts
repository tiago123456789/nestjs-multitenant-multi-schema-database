import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  domain: string;

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getDomain() {
    return this.domain;
  }

  setDomain(domain) {
    this.domain = domain;
  }
}
