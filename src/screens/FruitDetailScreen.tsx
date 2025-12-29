import { useParams, useNavigate } from 'react-router-dom';
import { fruits } from '@/data/dummyData';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const FruitDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart, getSelectedFruitsCount, REQUIRED_FRUITS, removeFromCart } = useCart();

  const fruit = fruits.find(f => f.id === Number(id));
  const selectedCount = getSelectedFruitsCount();
  const isInBowl = cart.some(item => item.id === `fruit-${fruit?.id}`);
  const canAddMore = selectedCount < REQUIRED_FRUITS;

  if (!fruit) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Fruit not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (isInBowl) {
      removeFromCart(`fruit-${fruit.id}`);
      toast({
        title: "Removed from bowl",
        description: `${fruit.name} removed from your bowl`,
      });
      return;
    }

    if (!canAddMore) {
      toast({
        title: "Maximum fruits reached",
        description: `You can only select ${REQUIRED_FRUITS} different fruits.`,
        variant: "destructive"
      });
      return;
    }

    addToCart({
      id: `fruit-${fruit.id}`,
      name: fruit.name,
      price: 0, // No per-fruit pricing
      quantity: 1,
      image: fruit.image,
      type: 'fruit'
    });
    toast({
      title: "Added to bowl! 🍓",
      description: `${fruit.name} added to your bowl (${selectedCount + 1}/${REQUIRED_FRUITS})`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header Image */}
      <div className="relative h-72 bg-muted">
        <img
          src={fruit.image}
          alt={fruit.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center shadow-fruit"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        {fruit.seasonal && (
          <span className="absolute top-6 right-4 bg-tropical text-foreground text-sm font-semibold px-3 py-1 rounded-full">
            Seasonal
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 -mt-6 relative">
        <div className="bg-card rounded-t-2xl p-5 shadow-fruit-lg">
          <h1 className="text-2xl font-bold text-foreground">{fruit.name}</h1>
          <p className="text-muted-foreground mt-2">{fruit.description}</p>
        </div>

        {/* Nutrition Info - Accurate data */}
        <div className="bg-card rounded-xl p-4 shadow-fruit">
          <h3 className="font-semibold text-foreground mb-3">Nutrition Facts (per 100g)</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-primary">{fruit.nutrition.calories}</p>
              <p className="text-sm text-muted-foreground">Calories</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-primary">{fruit.nutrition.vitaminC}</p>
              <p className="text-sm text-muted-foreground">Vitamin C</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-primary">{fruit.nutrition.fiber}</p>
              <p className="text-sm text-muted-foreground">Fiber</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-primary">{fruit.nutrition.vitaminA}</p>
              <p className="text-sm text-muted-foreground">Vitamin A</p>
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="bg-card rounded-xl p-4 shadow-fruit flex items-center gap-3">
          <span className="text-2xl">
            {fruit.category === 'Berries' && '🫐'}
            {fruit.category === 'Tropical' && '🥭'}
            {fruit.category === 'Citrus' && '🍊'}
            {fruit.category === 'Core' && '🍎'}
            {fruit.category === 'Melons' && '🍉'}
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="font-semibold text-foreground">{fruit.category}</p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar - NO PRICE DISPLAY */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-card border-t border-border p-4">
        <div className="mb-3">
          <p className="text-sm text-muted-foreground text-center">
            {selectedCount}/{REQUIRED_FRUITS} fruits selected for your bowl
          </p>
        </div>
        <Button
          variant={isInBowl ? "secondary" : "fruit"}
          size="lg"
          fullWidth
          onClick={handleAddToCart}
          disabled={!isInBowl && !canAddMore}
        >
          {isInBowl ? (
            <>
              <Check className="w-5 h-5" />
              In Your Bowl - Tap to Remove
            </>
          ) : canAddMore ? (
            <>
              <Plus className="w-5 h-5" />
              Add to Bowl
            </>
          ) : (
            'Bowl is Full (6 fruits)'
          )}
        </Button>
      </div>
    </div>
  );
};

export default FruitDetailScreen;
