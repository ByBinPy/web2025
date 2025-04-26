import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as crc32 from 'crc-32';

@Injectable()
export class EtagInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const response = context.switchToHttp().getResponse();
        const etag = crc32.str(JSON.stringify(data)).toString(16);
        response.setHeader('ETag', etag);
        response.setHeader('Cache-Control', 'public, max-age=3600');
        return data;
      }),
    );
  }
}