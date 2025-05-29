import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { createTransaction } from '../controllers/transactionController';

const router = Router();

router.post('/', authenticateToken, createTransaction);

export default router;
