import { HTTP_STATUS } from '@/common/constants/http-codes';
import { HttpException } from '@/common/exceptions/http.exception';

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.NOT_FOUND, message);
    this.name = 'NotFoundException';
  }
}
