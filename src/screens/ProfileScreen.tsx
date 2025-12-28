import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Package, RefreshCw, CreditCard, Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: MapPin, label: 'Saved Addresses', action: () => alert('Saved addresses') },
    { icon: Package, label: 'Order History', action: () => alert('Order history') },
    { icon: RefreshCw, label: 'Subscription Management', action: () => navigate('/subscription') },
    { icon: CreditCard, label: 'Payment Methods', action: () => alert('Payment methods') },
    { icon: Settings, label: 'Settings', action: () => alert('Settings') },
    { icon: HelpCircle, label: 'Help & Support', action: () => alert('Help & support') }
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/30 p-4 pt-6">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* User Info Card */}
        <div className="bg-card rounded-xl p-5 shadow-fruit flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-soft rounded-full flex items-center justify-center">
            <span className="text-3xl">👤</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-foreground text-lg">{user?.name || 'User'}</h2>
            <p className="text-sm text-muted-foreground truncate">{user?.email || 'user@example.com'}</p>
            <p className="text-sm text-muted-foreground">{user?.phone || '+91 98765 43210'}</p>
          </div>
          <button className="text-primary font-semibold text-sm" onClick={() => alert('Edit profile')}>
            Edit
          </button>
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-xl shadow-fruit overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 p-4 hover:bg-muted transition-colors ${
                  index < menuItems.length - 1 ? 'border-b border-border' : ''
                }`}
                onClick={item.action}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={handleLogout}
          className="border-destructive text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default ProfileScreen;
