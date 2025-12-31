import { useState, useEffect } from 'react';
import { ArrowLeft, Phone, MessageSquare, CheckCircle2, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { MapComponent } from '../components/MapComponent';

export const TrackOrder = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(0);

  // Simulate status progression
  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(prev => (prev < 3 ? prev + 1 : prev));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { title: 'Order Confirmed', time: '5:30 PM' },
    { title: 'Order Packed', time: '5:32 PM' },
    { title: 'Rider Picked Up', time: '5:35 PM' },
    { title: 'Out for Delivery', time: '5:38 PM' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-kash-dark-bg relative transition-colors duration-300">
      {/* Map Background */}
      <MapComponent />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10">
        <button
          onClick={() => navigate('/')}
          className="bg-white dark:bg-kash-dark-card text-gray-700 dark:text-gray-200 p-2 rounded-full shadow-md"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-kash-dark-card rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-20 pb-24 transition-colors duration-300">
        <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mt-3 mb-4" />

        <div className="px-5">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Arriving in 8 mins</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-xs text-gray-500 dark:text-gray-400">On time | 5:45 PM</p>
              </div>
            </div>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative mb-6 mx-2">
            {/* Connecting Lines */}
            <div className="absolute top-3 left-0 w-full h-0.5 bg-gray-100 dark:bg-gray-800 -z-0 rounded-full" />
            <div
              className="absolute top-3 left-0 h-0.5 bg-kash-green-500 -z-0 transition-all duration-500 rounded-full"
              style={{ width: `${(status / (steps.length - 1)) * 100}%` }}
            />

            <div className="flex justify-between relative z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 w-16">
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors duration-300 bg-white dark:bg-kash-dark-card
                    ${idx <= status
                      ? 'border-kash-green-500 text-kash-green-500'
                      : 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-700'}
                  `}>
                    {idx < status ? (
                      <CheckCircle2 size={14} className="fill-kash-green-500 text-white" />
                    ) : idx === status ? (
                      <div className="w-2 h-2 bg-kash-green-500 rounded-full" />
                    ) : (
                      <Circle size={10} className="fill-current" />
                    )}
                  </div>
                  <span className={`
                    text-[9px] text-center leading-tight font-medium transition-colors duration-300
                    ${idx <= status ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}
                  `}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rider Info Card */}
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-3 flex items-center justify-between transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden border-2 border-white dark:border-gray-600">
                  <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=100&q=80" alt="Rider" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-kash-green-500 rounded-full flex items-center justify-center text-white border-2 border-white dark:border-gray-800">
                  <span className="text-[8px] font-bold">4.8</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Imran Khan</h3>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Vaccinated Delivery Partner</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors">
                <MessageSquare size={18} />
              </button>
              <button className="w-8 h-8 bg-kash-green-600 rounded-full flex items-center justify-center shadow-lg shadow-kash-green-600/20 text-white hover:bg-kash-green-700 transition-colors">
                <Phone size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};
