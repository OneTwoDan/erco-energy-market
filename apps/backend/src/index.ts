import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';

import userRoutes from './routes/userRoutes';
import offerRoutes from './routes/offerRoutes';
import transactionRoutes from './routes/transactionRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'API is running',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      offers: '/api/offers',
      transactions: '/api/transactions',
    }
  });
});

app.use('/api/users', userRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/transactions', transactionRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Global error handler:', err);
  res.status(500).json({ error: 'Internal server error' });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

startServer();