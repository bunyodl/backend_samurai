import { eventController } from '@/modules/event/event.controller';
import { validate } from '@/shared/middlewares/validate.middleware';
import { Router, type Request } from 'express';
import { getEventsQuerySchema } from './schemas/endpoints/get-events.schema';
import {
  getEventParamsSchema,
  type GetEventParams,
} from './schemas/endpoints/get-event.schema';
import { createEventRequestSchema } from './schemas/endpoints/create-event.schema';

export const eventsRouter = Router();

eventsRouter.get(
  '/',
  validate({ query: getEventsQuerySchema }),
  async (req, res) => {
    await eventController.getAll(req, res);
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
  validate({ body: createEventRequestSchema }),
  (_req, res) => {
    res.send('The event has been created');
  },
);
