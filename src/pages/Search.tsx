import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search as SearchIcon, X, TrendingUp, Clock, Plus, Minus } from 'lucide-react';
import { PRODUCTS, Product } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import { motion } from 'framer-motion';
import { Mascot } from '../components/Mascot';

export const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { items, addToCart, updateQuantity } = useCart();

  // Mock recent searches
  const [recentSearches, setRecentSearches] = useState(['Milk', 'Kashmiri Bread', 'Saffron']);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  const getQuantity = (productId: string) => {
    return items.find(i => i.id === productId)?.quantity || 0;
  };

  const clearRecent = () => setRecentSearches([]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-kash-dark-bg pb-24 transition-colors duration-300">
      {/* Search Header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-kash-dark-card border-b border-gray-100 dark:border-kash-dark-border p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <ArrowLeft size={22} />
          </button>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for 'Nadru' or 'Milk'..."
              className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-kash-green-500/50"
            />
            <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Default View: Recent & Trending */}
        {query === '' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8 mt-2"
          >
            <Mascot
              variant="card"
              expression="search"
              title="Search Srinagar's Best"
              message="Looking for something specific? I can help you find fresh Harissa, Nadru, or your daily essentials across all local marts."
            />

            {recentSearches.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm">Recent Searches</h3>
                  <button onClick={clearRecent} className="text-xs text-kash-green-600 dark:text-kash-green-400 font-medium">Clear</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuery(term)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-kash-dark-card border border-gray-200 dark:border-kash-dark-border rounded-lg text-sm text-gray-600 dark:text-gray-300"
                    >
                      <Clock size={14} className="text-gray-400" />
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-3">Trending Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Winter Essentials', 'Wazwan Special', 'Dry Fruits', 'Morning Bakery'].map((trend, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white dark:bg-kash-dark-card rounded-xl border border-gray-100 dark:border-kash-dark-border shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-kash-green-50 dark:bg-kash-green-900/30 flex items-center justify-center text-kash-green-600 dark:text-kash-green-400">
                      <TrendingUp size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{trend}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Search Results */}
        {query !== '' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {results.length} results found
            </h3>

            {results.length === 0 ? (
              <div className="py-4">
                <Mascot
                  variant="card"
                  expression="search"
                  title="Couldn't find that"
                  message="I checked everywhere, but that item isn't available right now. Try searching for something else?"
                  action={{
                    label: "View all marts",
                    onClick: () => navigate('/marts')
                  }}
                />
              </div>
            ) : (
              <div className="grid gap-3">
                {results.map(product => {
                  const qty = getQuantity(product.id);
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-kash-dark-card rounded-xl p-3 flex gap-3 shadow-sm border border-gray-50 dark:border-kash-dark-border"
                    >
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{product.name}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{product.weight}</p>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400 line-through">{formatPrice(product.mrp)}</span>
                            <span className="font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
                          </div>

                          {qty === 0 ? (
                            <button
                              onClick={() => addToCart(product)}
                              className="bg-white dark:bg-transparent border border-kash-green-600 text-kash-green-600 dark:text-kash-green-400 px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm hover:bg-green-50 dark:hover:bg-kash-green-900/20 uppercase"
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
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
