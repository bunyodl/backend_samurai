import express from 'express';
import { venueController } from './venue.controller.js';

export const venuesRouter = express.Router();

venuesRouter.get('/', async (req, res) => {
  await venueController.getVenues(req, res);
});
