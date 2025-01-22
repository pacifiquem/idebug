import { Module } from './types.js';
import { logFunctionIO } from './logFunctionIO.js';
import { DebugConfig } from './config.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyLoggingToModule<T extends (...args: any) => any>(
  module: Module<T>,
  moduleName: string,
): Module<T> {
  const wrappedModule: Module<T> = {};

  const debugConfig = DebugConfig;

  const isModuleDebuggingEnabled =
    debugConfig.modules?.[moduleName] ?? debugConfig.DEBUG_MODE;

  for (const key in module) {
    if (typeof module[key] === 'function') {
      wrappedModule[key] = isModuleDebuggingEnabled
        ? logFunctionIO(module[key])
        : module[key];
    } else {
      wrappedModule[key] = module[key];
    }
  }

  return wrappedModule;
}
