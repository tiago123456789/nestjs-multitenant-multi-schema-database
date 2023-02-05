import { Request } from 'express';

interface RequestWithTenantId extends Request {
  tenantId: string | undefined;
}

export default RequestWithTenantId;
