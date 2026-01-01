import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus, Minus, Star, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { Mart, Product } from '../types';
import { Skeleton } from '../components/ui/Skeleton';

import { AddToCartModal } from '../components/AddToCartModal';
import { RecurringFrequency } from '../context/CartContext';
import { Mascot } from '../components/Mascot';

export const MartDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addToCart, updateQuantity, cartTotal, itemCount } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [mart, setMart] = useState<Mart | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (id) {
        const [martData, productsData] = await Promise.all([
          api.getMartById(id),
          api.getProductsByMart(id, activeCategory)
        ]);
        setMart(martData);
        setProducts(productsData);
      }
      setLoading(false);
    };
    fetchData();
  }, [id, activeCategory]);

  const getQuantity = (productId: string) => {
    return items.find(i => i.id === productId)?.quantity || 0;
  };

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCartConfirm = (orderType: 'one-time' | 'recurring', frequency?: string) => {
    if (selectedProduct) {
      const isRecurring = orderType === 'recurring';
      const recurringFreq = frequency as RecurringFrequency;
      addToCart(selectedProduct, isRecurring, recurringFreq);
      setIsModalOpen(false);
      setSelectedProduct(null);
    }
  };

  if (loading && !mart) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-kash-dark-bg">
        <Skeleton className="h-48 w-full" />
        <div className="p-4 space-y-4">
          <Skeleton className="h-10 w-full rounded-xl" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-8 w-20 rounded-full" />)}
          </div>
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-28 w-full rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (!mart) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-kash-dark-bg flex flex-col items-center justify-center p-8">
        <Mascot
          variant="card"
          expression="concerned"
          title="Mart Not Found"
          message="We couldn't find the mart you're looking for. It might have moved or is currently unavailable."
          action={{
            label: "View All Marts",
            onClick: () => navigate('/marts')
          }}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-kash-dark-bg min-h-screen pb-24 transition-colors duration-300">
      {/* Header Image */}
      <div className="relative h-48 w-full">
        <img src={mart.image} alt={mart.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-2xl font-bold">{mart.name}</h1>
          <div className="flex items-center gap-2 text-sm mt-1 opacity-90">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span>{mart.rating}</span>
            <span>•</span>
            <span>{mart.deliveryTime}</span>
            <span>•</span>
            <span>{mart.distance}</span>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="sticky top-0 z-30 bg-white dark:bg-kash-dark-card shadow-sm pb-2 transition-colors duration-300">
        <div className="p-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search in ${mart.name}...`}
              className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-kash-green-500/20 transition-colors"
            />
          </div>
        </div>

        {/* Categories Scroll */}
        <div className="flex overflow-x-auto px-4 gap-2 pb-2 scrollbar-hide">
          {['All', 'Dairy', 'Snacks', 'Bakery', 'Breakfast', 'Drinks'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                activeCategory === cat
                  ? "bg-kash-green-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="p-4 grid gap-4">
        {loading ? (
          [1, 2, 3].map(i => <Skeleton key={i} className="h-28 w-full rounded-xl" />)
        ) : (
          products.map(product => {
            const qty = getQuantity(product.id);
            return (
              <div key={product.id} className="bg-white dark:bg-kash-dark-card rounded-xl p-3 flex gap-3 shadow-sm border border-gray-50 dark:border-kash-dark-border transition-colors">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {product.isVegetarian && (
                    <div className="absolute top-1 left-1 w-3 h-3 border border-green-600 flex items-center justify-center bg-white rounded-[2px]">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{product.weight}</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 line-through">{formatPrice(product.mrp)}</span>
                      <span className="font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
                    </div>

                    {qty === 0 ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-white dark:bg-transparent border border-kash-green-600 text-kash-green-700 dark:text-kash-green-400 px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm hover:bg-green-50 dark:hover:bg-kash-green-900/20 uppercase transition-colors"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center bg-kash-green-600 rounded-lg text-white h-8">
                        <button onClick={() => updateQuantity(product.id, -1)} className="px-2.5 h-full flex items-center justify-center hover:bg-kash-green-700 rounded-l-lg">
                          <Minus size={14} strokeWidth={3} />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{qty}</span>
                        <button onClick={() => updateQuantity(product.id, 1)} className="px-2.5 h-full flex items-center justify-center hover:bg-kash-green-700 rounded-r-lg">
                          <Plus size={14} strokeWidth={3} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Cart Button */}
      {itemCount > 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 z-40">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={() => navigate('/cart')}
            className="w-full bg-kash-green-700 text-white p-4 rounded-xl shadow-lg flex items-center justify-between"
          >
            <div className="flex flex-col items-start">
              <span className="text-xs text-green-200 uppercase font-medium">{itemCount} items</span>
              <span className="font-bold text-lg">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex items-center font-bold">
              View Cart <ArrowRight size={18} className="ml-2" />
            </div>
          </motion.button>
        </div>
      )}

      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddToCartConfirm}
        productName={selectedProduct?.name || ''}
      />
    </div>
  );
};
