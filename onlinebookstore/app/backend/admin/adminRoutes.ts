import express from 'express';
import { getAllBooks } from './adminController.ts';
import { verifyToken, isAdmin } from '../utils/middleware.ts';

const router = express.Router();

router.use(verifyToken, isAdmin);

router.get('/admin/books', getAllBooks, verifyToken, isAdmin);


export default router;
