import express from 'express';
import { isSeller, verifyToken } from '../utils/middleware';
import { getAllSellerBooks } from './sellerController';


const router = express.Router();

router.use(verifyToken, isSeller);

router.get('/seller/mybooks', getAllSellerBooks);

export default router;