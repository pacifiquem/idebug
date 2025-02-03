import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DebugConfig } from '../config/DebugConfig';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  constructor(private readonly config: DebugConfig) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (!this.config.DEBUG_MODE || !this.config.PERFORMANCE) {
      return next.handle();
    }

    const start = performance.now();
    return next.handle().pipe(
      tap(() => {
        const elapsed = performance.now() - start;
        console.log(
          `[${this.config.APP_NAME}] Request took ${elapsed.toFixed(2)}ms.`,
        );
      }),
    );
  }
}
