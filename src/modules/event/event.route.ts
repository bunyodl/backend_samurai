import { Router } from 'express';
import { eventController } from '@/modules/event/event.controller';

export const eventsRouter = Router();

eventsRouter.get('/', async (req, res) => {
  await eventController.getEvents(req, res);
});

eventsRouter.get('/:eventId', async (req, res) => {
  await eventController.getEvent(req, res);
});

eventsRouter.post('/', (_req, res) => {
  res.send('The event has been created');
});
