import { HTTP_STATUS } from '@/common/constants/http-codes';
import { HttpException } from '@/common/exceptions/http.exception';

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.UNAUTHORIZED, message);
    this.name = 'UnauthorizedException';
  }
}
