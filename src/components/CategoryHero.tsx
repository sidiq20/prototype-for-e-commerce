import { Smartphone, Laptop, Headphones, Tablet, Mouse } from 'lucide-react';

interface CategoryHeroProps {
  category: string;
}

const categoryConfig = {
  smartphones: {
    title: "Latest Smartphones",
    subtitle: "Stay connected with cutting-edge mobile technology",
    description: "Discover the newest flagship phones with advanced cameras, powerful processors, and innovative features.",
    icon: Smartphone,
    bgGradient: "from-blue-600 to-purple-700",
    stats: [
      { label: "Latest Models", value: "50+" },
      { label: "Top Brands", value: "10+" },
      { label: "Customer Rating", value: "4.8★" }
    ]
  },
  laptops: {
    title: "Professional Laptops",
    subtitle: "Power through any task with premium computing",
    description: "From ultrabooks to gaming rigs, find the perfect laptop for work, creativity, and entertainment.",
    icon: Laptop,
    bgGradient: "from-gray-700 to-gray-900",
    stats: [
      { label: "Performance Tiers", value: "All" },
      { label: "Operating Systems", value: "3+" },
      { label: "Battery Life", value: "20+ hrs" }
    ]
  },
  audio: {
    title: "Premium Audio",
    subtitle: "Immerse yourself in superior sound quality",
    description: "Experience music like never before with our collection of headphones, earbuds, and speakers.",
    icon: Headphones,
    bgGradient: "from-purple-600 to-pink-600",
    stats: [
      { label: "Audio Quality", value: "Hi-Fi" },
      { label: "Noise Canceling", value: "Active" },
      { label: "Playtime", value: "60+ hrs" }
    ]
  },
  tablets: {
    title: "Versatile Tablets",
    subtitle: "Create, work, and play on the perfect display",
    description: "Find tablets that adapt to your lifestyle, from professional drawing to casual entertainment.",
    icon: Tablet,
    bgGradient: "from-emerald-600 to-teal-600",
    stats: [
      { label: "Screen Sizes", value: "8-13″" },
      { label: "Stylus Support", value: "Yes" },
      { label: "Battery Life", value: "15+ hrs" }
    ]
  },
  accessories: {
    title: "Tech Accessories",
    subtitle: "Complete your setup with premium accessories",
    description: "Enhance your devices with keyboards, mice, chargers, and other essential accessories.",
    icon: Mouse,
    bgGradient: "from-orange-600 to-red-600",
    stats: [
      { label: "Categories", value: "20+" },
      { label: "Compatibility", value: "Universal" },
      { label: "Warranty", value: "2 Years" }
    ]
  }
};

export default function CategoryHero({ category }: CategoryHeroProps) {
  const config = categoryConfig[category.toLowerCase() as keyof typeof categoryConfig];
  
  if (!config) {
    return null;
  }

  const IconComponent = config.icon;

  return (
    <div className={`relative bg-gradient-to-br ${config.bgGradient} text-white overflow-hidden`}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
                <IconComponent size={32} />
              </div>
              <span className="text-lg font-medium opacity-90">Premium {category}</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              {config.title}
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 opacity-90 font-light">
              {config.subtitle}
            </p>
            
            <p className="text-lg mb-10 opacity-80 leading-relaxed max-w-lg">
              {config.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {config.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm opacity-75">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Large background circle */}
              <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <div className="w-60 h-60 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <IconComponent size={120} className="text-white/80" />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/15 backdrop-blur-sm rounded-full animate-pulse delay-300"></div>
              <div className="absolute top-1/2 -left-8 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-12 text-gray-50">
          <path
            fill="currentColor"
            d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,69.3C672,64,768,64,864,69.3C960,75,1056,85,1152,85.3C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </div>
  );
}