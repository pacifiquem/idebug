export interface IDebugConfig {
  DEBUG_MODE: 'on' | 'off';
  PERFORMANCE?: boolean;
  APP_NAME: string | null;
}

export const DebugConfig: IDebugConfig = {
  DEBUG_MODE: 'on',
  APP_NAME: null,
};
