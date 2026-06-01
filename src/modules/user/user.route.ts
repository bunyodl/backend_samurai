import express from 'express';
import { userController } from '@/modules/user/user.controller';

export const usersRouter = express.Router();

usersRouter.get('/', async (req, res) => {
  await userController.getUsers(req, res);
});
