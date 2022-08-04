import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { APIException } from '../exceptions/api.exception';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(async (error) => {
        const message = JSON.stringify(JSON.parse(error.message).message);
        const code = JSON.parse(error.message).code;
        if (error instanceof APIException)
          throw new APIException(message, code);

        throw new InternalServerErrorException(error);
      }),
    );
  }
}
