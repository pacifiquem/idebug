import { DebugConfig } from '../config/DebugConfig';
import { apiLogger } from './apiLogger';
import { applyLoggingToModule } from './applyLoggingToModule';
import { logFunctionIO } from './logFunctionIO';
import { trackMiddlewares } from './trackMiddlewares';

class Debugger {
  private static instance: Debugger;

  static get shared(): Debugger {
    if (!this.instance) {
      this.instance = new Debugger();
    }
    return this.instance;
  }

  public configure(config: Partial<typeof DebugConfig>): void {
    Object.assign(DebugConfig, config);
    console.log(`IDebug Configured:`, DebugConfig);
  }

  public logModule<T extends Record<string, (...args: any[]) => any>>(
    module: T,
    moduleName: string,
  ): T {
    return applyLoggingToModule(module, moduleName);
  }

  public logFunction<T extends (...args: any[]) => any>(fn: T): T {
    return logFunctionIO(fn);
  }

  public apiLogger() {
    return apiLogger;
  }

  public middlewareLogger() {
    return trackMiddlewares;
  }
}

export default Debugger.shared;
