import { HTTP_STATUS } from '@/common/constants/http-codes';
import { HttpException } from '@/common/exceptions/http.exception';

export class NotImplementedException extends HttpException {
  constructor(message = 'Not implemented') {
    super(HTTP_STATUS.NOT_IMPLEMENTED, message);
    this.name = 'NotImplementedException';
  }
}
