import { Request, Response, NextFunction } from 'express';
import { Transaction, Offer } from '../models';

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { buyerId, offerId } = req.body;

    if (!buyerId || !offerId) {
      res.status(400).json({ message: 'buyerId and offerId are required' });
      return;
    }

    const offer = await Offer.findByPk(offerId);

    if (!offer) {
      res.status(404).json({ message: 'Offer not found' });
      return;
    }

    if (offer.isSold) {
      res.status(400).json({ message: 'Offer is already sold' });
      return;
    }

    const totalPrice = offer.pricePerKwh * offer.quantity;

    const transaction = await Transaction.create({
      buyerId,
      offerId,
      transactionDate: new Date(),
      totalPrice,
    });

    await offer.update({ isSold: true });

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};