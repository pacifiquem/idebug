export interface IDebugConfig {
  DEBUG_MODE: boolean;
  modules?: Record<string, boolean>;
}

export type Module<T extends (...args: Parameters<T>) => ReturnType<T>> =
  Record<string, (...args: Parameters<T>) => ReturnType<T>>;
