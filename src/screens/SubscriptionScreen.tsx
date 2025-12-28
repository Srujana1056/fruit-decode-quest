import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';

const SubscriptionScreen = () => {
  const navigate = useNavigate();
  const { setIsSubscription, WEEKLY_SUBSCRIPTION_PRICE, ONE_TIME_BOWL_PRICE } = useCart();

  const benefits = [
    { emoji: '🍓', text: 'Fresh fruits delivered 6 days a week' },
    { emoji: '💰', text: 'Save more compared to one-time orders' },
    { emoji: '🚚', text: 'Free delivery on all orders' },
    { emoji: '🔄', text: 'Customize your bowl anytime' },
    { emoji: '⏸️', text: 'Pause or cancel anytime' },
    { emoji: '📱', text: 'Easy order tracking' }
  ];

  const handleSubscribe = () => {
    setIsSubscription(true);
    navigate('/bowl-builder?subscription=true');
  };

  const handleOneTime = () => {
    setIsSubscription(false);
    navigate('/bowl-builder');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-tropical p-4 pt-6 pb-8 relative overflow-hidden">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-card/80 flex items-center justify-center shadow-fruit mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-foreground">Weekly Subscription</h1>
        <p className="text-foreground/80 mt-1">Get fresh fruit bowls delivered to your doorstep</p>
        <span className="absolute -right-8 -bottom-8 text-[120px] opacity-20">🍎</span>
      </div>

      <div className="p-4 space-y-6 -mt-4">
        {/* Pricing Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-xl p-4 shadow-fruit border-2 border-transparent">
            <h3 className="font-semibold text-foreground text-sm mb-1">One-time Order</h3>
            <p className="text-3xl font-bold text-foreground">₹{ONE_TIME_BOWL_PRICE}</p>
            <p className="text-xs text-muted-foreground mt-1">per bowl</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-fruit-lg border-2 border-primary relative">
            <span className="absolute -top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
              Best Value
            </span>
            <h3 className="font-semibold text-primary text-sm mb-1">Weekly Plan</h3>
            <p className="text-3xl font-bold text-primary">₹{WEEKLY_SUBSCRIPTION_PRICE}</p>
            <p className="text-xs text-muted-foreground mt-1">per week (6 bowls)</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-card rounded-xl p-5 shadow-fruit">
          <h3 className="font-bold text-foreground text-lg mb-4">Why Subscribe?</h3>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-2xl">{benefit.emoji}</span>
                <span className="text-foreground">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-muted rounded-xl p-5">
          <h3 className="font-bold text-foreground text-lg mb-4">How it works</h3>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Build your bowl', desc: 'Choose up to 5 fruits' },
              { step: '2', title: 'Set delivery days', desc: 'Pick 6 days for delivery' },
              { step: '3', title: 'Enjoy fresh fruits', desc: 'Get bowls at your doorstep' }
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-card border-t border-border p-4 space-y-2">
        <Button
          variant="fruit"
          size="lg"
          fullWidth
          onClick={handleSubscribe}
        >
          Start Weekly Subscription - ₹{WEEKLY_SUBSCRIPTION_PRICE}/week
        </Button>
        <Button
          variant="ghost"
          size="lg"
          fullWidth
          onClick={handleOneTime}
        >
          Order One-time Instead
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionScreen;
