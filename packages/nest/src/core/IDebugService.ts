import { Injectable } from '@nestjs/common';
import { DebugConfig } from '../config/DebugConfig';

@Injectable()
export class IDebugService {
  constructor(private readonly config: DebugConfig) {}

  logFunctionIO<T extends (...args: any[]) => any>(fn: T): T {
    return ((...args: Parameters<T>): ReturnType<T> => {
      if (!this.config.DEBUG_MODE) {
        return fn(...args);
      }

      const start = this.config.PERFORMANCE ? performance.now() : null;

      console.log(`[${this.config.APP_NAME}] --- Function Start ---`);
      console.log(`Function: ${fn.name || 'Anonymous'}`);
      console.log(`Inputs:`, args);

      const result = fn(...args);

      if (this.config.PERFORMANCE && start !== null) {
        console.log(
          `Execution Time: ${(performance.now() - start).toFixed(2)}ms`,
        );
      }

      console.log(`Output:`, result);
      console.log(`--- Function End ---`);

      return result;
    }) as T;
  }
}
