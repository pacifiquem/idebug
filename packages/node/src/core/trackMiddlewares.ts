import { Application } from 'express';
import { DebugModes, EventTypes } from '../types';
import eventManager, { EventManager } from '../utils/EventManager';
import { DebugConfig } from '../config/DebugConfig';

export const trackMiddlewares = (app: Application) => {
  if (DebugConfig.DEBUG_MODE !== DebugModes.ON) {
    return app;
  }

  const originalUse = app.use.bind(app);
  app.use = (...args: any[]) => {
    const middlewareName = args[0]?.name || 'anonymousMiddleware';
    eventManager.emit(EventTypes.MIDDLEWARE_CALL, {
      sessionId: EventManager.sessionIdentifier,
      middlewareName,
    });
    return originalUse(...args);
  };
};
