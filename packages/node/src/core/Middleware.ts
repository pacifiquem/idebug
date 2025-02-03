import { Request, Response, NextFunction } from 'express';
import { DebugConfig } from '../config/DebugConfig';

export const apiMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!DebugConfig.DEBUG_MODE) {
    return next();
  }

  console.log(`[${DebugConfig.APP_NAME}] --- API Request ---`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`Headers:`, req.headers);
  console.log(`Body:`, req.body);

  const startTime = DebugConfig.PERFORMANCE ? performance.now() : null;

  res.on('finish', () => {
    console.log(`Status Code: ${res.statusCode}`);
    if (DebugConfig.PERFORMANCE) {
      const elapsed = performance.now() - (startTime as number);
      console.log(`Processing Time: ${elapsed.toFixed(2)}ms`);
    }
    console.log(`--- API Request End ---`);
  });

  next();
};
