// Import the express module
import express from 'express';
import { userRouter } from './routes';
import db from './db';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// TODO: a universal response middleware
// TODO: Add morgan for logging and helmet for security

app.use('/v1/user', userRouter);

app.get('/', async (_, res) => {
  const dbStatus = await db.$queryRaw`SELECT 1`;
  res.json({
    db: dbStatus,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
