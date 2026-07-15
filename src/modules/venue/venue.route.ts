import express from 'express';

import { venueController } from '@/modules/venue/venue.controller';

export const venuesRouter = express.Router();

venuesRouter.get('/', async (req, res) => {
  await venueController.getVenues(req, res);
});
