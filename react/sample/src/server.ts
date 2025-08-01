import express from 'express';
import type { NextFunction } from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import type { RowDataPacket } from 'mysql2/promise';
import jwt from 'jsonwebtoken';
// import { Request } from 'express';
import type { Request, Response } from 'express';

interface JwtPayload {
  email: string;
}

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}


const app = express();
app.use(cors());
app.use(bodyParser.json());
const SECRET_KEY = 'a-string-secret-at-least-256-bits-long';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vinay@2003',
  database: 'sample'
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }
  console.log('MySQL connected!');
});

// Signup route
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(200).json({ message: 'Signup successful' });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error logging in' });

    const users = results as RowDataPacket[];

    if (users.length > 0) {
      const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '30s' });
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
  // console.log("Hii");
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.sendStatus(403); // Forbidden
    }
    const payload = decoded as JwtPayload;
    if (!payload.email) {
      return res.status(403).json({ message: 'Invalid token: email missing' });
    }

    req.user = payload;
    next();
  });
}

app.get('/home', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const email = req.user?.email;

  if (!email) {
    return res.status(403).json({ message: 'Email not found in token' });
  }

  const sql = 'SELECT name, email FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });

    const rows = results as RowDataPacket[];

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(rows[0]);
  });
});