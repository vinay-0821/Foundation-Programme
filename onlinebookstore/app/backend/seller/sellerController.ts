import type { Request, Response } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";



function decodeToken(token) {
  if (!token) throw new Error("No token provided");

  return jwt.verify(token, process.env.JWT_SECRET as string);
}

export const getAllSellerBooks = async (req: Request, res: Response) => {
  try {
    const { genre, seller, title, sortBy, order } = req.query;
    const token = req.headers.authorization?.split(' ')[1];
    const data = decodeToken(token);
    let sellerid = 0;
    if (data && typeof data !== 'string') {
    sellerid = (data as JwtPayload).userid;
    } 
    else {
    throw new Error('Invalid token payload');
    }

    const books = await fetchAllSellerBooks(
      sellerid as number,
      genre as string,
      seller as string,
      title as string,
      sortBy as string,
      order as string
    );

    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server error while fetching books' });
  }
};