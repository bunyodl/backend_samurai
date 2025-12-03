import express from 'express';
import { eventsRouter } from './entities/event/event.route.js';
import { usersRouter } from './entities/user/user.route.js';
import { venuesRouter } from './entities/venue/venue.route.js';

export const app = express();

app.use('/events', eventsRouter);
app.use('/venues', venuesRouter);
app.use('/users', usersRouter);

app.get('/', (_req, res) => {
  res.json('Welcome to the Node.js pet project!!');
});
