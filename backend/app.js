import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { ConnectionToDatabase } from './config/db.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/', userRouter);

ConnectionToDatabase();

app.get('/', (req, res) => {
  res.send('Home or / page');
});

// testing purpose
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from Server!, This is a testing API for TaskPilot' });
});

app.listen(PORT, () => {
  console.log(`🚀 Express server : ${PORT}`);
});