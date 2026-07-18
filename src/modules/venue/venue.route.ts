import express, { type Request } from 'express';

import { validate } from '@/common/middlewares/validate.middleware';

import { venueController } from '@/modules/venue/venue.controller';

import {
  type CreateVenueRequestBody,
  createVenueRequestBodySchema,
} from './schemas/endpoints/create-venue.schema';
import {
  type GetVenueParams,
  getVenueParamsSchema,
} from './schemas/endpoints/get-venue.schema';
import { getVenuesQuerySchema } from './schemas/endpoints/get-venues.schema';
import {
  type PatchVenueParams,
  type PatchVenueRequestBody,
  patchVenueParamsSchema,
  patchVenueRequestBodySchema,
} from './schemas/endpoints/patch-venue.schema';

export const venuesRouter = express.Router();

venuesRouter.get(
  '/',
  validate({ query: getVenuesQuerySchema }),
  async (req, res) => {
    await venueController.getMany(req, res);
  },
);

venuesRouter.get(
  '/:venueId',
  validate({ params: getVenueParamsSchema }),
  async (req: Request<GetVenueParams>, res) => {
    await venueController.getById(req, res);
  },
);

venuesRouter.post(
  '/',
  validate({ body: createVenueRequestBodySchema }),
  async (req: Request<{}, {}, CreateVenueRequestBody>, res) => {
    await venueController.create(req, res);
  },
);

venuesRouter.patch(
  '/:venueId',
  validate({
    params: patchVenueParamsSchema,
    body: patchVenueRequestBodySchema,
  }),
  async (req: Request<PatchVenueParams, {}, PatchVenueRequestBody>, res) => {
    await venueController.patch(req, res);
  },
);

venuesRouter.delete(
  '/:venueId',
  validate({ params: getVenueParamsSchema }),
  async (req: Request<GetVenueParams>, res) => {
    await venueController.delete(req, res);
  },
);
