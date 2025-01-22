import { IDebugConfig } from './types.js';

export const DebugConfig: IDebugConfig = {
  DEBUG_MODE: true,
  modules: {},
};

export function setDebugConfig(config: Partial<IDebugConfig>): void {
  Object.assign(DebugConfig, config);
}
