import { Router } from 'express';
import { eventController } from './event.controller.js';

export const eventsRouter = Router();

/**
 * @openapi
 * /api/v1/events:
 *   get:
 *     summary: Retrieve a list of events
 *     description: Get a paginated and sortable list of events with optional search functionality
 *     tags:
 *       - events
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
 *         description: Search term to filter events by title or description
 *         example: "music festival"
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
 *           enum: [title, description, date, price]
 *         description: Field to sort by
 *         example: "date"
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetEventsResponse'
 *             examples:
 *               success:
 *                 value:
 *                   code: 200
 *                   message: "Events fetched successfully"
 *                   data:
 *                     events:
 *                       - id: 1
 *                         title: "Summer Music Festival"
 *                         description: "A fantastic outdoor music festival"
 *                         venueId: 1
 *                         organizerId: 1
 *                         date: "2024-07-15T18:00:00Z"
 *                         tags: ["music", "outdoor", "festival"]
 *                         price: 50.00
 *                     eventsCount: 25
 *                   timestamp: 1704067200000
 */
eventsRouter.get('/', async (req, res) => {
  await eventController.getEvents(req, res);
});

/**
 * @openapi
 * /api/v1/events/{eventId}:
 *   get:
 *     summary: Retrieve a single event by ID
 *     description: Get detailed information about a specific event
 *     tags:
 *       - events
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the event
 *         example: 1
 *     responses:
 *       200:
 *         description: Event details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetEventResponse'
 *             examples:
 *               success:
 *                 value:
 *                   code: 200
 *                   message: "Event fetched successfully"
 *                   data:
 *                     event:
 *                       id: 1
 *                       title: "Summer Music Festival"
 *                       description: "A fantastic outdoor music festival"
 *                       venueId: 1
 *                       organizerId: 1
 *                       date: "2024-07-15T18:00:00Z"
 *                       tags: ["music", "outdoor", "festival"]
 *                       price: 50.00
 *                   timestamp: 1704067200000
 */
eventsRouter.get('/:eventId', async (req, res) => {
  await eventController.getEvent(req, res);
});

/**
 * @openapi
 * /api/v1/events:
 *   post:
 *     summary: Create a new event
 *     description: Create a new event with the provided details
 *     tags:
 *       - events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventRequest'
 *           examples:
 *             event:
 *               value:
 *                 title: "Summer Music Festival"
 *                 description: "A fantastic outdoor music festival"
 *                 venueId: 1
 *                 organizerId: 1
 *                 date: "2024-07-15T18:00:00Z"
 *                 tags: ["music", "outdoor", "festival"]
 *                 price: 50.00
 *     responses:
 *       200:
 *         description: Event created successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             examples:
 *               success:
 *                 value: "The event has been created"
 */
eventsRouter.post('/', (_req, res) => {
  res.send('The event has been created');
});
