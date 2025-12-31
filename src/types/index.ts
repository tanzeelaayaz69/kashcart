export interface Product {
  id: string;
  name: string;
  price: number;
  mrp: number;
  image: string;
  category: string;
  weight: string;
  martId: string;
  isVegetarian: boolean;
}

export interface Mart {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  image: string;
  tags: string[];
  isOpen: boolean;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  value: string;
}

export interface Order {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'Delivered' | 'Processing' | 'Cancelled';
  martName: string;
}
