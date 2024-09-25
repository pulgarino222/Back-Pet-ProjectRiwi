import { ExceptionFilter, Catch, ArgumentsHost, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';

// This decorator specifies which exceptions this filter will catch
@Catch(InternalServerErrorException, NotFoundException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException | NotFoundException, host: ArgumentsHost) {
    // Get the HTTP context
    const ctx = host.switchToHttp();
    // Extract the request and response objects
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    
    // Determine the status code based on the exception type
    const status = exception instanceof NotFoundException ? 404 : 500;
    // Get the error message or use a default one
    const message = exception.message || 'Internal server error';

    // Send a JSON response with error details
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
