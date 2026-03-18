import { Router } from 'express';
import express from 'express';
import { handleCreateCheckout, handleWebhook } from '../controllers/paymentController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/create-checkout', authenticate, handleCreateCheckout);

// Webhook is handled with raw body in index.ts
router.post('/webhook', handleWebhook);

export default router;
