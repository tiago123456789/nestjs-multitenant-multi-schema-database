import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './tenant.entity';
import { Repository, Connection, EntityManager } from 'typeorm';
import { TenantDto } from './dtos/tenant.dto';
import { CredentialDto } from './dtos/credential.dto';
import { JwtService } from '@nestjs/jwt';
import { getTenantConnection, getTenantName } from './tenant.utils';

@Injectable()
export class TenantService {
  constructor(
    @InjectEntityManager() private entityManager: EntityManager,
    @InjectRepository(Tenant) private repository: Repository<Tenant>,
    private readonly jwtService: JwtService,
  ) {}

  getAll(): Promise<Tenant[]> {
    return this.repository.find({ where: {} });
  }

  async authenticate(credentialDto: CredentialDto): Promise<string> {
    const tenantName: string = getTenantName(credentialDto.name)

    const tenant: Tenant = await this.getByName(tenantName);
    if (!tenant) {
      throw new HttpException('Credential invalids!', 401);
    }

    return this.jwtService.sign({
      tenantId: credentialDto.name,
    }, { secret: process.env.JWT_SECRET });
  }

  async getByName(name): Promise<Tenant> {
    const tenant = await this.repository.find({ where: { name } });
    return tenant[0];
  }

  getById(id): Promise<Tenant> {
    return this.repository.findOne(id);
  }

  async create(tenantDto: TenantDto): Promise<Tenant> {
    const tenant = new Tenant();
    tenant.setName(`tenant_${tenantDto.name}`);
    await this.repository.insert(tenant);
    await this.entityManager.query(`CREATE SCHEMA IF NOT EXISTS "${tenant.getName()}"`)
    const connection = await getTenantConnection(tenantDto.name)
    connection.runMigrations()
    return tenant;
  }
}
