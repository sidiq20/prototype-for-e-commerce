import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Wishlist() {
  const { state, getWishlistItemsWithProducts, removeFromWishlist, addToCart } = useApp();
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  const wishlistItems = getWishlistItemsWithProducts();

  const handleRemoveFromWishlist = async (productId: number) => {
    setIsUpdating(productId);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    removeFromWishlist(productId);
    setIsUpdating(null);
  };

  const handleAddToCart = async (productId: number) => {
    setIsUpdating(productId);
    const product = wishlistItems.find(item => item.productId === productId)?.product;
    if (product) {
      await new Promise(resolve => setTimeout(resolve, 300));
      addToCart(product);
    }
    setIsUpdating(null);
  };

  // Redirect to login if not authenticated
  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Heart className="mx-auto h-24 w-24 text-gray-300 mb-8" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign in to view your wishlist</h1>
            <p className="text-lg text-gray-600 mb-8">
              Save your favorite items and keep track of what you love.
            </p>
            <div className="space-x-4">
              <Link
                to="/login"
                className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/"
                className="inline-flex items-center border border-gray-300 bg-white text-gray-700 px-8 py-3 rounded-md hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="mr-2" size={20} />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Heart className="mx-auto h-24 w-24 text-gray-300 mb-8" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
            <p className="text-lg text-gray-600 mb-8">
              Save items you love by clicking the heart icon on any product.
            </p>
            <Link
              to="/"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">{wishlistItems.length} saved items</p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.productId}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative">
                <Link to={`/product/${item.product.id}`}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-48 object-cover group-hover:opacity-75 transition-opacity"
                  />
                </Link>
                
                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(item.productId)}
                  disabled={isUpdating === item.productId}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Remove from wishlist"
                >
                  <Heart 
                    className="text-red-500 fill-current" 
                    size={18}
                  />
                </button>

                {/* Product Badges */}
                <div className="absolute top-3 left-3 space-y-2">
                  {item.product.isNew && (
                    <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      NEW
                    </div>
                  )}
                  {item.product.originalPrice && (
                    <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      SALE
                    </div>
                  )}
                  {!item.product.inStock && (
                    <div className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      OUT OF STOCK
                    </div>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {item.product.brand}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {item.product.category}
                  </span>
                </div>

                <Link
                  to={`/product/${item.product.id}`}
                  className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2"
                >
                  {item.product.name}
                </Link>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {item.product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(item.product.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-500">
                    {item.product.rating} ({item.product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      ${item.product.price}
                    </span>
                    {item.product.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${item.product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleAddToCart(item.productId)}
                    disabled={!item.product.inStock || isUpdating === item.productId}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm font-medium"
                  >
                    <ShoppingCart className="mr-2" size={16} />
                    {item.product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  
                  <button
                    onClick={() => handleRemoveFromWishlist(item.productId)}
                    disabled={isUpdating === item.productId}
                    className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm font-medium"
                  >
                    <Trash2 className="mr-2" size={16} />
                    Remove
                  </button>
                </div>

                {/* Date Added */}
                <div className="mt-3 text-xs text-gray-400">
                  Added {new Date(item.addedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2" size={16} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;