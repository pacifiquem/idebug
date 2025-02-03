export type Module = Record<string, (...args: any[]) => any>;

export interface IDebugConfig {
  DEBUG_MODE: boolean;
  REPORT_DATA: boolean;
  MODULES?: Record<string, boolean>;
  PERFORMANCE?: boolean;
  APP_NAME: string;
  APP_ID: string;
  SESSION_ID: string;
}
