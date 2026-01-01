import { ArrowLeft, CreditCard, Plus, Trash2, Smartphone, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const PaymentMethods = () => {
    const navigate = useNavigate();
    const [isAdding, setIsAdding] = useState(false);
    const [methods, setMethods] = useState([
        { id: '1', type: 'UPI', value: 'tanzeela@okaxis', icon: Smartphone, primary: true },
        { id: '2', type: 'Card', value: '•••• 4242', icon: CreditCard, primary: false }
    ]);

    const handleDelete = (id: string) => {
        setMethods(prev => prev.filter((m) => m.id !== id));
    };

    const handleAdd = (type: string) => {
        const fresh = {
            id: Math.random().toString(36).substr(2, 9),
            type: type,
            value: type === 'UPI' ? 'new@upi' : '•••• 1234',
            icon: type === 'UPI' ? Smartphone : CreditCard,
            primary: false
        };
        setMethods(prev => [...prev, fresh]);
        setIsAdding(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-kash-dark-bg transition-colors duration-300">
            {/* Header */}
            <div className="bg-white dark:bg-kash-dark-card p-4 flex items-center shadow-sm sticky top-0 z-10 transition-colors duration-300">
                <button onClick={() => navigate(-1)} className="mr-4 text-gray-700 dark:text-gray-200">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="font-bold text-lg text-gray-900 dark:text-white">Payment Methods</h1>
            </div>

            <div className="p-4 space-y-4">
                <AnimatePresence mode="popLayout">
                    {methods.map((method) => (
                        <motion.div
                            key={method.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-white dark:bg-kash-dark-card p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-kash-dark-border flex items-center gap-4"
                        >
                            <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400">
                                <method.icon size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-gray-900 dark:text-white">{method.type}</h3>
                                    {method.primary && (
                                        <span className="text-[10px] bg-kash-green-100 dark:bg-kash-green-900/30 text-kash-green-700 dark:text-kash-green-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-tight">Primary</span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-mono tracking-wider">
                                    {method.value}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(method.id)}
                                className="text-gray-300 hover:text-red-500 p-2 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <button
                    onClick={() => setIsAdding(true)}
                    className="w-full bg-kash-green-600 text-white p-4 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-kash-green-200 dark:shadow-none hover:bg-kash-green-700 transition-all active:scale-95 mt-4"
                >
                    <Plus size={20} />
                    Add New Method
                </button>
            </div>

            {/* Add Payment Method Sheet */}
            <AnimatePresence>
                {isAdding && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAdding(false)}
                            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-kash-dark-card rounded-t-[32px] p-6 pb-20 max-w-[430px] mx-auto shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add Payment Method</h3>
                                <button onClick={() => setIsAdding(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { id: 'UPI', label: 'UPI ID (Google Pay, PhonePe)', icon: Smartphone },
                                    { id: 'Card', label: 'Credit or Debit Card', icon: CreditCard }
                                ].map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleAdd(option.id)}
                                        className="w-full bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl flex items-center justify-between group hover:bg-kash-green-50 dark:hover:bg-kash-green-900/10 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 shadow-sm">
                                                <option.icon size={20} />
                                            </div>
                                            <span className="font-semibold text-gray-700 dark:text-gray-200">{option.label}</span>
                                        </div>
                                        <ChevronRight size={18} className="text-gray-300 group-hover:text-kash-green-600 transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
