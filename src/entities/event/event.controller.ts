import type { APIResponse } from '~/src/shared/types/api-response.type';
import type {
  GetEventsQueryParams,
  GetEventsResponse,
} from './contracts/get-events.contract';

import type { Request, Response } from 'express-serve-static-core';
import { HTTP_STATUS_CODES } from '~/src/shared/constants/http-codes';
import { eventService } from './event.service';

export class EventController {
  async getEvents(
    req: Request<{}, {}, {}, GetEventsQueryParams>,
    res: Response<APIResponse<GetEventsResponse>>,
  ) {
    const responseData = await eventService.getEvents(req.query);

    return res.status(HTTP_STATUS_CODES.OK).json({
      code: HTTP_STATUS_CODES.OK,
      message: 'Events fetched successfully',
      data: responseData,
      timestamp: Date.now(),
    });
  }
}

export const eventController = new EventController();
