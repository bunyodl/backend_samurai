import { Router } from 'express';
import { eventsRouter } from './event/event.route';
import { venuesRouter } from './venue/venue.route';
import { usersRouter } from './user/user.route';

const apiRouter = Router();

apiRouter.use('/events', eventsRouter);
apiRouter.use('/venues', venuesRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;
