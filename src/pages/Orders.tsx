import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle2, RotateCcw, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const currentOrders = [
    {
        id: 'ORD-2025-001',
        items: ['Kashmiri Kahwa Tea', 'Saffron 1g'],
        total: 1250,
        status: 'Out for Delivery',
        date: 'Today, 2:30 PM',
        image: 'https://images.unsplash.com/photo-1563911892437-1e59bd2e4126?auto=format&fit=crop&w=100&q=80',
        trackingId: 'TRK123456'
    }
];

const previousOrders = [
    {
        id: 'ORD-2024-892',
        items: ['Walnut Kernels 500g', 'Dried Figs 250g'],
        total: 1850,
        status: 'Delivered',
        date: 'Dec 28, 2024',
        image: 'https://images.unsplash.com/photo-1582832863481-c7444c424647?auto=format&fit=crop&w=100&q=80'
    },
    {
        id: 'ORD-2024-850',
        items: ['Kashmiri Chili Powder', 'Basmati Rice 5kg'],
        total: 950,
        status: 'Delivered',
        date: 'Dec 15, 2024',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=100&q=80'
    },
    {
        id: 'ORD-2024-810',
        items: ['Shilajit Resin', 'Honey 500g'],
        total: 2400,
        status: 'Cancelled',
        date: 'Dec 10, 2024',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=100&q=80'
    }
];

export const Orders = () => {
    const [activeTab, setActiveTab] = useState<'current' | 'previous'>('current');
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-kash-dark-bg pb-24 transition-colors duration-300">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white/80 dark:bg-kash-dark-bg/80 backdrop-blur-md border-b border-gray-100 dark:border-kash-dark-border px-4 py-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-outfit">My Orders</h1>
            </div>

            {/* Tabs */}
            <div className="px-4 mt-4">
                <div className="bg-white dark:bg-kash-dark-card p-1 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex relative z-0">
                    <div
                        className="absolute top-1 bottom-1 bg-kash-green-50 dark:bg-kash-green-900/30 rounded-lg transition-all duration-300 -z-10"
                        style={{
                            left: activeTab === 'current' ? '4px' : '50%',
                            width: 'calc(50% - 4px)'
                        }}
                    />
                    <button
                        onClick={() => setActiveTab('current')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${activeTab === 'current'
                            ? 'text-kash-green-600 dark:text-kash-green-400'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        Current Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('previous')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${activeTab === 'previous'
                            ? 'text-kash-green-600 dark:text-kash-green-400'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        Previous Orders
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 mt-6 space-y-4">
                <AnimatePresence mode="wait">
                    {activeTab === 'current' ? (
                        <motion.div
                            key="current"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4"
                        >
                            {currentOrders.length > 0 ? (
                                currentOrders.map((order) => (
                                    <div key={order.id} className="bg-white dark:bg-kash-dark-card rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0">
                                                <img src={order.image} alt="Order Item" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 dark:text-white truncate pr-2">
                                                            {order.items[0]}
                                                        </h3>
                                                        {order.items.length > 1 && (
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                +{order.items.length - 1} more items
                                                            </p>
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                                                        ₹{order.total}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="w-2 h-2 bg-kash-green-500 rounded-full animate-pulse" />
                                                    <span className="text-sm font-medium text-kash-green-600 dark:text-kash-green-400">
                                                        {order.status}
                                                    </span>
                                                </div>

                                                <p className="text-xs text-gray-400 mt-1">{order.date}</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex gap-3">
                                            <button
                                                onClick={() => navigate('/track')}
                                                className="flex-1 bg-kash-green-600 hover:bg-kash-green-700 active:bg-kash-green-800 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-kash-green-600/20"
                                            >
                                                <MapPin size={16} />
                                                Track Order
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <EmptyState
                                    title="No active orders"
                                    message="Start shopping to see your orders here!"
                                    action={() => navigate('/marts')}
                                />
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="previous"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4"
                        >
                            {previousOrders.length > 0 ? (
                                previousOrders.map((order) => (
                                    <div key={order.id} className="bg-white dark:bg-kash-dark-card rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 opacity-90 hover:opacity-100 transition-opacity">
                                        <div className="flex gap-4">
                                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all">
                                                <img src={order.image} alt="Order Item" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                                                        {order.items[0]}
                                                    </h3>
                                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        ₹{order.total}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-1 mt-1">
                                                    {order.status === 'Delivered' ? (
                                                        <CheckCircle2 size={14} className="text-gray-500" />
                                                    ) : (
                                                        <Clock size={14} className="text-red-500" />
                                                    )}
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {order.status} • {order.date}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex justify-end">
                                            <button className="flex items-center gap-1.5 text-xs font-medium text-kash-green-600 dark:text-kash-green-400 hover:text-kash-green-700 dark:hover:text-kash-green-300 px-3 py-1.5 bg-kash-green-50 dark:bg-kash-green-900/20 rounded-lg transition-colors">
                                                <RotateCcw size={14} />
                                                Reorder
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <EmptyState
                                    title="No past orders"
                                    message="Your order history will appear here."
                                />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const EmptyState = ({ title, message, action }: { title: string, message: string, action?: () => void }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-400">
            <Package size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[200px] mb-6">{message}</p>
        {action && (
            <button
                onClick={action}
                className="px-6 py-2 bg-kash-green-600 text-white rounded-full text-sm font-medium hover:bg-kash-green-700 transition-colors"
            >
                Browse Marts
            </button>
        )}
    </div>
);
