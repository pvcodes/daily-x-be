import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

import { expenseRouter, userRouter } from './routes';
import db from './db';
import { NODE_ENV, SERVER_PORT } from './constants';

const app = express();
app.use(express.json());

if (NODE_ENV === 'production') {
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../access.log'),
    { flags: 'a' }
  );
  app.use(morgan('combined', { stream: accessLogStream }));
} else {
  app.use(morgan('dev'));
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
