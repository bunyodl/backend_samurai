import express from 'express';
import { mockFetch } from '@/shared/libs/mock-fetch';

export const eventsRouter = express.Router();

eventsRouter.get('/', async (_req, res) => {
  const data = await mockFetch('~/db/events.json').then((data) => {
    return JSON.parse(data);
  });
  res.json(data.slice(0, 3));
});

eventsRouter.post('/', (_req, res) => {
  res.send('The event has been created');
});
