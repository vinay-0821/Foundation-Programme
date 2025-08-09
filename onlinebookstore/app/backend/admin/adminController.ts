import type { Request, Response } from 'express';
import { fetchAllBooks, fetchAllCustomers, fetchAllSellers, fetchPendingSellers, fetchTopBooks, fetchTopCustomers, fetchTopSellers, updateSellerStatus } from './adminServices.ts';

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

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const { sortBy = 'name', order = 'asc', search = '' } = req.query;

    const customers = await fetchAllCustomers(
      sortBy as string,
      order as string,
      search as string
    );

    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Server error while fetching customers' });
  }
};


export const getAllSellers = async (req: Request, res: Response) => {
  try {
    const { sortBy = 'name', order = 'asc', search = '' } = req.query;

    const sellers = await fetchAllSellers(
      sortBy as string,
      order as string,
      search as string
    );

    res.status(200).json(sellers);
  } catch (error) {
    console.error('Error fetching sellers:', error);
    res.status(500).json({ message: 'Server error while fetching sellers' });
  }
};


export const getTopCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await fetchTopCustomers();
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching top customers:", error);
    res.status(500).json({ message: "Server error while fetching top customers" });
  }
};


export const getTopSellers = async (req: Request, res: Response) => {
  try {
    const sellers = await fetchTopSellers();
    res.status(200).json(sellers);
  } catch (error) {
    console.error("Error fetching top sellers:", error);
    res.status(500).json({ message: "Server error while fetching top sellers" });
  }
};


export const getTopBooks = async (req: Request, res: Response) => {
  try {
    const books = await fetchTopBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching top books:", error);
    res.status(500).json({ message: "Server error while fetching top books" });
  }
};


export const getPendingSellers = async (req: Request, res: Response) => {
  try {
    const sellers = await fetchPendingSellers();
    res.status(200).json(sellers);
  } catch (error) {
    console.error("Error fetching pending sellers:", error);
    res.status(500).json({ message: "Server error while fetching pending sellers" });
  }
};


export const handleSeller = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    const status = await updateSellerStatus(Number(id), action as "approve" | "reject");
    res.status(200).json({ message: `Seller ${status}` });
  } catch (error) {
    console.error("Error handling seller decision:", error);
    res.status(500).json({ message: "Server error while updating seller status" });
  }
};