import { ArrowLeft, Plus, Trash2, Home, Briefcase, MapPin, X, Navigation, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Address } from '../types';
import { useLocation } from '../context/LocationContext';

interface AddressWithIcon extends Address {
    icon: any;
}

export const Addresses = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { detectLocation, location, isLoading: isLocating } = useLocation();
    const [isAdding, setIsAdding] = useState(false);
    const [newAddress, setNewAddress] = useState({ type: 'Home' as any, value: '' });

    const [addresses, setAddresses] = useState<AddressWithIcon[]>(() => {
        if (user?.addresses && user.addresses.length > 0) {
            return user.addresses.map(addr => ({
                ...addr,
                icon: addr.type === 'Home' ? Home : addr.type === 'Work' ? Briefcase : MapPin
            }));
        }
        return [
            { id: '1', type: 'Home', value: 'H.No 12, Rajbagh Extension, Srinagar', icon: Home },
            { id: '2', type: 'Work', value: 'KashCart Tech Park, Rangreth, Srinagar', icon: Briefcase }
        ] as AddressWithIcon[];
    });

    const handleDelete = (id: string) => {
        setAddresses(prev => prev.filter((addr) => addr.id !== id));
    };

    const handleAutoDetect = async () => {
        await detectLocation();
        if (location?.address) {
            setNewAddress(prev => ({ ...prev, value: location.address }));
        }
    };

    const handleAdd = () => {
        if (!newAddress.value) return;
        const fresh: AddressWithIcon = {
            id: Math.random().toString(36).substr(2, 9),
            type: newAddress.type,
            value: newAddress.value,
            icon: newAddress.type === 'Home' ? Home : newAddress.type === 'Work' ? Briefcase : MapPin
        };
        setAddresses(prev => [...prev, fresh]);
        setNewAddress({ type: 'Home', value: '' });
        setIsAdding(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-kash-dark-bg transition-colors duration-300">
            {/* Header */}
            <div className="bg-white dark:bg-kash-dark-card p-4 flex items-center shadow-sm sticky top-0 z-10 transition-colors duration-300">
                <button onClick={() => navigate(-1)} className="mr-4 text-gray-700 dark:text-gray-200">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="font-bold text-lg text-gray-900 dark:text-white">Saved Addresses</h1>
            </div>

            <div className="p-4 space-y-4">
                <AnimatePresence mode="popLayout">
                    {addresses.map((addr) => (
                        <motion.div
                            key={addr.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white dark:bg-kash-dark-card p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-kash-dark-border flex items-start gap-4"
                        >
                            <div className="w-10 h-10 bg-kash-green-50 dark:bg-kash-green-900/20 rounded-xl flex items-center justify-center text-kash-green-600 dark:text-kash-green-400 flex-shrink-0">
                                <addr.icon size={20} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-gray-900 dark:text-white">{addr.type}</h3>
                                    <button
                                        onClick={() => handleDelete(addr.id)}
                                        className="text-red-500 p-1 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {addr.value}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <button
                    onClick={() => setIsAdding(true)}
                    className="w-full bg-white dark:bg-kash-dark-card border-2 border-dashed border-gray-200 dark:border-kash-dark-border p-4 rounded-2xl flex items-center justify-center gap-2 text-kash-green-600 dark:text-kash-green-400 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    <Plus size={20} />
                    Add New Address
                </button>
            </div>

            {/* Add Address Sheet */}
            <AnimatePresence>
                {isAdding && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAdding(false)}
                            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-kash-dark-card rounded-t-[32px] p-6 max-w-[430px] mx-auto shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add New Address</h3>
                                <button onClick={() => setIsAdding(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-2">
                                    {['Home', 'Work', 'Other'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setNewAddress({ ...newAddress, type: type as any })}
                                            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border-2 ${newAddress.type === type
                                                    ? 'bg-kash-green-600 border-kash-green-600 text-white shadow-lg shadow-kash-green-200 dark:shadow-none'
                                                    : 'bg-gray-50 dark:bg-gray-800 border-transparent text-gray-500'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Location Details</label>
                                    <div className="relative">
                                        <textarea
                                            placeholder="H.No, Street, Landmark, Area..."
                                            value={newAddress.value}
                                            onChange={(e) => setNewAddress({ ...newAddress, value: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-kash-green-600 rounded-2xl p-4 text-gray-900 dark:text-white outline-none transition-all h-32 resize-none"
                                        />
                                        <button
                                            onClick={handleAutoDetect}
                                            disabled={isLocating}
                                            className="absolute right-4 bottom-4 text-kash-green-600 font-bold text-[10px] flex items-center gap-1.5 bg-white dark:bg-kash-dark-card px-4 py-2 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 transition-all hover:scale-105 active:scale-95 disabled:opacity-70"
                                        >
                                            {isLocating ? <Loader2 size={12} className="animate-spin" /> : <Navigation size={12} />}
                                            {isLocating ? 'DETECTING...' : 'USE CURRENT LOCATION'}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAdd}
                                    disabled={!newAddress.value}
                                    className="w-full bg-kash-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-kash-green-200 dark:shadow-none disabled:opacity-50 transition-all hover:bg-kash-green-700"
                                >
                                    Save Address
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
