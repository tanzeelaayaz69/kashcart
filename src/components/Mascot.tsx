import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { cn, getAssetPath } from '../lib/utils';
import { X, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export type MascotExpression = 'neutral' | 'happy' | 'concerned' | 'night' | 'marts' | 'cart' | 'search' | 'happy-bag' | 'no-products' | 'idea';

interface MascotProps {
    message: string;
    title?: string;
    expression?: MascotExpression;
    action?: {
        label: string;
        onClick: () => void;
    };
    secondaryAction?: {
        label: string;
        onClick: () => void;
    };
    tertiaryAction?: {
        label: string;
        onClick: () => void;
        icon?: ReactNode;
    };
    onDismiss?: () => void;
    variant?: 'inline' | 'card' | 'full-width';
    className?: string;
}

export const MASCOT_IMAGES = {
    neutral: '/images/mascot/mir.png',
    happy: '/images/mascot/mir.png',
    concerned: '/images/mascot/mir-sad-empty.png',
    night: '/images/mascot/mir.png',
    marts: '/images/mascot/mir-all-marts.png',
    cart: '/images/mascot/mir-cart-new.png',
    search: '/images/mascot/mir-search.jpg',
    'happy-bag': '/images/mascot/mir-cart-new.png',
    'no-products': '/images/mascot/mir-no-products.png',
    idea: '/images/mascot/mir-idea.png'
};

export const Mascot = ({
    message,
    title,
    expression = 'neutral',
    action,
    secondaryAction,
    tertiaryAction,
    onDismiss,
    variant = 'inline',
    className
}: MascotProps) => {
    const { theme } = useTheme();

    const getMascotImage = (expr: MascotExpression) => {
        if (theme === 'dark') {
            if (expr === 'marts') return getAssetPath('/images/mascot/mir-all-marts-dark.png');
            if (expr === 'cart' || expr === 'happy-bag') return getAssetPath('/images/mascot/mir-cart-dark.png');
            if (expr === 'no-products') return getAssetPath('/images/mascot/mir-no-products-dark.png');
            if (expr === 'concerned') return getAssetPath('/images/mascot/mir-sad-empty-dark.png');
            if (expr === 'search') return getAssetPath('/images/mascot/mir-search-dark.png');
            if (expr === 'idea') return getAssetPath('/images/mascot/mir-idea-dark.png');
        }
        return getAssetPath(MASCOT_IMAGES[expr]);
    };

    if (variant === 'card') {
        return (
            <div className={cn("w-full flex flex-col items-center", className)}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-kash-dark-card rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-kash-dark-border text-center relative overflow-hidden w-full"
                >
                    <div className="relative w-full aspect-[4/3] mx-auto mb-6 rounded-3xl overflow-hidden bg-white dark:bg-kash-dark-card">
                        <img
                            src={getMascotImage(expression)}
                            alt="Mir"
                            className="w-full h-full object-contain relative z-10 scale-110"
                        />

                        {/* Soft ambient glow instead of edge-hiding vignette */}
                        <div className="absolute inset-0 z-0 bg-kash-green-500/5 blur-3xl opacity-50" />
                    </div>

                    {title && <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{title}</h3>}
                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-8 leading-relaxed px-4">
                        {message}
                    </p>

                    <div className="flex gap-3 px-2">
                        {action && (
                            <button
                                onClick={action.onClick}
                                className="flex-1 bg-gradient-to-r from-kash-green-500 to-kash-green-600 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-kash-green-900/10 active:scale-95 transition-all"
                            >
                                {action.label}
                            </button>
                        )}
                        {secondaryAction && (
                            <button
                                onClick={secondaryAction.onClick}
                                className="flex-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 py-4 rounded-2xl font-black text-xs uppercase tracking-wider border border-gray-100 dark:border-gray-700 active:scale-95 transition-all"
                            >
                                {secondaryAction.label}
                            </button>
                        )}
                    </div>
                </motion.div>

                {tertiaryAction && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        onClick={tertiaryAction.onClick}
                        className="mt-6 flex items-center gap-2 px-6 py-3 bg-white dark:bg-kash-dark-card border border-gray-100 dark:border-kash-dark-border rounded-2xl shadow-sm text-sm font-bold text-gray-700 dark:text-gray-200 active:scale-95 transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                        {tertiaryAction.icon || <Search size={18} className="text-gray-400" />}
                        {tertiaryAction.label}
                    </motion.button>
                )}
            </div>
        );
    }

    if (variant === 'full-width') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                    "bg-[#242A32] dark:bg-kash-dark-card rounded-[2.5rem] p-6 text-white relative overflow-hidden transition-all",
                    className
                )}
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">🌙</span>
                            <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">it's late</span>
                        </div>
                        <h3 className="text-xl font-black">{title || 'Need quiet delivery?'}</h3>
                    </div>
                    <div className="w-20 h-20">
                        <img
                            src={getAssetPath(MASCOT_IMAGES.night)}
                            alt="Mir Night"
                            className="w-full h-full object-contain opacity-80 mix-blend-multiply dark:mix-blend-plus-lighter"
                        />
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-5 border border-white/10 mb-4">
                    <h4 className="text-base font-black mb-1">Silent delivery available</h4>
                    <p className="text-xs text-white/60 mb-4">• No bell • No calls</p>

                    <button
                        onClick={action?.onClick}
                        className="w-full bg-kash-green-500 text-white py-3.5 rounded-xl font-black text-sm shadow-xl shadow-black/20"
                    >
                        {action?.label || 'Enable Silent Mode'}
                    </button>
                    <button
                        className="w-full mt-3 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white/60 transition-colors"
                    >
                        Later
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                    "bg-white dark:bg-kash-dark-card rounded-[2rem] p-5 shadow-sm border border-gray-100 dark:border-kash-dark-border",
                    className
                )}
            >
                <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-kash-green-50 dark:bg-kash-green-900/20 rounded-2xl flex-shrink-0 overflow-hidden border border-kash-green-100 dark:border-kash-green-900/30">
                        <img
                            src={getMascotImage(expression)}
                            alt="Mir"
                            className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-plus-lighter"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <h3 className="text-base font-black text-gray-900 dark:text-white">{title || 'Mir here!'}</h3>
                            {onDismiss && (
                                <button onClick={onDismiss} className="text-gray-300 hover:text-gray-500"><X size={16} /></button>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-3">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    {action && (
                        <button
                            onClick={action.onClick}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl text-xs font-bold border border-gray-100 dark:border-gray-700 active:scale-95 transition-all"
                        >
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                            {action.label}
                        </button>
                    )}
                    {secondaryAction && (
                        <button
                            onClick={secondaryAction.onClick}
                            className="px-4 py-2 text-gray-400 dark:text-gray-500 text-xs font-bold"
                        >
                            {secondaryAction.label}
                        </button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export const MascotHead = () => {
    const { theme } = useTheme();
    const image = theme === 'dark' ? getAssetPath('/images/mascot/mir-idea-dark.png') : getAssetPath(MASCOT_IMAGES.idea);

    return (
        <div className="relative flex-shrink-0">
            <div className="w-10 h-10 bg-kash-green-50 dark:bg-kash-green-900/20 rounded-xl flex items-center justify-center overflow-hidden border border-kash-green-100 dark:border-kash-green-900/30">
                <img
                    src={image}
                    alt="Mir Head"
                    className="w-12 h-12 object-cover object-top scale-[1.3] translate-y-1 mix-blend-multiply dark:mix-blend-plus-lighter"
                />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-kash-green-500 border-2 border-white dark:border-kash-dark-card rounded-full shadow-sm" />
        </div>
    );
};
