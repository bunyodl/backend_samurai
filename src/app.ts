import express from 'express';
import { eventsRouter } from './routes/events.route';
import { venuesRouter } from './entities/venue/venue.route';
import { usersRouter } from './entities/user/user.route';

export const app = express();

app.use('/events', eventsRouter);
app.use('/venues', venuesRouter);
app.use('/users', usersRouter);

app.get('/', (_req, res) => {
  res.json('Welcome to the Node.js pet project!!');
});
