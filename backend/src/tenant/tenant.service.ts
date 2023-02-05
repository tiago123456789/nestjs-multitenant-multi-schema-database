import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './tenant.entity';
import { Repository } from 'typeorm';
import { TenantDto } from './dtos/tenant.dto';
import { CredentialDto } from './dtos/credential.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant) private repository: Repository<Tenant>,
    private readonly jwtService: JwtService,
  ) {}

  getAll(): Promise<Tenant[]> {
    return this.repository.find({ where: {} });
  }

  async authenticate(credentialDto: CredentialDto): Promise<string> {
    const tenant: Tenant = await this.getByDomain(credentialDto.domain);
    if (!tenant) {
      throw new HttpException('Credential invalids!', 401);
    }

    return this.jwtService.sign({
      tenantId: tenant.getId(),
    });
  }

  async getByDomain(domain): Promise<Tenant> {
    const tenant = await this.repository.find({ where: { domain } });
    return tenant[0];
  }

  getById(id): Promise<Tenant> {
    return this.repository.findOne(id);
  }

  async create(tenantDto: TenantDto): Promise<Tenant> {
    const tenant = new Tenant();
    tenant.setDomain(tenantDto.domain);
    await this.repository.insert(tenant);
    return tenant;
  }
}
