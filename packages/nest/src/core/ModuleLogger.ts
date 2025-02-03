import { Injectable } from '@nestjs/common';
import { IDebugService } from './IDebugService';

@Injectable()
export class ModuleLogger {
  constructor(private readonly debugService: IDebugService) {}

  applyLoggingToModule<T extends Record<string, (...args: any[]) => any>>(
    module: T,
    moduleName: string,
  ): T {
    const wrappedModule = { ...module };
    for (const fnName in module) {
      if (typeof module[fnName] === 'function') {
        wrappedModule[fnName] = this.debugService.logFunctionIO(module[fnName]);
      }
    }
    console.log(`Module [${moduleName}] registered for logging.`);
    return wrappedModule;
  }
}
