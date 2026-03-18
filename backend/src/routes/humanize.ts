import express from 'express';
import { handleHumanize } from '../controllers/humanizeController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, (req, res, next) => {
    handleHumanize(req, res).catch(next);
});

export default router;
