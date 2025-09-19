import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Cart() {
  const { state, getCartItemsWithProducts, updateCartQuantity, removeFromCart, getCartTotal } = useApp();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  const cartItems = getCartItemsWithProducts();
  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    setIsUpdating(productId);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    updateCartQuantity(productId, newQuantity);
    setIsUpdating(null);
  };

  const handleRemoveItem = async (productId: number) => {
    setIsUpdating(productId);
    await new Promise(resolve => setTimeout(resolve, 300));
    removeFromCart(productId);
    setIsUpdating(null);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-gray-400" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
            <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed">
              Discover amazing products and add them to your cart
            </p>
            <Link
              to="/categories"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-8">
        {/* Mobile Header */}
        <div className="mb-4 md:mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Cart</h1>
            <span className="text-sm md:text-base text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="order-2 lg:order-1 lg:col-span-8">
            <div className="space-y-3 md:space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden">
                    <div className="p-4">
                      <div className="flex space-x-4">
                        {/* Product Image */}
                        <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-20 w-20 object-cover rounded-lg"
                          />
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/product/${item.product.id}`}
                            className="text-sm font-semibold text-gray-900 hover:text-blue-600 line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-gray-500 mt-1">{item.product.brand}</p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-lg font-bold text-gray-900">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => handleRemoveItem(item.productId)}
                              disabled={isUpdating === item.productId}
                              className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quantity Controls - Mobile */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-600">Quantity</span>
                        <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-1">
                          <button
                            onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                            disabled={isUpdating === item.productId || item.quantity <= 1}
                            className="p-2 hover:bg-white rounded-md disabled:opacity-50"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                            disabled={isUpdating === item.productId || item.quantity >= 10}
                            className="p-2 hover:bg-white rounded-md disabled:opacity-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:block p-6">
                    <div className="flex items-center space-x-6">
                      {/* Product Image */}
                      <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-24 w-24 object-cover rounded-lg hover:opacity-75 transition-opacity"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">{item.product.brand}</p>
                        <p className="text-sm text-gray-600 mt-1">{item.product.category}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2">
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          disabled={isUpdating === item.productId || item.quantity <= 1}
                          className="p-2 hover:bg-white rounded-md disabled:opacity-50"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          disabled={isUpdating === item.productId || item.quantity >= 10}
                          className="p-2 hover:bg-white rounded-md disabled:opacity-50"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right min-w-[100px]">
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500">
                            ${item.product.price.toFixed(2)} each
                          </p>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        disabled={isUpdating === item.productId}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg disabled:opacity-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping - Desktop */}
            <div className="hidden lg:block mt-6">
              <Link
                to="/categories"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <ArrowLeft className="mr-2" size={16} />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-1 lg:order-2 lg:col-span-4 mb-6 lg:mb-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Mobile Summary Header */}
              <div className="md:hidden border-b border-gray-200 p-4">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>
              
              <div className="p-4 md:p-6">
                {/* Desktop Summary Header */}
                <h2 className="hidden md:block text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg md:text-xl font-bold text-gray-900">Total</span>
                      <span className="text-lg md:text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {shipping > 0 && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800 font-medium">
                      🚚 Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <button
                  onClick={() => {
                    if (!state.isAuthenticated) {
                      navigate('/login?redirect=checkout');
                    } else {
                      navigate('/checkout');
                    }
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6 font-semibold shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                >
                  {state.isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'}
                </button>

                {/* Security Note */}
                <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>

            {/* Continue Shopping - Mobile */}
            <div className="lg:hidden mt-4">
              <Link
                to="/categories"
                className="flex items-center justify-center w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                <ArrowLeft className="mr-2" size={16} />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;