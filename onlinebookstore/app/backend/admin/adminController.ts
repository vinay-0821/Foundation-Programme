import type { Request, Response } from 'express';
import { fetchAllBooks } from './adminServices.ts';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { genre, seller, title, sortBy, order } = req.query;

    const books = await fetchAllBooks(
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
