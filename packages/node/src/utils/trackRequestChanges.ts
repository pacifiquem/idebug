import eventManager from './EventManager';
import { EventTypes } from '../types';
import { Request } from 'express';

const trackRequestChanges = (req: Request): Request => {
  return new Proxy(req, {
    set(target, prop, value) {
      eventManager.emit(EventTypes.REQ_MODIFIED, {
        sessionId: (target as any).idebugSessionId,
        modifiedField: String(prop),
        newValue: value,
      });
      return Reflect.set(target, prop, value);
    },
  });
};

export default trackRequestChanges;
