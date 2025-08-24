import express from 'express';
import { eventsRouter } from './routes/events.route';

export const app = express();

app.use('/events', eventsRouter);

app.get('/', (_req, res) => {
  res.json('Welcome to the Node.js pet project!!');
});
