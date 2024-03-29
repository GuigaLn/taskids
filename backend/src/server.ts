import dotenv from 'dotenv';
import 'reflect-metadata';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import AppError from './errors/AppError';
import routes from './routes';

import './database';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError ) {
    console.log(err);
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});


app.listen(process.env.PORT || 3333, () => {
  console.log(' ✅ Server Started On Port ', process.env.PORT || 3333);
});
