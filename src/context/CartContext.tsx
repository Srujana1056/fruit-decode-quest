import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: 'fruit' | 'bowl';
}

interface CartContextType {
  cart: CartItem[];
  isSubscription: boolean;
  setIsSubscription: (value: boolean) => void;
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getOrderPrice: () => number;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getSelectedFruitsCount: () => number;
  ONE_TIME_BOWL_PRICE: number;
  WEEKLY_SUBSCRIPTION_PRICE: number;
  REQUIRED_FRUITS: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSubscription, setIsSubscription] = useState(false);

  // Fixed pricing constants
  const ONE_TIME_BOWL_PRICE = 50;
  const WEEKLY_SUBSCRIPTION_PRICE = 249;
  const REQUIRED_FRUITS = 6;

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        // For one-time orders, don't allow duplicate fruits
        return prev;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    // For one-time orders, quantity is always 1
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: 1 } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getOrderPrice = () => {
    if (isSubscription) {
      return WEEKLY_SUBSCRIPTION_PRICE;
    }
    return ONE_TIME_BOWL_PRICE;
  };

  const getTotalPrice = () => {
    return getOrderPrice();
  };

  const getTotalItems = () => {
    return cart.filter(item => item.type === 'fruit').length;
  };

  const getSelectedFruitsCount = () => {
    return cart.filter(item => item.type === 'fruit').length;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isSubscription,
        setIsSubscription,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getOrderPrice,
        getTotalPrice,
        getTotalItems,
        getSelectedFruitsCount,
        ONE_TIME_BOWL_PRICE,
        WEEKLY_SUBSCRIPTION_PRICE,
        REQUIRED_FRUITS
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
