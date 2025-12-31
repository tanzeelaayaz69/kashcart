import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Phone, ShieldCheck, MapPin, ChevronRight } from 'lucide-react';
import { MascotHead } from './Mascot';
import { cn } from '../lib/utils';

export const HelpButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const helpItems = [
        { icon: MapPin, title: 'Delivery Areas', sub: 'Where we deliver in Srinagar' },
        { icon: ShieldCheck, title: 'Safe Payments', sub: 'PCI DSS compliant' },
        { icon: Phone, title: 'Contact Support', sub: 'Available 9AM - 9PM' },
        { icon: Search, title: 'Search Tips', sub: 'Find fresh items faster' },
    ];

    return (
        <div className="fixed bottom-24 right-4 z-40 sm:right-[calc(50%-200px)]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-16 right-0 w-[300px] bg-white dark:bg-kash-dark-card rounded-[2rem] shadow-2xl border border-gray-100 dark:border-kash-dark-border overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 bg-kash-green-50 dark:bg-kash-green-900/10 flex justify-between items-center">
                            <div>
                                <h3 className="font-black text-gray-900 dark:text-white text-sm uppercase tracking-widest">KashCart Help</h3>
                                <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">Mir is here to guide you</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
                            >
                                <X size={16} className="text-gray-400" />
                            </button>
                        </div>

                        {/* Help Items */}
                        <div className="p-4 space-y-2">
                            {helpItems.map((item, idx) => (
                                <button
                                    key={idx}
                                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-kash-green-600 transition-colors">
                                            <item.icon size={18} />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{item.title}</p>
                                            <p className="text-[10px] text-gray-400 dark:text-gray-500">{item.sub}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={14} className="text-gray-300 group-hover:text-kash-green-600" />
                                </button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-4 pt-0">
                            <button className="w-full py-3 bg-kash-green-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-kash-green-900/20 active:scale-95 transition-all">
                                Chat with Support
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Static Mascot Head Icon */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all bg-white dark:bg-kash-dark-card shadow-xl border border-gray-100 dark:border-kash-dark-border",
                    isOpen && "ring-2 ring-kash-green-500 ring-offset-2 dark:ring-offset-kash-dark-bg"
                )}
            >
                <MascotHead />
            </motion.button>
        </div>
    );
};
