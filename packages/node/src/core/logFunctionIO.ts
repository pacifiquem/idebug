import { DebugConfig } from '../config/DebugConfig';
import { DebugModes, EventTypes } from '../types';
import eventManager, { EventManager } from '../utils/EventManager';

const functionCallStack = new Map<string, string[]>();
const functionCallGraph = new Map<
  string,
  { parent: string | null; children: Set<string> }
>();
const functionCallCount = new Map<string, number>();

export function logFunctionIO<T extends (...args: any[]) => any>(fn: T): T {
  return async function (...args: any[]) {
    if (DebugConfig.DEBUG_MODE !== DebugModes.ON) {
      return fn;
    }

    const sessionId = EventManager.sessionIdentifier;
    const functionName = fn.name || 'Anonymous';
    const parentFunction =
      functionCallStack.get(sessionId)?.slice(-1)[0] || null;

    if (!functionCallStack.has(sessionId)) {
      functionCallStack.set(sessionId, []);
    }

    functionCallStack.get(sessionId)!.push(functionName);

    if (!functionCallGraph.has(functionName)) {
      functionCallGraph.set(functionName, {
        parent: parentFunction,
        children: new Set(),
      });
    }

    if (parentFunction) {
      functionCallGraph.get(parentFunction)!.children.add(functionName);
    }

    if (!functionCallCount.has(functionName)) {
      functionCallCount.set(functionName, 0);
    }
    functionCallCount.set(
      functionName,
      functionCallCount.get(functionName)! + 1,
    );

    const functionCallData: Record<string, any> = {
      debugInfo: {
        appName: DebugConfig.APP_NAME,
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
      },
      function: {
        info: {
          name: functionName,
          executionOrder: [...functionCallStack.get(sessionId)!],
          callGraph: functionCallGraph,
          loopDetected: functionCallCount.get(functionName)! > 1,
        },
        input: { args },
        output: null,
        error: null,
      },
    };

    const startTime = DebugConfig.PERFORMANCE ? performance.now() : null;

    try {
      const result = await (fn instanceof Promise
        ? fn
        : typeof fn === 'function' && fn.constructor.name === 'AsyncFunction'
          ? fn(...args)
          : Promise.resolve(fn(...args)));

      if (DebugConfig.PERFORMANCE && startTime) {
        const elapsed = performance.now() - (startTime as number);
        functionCallData.function.info.executionTime = elapsed;
      }

      functionCallData.function.output = result;
      eventManager.emit(EventTypes.FUNCTION_CALL, {
        sessionId,
        functionCallData,
      });
      return result;
    } catch (error) {
      functionCallData.function.error = error;
      throw error;
    } finally {
      functionCallStack.get(sessionId)!.pop();
    }
  } as T;
}
