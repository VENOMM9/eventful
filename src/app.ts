import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRouter';
import { connectionToMongodb } from "./utils/db";
import authRouter from './routes/authRouter';

const app: Application = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRouter);

connectionToMongodb();

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 5100;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
