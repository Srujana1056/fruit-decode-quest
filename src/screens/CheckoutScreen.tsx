import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { weeklyMenu } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, MapPin, CreditCard, Wallet, Banknote, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSubscriptionCheckout = searchParams.get('subscription') === 'true';
  const { cart, isSubscription, getOrderPrice, clearCart, WEEKLY_SUBSCRIPTION_PRICE, ONE_TIME_BOWL_PRICE, setIsSubscription } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Set subscription mode if coming from subscription flow
  if (isSubscriptionCheckout && !isSubscription) {
    setIsSubscription(true);
  }

  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: '123 Main Street',
    city: 'Mumbai',
    pincode: '400001'
  });

  const orderPrice = isSubscriptionCheckout ? WEEKLY_SUBSCRIPTION_PRICE : getOrderPrice();
  const bowlItems = cart.filter(item => item.type === 'fruit');

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    clearCart();
    toast({
      title: "Order Placed! 🎉",
      description: isSubscriptionCheckout 
        ? "Your weekly subscription has been activated!" 
        : "Your fruit bowl is being prepared!",
    });
    
    navigate('/order/12345');
    setIsProcessing(false);
  };

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', label: 'UPI', icon: Wallet },
    { id: 'cod', label: 'Cash on Delivery', icon: Banknote }
  ];

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
          <div>
            <h1 className="text-xl font-bold text-foreground">Checkout</h1>
            <p className="text-sm text-muted-foreground">
              {isSubscriptionCheckout ? 'Weekly Subscription' : 'One-Time Order'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Order Summary */}
        {isSubscriptionCheckout ? (
          <div className="bg-card rounded-xl p-4 shadow-fruit">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Subscription Summary</h3>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Plan</span>
                <span className="text-foreground font-medium">Weekly Subscription</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="text-foreground">6 days per week</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Menu</span>
                <span className="text-foreground">Predefined by chef</span>
              </div>
            </div>
            
            {/* Weekly Menu Preview */}
            <div className="bg-muted rounded-lg p-3">
              <h4 className="font-medium text-foreground text-sm mb-2">This Week's Menu</h4>
              <div className="space-y-1">
                {weeklyMenu.slice(0, 3).map((day) => (
                  <p key={day.day} className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{day.dayName}:</span> {day.items.slice(0, 3).join(', ')}...
                  </p>
                ))}
                <p className="text-xs text-primary">+ 3 more days...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-xl p-4 shadow-fruit">
            <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">One-Time Fruit Bowl</span>
                <span className="text-foreground">₹{ONE_TIME_BOWL_PRICE}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fruits Selected</span>
                <span className="text-foreground">{bowlItems.length}</span>
              </div>
              {bowlItems.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-1">Selected fruits:</p>
                  <p className="text-sm text-foreground">
                    {bowlItems.map(item => item.name).join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Delivery Address */}
        <div className="bg-card rounded-xl p-4 shadow-fruit">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Delivery Address</h3>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="name" className="text-xs">Name</Label>
                <Input
                  id="name"
                  value={address.name}
                  onChange={(e) => setAddress({...address, name: e.target.value})}
                  className="h-10 bg-muted border-border"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs">Phone</Label>
                <Input
                  id="phone"
                  value={address.phone}
                  onChange={(e) => setAddress({...address, phone: e.target.value})}
                  className="h-10 bg-muted border-border"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="street" className="text-xs">Street Address</Label>
              <Input
                id="street"
                value={address.street}
                onChange={(e) => setAddress({...address, street: e.target.value})}
                className="h-10 bg-muted border-border"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="city" className="text-xs">City</Label>
                <Input
                  id="city"
                  value={address.city}
                  onChange={(e) => setAddress({...address, city: e.target.value})}
                  className="h-10 bg-muted border-border"
                />
              </div>
              <div>
                <Label htmlFor="pincode" className="text-xs">Pincode</Label>
                <Input
                  id="pincode"
                  value={address.pincode}
                  onChange={(e) => setAddress({...address, pincode: e.target.value})}
                  className="h-10 bg-muted border-border"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card rounded-xl p-4 shadow-fruit">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Payment Method</h3>
          </div>
          <div className="space-y-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    paymentMethod === method.id
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'bg-muted border-2 border-transparent'
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <Icon className={`w-5 h-5 ${paymentMethod === method.id ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`font-medium ${paymentMethod === method.id ? 'text-primary' : 'text-foreground'}`}>
                    {method.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-card rounded-xl p-4 shadow-fruit">
          <h3 className="font-semibold text-foreground mb-3">Price Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {isSubscriptionCheckout ? 'Weekly Subscription' : 'One-Time Bowl'}
              </span>
              <span className="text-foreground">₹{orderPrice}</span>
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
              {isSubscriptionCheckout && (
                <p className="text-xs text-muted-foreground mt-1">per week</p>
              )}
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
          {isSubscriptionCheckout && <span className="text-sm text-muted-foreground">per week</span>}
        </div>
        <Button
          variant="fruit"
          size="lg"
          fullWidth
          onClick={handlePlaceOrder}
          disabled={isProcessing || (!isSubscriptionCheckout && bowlItems.length === 0)}
        >
          {isProcessing ? 'Processing...' : `Pay ₹${orderPrice}`}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutScreen;
