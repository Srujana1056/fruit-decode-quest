import { useParams, useNavigate } from 'react-router-dom';
import { fruits } from '@/data/dummyData';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const FruitDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const fruit = fruits.find(f => f.id === Number(id));

  if (!fruit) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Fruit not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: `fruit-${fruit.id}`,
      name: fruit.name,
      price: fruit.price,
      quantity: quantity,
      image: fruit.image,
      type: 'fruit'
    });
    toast({
      title: "Added to bowl! 🍓",
      description: `${quantity} ${fruit.name}${quantity > 1 ? 's' : ''} added to your bowl`,
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
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold text-foreground">{fruit.name}</h1>
            <p className="text-2xl font-bold text-primary">₹{fruit.price}</p>
          </div>
          <p className="text-muted-foreground">{fruit.description}</p>
        </div>

        {/* Nutrition Info */}
        <div className="bg-card rounded-xl p-4 shadow-fruit">
          <h3 className="font-semibold text-foreground mb-3">Nutrition Facts</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-primary">{fruit.nutrition.calories}</p>
              <p className="text-sm text-muted-foreground">Calories</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-primary">{fruit.nutrition.vitaminC}</p>
              <p className="text-sm text-muted-foreground">Vitamin C</p>
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="bg-card rounded-xl p-4 shadow-fruit flex items-center gap-3">
          <span className="text-2xl">
            {fruit.category === 'Berries' && '🫐'}
            {fruit.category === 'Tropical' && '🥭'}
            {fruit.category === 'Citrus' && '🍊'}
            {fruit.category === 'Stone' && '🍑'}
            {fruit.category === 'Core' && '🍎'}
            {fruit.category === 'Melons' && '🍉'}
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="font-semibold text-foreground">{fruit.category}</p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-card border-t border-border p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-muted rounded-full p-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="w-5 h-5" />
            </Button>
            <span className="font-bold text-lg min-w-[2ch] text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <Button
            variant="fruit"
            size="lg"
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Bowl - ₹{fruit.price * quantity}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FruitDetailScreen;
