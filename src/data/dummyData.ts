// Fruit data - 10 standard fruits
export interface Fruit {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  seasonal: boolean;
  description: string;
  nutrition: {
    calories: number;
    vitaminC: string;
  };
}

export const fruits: Fruit[] = [
  {
    id: 1,
    name: 'Apple',
    price: 60,
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Core',
    seasonal: false,
    description: 'Crisp and refreshing apples, always in season.',
    nutrition: { calories: 52, vitaminC: '4.6mg' }
  },
  {
    id: 2,
    name: 'Guava',
    price: 50,
    image: 'https://images.pexels.com/photos/5945848/pexels-photo-5945848.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Tropical',
    seasonal: false,
    description: 'Fresh guavas with a tropical taste.',
    nutrition: { calories: 68, vitaminC: '228mg' }
  },
  {
    id: 3,
    name: 'Mango',
    price: 90,
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Tropical',
    seasonal: true,
    description: 'Sweet and tropical mangoes, a summer favorite.',
    nutrition: { calories: 60, vitaminC: '36.4mg' }
  },
  {
    id: 4,
    name: 'Banana',
    price: 45,
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Tropical',
    seasonal: false,
    description: 'Ripe and creamy bananas, great for energy.',
    nutrition: { calories: 89, vitaminC: '8.7mg' }
  },
  {
    id: 5,
    name: 'Papaya',
    price: 55,
    image: 'https://images.pexels.com/photos/5945755/pexels-photo-5945755.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Tropical',
    seasonal: false,
    description: 'Sweet papaya, rich in vitamins.',
    nutrition: { calories: 43, vitaminC: '60.9mg' }
  },
  {
    id: 6,
    name: 'Pineapple',
    price: 75,
    image: 'https://images.pexels.com/photos/947879/pexels-photo-947879.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Tropical',
    seasonal: true,
    description: 'Tropical pineapple with a perfect balance of sweet and tart.',
    nutrition: { calories: 50, vitaminC: '47.8mg' }
  },
  {
    id: 7,
    name: 'Orange',
    price: 55,
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Citrus',
    seasonal: true,
    description: 'Juicy oranges bursting with vitamin C.',
    nutrition: { calories: 47, vitaminC: '53.2mg' }
  },
  {
    id: 8,
    name: 'Grapes',
    price: 70,
    image: 'https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Berries',
    seasonal: false,
    description: 'Sweet and refreshing grapes, perfect for snacking.',
    nutrition: { calories: 69, vitaminC: '3.2mg' }
  },
  {
    id: 9,
    name: 'Chikoo',
    price: 65,
    image: 'https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Tropical',
    seasonal: false,
    description: 'Sweet and grainy chikoo, a local favorite.',
    nutrition: { calories: 83, vitaminC: '14.7mg' }
  },
  {
    id: 10,
    name: 'Watermelon',
    price: 40,
    image: 'https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'Melons',
    seasonal: true,
    description: 'Refreshing watermelon, perfect for hot days.',
    nutrition: { calories: 30, vitaminC: '8.1mg' }
  }
];

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
  { id: 'stone', name: 'Stone Fruits', emoji: '🍑' },
  { id: 'core', name: 'Core Fruits', emoji: '🍎' },
  { id: 'melons', name: 'Melons', emoji: '🍉' }
];

export interface PopularBowl {
  id: number;
  name: string;
  fruits: string[];
  price: number;
  emoji: string;
}

export const popularBowls: PopularBowl[] = [
  {
    id: 1,
    name: 'Berry Blast',
    fruits: ['Apple', 'Grapes', 'Banana', 'Mango', 'Orange', 'Guava'],
    price: 50,
    emoji: '🫐'
  },
  {
    id: 2,
    name: 'Tropical Paradise',
    fruits: ['Mango', 'Pineapple', 'Banana', 'Papaya', 'Guava', 'Orange'],
    price: 50,
    emoji: '🥭'
  },
  {
    id: 3,
    name: 'Citrus Sunrise',
    fruits: ['Orange', 'Pineapple', 'Apple', 'Mango', 'Grapes', 'Banana'],
    price: 50,
    emoji: '🍊'
  },
  {
    id: 4,
    name: 'Summer Delight',
    fruits: ['Watermelon', 'Mango', 'Grapes', 'Apple', 'Banana', 'Orange'],
    price: 50,
    emoji: '🍉'
  }
];

// Predefined weekly menu for subscription
export interface WeeklyMenuItem {
  day: number;
  dayName: string;
  fruits: string[];
}

export const weeklyMenu: WeeklyMenuItem[] = [
  { day: 1, dayName: 'Day 1', fruits: ['Apple', 'Guava', 'Mango', 'Banana'] },
  { day: 2, dayName: 'Day 2', fruits: ['Papaya', 'Pineapple', 'Apple', 'Orange'] },
  { day: 3, dayName: 'Day 3', fruits: ['Banana', 'Chikoo', 'Mango', 'Guava'] },
  { day: 4, dayName: 'Day 4', fruits: ['Apple', 'Papaya', 'Orange', 'Grapes'] },
  { day: 5, dayName: 'Day 5', fruits: ['Mango', 'Banana', 'Pineapple', 'Guava'] },
  { day: 6, dayName: 'Day 6', fruits: ['Mixed Seasonal Bowl'] }
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
