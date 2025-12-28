import { useEffect, useState } from 'react';

const SplashScreen = () => {
  const fruits = ['🍓', '🫐', '🍌', '🍎', '🍊', '🥭', '🍍', '🍇', '🥝', '🍉', '🍑', '🍒'];
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-cream to-peach overflow-hidden flex items-center justify-center">
      {/* Floating Fruits Background */}
      <div className="absolute inset-0 overflow-hidden">
        {fruits.map((fruit, index) => (
          <div
            key={index}
            className="absolute text-4xl animate-float"
            style={{
              left: `${(index * 8) % 100}%`,
              animationDelay: `${index * 0.3}s`,
              animationDuration: `${4 + (index % 3)}s`,
            }}
          >
            {fruit}
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className={`relative z-10 text-center transition-all duration-700 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <div className="mb-6 animate-bounce-gentle">
          <span className="text-8xl drop-shadow-lg">🍎</span>
        </div>
        <h1 className="text-4xl font-extrabold text-foreground mb-2 tracking-tight">
          FruitBowl
        </h1>
        <p className="text-lg text-muted-foreground font-medium">
          A box full of calories
        </p>
      </div>

      {/* Loading dots */}
      <div className="absolute bottom-20 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-primary rounded-full animate-pulse-soft"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
