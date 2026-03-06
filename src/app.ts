import express from 'express';
import apiV1Router from './entities/api-v1.router.js';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();

app.use('/api/v1', apiV1Router);

app.get('/', (_req, res) => {
  res.json('Welcome to the Node.js pet project!!');
});
