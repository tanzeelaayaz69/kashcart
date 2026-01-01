import { useEffect, useState, useMemo } from 'react';
import { api } from '../services/api';
import { Mart } from '../types';
import { Star, Clock, ArrowLeft, Search, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '../components/ui/Skeleton';
import { getAssetPath } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

export const Marts = () => {
    const { theme } = useTheme();
    const [marts, setMarts] = useState<Mart[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMarts = async () => {
            try {
                const data = await api.getMarts();
                setMarts(data);
            } finally {
                setLoading(false);
            }
        };
        fetchMarts();
    }, []);

    const filteredMarts = useMemo(() => {
        return marts.filter(mart =>
            mart.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mart.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [marts, searchQuery]);

    return (
        <div className="pb-24 bg-gray-50 dark:bg-kash-dark-bg min-h-screen transition-colors duration-300">
            <div className="sticky top-0 z-40 bg-white/80 dark:bg-kash-dark-bg/80 backdrop-blur-md border-b border-gray-100 dark:border-kash-dark-border px-4 py-4">
                <AnimatePresence mode="wait">
                    {!isSearching ? (
                        <motion.div
                            key="header-default"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="p-1 -ml-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                                >
                                    <ArrowLeft size={24} />
                                </button>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">All Marts</h1>
                            </div>
                            <button
                                onClick={() => setIsSearching(true)}
                                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                            >
                                <Search size={24} />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="header-search"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center gap-3"
                        >
                            <div className="flex-1 relative">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    autoFocus
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for a mart..."
                                    className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl py-2 pl-10 pr-10 outline-none ring-2 ring-transparent focus:ring-kash-green-500/50 transition-all text-sm"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => {
                                    setIsSearching(false);
                                    setSearchQuery('');
                                }}
                                className="text-sm font-bold text-kash-green-600 dark:text-kash-green-400 uppercase tracking-wider"
                            >
                                Cancel
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {!isSearching && (
                <div className="px-4 mt-6">
                    <div className="bg-white dark:bg-kash-dark-card border border-gray-100 dark:border-kash-dark-border rounded-[2rem] p-5 shadow-sm overflow-hidden relative group">
                        {/* Subtle Background Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-kash-green-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />

                        <div className="flex items-center gap-5 relative z-10">
                            {/* Professional Mascot Placement */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-20 h-20 bg-kash-green-50 dark:bg-kash-green-900/10 rounded-2xl flex-shrink-0 flex items-center justify-center border border-kash-green-100 dark:border-kash-green-900/20 overflow-hidden shadow-inner"
                            >
                                <motion.img
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                    src={theme === 'dark' ? getAssetPath('/images/mascot/mir-all-marts-dark.png') : getAssetPath('/images/mascot/mir-all-marts.png')}
                                    alt="Mir"
                                    className="w-full h-full object-contain scale-110 translate-y-0.5"
                                />
                            </motion.div>

                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">Explore Local Marts</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                    I've handpicked the best stores near you in Srinagar.
                                </p>
                                <div className="flex gap-3 mt-3">
                                    <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800/50 px-2.5 py-1 rounded-full border border-gray-100 dark:border-gray-700">
                                        <span className="w-1.5 h-1.5 bg-kash-green-500 rounded-full animate-pulse" />
                                        <span className="text-[9px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Fast Delivery</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800/50 px-2.5 py-1 rounded-full border border-gray-100 dark:border-gray-700">
                                        <span className="w-1.5 h-1.5 bg-kash-green-500 rounded-full animate-pulse" />
                                        <span className="text-[9px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={`px-4 ${isSearching ? 'mt-4' : 'mt-6'}`}>
                <div className="space-y-4">
                    {loading ? (
                        [1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="bg-white dark:bg-kash-dark-card rounded-2xl p-3 shadow-sm flex gap-4">
                                <Skeleton className="w-24 h-24 rounded-xl" />
                                <div className="flex-1 py-1 space-y-2">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                    <div className="flex gap-2 mt-4">
                                        <Skeleton className="h-4 w-12" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : filteredMarts.length === 0 ? (
                        <div className="py-10">
                            <div className="text-center py-10 px-4">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-52 h-52 mx-auto mb-8 bg-kash-green-50 dark:bg-kash-green-900/10 rounded-[3rem] flex items-center justify-center border border-kash-green-100 dark:border-kash-green-900/20 shadow-inner overflow-hidden"
                                >
                                    <motion.img
                                        animate={{ y: [0, -12, 0] }}
                                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                        src={theme === 'dark' ? getAssetPath('/images/mascot/mir-sad-empty-dark.png') : getAssetPath('/images/mascot/mir-sad-empty.png')}
                                        alt="Mascot"
                                        className="w-full h-full object-contain scale-110 mix-blend-multiply dark:mix-blend-plus-lighter drop-shadow-2xl"
                                    />
                                </motion.div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {searchQuery ? "No marts match your search" : "No marts nearby yet"}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                                    {searchQuery
                                        ? "I couldn't find any marts with that name. Try a different keyword or browse the full list!"
                                        : "We're expanding to your area soon. Want to be the first to know when we arrive?"
                                    }
                                </p>
                                {!searchQuery && (
                                    <button className="bg-kash-green-500 hover:bg-kash-green-600 text-white py-3 px-8 rounded-2xl font-bold text-sm transition-colors">
                                        Request Mart &lt; 1 km
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        filteredMarts.map((mart, idx) => (
                            <Link to={`/mart/${mart.id}`} key={mart.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`bg-white dark:bg-kash-dark-card rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-kash-dark-border flex gap-4 transition-colors ${!mart.isOpen ? 'opacity-60 grayscale' : ''}`}
                                >
                                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                                        <img src={mart.image} alt={mart.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">{mart.name}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{mart.tags.join(' • ')}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-3 text-xs font-medium text-gray-600 dark:text-gray-400">
                                                <span className="flex items-center bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">
                                                    <Star size={12} className="mr-1 fill-current" /> {mart.rating}
                                                </span>
                                                <span className="flex items-center">
                                                    <Clock size={12} className="mr-1" /> {mart.deliveryTime}
                                                </span>
                                            </div>
                                            {!mart.isOpen && <span className="text-red-500 text-xs font-bold">Closed</span>}
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

