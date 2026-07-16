import express from 'express';

import { venueController } from '@/modules/venue/venue.controller';

import { validate } from '@/shared/middlewares/validate.middleware';

import { getVenuesQuerySchema } from './schemas/endpoints/get-venues.schema';

export const venuesRouter = express.Router();

venuesRouter.get(
  '/',
  validate({ query: getVenuesQuerySchema }),
  async (req, res) => {
    await venueController.getMany(req, res);
  },
);
