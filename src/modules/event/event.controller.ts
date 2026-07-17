import type { Request, Response } from 'express';
import { NotFoundException } from '@/common/exceptions';
import { sendSuccess } from '@/common/libs/send-success';
import type { ApiResponse } from '@/common/types/api-response.type';

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
    const data = await eventService.getMany(req.query);
    return sendSuccess(res, { data });
  }

  async getById(
    req: Request<GetEventParams>,
    res: Response<ApiResponse<GetEventResponse>>,
  ) {
    const data = await eventService.getById(req.params.eventId);

    if (!data.event) {
      throw new NotFoundException('Event not found');
    }

    return sendSuccess(res, { data });
  }
}

export const eventController = new EventController();
