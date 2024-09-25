import { ExceptionFilter, Catch, ArgumentsHost, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(InternalServerErrorException, NotFoundException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException | NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof NotFoundException ? 404 : 500;
    const message = exception.message || 'Internal server error';

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message,
      });
  }
}
