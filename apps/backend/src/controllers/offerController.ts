import { Request, Response, NextFunction } from 'express';
import Offer from '../models/Offer';

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