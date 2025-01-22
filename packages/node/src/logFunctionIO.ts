import { DebugConfig } from './config.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logFunctionIO<T extends (...args: any) => any>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> {
  return function (...args: Parameters<T>): ReturnType<T> {
    const debugConfig = DebugConfig;

    if (!debugConfig.DEBUG_MODE) {
      return fn(...args);
    }

    console.log(`--- Start Log ---`);
    console.log(`Function name: ${fn.name || 'Anonymous'}`);
    console.log(`Inputs:`, args);

    const result = fn(...args);

    if (result instanceof Promise) {
      return result
        .then((resolvedResult) => {
          console.log(`Output (Resolved):`, resolvedResult);
          console.log(`--- End Log --- \n \n`);
          return resolvedResult;
        })
        .catch((error) => {
          console.error(`Error:`, error);
          console.log(`--- End Log --- \n \n`);
          throw error;
        }) as ReturnType<T>;
    } else {
      console.log(`Output:`, result);
      console.log(`--- End Log --- \n \n`);
      return result;
    }
  };
}
