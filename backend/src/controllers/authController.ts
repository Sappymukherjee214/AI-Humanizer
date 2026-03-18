import { Request, Response } from 'express';
import { prisma } from '../index.js';
import { hashPassword, comparePassword, generateToken } from '../services/authService.js';

export const handleSignup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                name: name || '',
                credits: 10,
                subscription: 'FREE',
            },
        });

        const token = generateToken(user.id);
        res.status(201).json({
            token,
            user: { id: user.id, email: user.email, name: user.name }
        });

    } catch (error: any) {
        console.error('Signup Error:', error);
        res.status(500).json({ error: 'Failed to create account' });
    }
};

export const handleLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await comparePassword(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user.id);
        res.json({
            token,
            user: { id: user.id, email: user.email, name: user.name }
        });

    } catch (error: any) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
};

export const handleGetProfile = async (req: any, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { id: true, email: true, name: true, subscription: true }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

export const handleGetHistory = async (req: any, res: Response) => {
    try {
        const history = await prisma.transaction.findMany({
            where: { userId: req.userId },
            orderBy: { createdAt: 'desc' }
        });
        res.json(history);
    } catch (error) {
        console.error('History Fetch Error:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};
