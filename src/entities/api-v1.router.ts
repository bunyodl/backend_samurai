import { Router } from 'express';
import { eventsRouter } from './event/event.route.js';
import { venuesRouter } from './venue/venue.route.js';
import { usersRouter } from './user/user.route.js';

const apiRouter = Router();

apiRouter.use('/events', eventsRouter);
apiRouter.use('/venues', venuesRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;
