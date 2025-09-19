import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryHero from '../components/CategoryHero';
import { products } from '../data/products';

function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });

  // Filter products by category
  const categoryProducts = products.filter(
    product => product.category.toLowerCase() === category?.toLowerCase()
  );

  // Apply additional filters
  const filteredProducts = categoryProducts.filter(product => {
    const brandMatch = selectedBrand === 'All' || product.brand === selectedBrand;
    const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
    return brandMatch && priceMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Get category-specific brands
  const categoryBrands = ['All', ...Array.from(new Set(categoryProducts.map(p => p.brand)))];

  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      {/* Hide CategoryHero on mobile, show on desktop */}
      <div className="hidden md:block">
        <CategoryHero category={category || ''} />
      </div>
      
      {/* Mobile Category Header */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-900">{categoryTitle}</h1>
        <p className="text-sm text-gray-600 mt-1">{categoryProducts.length} products available</p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-8">
          {/* Mobile Filters - Compact Layout */}
          <div className="md:hidden space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Filters</h3>
              <span className="text-xs text-gray-500">
                {sortedProducts.length} of {categoryProducts.length} products
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Brands</option>
                  {categoryBrands.filter(brand => brand !== 'All').map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price ↑</option>
                  <option value="price-high">Price ↓</option>
                  <option value="rating">Rating ↓</option>
                </select>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Price Range</span>
                <span className="text-xs text-gray-500">${priceRange.min} - ${priceRange.max}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
          
          {/* Desktop Filters - Full Layout */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categoryBrands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ${priceRange.min} - ${priceRange.max}
              </label>
              <div className="flex space-x-2">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="text-sm text-gray-500">
                Showing {sortedProducts.length} of {categoryProducts.length} products
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {sortedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8l-4 4-4-4m0 0L7 9l4-4z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
          </div>
        )}

        {/* Category Features - Hidden on mobile for better performance */}
        <div className="hidden md:block mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why Choose Our {categoryTitle}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">All products undergo rigorous quality testing</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing with regular discounts</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $100</p>
            </div>
          </div>
        </div>
        
        {/* Mobile Features - Compact version */}
        <div className="md:hidden mt-8 bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
            Why Shop {categoryTitle}?
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Quality Guaranteed</h4>
                <p className="text-xs text-gray-600">Rigorous quality testing</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Best Prices</h4>
                <p className="text-xs text-gray-600">Competitive pricing</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Fast Shipping</h4>
                <p className="text-xs text-gray-600">Free shipping over $100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;