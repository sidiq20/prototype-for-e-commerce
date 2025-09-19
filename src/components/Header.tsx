import { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, ChevronDown, Heart, LogOut, Package, Settings, X, Home, Grid3X3, Info, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../data/products';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { state, logout } = useApp();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const productsDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const categoryPages = categories.filter(cat => cat !== 'All');

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 w-full shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 w-full">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight hover:text-gray-700 transition-colors">
                TechStore
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <Link to="/" className="text-zinc-700 hover:text-gray-900 px-4 py-2 font-medium transition-colors relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-zinc-900 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              {/* Products Dropdown */}
              <div 
                ref={productsDropdownRef}
                className="relative" 
                onMouseEnter={() => setIsProductsOpen(true)} 
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <button 
                  className="text-gray-700 hover:text-gray-900 px-4 py-2 font-medium transition-colors relative group flex items-center"
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                >
                  Products
                  <ChevronDown 
                    size={16} 
                    className={`ml-1 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} 
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-zinc-900 group-hover:w-full transition-all duration-300"></span>
                </button>
                {isProductsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {categoryPages.map((category) => (
                      <Link
                        key={category}
                        to={`/category/${category.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        onClick={() => setIsProductsOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <a href="#about" className="text-gray-700 hover:text-gray-900 px-4 py-2 font-medium transition-colors relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-zinc-900 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900 px-4 py-2 font-medium transition-colors relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-zinc-900 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>

            {/* Desktop Search Bar */}
            <form onSubmit={(e) => {
              e.preventDefault();
              if (searchTerm.trim()) {
                navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
              }
            }} className="hidden xl:flex items-center bg-gray-50 rounded-full overflow-hidden shadow-sm">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="px-6 py-3 w-64 bg-transparent focus:outline-none text-gray-700 placeholder-gray-500"
              />
              <button type="submit" className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                <Search size={18} />
              </button>
            </form>

            {/* Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Mobile Search Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden xl:hidden flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-colors"
                title="Search"
              >
                <Search size={16} />
              </button>

              {/* Wishlist Button - Hidden on mobile */}
              <Link
                to="/wishlist"
                className="hidden sm:flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-colors relative"
                title="Wishlist"
              >
                <Heart size={16} md:size={18} />
                {state.wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full font-medium">
                    {state.wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <Link
                to="/cart"
                className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-colors"
                title="Shopping Cart"
              >
                <ShoppingCart size={16} />
                {state.cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full font-medium">
                    {state.cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Link>

              {/* Desktop User Menu */}
              {state.isAuthenticated ? (
                <div ref={userDropdownRef} className="relative hidden sm:block">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-900 transition-colors"
                    title={`Hello, ${state.user?.firstName}`}
                  >
                    <User size={16} />
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">
                          {state.user?.firstName} {state.user?.lastName}
                        </p>
                        <p className="text-xs text-gray-500">{state.user?.email}</p>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="mr-3" size={16} />
                        My Profile
                      </Link>
                      
                      <Link
                        to="/orders"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package className="mr-3" size={16} />
                        My Orders
                      </Link>
                      
                      <Link
                        to="/wishlist"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Heart className="mr-3" size={16} />
                        Wishlist ({state.wishlistItems.length})
                      </Link>
                      
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="mr-3" size={16} />
                        Settings
                      </Link>
                      
                      <div className="border-t border-gray-200 mt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="mr-3" size={16} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-colors"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="p-4 border-b border-gray-200">
              <form onSubmit={(e) => {
                e.preventDefault();
                if (searchTerm.trim()) {
                  navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
                  setIsMobileMenuOpen(false);
                }
              }} className="flex items-center bg-gray-50 rounded-lg overflow-hidden">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-500"
                />
                <button type="submit" className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                  <Search size={18} />
                </button>
              </form>
            </div>

            {/* Mobile Navigation */}
            <nav className="py-4">
              <Link
                to="/"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="mr-3" size={20} />
                Home
              </Link>

              {/* Mobile Categories */}
              <div className="px-4 py-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Categories</p>
                {categoryPages.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category.toLowerCase()}`}
                    className="flex items-center py-2 pl-4 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Grid3X3 className="mr-3" size={16} />
                    {category}
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <a 
                  href="#about" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Info className="mr-3" size={20} />
                  About
                </a>
                <a 
                  href="#contact" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Mail className="mr-3" size={20} />
                  Contact
                </a>
              </div>

              {/* Mobile User Section */}
              {state.isAuthenticated ? (
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="px-4 py-2 mb-2">
                    <p className="font-medium text-gray-900">
                      {state.user?.firstName} {state.user?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{state.user?.email}</p>
                  </div>
                  
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="mr-3" size={20} />
                    My Profile
                  </Link>
                  
                  <Link
                    to="/orders"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Package className="mr-3" size={20} />
                    My Orders
                  </Link>
                  
                  <Link
                    to="/wishlist"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart className="mr-3" size={20} />
                    Wishlist
                    {state.wishlistItems.length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {state.wishlistItems.length}
                      </span>
                    )}
                  </Link>
                  
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="mr-3" size={20} />
                    Settings
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="mr-3" size={20} />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 mt-4 pt-4 px-4 space-y-2">
                  <Link
                    to="/login"
                    className="block w-full text-center bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}