import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    app.get('/', (req, res) => {
      res.send('API is running');
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

startServer();