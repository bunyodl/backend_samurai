import { Router } from 'express';
import { eventsRouter } from '@/modules/event/event.route';
import { venuesRouter } from '@/modules/venue/venue.route';
import { usersRouter } from '@/modules/user/user.route';

const apiRouter = Router();

apiRouter.use('/events', eventsRouter);
apiRouter.use('/venues', venuesRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;
