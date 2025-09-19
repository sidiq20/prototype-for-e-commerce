import { Shield, Truck, Award, Users, Zap, Heart } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "All our products come with comprehensive warranty and quality assurance.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Free shipping on orders over $50 with express delivery options available.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Award,
      title: "Expert Support",
      description: "Our technical experts are available 24/7 to help with any questions.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Trusted by Thousands",
      description: "Join over 50,000 satisfied customers who trust us for their tech needs.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Zap,
      title: "Latest Technology",
      description: "We stock the newest and most innovative products from top brands.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our priority with hassle-free returns and exchanges.",
      color: "from-red-500 to-red-600"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "1000+", label: "Products Available" },
    { number: "99.9%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <section id="about" className="bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About TechStore
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're passionate about bringing you the latest technology and premium gadgets. 
            Since 2020, we've been your trusted partner in the digital world, offering 
            carefully curated products that enhance your lifestyle.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="animate-slide-up">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Founded in 2020 by a team of technology enthusiasts, TechStore began as a 
                small startup with a big vision: to make cutting-edge technology accessible 
                to everyone. We started in a small garage, testing and reviewing products 
                to ensure we only offered the best to our customers.
              </p>
              <p>
                Today, we've grown into a trusted online destination for premium gadgets, 
                serving customers worldwide. Our commitment to quality, innovation, and 
                exceptional customer service remains at the heart of everything we do.
              </p>
              <p>
                We believe technology should enhance your life, not complicate it. That's 
                why we carefully curate every product in our catalog, ensuring it meets 
                our high standards for quality, functionality, and value.
              </p>
            </div>
          </div>
          <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
                alt="Our team"
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse-slow">
                <span className="font-bold text-sm">EST. 2020</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl animate-spin-slow"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 blur-xl animate-bounce-slow"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-16 animate-fade-in">
            Why Choose TechStore?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon size={28} className="text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center animate-fade-in">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto opacity-90">
              To empower people through technology by providing access to the world's best 
              gadgets, backed by exceptional service and support. We're not just selling 
              products – we're helping you discover new possibilities and enhance your 
              digital lifestyle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}