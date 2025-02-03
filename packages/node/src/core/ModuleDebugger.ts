import { Logger } from './Logger';

export class ModuleDebugger {
  static applyLoggingToModule<
    T extends Record<string, (...args: any[]) => any>,
  >(module: T, moduleName: string): T {
    const wrappedModule: T = { ...module };

    for (const fnName in module) {
      if (typeof module[fnName] === 'function') {
        wrappedModule[fnName] = Logger.logFunctionIO(module[fnName]);
      }
    }

    console.log(`Module [${moduleName}] registered for logging.`);
    return wrappedModule;
  }
}
