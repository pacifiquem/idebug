import {
  DynamicModule,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { IDebugService } from './core/IDebugService';
import { ModuleLogger } from './core/ModuleLogger';
import { IDebugConfig } from './types';
import { IDebugMiddleware } from './core/IDebugMiddleware';
import { PerformanceInterceptor } from './interceptors/PerformanceInterceptor';
import { DebugConfig } from './config/DebugConfig';

@Global()
@Module({})
export class IDebugModule implements NestModule {
  private static config: IDebugConfig = DebugConfig.prototype;

  static register(config: IDebugConfig | undefined): DynamicModule {
    if (!config) {
      throw new Error(
        '[idebug] No Debugging configurations provided, default ones will be used.',
      );
    }

    Object.assign(this.config, config);
    DebugConfig.updateConfig(config);

    if (this.config.DEBUG_MODE) {
      console.log(`[idebug] Debugging enabled.`);
    }

    return {
      module: IDebugModule,
      providers: [
        DebugConfig,
        IDebugService,
        ModuleLogger,
        IDebugMiddleware,
        PerformanceInterceptor,
      ],
      exports: [IDebugMiddleware, PerformanceInterceptor, DebugConfig],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IDebugMiddleware).forRoutes('*');
  }

  static getConfig(): IDebugConfig {
    return this.config;
  }
}
