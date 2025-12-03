import express from 'express';
import { eventsRouter } from './routes/events.route';
import { venuesRouter } from './entities/venue/venue.route';

export const app = express();

app.use('/events', eventsRouter);
app.use('/venues', venuesRouter);

app.get('/', (_req, res) => {
  res.json('Welcome to the Node.js pet project!!');
});
