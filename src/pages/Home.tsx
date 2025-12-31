import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { CATEGORIES } from '../data/mockData';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getAssetPath } from '../lib/utils';


const TIME_BASED_IMAGES = {
  morning: [
    '/images/hero/morning-1.png', // Dal Lake Foggy Morning
    '/images/hero/morning-2.png', // Pahalgam Valley
    '/images/hero/morning-1.png', // Dal Lake (reuse)
  ],
  afternoon: [
    '/images/hero/afternoon-1.png', // Tulip Garden Srinagar
    '/images/hero/afternoon-2.png', // Gulmarg Meadows
    '/images/hero/afternoon-1.png', // Tulip Garden (reuse)
  ],
  evening: [
    '/images/hero/evening-1.png', // Dal Lake Houseboats Sunset
    '/images/hero/evening-1.png', // Evening (reuse)
    '/images/hero/evening-1.png', // Evening (reuse)
  ],
  night: [
    '/images/hero/evening-1.png', // Evening works for night
    '/images/hero/morning-1.png', // Misty lake works for night
    '/images/hero/evening-1.png', // Evening (reuse)
  ]
};

export const Home = () => {
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  const timeOfDay = getTimeOfDay();
  const currentImages = TIME_BASED_IMAGES[timeOfDay];

  const getGreeting = () => {
    const greetings = {
      morning: { text: 'Good Morning', icon: '☀️' },
      afternoon: { text: 'Good Afternoon', icon: '🌤️' },
      evening: { text: 'Good Evening', icon: '🌙' },
      night: { text: 'Good Night', icon: '💤' }
    };
    return greetings[timeOfDay];
  };

  const greeting = getGreeting();
  const currentImagesWithBase = currentImages.map(img => getAssetPath(img));

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [timeOfDay]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentImages.length, timeOfDay]);



  return (
    <div className="pb-24 bg-gray-50 dark:bg-kash-dark-bg min-h-screen transition-colors duration-300">
      <Header />

      {/* Greeting Banner */}
      <div className="relative overflow-hidden mx-2 mt-2 rounded-3xl shadow-xl h-48">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={`${timeOfDay}-${currentImageIndex}`}
              src={currentImagesWithBase[currentImageIndex]}
              alt="Kashmir"
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full object-cover"
              onLoad={() => console.log('Image loaded:', currentImages[currentImageIndex])}
              onError={(e) => {
                console.error('Image failed to load:', currentImages[currentImageIndex]);
                console.error('Error:', e);
              }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6 text-white z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium opacity-90">{greeting.icon}</span>
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">{greeting.text}</span>
            </div>
            <h1 className="text-3xl font-black font-outfit leading-none">
              {user?.name || 'Guest'}
            </h1>
            <p className="text-gray-100 mt-2 text-sm font-medium opacity-90">What can we find for you today?</p>
          </motion.div>


        </div>
      </div>

      <div className="px-4 mt-6 pb-6">
        {/* Categories Grid - Blinkit Style */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-bold text-gray-800 dark:text-gray-100 text-xl">Explore Categories</h2>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col items-center"
            >
              <Link to={`/category/${cat.id}`} className="w-full">
                <div className="aspect-square bg-gradient-to-br from-white to-gray-50 dark:from-kash-dark-card dark:to-kash-dark-border rounded-2xl shadow-sm p-2.5 flex items-center justify-center mb-2 overflow-hidden border border-gray-100 dark:border-kash-dark-border transition-all hover:shadow-md hover:scale-105 active:scale-95">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 text-center block leading-tight">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>


      </div>
    </div >
  );
};
