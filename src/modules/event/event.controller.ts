import type {
  GetEventParams,
  GetEventResponse,
} from '@/modules/event/schemas/endpoints/get-event.schema';
import type {
  GetEventsQuery,
  GetEventsResponse,
} from '@/modules/event/schemas/endpoints/get-events.schema';
import { eventService } from '@/modules/event/event.service';
import { HTTP_STATUS_CODES } from '@/shared/constants/http-codes';
import type { ApiResponse } from '@/shared/types/api-response.type';
import type { Request, Response } from 'express';

export class EventController {
  async getAll(
    req: Request<{}, {}, {}, GetEventsQuery>,
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

  async getById(
    req: Request<GetEventParams>,
    res: Response<ApiResponse<GetEventResponse>>,
  ) {
    const responseData = await eventService.getEvent(req.params.eventId);

    return res.status(HTTP_STATUS_CODES.OK).json({
      code: HTTP_STATUS_CODES.OK,
      message: 'Event fetched successfully',
      data: responseData,
      timestamp: Date.now(),
    });
  }
}

export const eventController = new EventController();
