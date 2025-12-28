import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import PriceSummary from '@/components/PriceSummary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, MapPin, CreditCard, Wallet, Banknote } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const { cart, isSubscription, getOrderPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: '123 Main Street',
    city: 'Mumbai',
    pincode: '400001'
  });

  const orderPrice = getOrderPrice();

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    clearCart();
    toast({
      title: "Order Placed! 🎉",
      description: isSubscription 
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
          <h1 className="text-xl font-bold text-foreground">Checkout</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
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

        {/* Order Summary */}
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
          onClick={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : `Pay ₹${orderPrice}`}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutScreen;
