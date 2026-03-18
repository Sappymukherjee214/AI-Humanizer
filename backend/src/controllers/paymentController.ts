import { Request, Response } from 'express';
import { createCheckoutSession, verifyWebhook } from '../services/paymentService.js';
import { prisma } from '../index.js';

export const handleCreateCheckout = async (req: any, res: Response) => {
    const { credits, amount } = req.body;
    const userId = req.userId;

    if (!credits || !amount) {
        return res.status(400).json({ error: 'Credits and amount are required' });
    }

    try {
        const session = await createCheckoutSession(userId, credits, amount);

        // Log the pending payment
        await prisma.payment.create({
            data: {
                userId,
                stripeSessionId: session.id,
                amount,
                creditsBought: credits,
                status: 'PENDING'
            }
        });

        res.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Session Error:', error);
        res.status(500).json({ error: 'Failed to initiate payment' });
    }
};

export const handleWebhook = async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = verifyWebhook(req.body, sig as string);
    } catch (err: any) {
        console.error('Webhook Error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;
        const { userId, credits } = session.metadata;

        // Atomic update of user credits and payment status
        try {
            await prisma.$transaction([
                prisma.user.update({
                    where: { id: userId },
                    data: { credits: { increment: parseInt(credits) } }
                }),
                prisma.payment.update({
                    where: { stripeSessionId: session.id },
                    data: { status: 'COMPLETED' }
                })
            ]);
            console.log(`Payment successful for user ${userId}: +${credits} credits`);
        } catch (error) {
            console.error('Database Update Error after Payment:', error);
        }
    }

    res.json({ received: true });
};
