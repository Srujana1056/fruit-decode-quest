import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';

const CartScreen = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, isSubscription, getOrderPrice, clearCart, REQUIRED_FRUITS, ONE_TIME_BOWL_PRICE } = useCart();

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
            <p className="text-sm text-muted-foreground">
              {isSubscription ? 'Weekly Subscription' : 'One-Time Order'}
            </p>
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
            <h3 className="font-semibold text-foreground">One-Time Fruit Bowl</h3>
            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
              {bowlItems.length} {bowlItems.length === 1 ? 'fruit' : 'fruits'}
            </span>
          </div>
          
          {/* Fruit Items - Display only */}
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
                  <p className="text-sm text-muted-foreground">Fixed portion</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-muted-foreground hover:text-destructive p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {bowlItems.length !== REQUIRED_FRUITS && (
            <div className="mt-3 p-3 bg-destructive/10 rounded-lg">
              <p className="text-sm text-destructive">
                Please select exactly {REQUIRED_FRUITS} different fruits. You have {bowlItems.length}.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => navigate('/bowl-builder')}
              >
                Edit Bowl
              </Button>
            </div>
          )}
        </div>

        {/* Price Summary */}
        <div className="bg-card rounded-xl p-4 shadow-fruit">
          <h3 className="font-semibold text-foreground mb-3">Price Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">One-Time Fruit Bowl</span>
              <span className="text-foreground">₹{ONE_TIME_BOWL_PRICE}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fruits Selected</span>
              <span className="text-foreground">{bowlItems.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span className="text-primary">Free</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">₹{orderPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-card border-t border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-primary">₹{orderPrice}</p>
          </div>
        </div>
        <Button
          variant="fruit"
          size="lg"
          fullWidth
          onClick={handleProceedToCheckout}
          disabled={bowlItems.length !== REQUIRED_FRUITS}
        >
          {bowlItems.length === REQUIRED_FRUITS ? 'Proceed to Checkout' : `Select ${REQUIRED_FRUITS} fruits first`}
        </Button>
      </div>
    </div>
  );
};

export default CartScreen;
