import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import {
  getOffers,
  getOfferById,
  getActiveOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} from '../controllers/offerController';

const router = express.Router();

router.get('/active', getActiveOffers);
router.get('/', getOffers);
router.get('/:id', getOfferById);

router.post('/', authenticateToken, createOffer);
router.put('/:id', authenticateToken, updateOffer);
router.delete('/:id', authenticateToken, deleteOffer);

export default router;