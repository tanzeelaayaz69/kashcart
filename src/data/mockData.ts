import { faker } from '@faker-js/faker';

// Seed for consistent results
faker.seed(123);

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

const CATEGORIES = [
  { id: 'dairy-bread', name: 'Dairy, Bread & Eggs', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=300&q=80' },
  { id: 'snacks', name: 'Snacks & Munchies', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=300&q=80' },
  { id: 'bakery', name: 'Bakery & Biscuits', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80' },
  { id: 'breakfast', name: 'Breakfast & Instant Food', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=300&q=80' },
  { id: 'tea-coffee', name: 'Tea, Coffee & Health Drinks', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80' },
  { id: 'cold-drinks', name: 'Cold Drinks & Juices', image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=300&q=80' },
  { id: 'sweet-tooth', name: 'Sweet Tooth', image: 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=300&q=80' },
  { id: 'atta-rice-dal', name: 'Atta, Rice & Dal', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80' },
  { id: 'masala-oil', name: 'Masala, Oil & More', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80' },
  { id: 'sauces', name: 'Sauces & Spreads', image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=300&q=80' },
  { id: 'organic', name: 'Organic & Healthy Living', image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=300&q=80' },
  { id: 'baby-care', name: 'Baby Care', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=300&q=80' },
];

export const MARTS: Mart[] = [
  {
    id: 'm1',
    name: 'Pick N Choose',
    rating: 4.8,
    deliveryTime: '10-15 mins',
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80',
    tags: ['Groceries', 'Imported'],
    isOpen: true,
  },
  {
    id: 'm2',
    name: 'Amin Bin Khalik',
    rating: 4.9,
    deliveryTime: '25-30 mins',
    distance: '3.5 km',
    image: 'https://images.unsplash.com/photo-1604719312566-b7cb0463d344?auto=format&fit=crop&w=500&q=80',
    tags: ['Dry Fruits', 'Premium'],
    isOpen: true,
  },
  {
    id: 'm3',
    name: 'Local Kandur',
    rating: 4.7,
    deliveryTime: '5-10 mins',
    distance: '0.5 km',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80',
    tags: ['Fresh Bread', 'Bakery'],
    isOpen: true,
  },
  {
    id: 'm4',
    name: '7/11 Departmental',
    rating: 4.5,
    deliveryTime: '15-20 mins',
    distance: '2.0 km',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=500&q=80',
    tags: ['Essentials', 'Household'],
    isOpen: false,
  },
];

const PRODUCT_NAMES = {
  veg: ['Nadru (Lotus Stem)', 'Haakh (Collard Greens)', 'Kashmiri Red Chilli', 'Potatoes', 'Onions'],
  fruits: ['Kashmiri Apple', 'Pomegranate', 'Walnuts', 'Apricots'],
  bakery: ['Czot (Local Bread)', 'Kulcha', 'Sheermal', 'Bakarkhani'],
  meat: ['Lamb Meat', 'Chicken', 'Rista Meatballs (Raw)', 'Gushtaba Base'],
  dairy: ['Fresh Milk', 'Curd', 'Local Butter', 'Cheese (Paneer)'],
  spices: ['Saffron (Kesar)', 'Fennel Seeds', 'Turmeric', 'Garam Masala'],
};

export const PRODUCTS: Product[] = [];

// Generate products
Object.entries(PRODUCT_NAMES).forEach(([catId, names]) => {
  names.forEach((name) => {
    PRODUCTS.push({
      id: faker.string.uuid(),
      name: name,
      price: parseInt(faker.commerce.price({ min: 40, max: 500 })),
      mrp: parseInt(faker.commerce.price({ min: 550, max: 800 })),
      image: CATEGORIES.find(c => c.id === catId)?.image || '',
      category: catId,
      weight: catId === 'bakery' ? '1 pc' : '1 kg',
      martId: MARTS[Math.floor(Math.random() * MARTS.length)].id,
      isVegetarian: catId !== 'meat',
    });
  });
});

export { CATEGORIES };
