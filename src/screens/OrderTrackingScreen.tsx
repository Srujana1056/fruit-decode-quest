import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Clock, Truck, Package } from 'lucide-react';

const OrderTrackingScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const orderSteps = [
    { id: 1, status: 'confirmed', label: 'Order Confirmed', time: '10:30 AM', icon: Check, completed: true },
    { id: 2, status: 'preparing', label: 'Preparing Your Bowl', time: '11:00 AM', icon: Package, completed: true },
    { id: 3, status: 'out-for-delivery', label: 'Out for Delivery', time: '11:30 AM', icon: Truck, completed: false, current: true },
    { id: 4, status: 'delivered', label: 'Delivered', time: '12:00 PM', icon: Check, completed: false }
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/30 p-4 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate('/home')}
            className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-fruit"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Order #{id}</h1>
            <p className="text-sm text-muted-foreground">Estimated delivery: 12:00 PM</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Success Animation */}
        <div className="bg-card rounded-xl p-6 shadow-fruit text-center">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
            <span className="text-5xl">🍎</span>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Order Placed Successfully!</h2>
          <p className="text-muted-foreground">Your fresh fruit bowl is on its way</p>
        </div>

        {/* Order Timeline */}
        <div className="bg-card rounded-xl p-5 shadow-fruit">
          <h3 className="font-bold text-foreground text-lg mb-6">Order Status</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
            
            {orderSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="relative flex gap-4 pb-6 last:pb-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${
                      step.completed
                        ? 'bg-primary text-primary-foreground'
                        : step.current
                        ? 'bg-tropical text-foreground animate-pulse-soft'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step.completed ? (
                      <Check className="w-5 h-5" />
                    ) : step.current ? (
                      <Clock className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className={`font-semibold ${step.completed || step.current ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </h4>
                    <p className="text-sm text-muted-foreground">{step.time}</p>
                    {step.current && (
                      <p className="text-sm text-tropical font-medium mt-1">In Progress</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Partner */}
        <div className="bg-card rounded-xl p-4 shadow-fruit flex items-center gap-4">
          <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center">
            <span className="text-2xl">🚴</span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">Rahul K.</h4>
            <p className="text-sm text-muted-foreground">Delivery Partner</p>
          </div>
          <Button variant="outline" size="sm">
            Call
          </Button>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="fruit"
            size="lg"
            fullWidth
            onClick={() => navigate('/home')}
          >
            Continue Shopping
          </Button>
          <Button
            variant="ghost"
            size="lg"
            fullWidth
            onClick={() => alert('Help & Support')}
          >
            Need Help?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingScreen;
