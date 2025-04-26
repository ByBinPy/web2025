import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class ElapsedTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      tap((data) => {
        const elapsed = Date.now() - start;
        response.setHeader('X-Elapsed-Time', `${elapsed}ms`);

        if (response.locals) {
          response.locals.elapsedTime = elapsed;
        }
      }),
    );
  }
}