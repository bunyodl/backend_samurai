import express from 'express';
import { venueController } from './venue.controller.js';

export const venuesRouter = express.Router();

/**
 * @openapi
 * /api/v1/venues:
 *   get:
 *     summary: Retrieve a list of venues
 *     description: Get a paginated and sortable list of venues with optional search functionality
 *     tags:
 *       - venues
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of items per page
 *         example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter venues by name, city, or country
 *         example: "convention center"
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *         example: "asc"
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, capacity, city, country]
 *         description: Field to sort by
 *         example: "capacity"
 *     responses:
 *       200:
 *         description: A list of venues
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetVenuesResponse'
 *             examples:
 *               success:
 *                 value:
 *                   code: 200
 *                   message: "Venues fetched successfully"
 *                   data:
 *                     venues:
 *                       - id: 1
 *                         name: "Grand Convention Center"
 *                         location:
 *                           city: "New York"
 *                           country: "USA"
 *                         capacity: 5000
 *                     venuesCount: 10
 *                   timestamp: 1704067200000
 */
venuesRouter.get('/', async (req, res) => {
  await venueController.getVenues(req, res);
});
