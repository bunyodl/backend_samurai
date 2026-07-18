import express, { type Request } from 'express';

import { userController } from '@/modules/user/user.controller';

import { validate } from '@/common/middlewares/validate.middleware';

import {
  type CreateUserRequestBody,
  createUserRequestBodySchema,
} from './schemas/endpoints/create-user.schema';
import {
  type GetUserParams,
  getUserParamsSchema,
} from './schemas/endpoints/get-user.schema';
import { getUsersQuerySchema } from './schemas/endpoints/get-users.schema';

export const usersRouter = express.Router();

usersRouter.get(
  '/',
  validate({ query: getUsersQuerySchema }),
  async (req, res) => {
    await userController.getMany(req, res);
  },
);

usersRouter.get(
  '/:userId',
  validate({ params: getUserParamsSchema }),
  async (req: Request<GetUserParams>, res) => {
    await userController.getById(req, res);
  },
);

usersRouter.post(
  '/',
  validate({ body: createUserRequestBodySchema }),
  async (req: Request<{}, {}, CreateUserRequestBody>, res) => {
    await userController.create(req, res);
  },
);

usersRouter.delete(
  '/:userId',
  validate({ params: getUserParamsSchema }),
  async (req: Request<GetUserParams>, res) => {
    await userController.delete(req, res);
  },
);
