import express from 'express';
import apiV1Router from '@/modules/api-v1.router';

const app = express();

app.use('/api/v1', apiV1Router);

app.get('/', (_req, res) => {
  res.json('Welcome to the Node.js pet project!!');
});

export { app };
