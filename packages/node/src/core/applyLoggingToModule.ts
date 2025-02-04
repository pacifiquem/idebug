import { DebugConfig } from '../config/DebugConfig';
import { DebugModes } from '../types';
import { logFunctionIO } from './logFunctionIO';

export function applyLoggingToModule<
  T extends Record<string, (...args: any[]) => any>,
>(module: T, moduleName: string): T {
  if (DebugConfig.DEBUG_MODE !== DebugModes.ON) {
    return module;
  }

  const wrappedModule: T = { ...module };

  for (const fnName in module) {
    if (typeof module[fnName] === 'function') {
      wrappedModule[fnName] = logFunctionIO(module[fnName]);
    }
  }

  console.log(`Module [${moduleName}] registered for logging.`);
  return wrappedModule;
}
