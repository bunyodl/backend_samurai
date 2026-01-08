import express from 'express';
import { userController } from './user.controller.js';

export const usersRouter = express.Router();

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Get a paginated and sortable list of users with optional search functionality
 *     tags:
 *       - users
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
 *         description: Search term to filter users by name or email
 *         example: "john"
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
 *           enum: [name, email]
 *         description: Field to sort by
 *         example: "name"
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUsersResponse'
 *             examples:
 *               success:
 *                 value:
 *                   code: 200
 *                   message: "Users fetched successfully"
 *                   data:
 *                     users:
 *                       - id: 1
 *                         name: "John Doe"
 *                         email: "john.doe@example.com"
 *                         role: "organizer"
 *                     usersCount: 15
 *                   timestamp: 1704067200000
 */
usersRouter.get('/', async (req, res) => {
  await userController.getUsers(req, res);
});
