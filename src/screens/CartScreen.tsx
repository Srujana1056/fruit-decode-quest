import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import QuantitySelector from '@/components/QuantitySelector';
import PriceSummary from '@/components/PriceSummary';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';

const CartScreen = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, isSubscription, setIsSubscription, getOrderPrice, clearCart } = useCart();

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="bg-card p-4 pt-6 border-b border-border">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-foreground">Your Cart</h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-8 mt-20">
          <span className="text-8xl mb-6">🛒</span>
          <p className="text-muted-foreground text-lg mb-6">Your cart is empty</p>
          <Button onClick={() => navigate('/home')}>Browse Fruits</Button>
        </div>
      </div>
    );
  }

  const orderPrice = getOrderPrice();
  const bowlItems = cart.filter(item => item.type === 'fruit');

  return (
    <div className="min-h-screen bg-background pb-48">
      {/* Header */}
      <div className="bg-card p-4 pt-6 border-b border-border sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Your Cart</h1>
            <p className="text-sm text-muted-foreground">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
          </div>
          <button
            onClick={clearCart}
            className="text-muted-foreground hover:text-destructive p-2"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Bowl Summary */}
        <div className="bg-card rounded-xl p-4 shadow-fruit">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Your Fruit Bowl</h3>
            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
              {bowlItems.length} {bowlItems.length === 1 ? 'fruit' : 'fruits'}
            </span>
          </div>
          
          {/* Fruit Items */}
          <div className="space-y-3">
            {bowlItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">₹{item.price}</p>
                </div>
                <QuantitySelector
                  quantity={item.quantity}
                  onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                  onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Order Type Toggle */}
        <div className="bg-card rounded-xl p-4 shadow-fruit">
          <h3 className="font-semibold text-foreground mb-3">Order Type</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`p-3 rounded-lg text-sm font-medium transition-all ${
                !isSubscription
                  ? 'bg-primary text-primary-foreground shadow-fruit'
                  : 'bg-muted text-muted-foreground'
              }`}
              onClick={() => setIsSubscription(false)}
            >
              One-time (₹250)
            </button>
            <button
              className={`p-3 rounded-lg text-sm font-medium transition-all ${
                isSubscription
                  ? 'bg-primary text-primary-foreground shadow-fruit'
                  : 'bg-muted text-muted-foreground'
              }`}
              onClick={() => setIsSubscription(true)}
            >
              Weekly (₹300/wk)
            </button>
          </div>
          {isSubscription && (
            <p className="text-xs text-muted-foreground mt-2">
              Includes 6 days delivery per week. Free delivery!
            </p>
          )}
        </div>

        {/* Price Summary */}
        <PriceSummary orderPrice={orderPrice} isSubscription={isSubscription} />
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-card border-t border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-primary">₹{orderPrice}</p>
          </div>
          {isSubscription && <span className="text-sm text-muted-foreground">per week</span>}
        </div>
        <Button
          variant="fruit"
          size="lg"
          fullWidth
          onClick={handleProceedToCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartScreen;
