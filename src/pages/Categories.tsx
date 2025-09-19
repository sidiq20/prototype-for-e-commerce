import { Link } from 'react-router-dom';
import { Smartphone, Laptop, Headphones, Tablet, Mouse, ArrowRight } from 'lucide-react';
import { categories } from '../data/products';

const categoryConfig = {
  smartphones: {
    title: "Smartphones",
    subtitle: "Latest mobile devices",
    icon: Smartphone,
    bgGradient: "from-blue-500 to-blue-600",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  laptops: {
    title: "Laptops",
    subtitle: "Professional computers",
    icon: Laptop,
    bgGradient: "from-gray-600 to-gray-700",
    textColor: "text-gray-600",
    bgColor: "bg-gray-50"
  },
  audio: {
    title: "Audio",
    subtitle: "Premium sound devices",
    icon: Headphones,
    bgGradient: "from-purple-500 to-purple-600",
    textColor: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  tablets: {
    title: "Tablets",
    subtitle: "Versatile touchscreens",
    icon: Tablet,
    bgGradient: "from-emerald-500 to-emerald-600",
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-50"
  },
  accessories: {
    title: "Accessories",
    subtitle: "Complete your setup",
    icon: Mouse,
    bgGradient: "from-orange-500 to-orange-600",
    textColor: "text-orange-600",
    bgColor: "bg-orange-50"
  }
};

function Categories() {
  const categoryPages = categories.filter(cat => cat !== 'All');

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20 pb-4">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shop by Category</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Discover our full range of products</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {categoryPages.map((category) => {
            const config = categoryConfig[category.toLowerCase() as keyof typeof categoryConfig];
            if (!config) return null;
            
            const IconComponent = config.icon;
            
            return (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                
                <div className="relative p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${config.bgColor} rounded-full p-3 md:p-4`}>
                      <IconComponent size={24} className={config.textColor} />
                    </div>
                    <ArrowRight 
                      size={20} 
                      className="text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-all" 
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {config.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4">
                      {config.subtitle}
                    </p>
                    
                    <div className="flex items-center space-x-2 text-xs md:text-sm">
                      <span className={`px-2 py-1 rounded-full ${config.bgColor} ${config.textColor} font-medium`}>
                        Explore
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500">New arrivals</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Featured Categories - Mobile Compact */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Popular This Week</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {categoryPages.slice(0, 4).map((category) => {
              const config = categoryConfig[category.toLowerCase() as keyof typeof categoryConfig];
              if (!config) return null;
              
              const IconComponent = config.icon;
              
              return (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase()}`}
                  className="group flex flex-col items-center text-center p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`${config.bgColor} rounded-full p-2 md:p-3 mb-2 group-hover:scale-110 transition-transform`}>
                    <IconComponent size={20} className={config.textColor} />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-900 group-hover:text-gray-700">
                    {config.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile: Quick Actions */}
        <div className="md:hidden mt-6 grid grid-cols-2 gap-4">
          <Link
            to="/search"
            className="bg-blue-600 text-white p-4 rounded-xl text-center font-medium hover:bg-blue-700 transition-colors"
          >
            Search Products
          </Link>
          <Link
            to="/cart"
            className="bg-gray-900 text-white p-4 rounded-xl text-center font-medium hover:bg-gray-800 transition-colors"
          >
            View Cart
          </Link>
        </div>

        {/* Desktop: Features */}
        <div className="hidden md:block mt-12 bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Shop With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Products</h3>
              <p className="text-gray-600">Carefully curated selection of premium tech products</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing with regular sales and discounts</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $100 with express options</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;