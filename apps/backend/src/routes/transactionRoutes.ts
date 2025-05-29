import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { createTransaction, getUserPurchases, getUserSales } from '../controllers/transactionController';

const router = Router();

router.post('/', authenticateToken, createTransaction);
router.get('/purchases', authenticateToken, getUserPurchases);
router.get('/sales', authenticateToken, getUserSales);

export default router;
