import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { tenantMiddleware } from './tenant/tenant.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  app.use(tenantMiddleware)
  await app.listen(3000);
}
bootstrap();
