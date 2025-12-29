import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fruits } from '@/data/dummyData';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Check, ShoppingCart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const BowlBuilderScreen = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, setIsSubscription, ONE_TIME_BOWL_PRICE, REQUIRED_FRUITS, getSelectedFruitsCount, clearCart } = useCart();
  const [bowlName, setBowlName] = useState('');

  // Always one-time mode for bowl builder
  setIsSubscription(false);

  // Get fruits that are in the cart
  const bowlItems = cart.filter(item => item.type === 'fruit');
  const selectedCount = getSelectedFruitsCount();
  const canAddMoreFruits = selectedCount < REQUIRED_FRUITS;

  const handleAddFruit = (fruit: typeof fruits[0]) => {
    if (!canAddMoreFruits) {
      toast({
        title: "Maximum fruits reached",
        description: `You can only select ${REQUIRED_FRUITS} different fruits.`,
        variant: "destructive"
      });
      return;
    }
    
    // Check if already selected
    if (isInBowl(fruit.id)) {
      toast({
        title: "Fruit already selected",
        description: "Please choose a different fruit.",
        variant: "destructive"
      });
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

  const handleProceedToCart = () => {
    if (selectedCount !== REQUIRED_FRUITS) {
      toast({
        title: "Please select exactly 6 different fruits",
        description: `You have selected ${selectedCount} fruits. Please select ${REQUIRED_FRUITS - selectedCount} more.`,
        variant: "destructive"
      });
      return;
    }
    navigate('/cart');
  };

  const handleClearBowl = () => {
    clearCart();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Sticky */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/30 p-4 pt-6 sticky top-0 z-20 backdrop-blur-sm bg-opacity-95">
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
              One-time Order • Select exactly {REQUIRED_FRUITS} fruits
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
        <div className="mt-3 bg-card rounded-xl p-3 shadow-fruit">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground text-sm">Your Bowl</h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                selectedCount === REQUIRED_FRUITS 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-destructive/20 text-destructive'
              }`}>
                {selectedCount}/{REQUIRED_FRUITS} fruits
              </span>
              {bowlItems.length > 0 && (
                <button
                  onClick={handleClearBowl}
                  className="text-xs text-muted-foreground hover:text-destructive"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          {bowlItems.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {bowlItems.map((item) => (
                <div key={item.id} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-xs">
                  <img src={item.image} alt={item.name} className="w-4 h-4 rounded-full object-cover" />
                  <span>{item.name}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-1 text-muted-foreground hover:text-destructive"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No fruits selected yet</p>
          )}
          
          {selectedCount !== REQUIRED_FRUITS && selectedCount > 0 && (
            <p className="text-xs text-destructive mt-2">
              Please select exactly 6 different fruits
            </p>
          )}
        </div>
      </div>

      {/* Fruits Selection */}
      <div className="p-4 pb-48">
        <h2 className="text-lg font-bold text-foreground mb-3">
          Select Your Fruits ({REQUIRED_FRUITS - selectedCount} more needed)
        </h2>
        <div className="space-y-3">
          {fruits.map((fruit) => {
            const inBowl = isInBowl(fruit.id);
            
            return (
              <div
                key={fruit.id}
                className={`bg-card rounded-xl p-3 shadow-fruit flex items-center gap-3 ${
                  inBowl ? 'ring-2 ring-primary' : ''
                }`}
              >
                <img
                  src={fruit.image}
                  alt={fruit.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{fruit.name}</h3>
                  <p className="text-muted-foreground text-sm">{fruit.description}</p>
                  {fruit.seasonal && (
                    <span className="text-xs text-tropical">Seasonal</span>
                  )}
                </div>
                
                {inBowl ? (
                  <button
                    onClick={() => removeFromCart(`fruit-${fruit.id}`)}
                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                ) : (
                  <Button
                    variant={canAddMoreFruits ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => handleAddFruit(fruit)}
                    disabled={!canAddMoreFruits}
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
            <p className="text-sm text-muted-foreground">Bowl Price (Fixed)</p>
            <p className="text-2xl font-bold text-primary">₹{ONE_TIME_BOWL_PRICE}</p>
          </div>
          <div className="text-right">
            <p className={`text-sm ${selectedCount === REQUIRED_FRUITS ? 'text-primary' : 'text-destructive'}`}>
              {selectedCount}/{REQUIRED_FRUITS} fruits selected
            </p>
            <p className="text-sm text-primary font-medium">Free delivery</p>
          </div>
        </div>
        <Button
          variant="fruit"
          size="lg"
          fullWidth
          onClick={handleProceedToCart}
          disabled={selectedCount !== REQUIRED_FRUITS}
        >
          <ShoppingCart className="w-5 h-5" />
          {selectedCount === REQUIRED_FRUITS ? 'Proceed to Cart' : `Select ${REQUIRED_FRUITS - selectedCount} more fruits`}
        </Button>
      </div>
    </div>
  );
};

export default BowlBuilderScreen;
