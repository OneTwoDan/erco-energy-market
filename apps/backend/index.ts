import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/config/database';

import userRoutes from './src/routes/userRoutes';
import offerRoutes from './src/routes/offerRoutes';
import transactionRoutes from './src/routes/transactionRoutes';
import authRoutes from './src/routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'https://erco-energy-frontend.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'API is running',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      offers: '/api/offers',
      transactions: '/api/transactions',
      auth: '/api/auth'
    }
  });
});

app.use('/api/users', userRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);

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

if (process.env.NODE_ENV !== 'production') {
  startServer();
}

export default app;