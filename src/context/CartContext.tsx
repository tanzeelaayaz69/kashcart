import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { Product } from '../data/mockData';

export type RecurringFrequency = 'daily' | '2days' | 'weekly' | 'monthly' | null;

interface CartItem extends Product {
  quantity: number;
  isRecurring: boolean;
  recurringFrequency?: RecurringFrequency;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, isRecurring?: boolean, frequency?: RecurringFrequency) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  updateRecurring: (productId: string, isRecurring: boolean, frequency?: RecurringFrequency) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, isRecurring: boolean = false, frequency: RecurringFrequency = null) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, isRecurring, recurringFrequency: frequency }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, isRecurring, recurringFrequency: frequency }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const updateRecurring = (productId: string, isRecurring: boolean, frequency?: RecurringFrequency) => {
    setItems(prev => prev.map(item =>
      item.id === productId ? { ...item, isRecurring, recurringFrequency: frequency } : item
    ));
  };

  const clearCart = () => setItems([]);

  const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, updateRecurring, clearCart, cartTotal, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
