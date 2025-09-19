import { Home, Grid3X3, ShoppingCart, Heart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function MobileBottomNav() {
  const location = useLocation();
  const { state } = useApp();
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    {
      path: '/',
      icon: Home,
      label: 'Home',
      badge: null
    },
    {
      path: '/categories',
      icon: Grid3X3,
      label: 'Shop',
      badge: null
    },
    {
      path: '/cart',
      icon: ShoppingCart,
      label: 'Cart',
      badge: state.cartItems.reduce((total, item) => total + item.quantity, 0)
    },
    {
      path: '/wishlist',
      icon: Heart,
      label: 'Wishlist',
      badge: state.wishlistItems.length
    },
    {
      path: state.isAuthenticated ? '/profile' : '/login',
      icon: User,
      label: state.isAuthenticated ? 'Profile' : 'Login',
      badge: null
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
      <nav className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors relative ${
                active 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <Icon size={20} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-medium">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium ${active ? 'text-blue-600' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default MobileBottomNav;