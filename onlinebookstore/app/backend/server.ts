import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './auth/authRoutes.ts';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
// console.log("server.ts");
app.use(authRoutes);

app.get('/test', (req, res) => {
  res.send('Backend is working!');
});

app.listen(5000, () => {
  console.log("Sever is running on 'http://localhost:5000'");
});

