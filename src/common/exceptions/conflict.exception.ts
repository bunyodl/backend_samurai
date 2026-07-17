import { HTTP_STATUS } from '@/common/constants/http-codes';
import { HttpException } from '@/common/exceptions/http.exception';

export class ConflictException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.CONFLICT, message);
    this.name = 'ConflictException';
  }
}
