import express from 'express';
import { changeAdminPassword, getAdminProfile, getAllBooks, getAllCustomers, getAllSellers, getPendingSellers, getTopBooks, getTopCustomers, getTopSellers, handleSeller, updateAdminProfile } from './adminController.ts';
import { verifyToken, isAdmin } from '../utils/middleware.ts';

const router = express.Router();

router.use(verifyToken, isAdmin);

router.get('/admin/books', getAllBooks);

router.get('/admin/customers', getAllCustomers);

router.get('/admin/sellers', getAllSellers);

router.get('/admin/dashboard/topcustomers', getTopCustomers);

router.get('/admin/dashboard/topsellers', getTopSellers);

router.get('/admin/dashboard/topbooks', getTopBooks);

router.get('/admin/sellers/pending', getPendingSellers);

router.post('/admin/sellers/decision/:id', handleSeller);

router.get("/admin/profile", getAdminProfile);

router.put("/admin/profile", updateAdminProfile);

router.put("/admin/password", changeAdminPassword);


export default router;
