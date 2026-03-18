import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-02-24-preview' as any,
});

export const createCheckoutSession = async (userId: string, credits: number, amount: number) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${credits} AI Humanizer Credits`,
                        description: `Purchase of ${credits} credits for text humanization.`,
                    },
                    unit_amount: amount * 100, // amount in cents
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/dashboard?payment=success`,
        cancel_url: `${process.env.FRONTEND_URL}/pricing?payment=cancelled`,
        metadata: {
            userId,
            credits: credits.toString(),
        },
    });

    return session;
};

export const verifyWebhook = (payload: Buffer, signature: string) => {
    return stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ''
    );
};
