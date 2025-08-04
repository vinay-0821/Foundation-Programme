import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface UserToken {
  userid: number;
  role: string;
  email: string;
}

interface CustomRequest extends Request {
  user?: UserToken;
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied: No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserToken;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

export const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  next();
};
