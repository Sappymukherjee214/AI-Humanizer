import express from 'express';
import { handleSignup, handleLogin, handleGetProfile, handleGetHistory } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', (req, res, next) => {
    handleSignup(req, res).catch(next);
});

router.post('/login', (req, res, next) => {
    handleLogin(req, res).catch(next);
});

router.get('/profile', authenticate, (req, res, next) => {
    handleGetProfile(req, res).catch(next);
});

router.get('/history', authenticate, (req: any, res, next) => {
    handleGetHistory(req, res).catch(next);
});

export default router;
