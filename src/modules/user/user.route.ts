import express from 'express';
import { validate } from '~/src/common/middlewares/validate.middleware';

import { userController } from '@/modules/user/user.controller';

import { getUsersQuerySchema } from './schemas/endpoints/get-users.schema';

export const usersRouter = express.Router();

usersRouter.get(
  '/',
  validate({ query: getUsersQuerySchema }),
  async (req, res) => {
    await userController.getMany(req, res);
  },
);
