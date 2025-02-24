import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import cors from 'cors'; // Import the cors package

import { expenseRouter, userRouter } from './routes';
import db from './db';
import { NODE_ENV, SERVER_PORT } from './constants';

const app = express();
app.use(express.json());
app.use(cors()); // Use the cors middleware

if (NODE_ENV === 'PRODUCTION') {
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../access.log'),
    { flags: 'a' }
  );
  app.use(morgan('combined', { stream: accessLogStream })); // Log to file
  app.use(morgan('combined')); // Log to console
} else {
  app.use(morgan('dev', { stream: process.stdout })); // Log to console in dev format
}

// TODO: a universal response middleware
// TODO: Add and helmet for security

app.use('/v1/user', userRouter);
app.use('/v1/expense', expenseRouter);

app.get('/', async (_, res) => {
  const dbStatus = await db.$queryRaw`SELECT 1`;
  res.json({
    db: dbStatus,
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
