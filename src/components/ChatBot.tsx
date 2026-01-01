import { useState, useRef, useEffect } from 'react';
import { X, Send, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MascotHead, MASCOT_IMAGES } from './Mascot';
import { useTheme } from '../context/ThemeContext';
import { cn, getAssetPath } from '../lib/utils';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export const ChatBot = () => {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Salam! I'm Mir, your personal assistant. How can I help you find the best of Srinagar today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: getBotResponse(inputValue),
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const getBotResponse = (input: string) => {
        const text = input.toLowerCase();
        if (text.includes('order') || text.includes('track')) return "You can track your order in the 'Track' section. I'll make sure it reaches you fresh and on time!";
        if (text.includes('delivery')) return "We deliver across Srinagar within 30-60 minutes. From Lal Chowk to Soura, we've got you covered!";
        if (text.includes('payment') || text.includes('pay')) return "We accept UPI, Credit/Debit cards, and Cash on Delivery. Whatever is easiest for you!";
        if (text.includes('hello') || text.includes('salam') || text.includes('hi')) return "Salam! Hope you're having a beautiful day. Looking for some fresh Nadru or maybe some noon chai essentials?";
        if (text.includes('missing') || text.includes('found')) return "I'm sorry about that! If something is missing, please contact our support immediately, and I'll personally look into it.";
        return "That's a great question! I'm still learning about everything in the valley. Let me connect you with our support team or try searching for it.";
    };

    return (
        <div className="fixed bottom-28 right-2 z-[40] sm:right-[calc(50%-215px)]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, originY: 'bottom', originX: 'right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-24 right-0 w-[320px] h-[450px] bg-white dark:bg-kash-dark-card rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-kash-dark-border flex flex-col overflow-hidden"
                    >
                        {/* Chat Header */}
                        <div className="p-4 bg-white dark:bg-kash-dark-card border-b border-gray-100 dark:border-kash-dark-border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <MascotHead />
                                <div>
                                    <h3 className="font-black text-gray-900 dark:text-white text-sm tracking-tight leading-none">Mir</h3>
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="w-1.5 h-1.5 bg-kash-green-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Always here</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors text-gray-500"
                            >
                                <Minus size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide bg-gray-50/50 dark:bg-black/20">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: msg.sender === 'user' ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={cn(
                                        "flex flex-col max-w-[85%]",
                                        msg.sender === 'user' ? "ml-auto items-end" : "items-start"
                                    )}
                                >
                                    <div className={cn(
                                        "p-3.5 rounded-2xl text-sm font-medium leading-relaxed shadow-sm",
                                        msg.sender === 'user'
                                            ? "bg-kash-green-600 text-white rounded-br-none"
                                            : "bg-white dark:bg-kash-dark-card text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-kash-dark-border"
                                    )}>
                                        {msg.text}
                                    </div>
                                    <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex items-start gap-2">
                                    <div className="bg-white dark:bg-kash-dark-card p-3 rounded-2xl rounded-bl-none flex gap-1 items-center border border-gray-100 dark:border-kash-dark-border shadow-sm">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-kash-dark-card border-t border-gray-100 dark:border-kash-dark-border">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask Mir..."
                                    className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-kash-green-500/20 rounded-2xl py-3 pl-4 pr-12 text-sm font-semibold text-gray-900 dark:text-white outline-none transition-all"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim()}
                                    className="absolute right-2 p-2 bg-kash-green-600 text-white rounded-xl shadow-lg hover:bg-kash-green-700 transition-all active:scale-90 disabled:opacity-50 disabled:shadow-none"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-20 h-20 rounded-[2rem] shadow-2xl flex items-center justify-center transition-all duration-300 border-2 overflow-hidden",
                    isOpen
                        ? "bg-white dark:bg-kash-dark-card text-gray-500 border-gray-100 dark:border-gray-700"
                        : "bg-kash-green-50 dark:bg-kash-green-900/20 border-kash-green-100 dark:border-kash-green-900/40 shadow-kash-green-500/20"
                )}
            >
                {isOpen ? <X size={24} /> : (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            src={theme === 'dark' ? getAssetPath('/images/mascot/mir-idea-dark.png') : getAssetPath(MASCOT_IMAGES.idea)}
                            alt="Chat"
                            className="w-[140%] h-[140%] object-cover object-top translate-y-2.5 mix-blend-multiply dark:mix-blend-plus-lighter"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute top-5 right-5 w-4 h-4 bg-red-500 border-2 border-white dark:border-kash-dark-card rounded-full z-10 shadow-lg"
                        />
                    </div>
                )}
            </motion.button>
        </div>
    );
};
