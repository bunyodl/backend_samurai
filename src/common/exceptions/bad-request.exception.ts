import { HTTP_STATUS } from '@/common/constants/http-codes';
import { HttpException } from '@/common/exceptions/http.exception';

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.BAD_REQUEST, message);
    this.name = 'BadRequestException';
  }
}
