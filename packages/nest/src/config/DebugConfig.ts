import { Injectable } from '@nestjs/common';

@Injectable()
export class DebugConfig {
  DEBUG_MODE = true;
  REPORT_DATA = false; // Send data to a dashboard or log locally
  MODULES: Record<string, boolean> = {}; // Modules to monitor
  PERFORMANCE = false; // Enable/disable performance tracking
  APP_NAME = 'MyApp';
  APP_ID = 'default-app-id';
  SESSION_ID = 'default-session-id';

  static updateConfig(partialConfig: Partial<DebugConfig>): void {
    Object.assign(this, partialConfig);
  }
}
