import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, ...rest } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: 'Name, email and password are required' });
      return;
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: 'Email already in use' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword, ...rest });
    res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, ...rest } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    await user.update({ name, email, ...rest });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });

    if (!deleted) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};