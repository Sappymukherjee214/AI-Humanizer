import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import humanizeRoutes from './routes/humanize.js';
import extractRoutes from './routes/extract.js';
import exportRoutes from './routes/export.js';
import authRoutes from './routes/auth.js';
import paymentRoutes from './routes/payment.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Stripe Webhook needs RAW body before express.json()
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'AI Humanizer API is running' });
});

// Routes
app.use('/api/humanize', humanizeRoutes);
app.use('/api/extract', extractRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app, prisma };
