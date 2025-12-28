import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { fruits, popularBowls } from '@/data/dummyData';
import FruitCard from '@/components/FruitCard';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronRight } from 'lucide-react';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const timeOfDay = new Date().getHours();
  const greeting = timeOfDay < 12 ? 'Good morning' : timeOfDay < 18 ? 'Good afternoon' : 'Good evening';

  const categoryList = ['Berries', 'Tropical', 'Citrus', 'Stone'];
  const categoryEmojis: Record<string, string> = {
    Berries: '🫐',
    Tropical: '🥭',
    Citrus: '🍊',
    Stone: '🍑'
  };
  const featuredFruits = fruits.slice(0, 6);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/30 p-5 pt-8">
        <h1 className="text-2xl font-bold text-foreground">
          {greeting}, {user?.name || 'User'} 👋
        </h1>
        <p className="text-muted-foreground mt-1">What would you like today?</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Delivery Address */}
        <div className="bg-card rounded-xl p-4 shadow-fruit flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Delivery to</p>
            <p className="text-sm font-medium text-foreground truncate">123 Main St, City, State 12345</p>
          </div>
          <button className="text-primary text-sm font-semibold">Change</button>
        </div>

        {/* Subscription Banner */}
        <div className="bg-gradient-tropical rounded-xl p-5 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-foreground">Weekly Subscription - ₹300</h2>
            <p className="text-sm text-foreground/80 mt-1">Get fresh bowls delivered 6 days a week. Pay once per week.</p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-3"
              onClick={() => navigate('/subscription')}
            >
              Learn More
            </Button>
          </div>
          <span className="absolute -right-4 -bottom-4 text-8xl opacity-30">🍎</span>
        </div>

        {/* Choose Bowl Type */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">Choose how you want your bowl</h2>
          <div className="grid grid-cols-2 gap-3">
            <div
              className="bg-card rounded-xl p-4 shadow-fruit cursor-pointer hover:shadow-fruit-lg transition-all active:scale-[0.98]"
              onClick={() => navigate('/bowl-builder')}
            >
              <span className="text-4xl block mb-2">🍓</span>
              <h3 className="font-semibold text-foreground">One-time Bowl</h3>
              <p className="text-xs text-muted-foreground mt-1">Order a bowl just for today</p>
            </div>
            <div
              className="bg-card rounded-xl p-4 shadow-fruit cursor-pointer hover:shadow-fruit-lg transition-all active:scale-[0.98]"
              onClick={() => navigate('/bowl-builder?subscription=true')}
            >
              <span className="text-4xl block mb-2">📅</span>
              <h3 className="font-semibold text-foreground">Weekly Subscription</h3>
              <p className="text-xs text-muted-foreground mt-1">Get bowls delivered 6 days a week</p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-foreground">Categories</h2>
            <button
              className="text-primary text-sm font-semibold flex items-center gap-1"
              onClick={() => navigate('/catalog')}
            >
              See All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {categoryList.map((category) => (
              <div
                key={category}
                className="flex-shrink-0 bg-card rounded-xl px-4 py-3 shadow-fruit cursor-pointer hover:shadow-fruit-lg transition-all flex items-center gap-2"
                onClick={() => navigate('/catalog')}
              >
                <span className="text-2xl">{categoryEmojis[category]}</span>
                <span className="font-medium text-sm text-foreground">{category}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Bowls */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-foreground">Popular Bowls</h2>
            <button
              className="text-primary text-sm font-semibold flex items-center gap-1"
              onClick={() => navigate('/catalog')}
            >
              See All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {popularBowls.map((bowl) => (
              <div
                key={bowl.id}
                className="bg-card rounded-xl p-3 shadow-fruit cursor-pointer hover:shadow-fruit-lg transition-all active:scale-[0.98]"
                onClick={() => navigate('/bowl-builder')}
              >
                <span className="text-4xl block text-center mb-2">{bowl.emoji}</span>
                <h3 className="font-semibold text-foreground text-sm text-center">{bowl.name}</h3>
                <p className="text-xs text-muted-foreground text-center mt-1">{bowl.fruits.join(', ')}</p>
                <p className="text-primary font-bold text-center mt-2">₹{bowl.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fresh Fruits */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-foreground">Fresh Fruits</h2>
            <button
              className="text-primary text-sm font-semibold flex items-center gap-1"
              onClick={() => navigate('/catalog')}
            >
              See All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {featuredFruits.map((fruit) => (
              <FruitCard key={fruit.id} fruit={fruit} />
            ))}
          </div>
        </section>

        {/* Build Your Own Bowl CTA */}
        <Button
          variant="fruit"
          size="xl"
          fullWidth
          onClick={() => navigate('/bowl-builder')}
          className="mt-4"
        >
          🍎 Build Your Own Bowl
        </Button>
      </div>
    </div>
  );
};

export default HomeScreen;
