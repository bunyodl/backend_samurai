import express from 'express';
import { eventController } from './event.controller';

export const eventsRouter = express.Router();

eventsRouter.get('/', async (req, res) => {
  await eventController.getEvents(req, res);
});

eventsRouter.post('/', (_req, res) => {
  res.send('The event has been created');
});
