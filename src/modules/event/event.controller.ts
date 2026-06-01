import type { ApiResponse } from '@/shared/types/api-response.type';
import type {
  GetEventsQueryParams,
  GetEventsResponse,
} from '@/modules/event/contracts/get-events.contract';

import type { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '@/shared/constants/http-codes';
import { eventService } from '@/modules/event/event.service';
import type {
  GetEventParams,
  GetEventResponse,
} from '@/modules/event/contracts/get-event.contract';

export class EventController {
  async getEvents(
    req: Request<{}, {}, {}, GetEventsQueryParams>,
    res: Response<ApiResponse<GetEventsResponse>>,
  ) {
    const responseData = await eventService.getEvents(req.query);

    return res.status(HTTP_STATUS_CODES.OK).json({
      code: HTTP_STATUS_CODES.OK,
      message: 'Events fetched successfully',
      data: responseData,
      timestamp: Date.now(),
    });
  }
  async getEvent(
    req: Request<GetEventParams>,
    res: Response<ApiResponse<GetEventResponse>>,
  ) {
    const responseData = await eventService.getEvent(
      Number(req.params.eventId),
    );

    return res.status(HTTP_STATUS_CODES.OK).json({
      code: HTTP_STATUS_CODES.OK,
      message: 'Event fetched successfully',
      data: responseData,
      timestamp: Date.now(),
    });
  }
}

export const eventController = new EventController();
