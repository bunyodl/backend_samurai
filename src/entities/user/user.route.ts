import express from 'express';
import { userController } from './user.controller.js';

export const usersRouter = express.Router();

usersRouter.get('/', async (req, res) => {
  await userController.getUsers(req, res);
});
