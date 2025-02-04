import { Request, Response, NextFunction } from 'express';
import { DebugConfig } from '../config/DebugConfig';
import eventManager, { EventManager } from '../utils/EventManager';
import { DebugModes, EventTypes } from '../types';
import trackRequestChanges from '../utils/trackRequestChanges';
import { trackResponseChanges } from '../utils/trackResponseChanges';

export const apiLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (DebugConfig.DEBUG_MODE !== DebugModes.ON) {
    return next();
  }

  const sessionId = EventManager.sessionIdentifier;

  req['idebugSessionId'] = sessionId;
  res['idebugSessionId'] = sessionId;

  req = trackRequestChanges(req);
  res = trackResponseChanges(res);

  const sessionReqData: Record<string, any> = {
    debugInfo: {
      appName: DebugConfig.APP_NAME,
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      sessionId,
    },
    request: {
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      body: req.body || null,
      params: req.params || {},
      query: req.query || {},
      cookies: req.cookies || {},
    },
  };

  const startTime = DebugConfig.PERFORMANCE ? performance.now() : null;
  if (startTime) {
    sessionReqData.request.startTime = startTime;
  }

  eventManager.emit(EventTypes.REQ, { sessionId, sessionReqData });

  res.on('finish', () => {
    const elapsed = startTime ? performance.now() - startTime : null;

    const sessionResData: Record<string, any> = {
      response: {
        statusCode: res.statusCode,
        headers: res.getHeaders(),
        elapsedTimeMs: elapsed || null,
        timestamp: new Date().toISOString(),
      },
    };

    if ((res as any).data) {
      sessionResData.response.body = (res as any).data;
    }

    eventManager.emit(EventTypes.RES, { sessionId, sessionResData });
  });

  next();
};
