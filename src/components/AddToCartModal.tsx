import { X, RefreshCw, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RecurringFrequency } from '../context/CartContext';

interface AddToCartModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (isRecurring: boolean, frequency?: RecurringFrequency) => void;
    productName: string;
}

export const AddToCartModal = ({ isOpen, onClose, onConfirm, productName }: AddToCartModalProps) => {
    const handleSelection = (isRecurring: boolean, frequency?: RecurringFrequency) => {
        onConfirm(isRecurring, frequency);
        onClose();
    };

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
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-kash-dark-card rounded-t-3xl p-6 max-w-[430px] mx-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add to Cart</h3>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                            Adding <span className="font-semibold text-gray-900 dark:text-white">{productName}</span>
                        </p>

                        {/* Options */}
                        <div className="space-y-3">
                            {/* Normal Order */}
                            <button
                                onClick={() => handleSelection(false)}
                                className="w-full bg-gradient-to-r from-kash-green-500 to-kash-green-600 hover:from-kash-green-600 hover:to-kash-green-700 text-white rounded-2xl p-4 flex items-center gap-3 transition-all active:scale-95"
                            >
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <ShoppingBag size={24} />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="font-semibold">One-Time Order</div>
                                    <div className="text-xs opacity-90">Buy now</div>
                                </div>
                            </button>

                            {/* Recurring Order */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    <RefreshCw size={16} className="text-kash-green-600" />
                                    <span>Recurring Order (Save 5%)</span>
                                </div>

                                <button
                                    onClick={() => handleSelection(true, 'daily')}
                                    className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-kash-green-500 dark:hover:border-kash-green-500 rounded-xl p-3 flex items-center justify-between transition-all active:scale-95"
                                >
                                    <span className="font-medium text-gray-900 dark:text-white">Daily</span>
                                    <span className="text-xs text-kash-green-600 dark:text-kash-green-400 font-semibold">5% OFF</span>
                                </button>

                                <button
                                    onClick={() => handleSelection(true, 'weekly')}
                                    className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-kash-green-500 dark:hover:border-kash-green-500 rounded-xl p-3 flex items-center justify-between transition-all active:scale-95"
                                >
                                    <span className="font-medium text-gray-900 dark:text-white">Weekly</span>
                                    <span className="text-xs text-kash-green-600 dark:text-kash-green-400 font-semibold">5% OFF</span>
                                </button>

                                <button
                                    onClick={() => handleSelection(true, 'monthly')}
                                    className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-kash-green-500 dark:hover:border-kash-green-500 rounded-xl p-3 flex items-center justify-between transition-all active:scale-95"
                                >
                                    <span className="font-medium text-gray-900 dark:text-white">Monthly</span>
                                    <span className="text-xs text-kash-green-600 dark:text-kash-green-400 font-semibold">5% OFF</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
