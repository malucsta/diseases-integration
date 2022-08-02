import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { formatError } from 'src/util/formatError';

export interface DiseaseError {
  sucess: boolean;
  message: string;
  code: string;
}

export class DiseaseResponseError extends Error {
  constructor(error: DiseaseError) {
    const internalMessage = `Unexpected error returned by the Disease service: `;
    error.message = internalMessage + formatError(error.message);
    super(`${JSON.stringify(error)}`);
  }
}

export class ClientRequestError extends Error {
  constructor(error: DiseaseError | string) {
    const internalMessage = `Unexpected error when trying to communicate to Disease.sh: `;

    const message =
      typeof error != 'string'
        ? internalMessage + formatError(error.message)
        : internalMessage + error;

    const requestError: DiseaseError = {
      sucess: false,
      message: message,
      code: error == 'ENOTFOUND' ? '500' : error.toString(),
    };

    super(`${JSON.stringify(requestError)}`);
  }
}

export class DiseaseUnexpectedResponseError extends Error {
  constructor(message: string) {
    message = formatError(message);
    super(message);
  }
}

export class ClientResponseException extends HttpException {
  constructor(error: string, code: number) {
    super(
      {
        sucess: false,
        message: JSON.parse(error).message
          ? JSON.parse(error).message
          : formatError(error),
        code: JSON.parse(error).code ? JSON.parse(error).code : 500,
      },
      code,
    );
  }
}

export class DiseaseResponseException extends HttpException {
  constructor(error: string, code: number) {
    super(
      {
        sucess: false,
        message: formatError(error),
        code: code,
      },
      Number(code),
    );
  }
}

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(async (error) => {
        if (error instanceof ClientRequestError)
          throw new ClientResponseException(
            JSON.stringify(JSON.parse(error.message).message),
            JSON.parse(error.message).code,
          );
        throw new DiseaseResponseException(
          JSON.stringify(JSON.parse(error.message).message),
          JSON.parse(error.message).code,
        );
      }),
    );
  }
}
