import { MARTS, PRODUCTS } from '../data/mockData';
import { Product, Mart, User, Order } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Database (LocalStorage)
const STORAGE_KEYS = {
  USER: 'kashcart_user',
  ORDERS: 'kashcart_orders',
};

export const api = {
  // Auth
  login: async (phone: string, name?: string): Promise<User> => {
    await delay(1000);
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    if (stored) {
      const user = JSON.parse(stored);
      if (user.phone === phone) return user;
    }

    const newUser: User = {
      id: `u_${Date.now()}`,
      name: name || 'User',
      phone: phone,
      addresses: [
        { id: 'a1', type: 'Home', value: 'H.No 12, Rajbagh Extension, Srinagar' }
      ]
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    return newUser;
  },

  checkUser: async (phone: string): Promise<boolean> => {
    await delay(500);
    // In a real app, this would check the DB. 
    // Here we'll just check if we have any user in localstorage with this phone.
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    if (stored) {
      const user = JSON.parse(stored);
      return user.phone === phone;
    }
    return false;
  },

  logout: async () => {
    await delay(500);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  getUser: async (): Promise<User | null> => {
    await delay(500); // Check session
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : null;
  },

  // Marts & Products
  getMarts: async (): Promise<Mart[]> => {
    await delay(800);
    return MARTS;
  },

  getMartById: async (id: string): Promise<Mart | undefined> => {
    await delay(600);
    return MARTS.find(m => m.id === id);
  },

  getProductsByMart: async (martId: string, category?: string): Promise<Product[]> => {
    await delay(600);
    let products = PRODUCTS.filter(p => p.martId === martId);
    if (category && category !== 'All') {
      products = products.filter(p =>
        p.category.toLowerCase() === category.toLowerCase() ||
        (category === 'Vegetables' && p.category === 'veg') // Mapping for demo
      );
    }
    return products;
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    await delay(400);
    if (!query) return [];
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
  },

  // Orders
  placeOrder: async (items: any[], total: number): Promise<Order> => {
    await delay(1500); // Processing payment
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      date: new Date().toISOString(),
      items: items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
      total,
      status: 'Processing',
      martName: MARTS.find(m => m.id === items[0]?.martId)?.name || 'Unknown Mart'
    };

    const existingOrders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([newOrder, ...existingOrders]));

    return newOrder;
  },

  getOrders: async (): Promise<Order[]> => {
    await delay(1000);
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
  }
};
