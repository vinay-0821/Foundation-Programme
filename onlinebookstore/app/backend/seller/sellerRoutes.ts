import express from 'express';
import { isSeller, verifyToken } from '../utils/middleware';


const router = express.Router();

router.use(verifyToken, isSeller);

router.get('/seller/mybooks', getAllSellerBooks);

export default router;