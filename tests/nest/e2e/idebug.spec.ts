import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Server } from 'http';
import { describe, beforeAll, afterAll, it, expect, vi } from 'vitest';

import { AppModule as ApplicationModule } from '../src/app.module';
import supertest from 'supertest';
import {
  IDebugMiddleware,
  IDebugModule,
  PerformanceInterceptor,
} from '@idebug/nest';
import { AppService } from '../src/app.service';
import { Loggable } from '@idebug/nest';
import { AppDebugConfig } from '../src/config/idebug.config';

describe('idebug nest', () => {
  let app: INestApplication;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
      providers: [AppService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    server = app.getHttpServer();
    request = supertest(
      server,
    ) as unknown as supertest.SuperTest<supertest.Test>;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should apply configurations', async () => {
    expect(IDebugModule.getConfig()).toBeDefined();
    expect(IDebugModule.getConfig()).toMatchObject(AppDebugConfig);
  });

  it('should return 200 on GET /', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('should apply IDebugMiddleware', async () => {
    const debugMiddleware = app.get(IDebugMiddleware);
    expect(debugMiddleware).toBeDefined();
  });

  it('should apply PerformanceInterceptor', async () => {
    const performanceInterceptor = app.get(PerformanceInterceptor);
    expect(performanceInterceptor).toBeDefined();
  });

  it('should execute the Loggable decorator when calling the method', () => {
    const decoratorSpy = vi.fn();

    const MockLoggable = () => {
      return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
      ) => {
        decoratorSpy();
        return Loggable()(target, propertyKey, descriptor);
      };
    };

    class TestClass {
      @MockLoggable()
      testMethod() {
        return 'Hello';
      }
    }

    const instance = new TestClass();
    instance.testMethod();

    expect(decoratorSpy).toHaveBeenCalled();
  });
});
