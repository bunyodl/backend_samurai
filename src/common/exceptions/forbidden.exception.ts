import { HTTP_STATUS } from '@/common/constants/http-codes';
import { HttpException } from '@/common/exceptions/http.exception';

export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.FORBIDDEN, message);
    this.name = 'ForbiddenException';
  }
}
