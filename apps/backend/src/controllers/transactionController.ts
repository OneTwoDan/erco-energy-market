import { Request, Response, NextFunction } from 'express';
import { Transaction as SequelizeTransaction } from 'sequelize';
import { Transaction, Offer } from '../models';
import sequelize from '../config/database';

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { buyerId, offerId } = req.body;

  if (!buyerId || !offerId) {
    res.status(400).json({ message: 'buyerId and offerId are required' });
    return;
  }

  try {
    await sequelize.transaction(async (t: SequelizeTransaction) => {
      const offer = await Offer.findOne({
        where: { id: offerId },
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      if (!offer) {
        res.status(404).json({ message: 'Offer not found' });
        throw new Error('Rollback');
      }

      if (offer.isSold) {
        res.status(400).json({ message: 'Offer is already sold' });
        throw new Error('Rollback');
      }

      const now = new Date();
      if (now < offer.startDate || now > offer.endDate) {
        res.status(400).json({ message: 'Offer is not within the valid time window' });
        throw new Error('Rollback');
      }

      const totalPrice = offer.pricePerKwh * offer.quantity;

      const transaction = await Transaction.create(
        {
          buyerId,
          offerId,
          transactionDate: now,
          totalPrice,
        },
        { transaction: t }
      );

      await offer.update({ isSold: true }, { transaction: t });

      res.status(201).json(transaction);
    });
  } catch (error) {
    if (error instanceof Error && error.message !== 'Rollback') {
      next(error);
    }
  }
};

export const getUserPurchases = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized: User not authenticated' });
      return;
    }

    const userId = req.user.id;

    const purchases = await Transaction.findAll({
      where: { buyerId: userId },
      include: [{ model: Offer, as: 'offer' }],
      order: [['transactionDate', 'DESC']],
    });

    res.json(purchases);
  } catch (error) {
    next(error);
  }
};

export const getUserSales = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized: User not authenticated' });
      return;
    }

    const userId = req.user.id;

    const sales = await Transaction.findAll({
      include: [{
        model: Offer,
        as: 'offer',
        where: { sellerId: userId },
      }],
      order: [['transactionDate', 'DESC']],
    });

    res.json(sales);
  } catch (error) {
    next(error);
  }
};
