import { ArrowLeft, CreditCard, Smartphone, Wallet, Banknote, ChevronRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Mascot } from '../components/Mascot';
import { formatPrice } from '../lib/utils';

type PaymentMethod = 'upi' | 'card' | 'gpay' | 'cod';

interface PaymentOption {
    id: PaymentMethod;
    name: string;
    icon: React.ReactNode;
    description: string;
    color: string;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
    {
        id: 'upi',
        name: 'UPI',
        icon: <Smartphone size={24} />,
        description: 'Pay via any UPI app',
        color: 'from-purple-500 to-purple-600',
    },
    {
        id: 'card',
        name: 'Credit/Debit Card',
        icon: <CreditCard size={24} />,
        description: 'Visa, Mastercard, RuPay',
        color: 'from-blue-500 to-blue-600',
    },
    {
        id: 'gpay',
        name: 'Google Pay',
        icon: <Wallet size={24} />,
        description: 'Quick & secure payment',
        color: 'from-green-500 to-green-600',
    },
    {
        id: 'cod',
        name: 'Cash on Delivery',
        icon: <Banknote size={24} />,
        description: 'Pay when you receive',
        color: 'from-orange-500 to-orange-600',
    },
];

export const PaymentSelection = () => {
    const navigate = useNavigate();
    const { cartTotal, clearCart } = useCart();
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleProceed = () => {
        if (!selectedMethod) return;

        // Simulating success
        setIsSuccess(true);
        clearCart();
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-white dark:bg-kash-dark-bg flex flex-col items-center justify-center p-8 transition-colors duration-300">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-kash-green-50 dark:bg-kash-green-900/20 rounded-[2.5rem] flex items-center justify-center text-kash-green-600 mb-8 shadow-inner"
                >
                    <Check size={48} strokeWidth={3} />
                </motion.div>

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 text-center">Order Placed!</h2>
                <p className="text-gray-500 dark:text-gray-400 text-center mb-10 font-medium">Your items are being packed at the mart.</p>

                <Mascot
                    expression="cart"
                    message="Mubarak! Your order has been placed successfully. I've sent the details to our partner."
                    action={{
                        label: "Track Your Order",
                        onClick: () => navigate('/track')
                    }}
                />

                <button
                    onClick={() => navigate('/')}
                    className="mt-8 text-sm font-bold text-gray-400 hover:text-kash-green-600 transition-colors uppercase tracking-[0.2em]"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-kash-dark-bg pb-24 transition-colors duration-300">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-white dark:bg-kash-dark-card border-b border-gray-200 dark:border-kash-dark-border px-4 py-4 transition-colors">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/cart')} className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-gray-700 dark:text-gray-300" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Payment Method</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Choose how you want to pay</p>
                    </div>
                </div>
            </div>

            {/* Payment Options */}
            <div className="px-4 py-6 space-y-3">
                {PAYMENT_OPTIONS.map((option, idx) => (
                    <motion.button
                        key={option.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => setSelectedMethod(option.id)}
                        className={`w-full bg-white dark:bg-kash-dark-card rounded-2xl p-4 border-2 transition-all ${selectedMethod === option.id
                            ? 'border-kash-green-500 shadow-lg shadow-kash-green-100 dark:shadow-kash-green-900/20'
                            : 'border-gray-200 dark:border-kash-dark-border hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                                {option.icon}
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-semibold text-gray-900 dark:text-white">{option.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{option.description}</div>
                            </div>
                            {selectedMethod === option.id ? (
                                <div className="w-6 h-6 bg-kash-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Check size={16} className="text-white" />
                                </div>
                            ) : (
                                <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
                            )}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Order Summary */}
            <div className="px-4 py-4">
                <div className="bg-gradient-to-br from-kash-green-50 to-kash-green-100 dark:from-kash-green-950 dark:to-kash-green-900 rounded-2xl p-4 border border-kash-green-200 dark:border-kash-green-800">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Total Amount</span>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(cartTotal)}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {selectedMethod === 'cod' ? 'Pay when you receive your order' : 'Secure payment gateway'}
                    </p>
                </div>
            </div>

            {/* Proceed Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-kash-dark-card border-t border-gray-200 dark:border-kash-dark-border p-4 max-w-[430px] mx-auto">
                <button
                    onClick={handleProceed}
                    disabled={!selectedMethod}
                    className={`w-full py-4 rounded-2xl font-semibold text-white transition-all ${selectedMethod
                        ? 'bg-gradient-to-r from-kash-green-500 to-kash-green-600 hover:from-kash-green-600 hover:to-kash-green-700 active:scale-95'
                        : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                        }`}
                >
                    {selectedMethod === 'cod' ? 'Place Order' : 'Proceed to Pay ' + formatPrice(cartTotal)}
                </button>
            </div>
        </div>
    );
};
