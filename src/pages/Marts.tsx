import { useEffect, useState, useMemo } from 'react';
import { api } from '../services/api';
import { Mart } from '../types';
import { Star, Clock, ArrowLeft, Search, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '../components/ui/Skeleton';
import { Mascot } from '../components/Mascot';

export const Marts = () => {
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
                    <Mascot
                        variant="card"
                        expression="marts"
                        title="All marts"
                        message="I've handpicked the best marts near you. From fresh vegetables to pantry essentials, it's all just a tap away."
                    />
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
                            <Mascot
                                variant="card"
                                expression="concerned"
                                title={searchQuery ? "No marts match your search" : "No marts nearby yet"}
                                message={searchQuery
                                    ? "I couldn't find any marts with that name. Try a different keyword or browse the full list!"
                                    : "We're expanding to your area soon. Want to be the first to know when we arrive?"
                                }
                                action={!searchQuery ? {
                                    label: "Request Mart < 1 km",
                                    onClick: () => { }
                                } : undefined}
                            />
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

