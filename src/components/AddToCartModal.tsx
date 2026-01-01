import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ShoppingBag, Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface AddToCartModalProps {
    productName: string;
    isOpen: boolean;
    onClose: () => void;
    onAdd: (orderType: 'one-time' | 'recurring', frequency?: string) => void;
}

export const AddToCartModal: React.FC<AddToCartModalProps> = ({
    productName,
    isOpen,
    onClose,
    onAdd
}) => {
    const [orderType, setOrderType] = useState<'one-time' | 'recurring'>('one-time');
    const [frequency, setFrequency] = useState<string>('daily');

    const frequencies = [
        { id: 'daily', label: 'Daily' },
        { id: '2days', label: 'Every 2 Days' },
        { id: 'weekly', label: 'Weekly' },
        { id: 'monthly', label: 'Monthly' }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60]"
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-kash-dark-card rounded-t-[2rem] shadow-2xl safe-p-bottom overflow-hidden max-w-[430px] mx-auto pb-10"
                    >
                        {/* Grab Handle */}
                        <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mt-3 mb-1" />

                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                                    Add {productName} to Cart
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-gray-50 dark:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Order Type Section */}
                            <div className="mb-8">
                                <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                                    Choose order type
                                </p>
                                <div className="space-y-3">
                                    {/* One-Time Order */}
                                    <button
                                        onClick={() => setOrderType('one-time')}
                                        className={cn(
                                            "w-full p-4 rounded-2xl flex items-center gap-4 border-2 transition-all duration-300",
                                            orderType === 'one-time'
                                                ? "border-kash-green-600 bg-kash-green-50/30 dark:bg-kash-green-900/10"
                                                : "border-gray-100 dark:border-gray-800 bg-white dark:bg-transparent"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                            orderType === 'one-time'
                                                ? "bg-kash-green-600 text-white"
                                                : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                                        )}>
                                            <ShoppingBag size={20} />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className={cn(
                                                "font-bold text-sm",
                                                orderType === 'one-time' ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                                            )}>One-Time Order</p>
                                        </div>
                                        {orderType === 'one-time' && (
                                            <div className="w-5 h-5 bg-kash-green-600 rounded-full flex items-center justify-center text-white">
                                                <Check size={12} strokeWidth={4} />
                                            </div>
                                        )}
                                    </button>

                                    {/* Recurring Order */}
                                    <button
                                        onClick={() => setOrderType('recurring')}
                                        className={cn(
                                            "w-full p-4 rounded-2xl flex items-center gap-4 border-2 transition-all duration-300",
                                            orderType === 'recurring'
                                                ? "border-kash-green-600 bg-kash-green-50/30 dark:bg-kash-green-900/10"
                                                : "border-gray-100 dark:border-gray-800 bg-white dark:bg-transparent"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                            orderType === 'recurring'
                                                ? "bg-kash-green-600 text-white"
                                                : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                                        )}>
                                            <Calendar size={20} />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className={cn(
                                                "font-bold text-sm",
                                                orderType === 'recurring' ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                                            )}>Recurring Order</p>
                                            <p className="text-[10px] font-black uppercase text-kash-green-600 tracking-wider">
                                                Save 5% • Auto-delivery • Cancel anytime
                                            </p>
                                        </div>
                                        {orderType === 'recurring' && (
                                            <div className="w-5 h-5 bg-kash-green-600 rounded-full flex items-center justify-center text-white">
                                                <Check size={12} strokeWidth={4} />
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Delivery Frequency Section (Smooth Expand) */}
                            <AnimatePresence>
                                {orderType === 'recurring' && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden mb-8"
                                    >
                                        <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                                            Delivery Frequency
                                        </p>
                                        <div className="flex gap-2">
                                            {frequencies.map((freq) => (
                                                <button
                                                    key={freq.id}
                                                    onClick={() => setFrequency(freq.id)}
                                                    className={cn(
                                                        "flex-1 py-3 px-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-200 border-2",
                                                        frequency === freq.id
                                                            ? "bg-kash-green-100/50 border-kash-green-600 text-kash-green-700 dark:bg-kash-green-900/20 dark:text-kash-green-400"
                                                            : "bg-gray-50 border-transparent text-gray-400 dark:bg-gray-800/50 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    )}
                                                >
                                                    {freq.label}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Sticky CTA Button */}
                            <motion.button
                                layout
                                onClick={() => onAdd(orderType, orderType === 'recurring' ? frequency : undefined)}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-kash-green-700 hover:bg-kash-green-800 text-white py-4 rounded-[1.25rem] font-black text-sm uppercase tracking-[0.1em] shadow-lg shadow-kash-green-900/10 transition-colors"
                            >
                                {orderType === 'one-time' ? 'Add to Cart' : 'Start Subscription'}
                            </motion.button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
