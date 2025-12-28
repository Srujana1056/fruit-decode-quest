import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

const QuantitySelector = ({ 
  quantity, 
  onIncrease, 
  onDecrease,
  min = 1,
  max = 10
}: QuantitySelectorProps) => {
  return (
    <div className="flex items-center gap-3 bg-muted rounded-full p-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={onDecrease}
        disabled={quantity <= min}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <span className="font-bold text-foreground min-w-[2ch] text-center">
        {quantity}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={onIncrease}
        disabled={quantity >= max}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;
