import { useEffect, useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { Check, Package, Truck, Mail, Calendar, MapPin, CreditCard, Download, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

function OrderConfirmation() {
  const { state } = useApp();
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(true);

  // Get order ID from navigation state
  const orderId = location.state?.orderId;
  
  // Find the order from our state
  const order = state.orders.find(o => o.id === orderId);

  // Redirect if not authenticated or no order found
  if (!state.isAuthenticated || !order) {
    return <Navigate to="/" replace />;
  }

  // Hide confetti after animation
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5); // 5 days from now

  return (
    <div className="min-h-screen bg-gray-50 pt-20 relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full opacity-70"></div>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase, {state.user?.firstName}!
          </p>
          <p className="text-gray-500">
            Your order #{order.id} has been successfully placed and is being processed.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Order #{order.id}</h2>
                <p className="text-gray-600">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Order Confirmed</p>
                  <p className="text-sm text-gray-500">Your order has been received and is being prepared</p>
                </div>
                <div className="ml-auto text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              
              <div className="flex items-center opacity-50">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Package className="h-4 w-4 text-gray-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-600">Preparing for Shipment</p>
                  <p className="text-sm text-gray-500">We're getting your items ready</p>
                </div>
              </div>
              
              <div className="flex items-center opacity-50">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Truck className="h-4 w-4 text-gray-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-600">Shipped</p>
                  <p className="text-sm text-gray-500">Your order is on its way</p>
                </div>
              </div>
              
              <div className="flex items-center opacity-50">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-gray-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-600">Delivered</p>
                  <p className="text-sm text-gray-500">Package delivered to your address</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Items Ordered</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="h-16 w-16 object-cover rounded border"
                  />
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.productId}`}
                      className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {item.productName}
                    </Link>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${item.total.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${order.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
            </div>
            <div className="text-gray-600 space-y-1">
              <p className="font-medium text-gray-900">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p>{order.shippingAddress.address1}</p>
              {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Estimated delivery: {estimatedDelivery.toLocaleDateString()}</span>
              </div>
              {order.trackingNumber && (
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <Truck className="h-4 w-4 mr-2" />
                  <span>Tracking: {order.trackingNumber}</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <CreditCard className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
            </div>
            <div className="text-gray-600 space-y-2">
              <p className="font-medium text-gray-900">Credit Card</p>
              <p>{order.paymentMethod}</p>
              <div className="flex items-center text-sm text-green-600 mt-3">
                <Check className="h-4 w-4 mr-2" />
                <span>Payment successful</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </button>
            </div>
          </div>
        </div>

        {/* Email Confirmation Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <Mail className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-blue-900">Confirmation Email Sent</h3>
              <p className="text-blue-700 mt-1">
                We've sent a confirmation email to <strong>{state.user?.email}</strong> with your order details 
                and tracking information. Please check your inbox (and spam folder).
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/orders"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Package className="mr-2 h-5 w-5" />
            View All Orders
          </Link>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* What's Next */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Order Processing</h4>
              <p className="text-sm text-gray-600">
                We'll prepare your items for shipment within 1-2 business days.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Shipping Updates</h4>
              <p className="text-sm text-gray-600">
                You'll receive tracking information once your order ships.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Stay Connected</h4>
              <p className="text-sm text-gray-600">
                We'll keep you updated via email throughout the process.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Support */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need help with your order? 
            <Link to="/contact" className="text-blue-600 hover:text-blue-800 ml-1">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;