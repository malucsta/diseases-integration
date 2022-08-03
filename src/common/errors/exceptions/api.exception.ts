import { HttpException } from '@nestjs/common';
import { formatError } from 'src/common/util/formatError';

export class APIException extends HttpException {
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
