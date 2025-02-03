export class PerformanceTracker {
  static trackPerformance<T extends (...args: any[]) => any>(fn: T): T {
    return function (...args: any[]): any {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();
      console.log(
        `Function [${fn.name || 'Anonymous'}] took ${(end - start).toFixed(2)}ms.`,
      );
      return result;
    } as T;
  }
}
