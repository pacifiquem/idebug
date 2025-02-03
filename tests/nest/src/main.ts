import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IDebugMiddleware, PerformanceInterceptor } from '@idebug/nest';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const debugMiddleware = app.get(IDebugMiddleware);
  app.use(debugMiddleware.use.bind(debugMiddleware));

  const performanceInterceptor = app.get(PerformanceInterceptor);
  app.useGlobalInterceptors(performanceInterceptor);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
