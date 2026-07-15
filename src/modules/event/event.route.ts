import { eventController } from '@/modules/event/event.controller';
import { getEventsQuerySchema } from '@/modules/event/schemas/endpoints/get-events.schema';
import { validate } from '@/shared/middlewares/validate.middleware';
import { Router } from 'express';

export const eventsRouter = Router();

eventsRouter.get(
  '/',
  validate({ query: getEventsQuerySchema }),
  async (req, res) => {
    await eventController.getEvents(req, res);
  },
);

eventsRouter.get('/:eventId', async (req, res) => {
  await eventController.getEvent(req, res);
});

eventsRouter.post('/', (_req, res) => {
  res.send('The event has been created');
});
