import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DebugConfig } from '../config/DebugConfig';

@Injectable()
export class IDebugMiddleware implements NestMiddleware {
  constructor(private readonly config: DebugConfig) {}
  use(req: Request, res: Response, next: NextFunction): void {
    if (!this.config.DEBUG_MODE) {
      return next();
    }

    console.log(`[${this.config.APP_NAME}] --- API Request ---`);
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`Headers:`, req.headers);
    console.log(`Body:`, req.body);

    const start = this.config.PERFORMANCE ? performance.now() : null;

    res.on('finish', () => {
      console.log(`Status Code: ${res.statusCode}`);
      if (this.config.PERFORMANCE && start !== null) {
        console.log(
          `Processing Time: ${(performance.now() - start).toFixed(2)}ms`,
        );
      }
      console.log(`--- API Request End ---`);
    });

    next();
  }
}
