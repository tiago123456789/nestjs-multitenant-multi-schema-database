import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CredentialDto } from './dtos/credential.dto';
import { TenantDto } from './dtos/tenant.dto';
import { Tenant } from './tenant.entity';
import { TenantService } from './tenant.service';

@Controller('/tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get()
  getAll(@Req() req: Request): Promise<Tenant[]> {
    return this.tenantService.getAll();
  }

  @Post()
  create(@Body() tenantDto: TenantDto): Promise<Tenant> {
    return this.tenantService.create(tenantDto);
  }

  @Post('/auth')
  async authenticate(
    @Body() credentialDto: CredentialDto,
  ): Promise<{ [key: string]: any }> {
    const token = await this.tenantService.authenticate(credentialDto);
    return {
      token,
    };
  }
}
