import eventManager from './EventManager';
import { EventTypes } from '../types';
import { Response } from 'express';

export function trackResponseChanges(res: Response) {
  return new Proxy(res, {
    set(target, prop, value) {
      eventManager.emit(EventTypes.RES_MODIFIED, {
        sessionId: (target as any).idebugSessionId,
        modifiedField: String(prop),
        newValue: value,
      });
      return Reflect.set(target, prop, value);
    },
  });
}
