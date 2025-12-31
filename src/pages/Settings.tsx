import { ArrowLeft, Moon, Sun, Bell, Globe, Shield, Info, ChevronRight, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface SettingItem {
    icon: any;
    label: string;
    sub?: string;
    action: () => void;
    value?: string;
    isToggle?: boolean;
}

interface SettingSection {
    title: string;
    items: SettingItem[];
}

export const Settings = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [language, setLanguage] = useState('English (US)');

    const closeModal = () => setActiveModal(null);

    const sections: SettingSection[] = [
        {
            title: 'App Settings',
            items: [
                {
                    icon: theme === 'dark' ? Moon : Sun,
                    label: 'Dark Mode',
                    action: toggleTheme,
                    value: theme === 'dark' ? 'On' : 'Off',
                    isToggle: true
                },
                {
                    icon: Bell,
                    label: 'Notifications',
                    sub: 'Sound, Vibration, Banner',
                    action: () => navigate('/notifications'),
                },
                {
                    icon: Globe,
                    label: 'App Language',
                    sub: language,
                    action: () => setActiveModal('language'),
                }
            ]
        },
        {
            title: 'Account & Security',
            items: [
                {
                    icon: Shield,
                    label: 'Privacy Policy',
                    action: () => setActiveModal('privacy'),
                },
                {
                    icon: Info,
                    label: 'About KashCart',
                    sub: 'v1.0.4 (Stable)',
                    action: () => setActiveModal('about'),
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-kash-dark-bg transition-colors duration-300">
            {/* Header */}
            <div className="bg-white dark:bg-kash-dark-card p-4 flex items-center shadow-sm sticky top-0 z-10 transition-colors duration-300">
                <button onClick={() => navigate(-1)} className="mr-4 text-gray-700 dark:text-gray-200">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="font-bold text-lg text-gray-900 dark:text-white">Settings</h1>
            </div>

            <div className="p-4 space-y-6">
                {sections.map((section, sidx) => (
                    <div key={sidx}>
                        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-2">
                            {section.title}
                        </h3>
                        <div className="bg-white dark:bg-kash-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-kash-dark-border overflow-hidden">
                            {section.items.map((item, iidx) => (
                                <button
                                    key={iidx}
                                    onClick={item.action}
                                    className="w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-kash-green-600 dark:text-kash-green-400">
                                            <item.icon size={20} />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{item.label}</h4>
                                            {item.sub && <p className="text-xs text-gray-500 dark:text-gray-400">{item.sub}</p>}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {item.isToggle ? (
                                            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-kash-green-600' : 'bg-gray-200'}`}>
                                                <motion.div
                                                    animate={{ x: theme === 'dark' ? 24 : 0 }}
                                                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                {item.value && <span className="text-sm text-gray-400">{item.value}</span>}
                                                <ChevronRight size={18} className="text-gray-300" />
                                            </>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <p className="text-center text-xs text-gray-400 py-4">
                    Made with ❤️ for Kashmir
                </p>
            </div>

            {/* Modals & Bottom Sheets */}
            <AnimatePresence>
                {activeModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-kash-dark-card rounded-t-[32px] p-6 max-w-[430px] mx-auto shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                                    {activeModal.replace('-', ' ')}
                                </h3>
                                <button onClick={closeModal} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>

                            {activeModal === 'language' && (
                                <div className="space-y-3">
                                    {['English (US)', 'Kashmiri', 'Urdu', 'Hindi'].map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => { setLanguage(lang); closeModal(); }}
                                            className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${language === lang
                                                    ? 'border-kash-green-600 bg-kash-green-50/50 dark:bg-kash-green-900/10'
                                                    : 'border-transparent bg-gray-50 dark:bg-gray-800/50'
                                                }`}
                                        >
                                            <span className={`font-semibold ${language === lang ? 'text-kash-green-700 dark:text-kash-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                                {lang}
                                            </span>
                                            {language === lang && <Check size={18} className="text-kash-green-600" />}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {activeModal === 'privacy' && (
                                <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
                                    <p className="mb-4">At KashCart, we take your privacy seriously. We only collect data necessary to provide you with the best delivery experience in Kashmir.</p>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">1. Data Collection</h4>
                                    <p className="mb-4">We collect your name, phone number, and delivery addresses to facilitate orders.</p>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">2. Location Sharing</h4>
                                    <p className="mb-4">We use your real-time location only when you have an active order to ensure accurate delivery tracking.</p>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">3. Security</h4>
                                    <p>Your payment data is processed through secure, encrypted gateways and never stored directly on our servers.</p>
                                </div>
                            )}

                            {activeModal === 'about' && (
                                <div className="text-center py-4">
                                    <div className="w-20 h-20 bg-kash-green-600 rounded-3xl mx-auto flex items-center justify-center text-white font-bold text-4xl mb-4 shadow-lg shadow-kash-green-200">
                                        K
                                    </div>
                                    <h4 className="text-2xl font-black text-gray-900 dark:text-white">KashCart</h4>
                                    <p className="text-sm text-gray-500 mb-6">Simplifying Life in the Valley</p>
                                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 inline-block mx-auto mb-6">
                                        <p className="text-xs font-bold text-gray-400 mb-1">CURRENT VERSION</p>
                                        <p className="text-lg font-bold text-kash-green-600">v1.0.4 Premium</p>
                                    </div>
                                    <p className="text-xs text-gray-400">© 2025 KashCart Kashmir. All rights reserved.</p>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
