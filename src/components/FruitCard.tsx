import { useNavigate } from 'react-router-dom';
import { Fruit } from '@/data/dummyData';

interface FruitCardProps {
  fruit: Fruit;
  showPrice?: boolean;
  onClick?: () => void;
}

const FruitCard = ({ fruit, showPrice = true, onClick }: FruitCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/fruit/${fruit.id}`);
    }
  };

  return (
    <div 
      className="bg-card rounded-xl overflow-hidden shadow-fruit hover:shadow-fruit-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98] flex-shrink-0 w-36"
      onClick={handleClick}
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
        {showPrice && (
          <p className="text-xs text-muted-foreground mt-0.5">{fruit.nutrition.calories} cal</p>
        )}
      </div>
    </div>
  );
};

export default FruitCard;
