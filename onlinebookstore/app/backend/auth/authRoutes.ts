import express from 'express';
import { changepassword, login, signup } from './authController.ts';

const router = express.Router();
// console.log("authroutes");
router.post('/login', login);
router.post('/signup', signup);
router.post('/passwordchange', changepassword);

export default router;
