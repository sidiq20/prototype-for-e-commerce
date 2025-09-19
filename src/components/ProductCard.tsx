import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useApp();
  return (
    <div className="bg-white rounded-lg md:rounded-2xl shadow-sm md:shadow-lg hover:shadow-lg md:hover:shadow-2xl transition-all duration-300 w-full card-hover overflow-hidden">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </Link>
        {product.isNew && (
          <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-full">
            <span className="text-xs font-semibold">NEW</span>
          </div>
        )}
        {product.originalPrice && (
          <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-full">
            <span className="text-xs font-semibold">SALE</span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-zinc-900 bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-white text-gray-900 px-3 py-2 md:px-6 md:py-3 rounded-full font-semibold shadow-lg text-xs md:text-sm">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>
      
      <div className="p-3 md:p-4 lg:p-6">
        {/* Mobile: Hide brand/category badges, Desktop: Show them */}
        <div className="hidden md:flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">{product.brand}</span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{product.category}</span>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2 leading-tight hover:text-blue-600 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        
        {/* Mobile: Compact rating, Desktop: Full rating */}
        <div className="flex items-center mb-2 md:mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="ml-1 md:ml-2 text-xs md:text-sm text-gray-600 font-medium">
            {product.rating}
            <span className="hidden sm:inline"> ({product.reviews})</span>
          </span>
        </div>
        
        {/* Mobile: Hide description, Desktop: Show description */}
        <p className="hidden md:block text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        {/* Price and Add to Cart */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 pt-2 md:pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-1 md:space-x-2">
            <span className="text-lg md:text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm md:text-lg text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          {/* Mobile: Icon only button, Desktop: Full button */}
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="bg-zinc-900 text-white rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl transform hover:scale-105
                       px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3
                       flex items-center justify-center sm:justify-start space-x-1 md:space-x-2"
          >
            <ShoppingCart size={14} />
            <span className="hidden sm:inline text-xs md:text-sm">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}