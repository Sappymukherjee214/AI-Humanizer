import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Zap, Sparkles, Crown } from 'lucide-react';
import axios from 'axios';

const PricingModal = ({ isOpen, onClose, user }: { isOpen: boolean, onClose: () => void, user: any }) => {
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const packages = [
        {
            id: 'starter',
            name: 'Starter',
            credits: 50,
            price: 9,
            icon: <Zap className="w-6 h-6 text-blue-400" />,
            description: 'Perfect for small assignments',
            features: ['50 Humanization Credits', 'Standard Detection Support', 'PDF/DOCX Export', '7 Days History']
        },
        {
            id: 'popular',
            name: 'Pro Pack',
            credits: 200,
            price: 29,
            popular: true,
            icon: <Sparkles className="w-6 h-6 text-purple-400" />,
            description: 'The writers favorite choice',
            features: ['200 Humanization Credits', 'Priority LLM Access', 'Bulk File Support', '30 Days History', 'No Watermarks']
        },
        {
            id: 'enterprise',
            name: 'Elite',
            credits: 1000,
            price: 99,
            icon: <Crown className="w-6 h-6 text-amber-400" />,
            description: 'For power users and agencies',
            features: ['1000 Humanization Credits', 'Advanced API Access', 'Custom Modes', 'Unlimited History', 'Premium Support']
        }
    ];

    const handlePurchase = async (pkg: typeof packages[0]) => {
        if (!user) {
            alert('Please login to purchase credits');
            return;
        }

        setIsLoading(pkg.id);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/payment/create-checkout', {
                credits: pkg.credits,
                amount: pkg.price
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error('Checkout failed:', error);
            alert('Failed to initiate payment. Please try again.');
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-2xl"
                    >
                        <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Fuel Your Creativity</h2>
                                <p className="text-slate-500 font-medium mt-1">Select a credit pack to unlock more humanizing power</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-xl transition-all active:scale-90">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>

                        <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {packages.map((pkg) => (
                                <div
                                    key={pkg.id}
                                    className={`relative p-8 rounded-3xl border transition-all flex flex-col ${pkg.popular
                                        ? 'bg-white border-indigo-500 shadow-2xl shadow-indigo-100 scale-105 z-10'
                                        : 'bg-white border-slate-100 hover:border-slate-300'
                                        }`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-premium text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-indigo-200">
                                            Recommended
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`p-3 rounded-2xl ${pkg.popular ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                            {pkg.icon}
                                        </div>
                                        <h3 className="font-extrabold text-xl text-slate-900">{pkg.name}</h3>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-5xl font-black text-slate-900">${pkg.price}</span>
                                            <span className="text-slate-400 font-bold text-sm">/one-time</span>
                                        </div>
                                        <div className="mt-2 inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                            {pkg.credits} Credits Included
                                        </div>
                                    </div>

                                    <p className="text-slate-500 text-sm mb-8 font-medium leading-relaxed">{pkg.description}</p>

                                    <div className="space-y-4 mb-10 flex-grow">
                                        {pkg.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm text-slate-600 font-semibold">
                                                <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-3 h-3 text-emerald-600" />
                                                </div>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handlePurchase(pkg)}
                                        disabled={isLoading !== null}
                                        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.97] ${pkg.popular
                                            ? 'bg-gradient-premium text-white shadow-xl shadow-indigo-200 hover:shadow-indigo-300'
                                            : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-100'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {isLoading === pkg.id ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Connecting...</span>
                                            </div>
                                        ) : 'Get Started'}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="px-10 py-6 bg-slate-50/80 border-t border-slate-100 text-center flex items-center justify-center gap-6">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-none">
                                Secure Stripe Checkout
                            </p>
                            <div className="h-4 w-px bg-slate-200" />
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-none">
                                Instant Delivery
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PricingModal;
