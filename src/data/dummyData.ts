// Fruit data - 10 standard fruits (Today's Fresh Fruits - admin controlled)
export interface Fruit {
  id: number;
  name: string;
  image: string;
  category: string;
  seasonal: boolean;
  description: string;
  nutrition: {
    calories: number;
    vitaminC: string;
    fiber: string;
    vitaminA: string;
  };
  available: boolean; // Admin controlled - available today
}

export const fruits: Fruit[] = [
  {
    id: 1,
    name: 'Apple',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop',
    category: 'Core',
    seasonal: false,
    description: 'Crisp and refreshing red apples, always in season.',
    nutrition: { calories: 52, vitaminC: '4.6mg', fiber: '2.4g', vitaminA: '54 IU' },
    available: true
  },
  {
    id: 2,
    name: 'Guava',
    image: 'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=400&h=400&fit=crop',
    category: 'Tropical',
    seasonal: false,
    description: 'Fresh pink guavas with a tropical taste.',
    nutrition: { calories: 68, vitaminC: '228mg', fiber: '5.4g', vitaminA: '624 IU' },
    available: true
  },
  {
    id: 3,
    name: 'Mango',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop',
    category: 'Tropical',
    seasonal: true,
    description: 'Sweet and tropical alphonso mangoes.',
    nutrition: { calories: 60, vitaminC: '36.4mg', fiber: '1.6g', vitaminA: '1082 IU' },
    available: true
  },
  {
    id: 4,
    name: 'Banana',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop',
    category: 'Tropical',
    seasonal: false,
    description: 'Ripe and creamy bananas, great for energy.',
    nutrition: { calories: 89, vitaminC: '8.7mg', fiber: '2.6g', vitaminA: '64 IU' },
    available: true
  },
  {
    id: 5,
    name: 'Papaya',
    image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400&h=400&fit=crop',
    category: 'Tropical',
    seasonal: false,
    description: 'Sweet orange papaya, rich in vitamins.',
    nutrition: { calories: 43, vitaminC: '60.9mg', fiber: '1.7g', vitaminA: '950 IU' },
    available: true
  },
  {
    id: 6,
    name: 'Pineapple',
    image: 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=400&h=400&fit=crop',
    category: 'Tropical',
    seasonal: true,
    description: 'Tropical pineapple with a perfect balance of sweet and tart.',
    nutrition: { calories: 50, vitaminC: '47.8mg', fiber: '1.4g', vitaminA: '58 IU' },
    available: true
  },
  {
    id: 7,
    name: 'Watermelon',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop',
    category: 'Melons',
    seasonal: true,
    description: 'Refreshing watermelon, perfect for hot days.',
    nutrition: { calories: 30, vitaminC: '8.1mg', fiber: '0.4g', vitaminA: '569 IU' },
    available: true
  },
  {
    id: 8,
    name: 'Grapes',
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=400&fit=crop',
    category: 'Berries',
    seasonal: false,
    description: 'Sweet and refreshing green grapes.',
    nutrition: { calories: 69, vitaminC: '3.2mg', fiber: '0.9g', vitaminA: '66 IU' },
    available: true
  },
  {
    id: 9,
    name: 'Muskmelon',
    image: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=400&h=400&fit=crop',
    category: 'Melons',
    seasonal: true,
    description: 'Sweet and aromatic muskmelon.',
    nutrition: { calories: 34, vitaminC: '36.7mg', fiber: '0.9g', vitaminA: '3382 IU' },
    available: true
  },
  {
    id: 10,
    name: 'Pomegranate',
    image: 'https://images.unsplash.com/photo-1541344999736-4a86c8d1d536?w=400&h=400&fit=crop',
    category: 'Berries',
    seasonal: true,
    description: 'Ruby red pomegranate seeds, packed with antioxidants.',
    nutrition: { calories: 83, vitaminC: '10.2mg', fiber: '4g', vitaminA: '0 IU' },
    available: true
  }
];

// Get today's available fruits (admin controlled)
export const getTodaysFreshFruits = () => {
  return fruits.filter(fruit => fruit.available);
};

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export const categories: Category[] = [
  { id: 'all', name: 'All Fruits', emoji: '🍎' },
  { id: 'berries', name: 'Berries', emoji: '🫐' },
  { id: 'tropical', name: 'Tropical', emoji: '🥭' },
  { id: 'citrus', name: 'Citrus', emoji: '🍊' },
  { id: 'core', name: 'Core Fruits', emoji: '🍎' },
  { id: 'melons', name: 'Melons', emoji: '🍉' }
];

// Predefined weekly menu for subscription (admin controlled - based on reference image)
export interface WeeklyMenuItem {
  day: number;
  dayName: string;
  items: string[];
}

export const weeklyMenu: WeeklyMenuItem[] = [
  { 
    day: 1, 
    dayName: 'Monday', 
    items: ['Bread Jam', 'Carrot', 'Beetroot', 'Guava', 'Peanuts & Jaggery', 'Watermelon', 'Dry Fruits']
  },
  { 
    day: 2, 
    dayName: 'Tuesday', 
    items: ['Bread Jam', 'Carrot', 'Cucumber', 'Papaya', 'Sweet Potato', 'Grapes', 'Dry Fruits']
  },
  { 
    day: 3, 
    dayName: 'Wednesday', 
    items: ['Bread & Jam', 'Carrot', 'Beetroot', 'Salad', 'Muskmelon', 'Pomegranate', 'Dry Fruits']
  },
  { 
    day: 4, 
    dayName: 'Thursday', 
    items: ['Bread & Jam', 'Carrot', 'Cucumber', 'Sweet Corn', 'Pineapple', 'Watermelon', 'Dry Fruits']
  },
  { 
    day: 5, 
    dayName: 'Friday', 
    items: ['Bread & Jam', 'Carrot', 'Beetroot', 'Boiled Sangalu', 'Papaya', 'Guava', 'Dry Fruits']
  },
  { 
    day: 6, 
    dayName: 'Saturday', 
    items: ['Bread & Jam', 'Carrot', 'Cucumber', 'Boiled Vegetable', 'Muskmelon', 'Grapes', 'Dry Fruits']
  }
];

export interface OrderStatus {
  id: number;
  status: string;
  label: string;
  time: string;
}

export const orderStatuses: OrderStatus[] = [
  { id: 1, status: 'confirmed', label: 'Order Confirmed', time: '10:30 AM' },
  { id: 2, status: 'preparing', label: 'Preparing Your Bowl', time: '11:00 AM' },
  { id: 3, status: 'out-for-delivery', label: 'Out for Delivery', time: '11:30 AM' },
  { id: 4, status: 'delivered', label: 'Delivered', time: '12:00 PM' }
];
