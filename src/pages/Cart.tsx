import { useCart, RecurringFrequency } from '../context/CartContext';
import { ArrowLeft, Plus, Minus, Clock, MapPin, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../lib/utils';
import { Mascot } from '../components/Mascot';

export const Cart = () => {
  const { items, updateQuantity, cartTotal, updateRecurring } = useCart();
  const navigate = useNavigate();

  const deliveryFee = 30;
  const platformFee = 5;
  const finalTotal = cartTotal + deliveryFee + platformFee;

  const handleCheckout = () => {
    navigate('/payment');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-kash-dark-bg flex flex-col items-center justify-center p-8 transition-colors duration-300">
        <Mascot
          variant="card"
          expression="cart"
          title="Your cart is empty"
          message="Need to restock essentials? Check your favorite marts for fresh arrivals."
          action={{
            label: "Start Shopping",
            onClick: () => navigate('/')
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-kash-dark-bg pb-48 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-kash-dark-card p-4 flex items-center shadow-sm sticky top-0 z-10 transition-colors duration-300">
        <button onClick={() => navigate(-1)} className="mr-4 text-gray-700 dark:text-gray-200">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="font-bold text-lg text-gray-900 dark:text-white">Your Cart</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">{items.length} items in basket</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Delivery Info */}
        <div className="bg-white dark:bg-kash-dark-card rounded-xl p-4 shadow-sm border border-gray-100 dark:border-kash-dark-border transition-colors">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
              <Clock size={20} className="text-kash-green-700 dark:text-kash-green-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Delivery in 12 mins</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Shipment of {items.length} items</p>
            </div>
          </div>
          <div className="flex items-start gap-3 pt-3 border-t border-gray-50 dark:border-gray-800">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
              <MapPin size={20} className="text-kash-green-700 dark:text-kash-green-400" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Home</h3>
                <button className="text-xs text-kash-green-600 dark:text-kash-green-400 font-bold">CHANGE</button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">H.No 12, Rajbagh Extension, Srinagar...</p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white dark:bg-kash-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-kash-dark-border overflow-hidden transition-colors">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 p-4 border-b border-gray-50 dark:border-gray-800 last:border-0">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.weight}</p>

                    {/* Recurring Options in Cart */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <button
                        onClick={() => updateRecurring(item.id, !item.isRecurring, item.isRecurring ? null : 'daily')}
                        className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md border transition-all flex items-center gap-1 ${item.isRecurring
                          ? 'bg-kash-green-600 border-kash-green-600 text-white shadow-sm'
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:border-kash-green-500'
                          }`}
                      >
                        <RefreshCw size={10} className={item.isRecurring ? 'animate-spin-slow' : ''} />
                        {item.isRecurring ? 'Recurring' : 'Set Recurring'}
                      </button>

                      {item.isRecurring && (
                        <select
                          value={item.recurringFrequency || 'daily'}
                          onChange={(e) => updateRecurring(item.id, true, e.target.value as RecurringFrequency)}
                          className="text-[10px] font-bold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-1 py-1 focus:ring-1 focus:ring-kash-green-500 outline-none text-gray-700 dark:text-gray-200"
                        >
                          <option value="daily">Daily</option>
                          <option value="2days">Every 2 Days</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-gray-900 dark:text-white">{formatPrice(item.price)}</span>
                  <div className="flex items-center bg-kash-green-600 rounded-lg text-white h-7">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-2 h-full flex items-center justify-center hover:bg-kash-green-700 rounded-l-lg">
                      <Minus size={12} strokeWidth={3} />
                    </button>
                    <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-2 h-full flex items-center justify-center hover:bg-kash-green-700 rounded-r-lg">
                      <Plus size={12} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Details */}
        <div className="bg-white dark:bg-kash-dark-card rounded-xl p-4 shadow-sm border border-gray-100 dark:border-kash-dark-border transition-colors">
          <h3 className="font-bold text-sm mb-3 text-gray-900 dark:text-white">Bill Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Item Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Delivery Fee</span>
              <span>{formatPrice(deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Platform Fee</span>
              <span>{formatPrice(platformFee)}</span>
            </div>
            <div className="border-t border-dashed border-gray-200 dark:border-gray-700 my-2"></div>
            <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
              <span>To Pay</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </div>


      </div>

      {/* Footer */}
      <div className="fixed bottom-20 left-0 right-0 z-50 bg-white dark:bg-kash-dark-card border-t border-gray-100 dark:border-kash-dark-border p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] max-w-[430px] mx-auto transition-colors">
        <button
          onClick={handleCheckout}
          className="w-full bg-kash-green-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-green-200 dark:shadow-none flex justify-between px-6 items-center"
        >
          <>
            <span>{formatPrice(finalTotal)}</span>
            <span className="flex items-center">Proceed to Pay <ArrowLeft className="rotate-180 ml-2" size={20} /></span>
          </>
        </button>
      </div>
    </div>
  );
};
