export interface IDebugConfig {
  DEBUG_MODE: boolean;
  REPORT_DATA: boolean; // true: sends data to a dashboard, false: logs to console
  MODULES?: Record<string, boolean>; // Modules to monitor
  PERFORMANCE?: boolean; // Enable/disable function performance tracking
  APP_NAME: string;
  APP_ID?: string;
  SESSION_ID?: string;
}

export const DebugConfig: IDebugConfig = {
  DEBUG_MODE: true,
  REPORT_DATA: false,
  MODULES: {},
  PERFORMANCE: false,
  APP_NAME: 'MyApp',
  APP_ID: 'default-app-id',
  SESSION_ID: 'default-session-id',
};
