import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Home, ShoppingCart, User } from 'lucide-react';

const BottomTabNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useCart();

  // Don't show on auth screens or splash
  const hideOnPaths = ['/login', '/signup', '/'];
  if (hideOnPaths.includes(location.pathname) && location.pathname !== '/home') {
    return null;
  }

  const tabs = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: getTotalItems() },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  const isActive = (path: string) => {
    if (path === '/home') {
      return location.pathname === '/home' || location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-card border-t border-border z-50 safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          return (
            <button
              key={tab.path}
              className={`flex flex-col items-center justify-center w-20 h-full relative transition-all duration-200 ${
                active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => navigate(tab.path)}
            >
              <div className={`relative ${active ? 'animate-bounce-gentle' : ''}`}>
                <Icon className={`w-6 h-6 ${active ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-berry text-card text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium ${active ? 'font-semibold' : ''}`}>
                {tab.label}
              </span>
              {active && (
                <div className="absolute bottom-0 w-12 h-1 bg-primary rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabNav;
