import { DebugConfig } from '../config/DebugConfig';
import { ModuleDebugger } from './ModuleDebugger';
import { apiMiddleware } from './Middleware';
import { Logger } from './Logger';
import { PerformanceTracker } from './PerformanceTracker';

export class IDebug {
  static configure(config: Partial<typeof DebugConfig>): void {
    Object.assign(DebugConfig, config);
    console.log(`IDebug Configured:`, DebugConfig);
  }

  static logModule<T extends Record<string, (...args: any[]) => any>>(
    module: T,
    moduleName: string,
  ): T {
    return ModuleDebugger.applyLoggingToModule(module, moduleName);
  }

  static logFunction<T extends (...args: any[]) => any>(fn: T): T {
    return Logger.logFunctionIO(fn);
  }

  static middleware() {
    return apiMiddleware;
  }

  static trackPerformance() {
    return PerformanceTracker.trackPerformance;
  }
}
