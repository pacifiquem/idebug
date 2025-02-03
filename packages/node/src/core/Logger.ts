import { DebugConfig } from '../config/DebugConfig';

export class Logger {
  static logFunctionIO<T extends (...args: any[]) => any>(fn: T): T {
    return function (...args: any[]): any {
      if (!DebugConfig.DEBUG_MODE) {
        return fn(...args);
      }

      const startTime = DebugConfig.PERFORMANCE ? performance.now() : null;

      console.log(`[${DebugConfig.APP_NAME}] --- Function Start ---`);
      console.log(`Function: ${fn.name || 'Anonymous'}`);
      console.log(`Inputs:`, args);

      const result = fn(...args);

      if (DebugConfig.PERFORMANCE) {
        const elapsed = performance.now() - (startTime as number);
        console.log(`Execution Time: ${elapsed.toFixed(2)}ms`);
      }

      console.log(`Output:`, result);
      console.log(`--- Function End ---`);

      return result;
    } as T;
  }
}
