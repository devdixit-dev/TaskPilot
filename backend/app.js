import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { ConnectionToDatabase } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:8080/',
  credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());

ConnectionToDatabase();

app.get('/', (req, res) => {
  res.send('Home or / page');
});

// testing purpose
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from Express!, This is a testing API for TaskPilot' });
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});