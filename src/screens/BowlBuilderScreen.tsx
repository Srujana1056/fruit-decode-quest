import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fruits } from '@/data/dummyData';
import { useCart, CartItem } from '@/context/CartContext';
import QuantitySelector from '@/components/QuantitySelector';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Check, ShoppingCart } from 'lucide-react';

const BowlBuilderScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSubscriptionMode = searchParams.get('subscription') === 'true';
  const { cart, addToCart, updateQuantity, removeFromCart, setIsSubscription, getOrderPrice, getTotalItems } = useCart();
  const [bowlName, setBowlName] = useState('');

  // Set subscription mode when entering from subscription flow
  useEffect(() => {
    if (isSubscriptionMode) {
      setIsSubscription(true);
    }
  }, [isSubscriptionMode, setIsSubscription]);

  // Get fruits that are in the cart
  const bowlItems = cart.filter(item => item.type === 'fruit');

  // Max 5 fruits for subscription
  const MAX_FRUITS = 5;
  const canAddMoreFruits = bowlItems.length < MAX_FRUITS;

  const handleAddFruit = (fruit: typeof fruits[0]) => {
    if (isSubscriptionMode && !canAddMoreFruits) {
      alert(`You can choose up to ${MAX_FRUITS} fruits for your subscription bowl.`);
      return;
    }
    addToCart({
      id: `fruit-${fruit.id}`,
      name: fruit.name,
      price: fruit.price,
      quantity: 1,
      image: fruit.image,
      type: 'fruit'
    });
  };

  const isInBowl = (fruitId: number) => {
    return bowlItems.some(item => item.id === `fruit-${fruitId}`);
  };

  const getItemQuantity = (fruitId: number): number => {
    const item = bowlItems.find(item => item.id === `fruit-${fruitId}`);
    return item?.quantity || 0;
  };

  const handleProceedToCart = () => {
    if (bowlItems.length === 0) {
      alert('Please add at least one fruit to your bowl');
      return;
    }
    navigate('/cart');
  };

  const orderPrice = getOrderPrice();

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/30 p-4 pt-6 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-fruit"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Build Your Bowl</h1>
            <p className="text-sm text-muted-foreground">
              {isSubscriptionMode ? 'Weekly Subscription • Choose up to 5 fruits' : 'One-time Order'}
            </p>
          </div>
        </div>

        {/* Bowl Name Input */}
        <input
          type="text"
          placeholder="Name your bowl (optional)"
          value={bowlName}
          onChange={(e) => setBowlName(e.target.value)}
          className="w-full bg-card rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Current Bowl Summary */}
        {bowlItems.length > 0 && (
          <div className="mt-3 bg-card rounded-xl p-3 shadow-fruit">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground text-sm">Your Bowl</h3>
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                {bowlItems.length} {bowlItems.length === 1 ? 'fruit' : 'fruits'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {bowlItems.map((item) => (
                <div key={item.id} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-xs">
                  <img src={item.image} alt={item.name} className="w-4 h-4 rounded-full object-cover" />
                  <span>{item.name}</span>
                  <span className="font-semibold">×{item.quantity}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-1 text-muted-foreground hover:text-destructive"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fruits Selection */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-foreground mb-3">
          {isSubscriptionMode ? 'Select Your Fruits (Max 5)' : 'Add Fruits to Your Bowl'}
        </h2>
        <div className="space-y-3">
          {fruits.map((fruit) => {
            const inBowl = isInBowl(fruit.id);
            const quantity = getItemQuantity(fruit.id);
            
            return (
              <div
                key={fruit.id}
                className="bg-card rounded-xl p-3 shadow-fruit flex items-center gap-3"
              >
                <img
                  src={fruit.image}
                  alt={fruit.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{fruit.name}</h3>
                  <p className="text-primary font-bold text-sm">₹{fruit.price}</p>
                  {fruit.seasonal && (
                    <span className="text-xs text-tropical">Seasonal</span>
                  )}
                </div>
                
                {inBowl ? (
                  <QuantitySelector
                    quantity={quantity}
                    onIncrease={() => updateQuantity(`fruit-${fruit.id}`, quantity + 1)}
                    onDecrease={() => updateQuantity(`fruit-${fruit.id}`, quantity - 1)}
                    max={isSubscriptionMode ? 1 : 10}
                  />
                ) : (
                  <Button
                    variant={canAddMoreFruits || !isSubscriptionMode ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => handleAddFruit(fruit)}
                    disabled={isSubscriptionMode && !canAddMoreFruits}
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-card border-t border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground">
              {isSubscriptionMode ? 'Weekly Price' : 'Bowl Price'}
            </p>
            <p className="text-2xl font-bold text-primary">₹{orderPrice}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{getTotalItems()} items</p>
            <p className="text-sm text-primary font-medium">
              {isSubscriptionMode ? 'Delivery included' : 'Free delivery'}
            </p>
          </div>
        </div>
        <Button
          variant="fruit"
          size="lg"
          fullWidth
          onClick={handleProceedToCart}
          disabled={bowlItems.length === 0}
        >
          <ShoppingCart className="w-5 h-5" />
          Proceed to Cart
        </Button>
      </div>
    </div>
  );
};

export default BowlBuilderScreen;
