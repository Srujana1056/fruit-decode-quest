interface PriceSummaryProps {
  orderPrice: number;
  isSubscription: boolean;
  deliveryFee?: number;
}

const PriceSummary = ({ orderPrice, isSubscription, deliveryFee = 0 }: PriceSummaryProps) => {
  const total = orderPrice + deliveryFee;

  return (
    <div className="bg-muted rounded-xl p-4 space-y-3">
      <h3 className="font-semibold text-foreground">Order Summary</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            {isSubscription ? 'Weekly Subscription' : 'Bowl Price'}
          </span>
          <span className="font-medium">₹{orderPrice}</span>
        </div>
        
        {!isSubscription && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery</span>
            <span className="font-medium text-primary">
              {deliveryFee === 0 ? 'Included' : `₹${deliveryFee}`}
            </span>
          </div>
        )}
        
        {isSubscription && (
          <div className="flex justify-between text-muted-foreground text-xs">
            <span>6 days delivery/week</span>
            <span>Free delivery</span>
          </div>
        )}
      </div>
      
      <div className="border-t border-border pt-3">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-foreground">Total</span>
          <span className="font-bold text-lg text-primary">₹{total}</span>
        </div>
        {isSubscription && (
          <p className="text-xs text-muted-foreground mt-1">per week</p>
        )}
      </div>
    </div>
  );
};

export default PriceSummary;
