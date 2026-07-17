import { HTTP_STATUS } from '@/common/constants/http-codes';
import { HttpException } from '@/common/exceptions/http.exception';

export class InternalServerErrorException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.INTERNAL_SERVER_ERROR, message);
    this.name = 'InternalServerErrorException';
  }
}
