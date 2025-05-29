import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { Offer, User } from '../models';

export const getOffers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const offers = await Offer.findAll();
    res.json(offers);
  } catch (error) {
    next(error);
  }
};

export const getOfferById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: 'Offer ID is required' });
      return;
    }

    const offer = await Offer.findByPk(id);
    if (!offer) {
      res.status(404).json({ error: 'Offer not found' });
      return;
    }

    res.json(offer);
  } catch (error) {
    next(error);
  }
};

export const createOffer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sellerId, quantity, pricePerKwh, startDate, endDate } = req.body;

    if (!sellerId || !quantity || !pricePerKwh || !startDate || !endDate) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const newOffer = await Offer.create({
      sellerId,
      quantity,
      pricePerKwh,
      startDate,
      endDate,
    });

    res.status(201).json(newOffer);
  } catch (error) {
    next(error);
  }
};

export const updateOffer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const offer = await Offer.findByPk(id);

    if (!offer) {
      res.status(404).json({ error: 'Offer not found' });
      return;
    }

    await offer.update(req.body);
    res.json(offer);
  } catch (error) {
    next(error);
  }
};

export const deleteOffer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Offer.destroy({ where: { id } });

    if (!deleted) {
      res.status(404).json({ error: 'Offer not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

type OfferWithSeller = typeof Offer.prototype & {
  seller?: { name: string };
};

export const getActiveOffers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const now = new Date();

    const offers = await Offer.findAll({
      where: {
        isSold: false,
        startDate: { [Op.lte]: now },
        endDate: { [Op.gte]: now },
      },
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    }) as OfferWithSeller[];

    const formattedOffers = offers.map((offer) => ({
      id: offer.id,
      sellerId: offer.sellerId,
      sellerName: offer.seller?.name ?? 'Unknown',
      quantity: offer.quantity,
      pricePerKwh: offer.pricePerKwh,
      startDate: offer.startDate,
      endDate: offer.endDate,
      isSold: offer.isSold,
      createdAt: offer.createdAt,
      updatedAt: offer.updatedAt,
    }));

    res.json(formattedOffers);
  } catch (error) {
    next(error);
  }
};