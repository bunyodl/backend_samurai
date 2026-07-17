import express from 'express';
import { validate } from '@/common/middlewares/validate.middleware';

import { venueController } from '@/modules/venue/venue.controller';

import { getVenuesQuerySchema } from './schemas/endpoints/get-venues.schema';

export const venuesRouter = express.Router();

venuesRouter.get(
  '/',
  validate({ query: getVenuesQuerySchema }),
  async (req, res) => {
    await venueController.getMany(req, res);
  },
);
