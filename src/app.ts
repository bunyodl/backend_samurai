import express from 'express';

import apiV1Router from '@/modules/api-v1.router';

import { errorMiddleware } from '@/common/middlewares/error.middleware';

const app = express();

app.use(express.json()); // parse JSON body
app.use('/api/v1', apiV1Router);

app.get('/', (_req, res) => {
  res.json('Welcome to the Node.js pet project!!');
});

app.use(errorMiddleware);

export { app };
