import express from 'express';

import { userController } from '@/modules/user/user.controller';

import { validate } from '@/shared/middlewares/validate.middleware';

import { getUsersQuerySchema } from './schemas/endpoints/get-users.schema';

export const usersRouter = express.Router();

usersRouter.get(
  '/',
  validate({ query: getUsersQuerySchema }),
  async (req, res) => {
    await userController.getMany(req, res);
  },
);
