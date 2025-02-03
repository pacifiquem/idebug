import { DebugConfig } from '../config/DebugConfig';

export function Loggable() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    if (!originalMethod) {
      return descriptor;
    }

    descriptor.value = function (
      ...args: Parameters<typeof originalMethod>
    ): ReturnType<typeof originalMethod> {
      const config = new DebugConfig();
      if (!config.DEBUG_MODE) {
        return originalMethod.apply(this, args);
      }

      console.log(`--- Loggable Method Start ---`);
      console.log(`Class: ${target.constructor.name}`);
      console.log(`Method: ${String(propertyKey)}`);
      console.log(`Arguments:`, args);

      const result = originalMethod.apply(this, args);

      console.log(`Result:`, result);
      console.log(`--- Loggable Method End ---`);
      return result;
    };

    return descriptor.value;
  };
}
