import { ArrowLeft, Bell, Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Notification {
    id: string;
    type: 'order' | 'delivery' | 'success' | 'alert';
    title: string;
    message: string;
    time: string;
    read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        type: 'delivery',
        title: 'Order Out for Delivery',
        message: 'Your order #12345 is on the way and will arrive in 10 minutes',
        time: '5 mins ago',
        read: false,
    },
    {
        id: '2',
        type: 'success',
        title: 'Order Delivered Successfully',
        message: 'Your order #12344 has been delivered. Enjoy your items!',
        time: '2 hours ago',
        read: false,
    },
    {
        id: '3',
        type: 'order',
        title: 'Order Confirmed',
        message: 'Your order #12346 has been confirmed and is being prepared',
        time: '1 day ago',
        read: true,
    },
    {
        id: '4',
        type: 'alert',
        title: 'Special Offer',
        message: 'Get 20% off on your next order. Use code: KASH20',
        time: '2 days ago',
        read: true,
    },
];

const getIcon = (type: Notification['type']) => {
    switch (type) {
        case 'order':
            return <Package size={20} className="text-blue-500" />;
        case 'delivery':
            return <Truck size={20} className="text-orange-500" />;
        case 'success':
            return <CheckCircle size={20} className="text-green-500" />;
        case 'alert':
            return <AlertCircle size={20} className="text-purple-500" />;
    }
};

export const Notifications = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-kash-dark-bg pb-20 transition-colors duration-300">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-white dark:bg-kash-dark-card border-b border-gray-200 dark:border-kash-dark-border px-4 py-4 transition-colors">
                <div className="flex items-center gap-3">
                    <Link to="/" className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-gray-700 dark:text-gray-300" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Stay updated with your orders</p>
                    </div>
                    <Bell size={20} className="text-gray-400" />
                </div>
            </div>

            {/* Notifications List */}
            <div className="px-4 py-4 space-y-3">
                {MOCK_NOTIFICATIONS.map((notification, idx) => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`bg-white dark:bg-kash-dark-card rounded-2xl p-4 border transition-all ${notification.read
                            ? 'border-gray-100 dark:border-kash-dark-border'
                            : 'border-kash-green-200 dark:border-kash-green-900 bg-kash-green-50 dark:bg-kash-green-950'
                            }`}
                    >
                        <div className="flex gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                {getIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                                        {notification.title}
                                    </h3>
                                    {!notification.read && (
                                        <span className="w-2 h-2 bg-kash-green-500 rounded-full flex-shrink-0 mt-1"></span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                                    {notification.message}
                                </p>
                                <span className="text-xs text-gray-400 dark:text-gray-500 mt-2 block">
                                    {notification.time}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State (if no notifications) */}
            {MOCK_NOTIFICATIONS.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 px-8 text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                        <Bell size={24} />
                    </div>
                    <p className="font-medium">All caught up!</p>
                    <p className="text-sm">No new notifications for you right now.</p>
                </div>
            )}
        </div>
    );
};
