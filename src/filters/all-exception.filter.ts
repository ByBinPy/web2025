import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus, HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

    console.error(exception);

    if (exception instanceof PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = 'Conflict: Unique constraint violation';
          break;
        default:
          message = `Database error: ${exception.message}`;
          status = HttpStatus.INTERNAL_SERVER_ERROR;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'object'
          ? (exceptionResponse as any).message
          : exceptionResponse;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}