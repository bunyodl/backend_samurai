import { type Request, Router } from 'express';

import { eventController } from '@/modules/event/event.controller';

import { validate } from '@/common/middlewares/validate.middleware';

import {
  type CreateEventRequestBody,
  createEventRequestBodySchema,
} from './schemas/endpoints/create-event.schema';
import {
  type GetEventParams,
  getEventParamsSchema,
} from './schemas/endpoints/get-event.schema';
import { getEventsQuerySchema } from './schemas/endpoints/get-events.schema';
import {
  type PatchEventParams,
  type PatchEventRequestBody,
  patchEventParamsSchema,
  patchEventRequestBodySchema,
} from './schemas/endpoints/patch-event.schema';

export const eventsRouter = Router();

eventsRouter.get(
  '/',
  validate({ query: getEventsQuerySchema }),
  async (req, res) => {
    await eventController.getMany(req, res);
  },
);

eventsRouter.get(
  '/:eventId',
  validate({ params: getEventParamsSchema }),
  async (req: Request<GetEventParams>, res) => {
    await eventController.getById(req, res);
  },
);

eventsRouter.post(
  '/',
  validate({ body: createEventRequestBodySchema }),
  async (req: Request<{}, {}, CreateEventRequestBody>, res) => {
    await eventController.create(req, res);
  },
);

eventsRouter.patch(
  '/:eventId',
  validate({
    params: patchEventParamsSchema,
    body: patchEventRequestBodySchema,
  }),
  async (req: Request<PatchEventParams, {}, PatchEventRequestBody>, res) => {
    await eventController.patch(req, res);
  },
);

eventsRouter.delete(
  '/:eventId',
  validate({ params: getEventParamsSchema }),
  async (req: Request<GetEventParams>, res) => {
    await eventController.delete(req, res);
  },
);
