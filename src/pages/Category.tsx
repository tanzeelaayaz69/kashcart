import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { PRODUCTS } from '../data/mockData';
import { Product } from '../types';
import { Star, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Skeleton } from '../components/ui/Skeleton';
import { AddToCartModal } from '../components/AddToCartModal';
import { RecurringFrequency } from '../context/CartContext';

import { Mascot } from '../components/Mascot';

export const Category = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items: cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      if (id) {
        const products = PRODUCTS.filter(product => product.category === id);
        setFilteredProducts(products);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

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

  const handleQuantityChange = (product: Product, change: number) => {
    const cartItem = cartItems.find(item => item.id === product.id);
    const currentQuantity = cartItem?.quantity || 0;
    const newQuantity = currentQuantity + change;

    if (newQuantity <= 0) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, change);
    }
  };

  const getCategoryName = (categoryId: string) => {
    const categoryMap: Record<string, string> = {
      'dairy-bread': 'Dairy, Bread & Eggs',
      'snacks': 'Snacks & Munchies',
      'bakery': 'Bakery & Biscuits',
      'breakfast': 'Breakfast & Instant Food',
      'tea-coffee': 'Tea, Coffee & Health Drinks',
      'cold-drinks': 'Cold Drinks & Juices',
      'sweet-tooth': 'Sweet Tooth',
      'atta-rice-dal': 'Atta, Rice & Dal',
      'masala-oil': 'Masala, Oil & More',
      'sauces': 'Sauces & Spreads',
      'organic': 'Organic & Healthy Living',
      'baby-care': 'Baby Care'
    };
    return categoryMap[categoryId] || 'Category';
  };

  return (
    <div className="pb-24 bg-gray-50 dark:bg-kash-dark-bg min-h-screen transition-colors duration-300">
      <Header />

      <div className="px-4 mt-2">
        {/* Back button */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-kash-green-600 dark:hover:text-kash-green-400 transition-colors"
          >
            <span className="mr-2">←</span> Back
          </button>
        </div>

        {/* Category header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {getCategoryName(id || '')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {filteredProducts.length} products available
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 gap-4">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="bg-white dark:bg-kash-dark-card rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-kash-dark-border">
                <Skeleton className="w-full aspect-square rounded-xl mb-2" />
                <Skeleton className="h-4 w-3/4 mb-1" />
                <Skeleton className="h-3 w-1/2 mb-2" />
                <Skeleton className="h-8 w-full rounded-lg" />
              </div>
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const cartItem = cartItems.find(item => item.id === product.id);
              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-kash-dark-card rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-kash-dark-border flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-xl mb-2"
                    />
                    <div className="absolute top-2 right-2 bg-white/80 dark:bg-kash-dark-card/80 backdrop-blur-sm rounded-full p-1">
                      <Star size={12} className="text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600 dark:text-gray-300 ml-1">4.8</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {product.weight}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <span className="font-bold text-gray-900 dark:text-white">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 line-through ml-2">
                          ₹{product.mrp}
                        </span>
                      </div>

                      {quantity > 0 ? (
                        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-2 py-1">
                          <button
                            onClick={() => handleQuantityChange(product, -1)}
                            className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="mx-2 text-sm font-medium">{quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(product, 1)}
                            className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-kash-green-500 hover:bg-kash-green-600 text-white rounded-lg px-3 py-1.5 text-sm font-medium transition-colors flex items-center"
                        >
                          <Plus size={14} className="mr-1" />
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-12">
              <Mascot
                variant="card"
                expression="no-products"
                title="Stocking Up Soon!"
                message="Mir is currently checking with our partners. We'll have these items back on the shelves in no time!"
                action={{
                  label: "Browse Other Items",
                  onClick: () => navigate('/')
                }}
              />
            </div>
          )}
        </div>
      </div>

      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddToCartConfirm}
        productName={selectedProduct?.name || ''}
      />
    </div>
  );
};