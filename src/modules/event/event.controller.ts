import type { Request, Response } from 'express';

import { eventService } from '@/modules/event/event.service';
import type { CreateEventRequestBody } from '@/modules/event/schemas/endpoints/create-event.schema';
import type { DeleteEventResponse } from '@/modules/event/schemas/endpoints/delete-event.schema';
import type {
  GetEventParams,
  GetEventResponse,
} from '@/modules/event/schemas/endpoints/get-event.schema';
import type {
  GetEventsQuery,
  GetEventsResponse,
} from '@/modules/event/schemas/endpoints/get-events.schema';
import type {
  PatchEventParams,
  PatchEventRequestBody,
  PatchEventResponse,
} from '@/modules/event/schemas/endpoints/patch-event.schema';

import { HTTP_STATUS } from '@/common/constants/http-codes';
import { sendSuccess } from '@/common/libs/send-success';
import type { ApiResponse } from '@/common/types/api-response.type';

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
    return sendSuccess(res, { data });
  }

  async create(
    req: Request<{}, {}, CreateEventRequestBody>,
    res: Response<ApiResponse<GetEventResponse>>,
  ) {
    const createdEvent = await eventService.create(req.body);

    return sendSuccess(res, {
      data: { event: createdEvent },
      code: HTTP_STATUS.CREATED,
    });
  }

  async patch(
    req: Request<PatchEventParams, {}, PatchEventRequestBody>,
    res: Response<ApiResponse<PatchEventResponse>>,
  ) {
    const updatedEvent = await eventService.patch(
      req.params.eventId,
      req.body,
    );

    return sendSuccess(res, { data: { updatedEvent } });
  }

  async delete(
    req: Request<GetEventParams>,
    res: Response<ApiResponse<DeleteEventResponse>>,
  ) {
    const deletedEvent = await eventService.delete(req.params.eventId);
    return sendSuccess(res, { data: { deletedEvent } });
  }
}

export const eventController = new EventController();
