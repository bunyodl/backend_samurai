import type { Request, Response } from 'express';
import { HTTP_STATUS } from '~/src/common/constants/http-codes';
import type { ApiResponse } from '~/src/common/types/api-response.type';

import { eventService } from '@/modules/event/event.service';
import type {
  GetEventParams,
  GetEventResponse,
} from '@/modules/event/schemas/endpoints/get-event.schema';
import type {
  GetEventsQuery,
  GetEventsResponse,
} from '@/modules/event/schemas/endpoints/get-events.schema';

export class EventController {
  async getMany(
    req: Request<{}, {}, {}, GetEventsQuery>,
    res: Response<ApiResponse<GetEventsResponse>>,
  ) {
    const responseData = await eventService.getMany(req.query);

    return res.status(HTTP_STATUS.OK).json({
      code: HTTP_STATUS.OK,
      message: 'Events fetched successfully',
      data: responseData,
      timestamp: Date.now(),
    });
  }

  async getById(
    req: Request<GetEventParams>,
    res: Response<ApiResponse<GetEventResponse>>,
  ) {
    const responseData = await eventService.getById(req.params.eventId);

    return res.status(HTTP_STATUS.OK).json({
      code: HTTP_STATUS.OK,
      message: 'Event fetched successfully',
      data: responseData,
      timestamp: Date.now(),
    });
  }
}

export const eventController = new EventController();
