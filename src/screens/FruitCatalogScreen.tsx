import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodaysFreshFruits, categories } from '@/data/dummyData';
import { ArrowLeft } from 'lucide-react';

const FruitCatalogScreen = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Get today's available fruits only
  let filteredFruits = [...getTodaysFreshFruits()];

  // Filter by category
  if (selectedCategory !== 'all') {
    filteredFruits = filteredFruits.filter(
      (fruit) => fruit.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  // Sort fruits (removed price sorting)
  if (sortBy === 'alphabetical') {
    filteredFruits.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'seasonal') {
    filteredFruits.sort((a, b) => (b.seasonal ? 1 : 0) - (a.seasonal ? 1 : 0));
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card p-4 pt-6 sticky top-0 z-10 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Today's Fresh Fruits</h1>
            <p className="text-sm text-muted-foreground">Choose exactly 6 different fruits</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {categories.slice(0, 5).map((category) => (
            <button
              key={category.id}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-fruit'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span>{category.emoji}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Sort Dropdown - removed price options */}
        <div className="mt-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-muted text-foreground text-sm px-3 py-2 rounded-lg border-none outline-none w-full"
          >
            <option value="default">Sort by</option>
            <option value="alphabetical">A-Z</option>
            <option value="seasonal">Seasonal First</option>
          </select>
        </div>
      </div>

      {/* Fruits Grid - NO PRICES */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredFruits.map((fruit) => (
            <div key={fruit.id} className="w-full">
              <div 
                className="bg-card rounded-xl overflow-hidden shadow-fruit hover:shadow-fruit-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => navigate(`/fruit/${fruit.id}`)}
              >
                <div className="relative aspect-square bg-muted">
                  <img 
                    src={fruit.image} 
                    alt={fruit.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {fruit.seasonal && (
                    <span className="absolute top-2 right-2 bg-tropical text-xs font-semibold px-2 py-1 rounded-full text-foreground">
                      Seasonal
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-foreground truncate">{fruit.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{fruit.nutrition.calories} cal</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FruitCatalogScreen;
