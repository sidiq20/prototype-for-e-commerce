import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CreditCard, Truck, Lock, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Checkout() {
  const { state, getCartItemsWithProducts, getCartTotal, createOrder } = useApp();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Checkout data
  const [shippingData, setShippingData] = useState({
    firstName: state.user?.firstName || '',
    lastName: state.user?.lastName || '',
    email: state.user?.email || '',
    phone: state.user?.phone || '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [billingData, setBillingData] = useState({
    sameAsShipping: true,
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: state.user ? `${state.user.firstName} ${state.user.lastName}` : '',
    paymentMethod: 'card', // card, paypal, apple_pay, google_pay
  });

  const [shippingMethod, setShippingMethod] = useState('standard');

  // Redirect if not authenticated or cart is empty
  if (!state.isAuthenticated) {
    return <Navigate to="/login?redirect=checkout" replace />;
  }

  const cartItems = getCartItemsWithProducts();
  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  // Calculate totals
  const subtotal = getCartTotal();
  const shippingCosts = {
    standard: 0, // Free
    express: 15,
    overnight: 35,
  };
  const shippingCost = shippingCosts[shippingMethod as keyof typeof shippingCosts];
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Free shipping • 5-7 business days',
      price: 0,
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: '2-3 business days',
      price: 15,
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Next business day',
      price: 35,
    },
  ];

  const steps = [
    { id: 1, name: 'Shipping', icon: Truck },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Review', icon: Check },
  ];

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    const orderData = {
      userId: state.user!.id,
      items: cartItems.map(item => ({
        id: Date.now().toString() + Math.random(),
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        total: item.product.price * item.quantity,
      })),
      subtotal,
      tax,
      shipping: shippingCost,
      total,
      status: 'processing' as const,
      shippingAddress: {
        id: 'shipping-1',
        type: 'shipping' as const,
        firstName: shippingData.firstName,
        lastName: shippingData.lastName,
        address1: shippingData.address1,
        address2: shippingData.address2,
        city: shippingData.city,
        state: shippingData.state,
        zipCode: shippingData.zipCode,
        country: shippingData.country,
        isDefault: false,
      },
      billingAddress: billingData.sameAsShipping ? {
        id: 'billing-1',
        type: 'billing' as const,
        firstName: shippingData.firstName,
        lastName: shippingData.lastName,
        address1: shippingData.address1,
        address2: shippingData.address2,
        city: shippingData.city,
        state: shippingData.state,
        zipCode: shippingData.zipCode,
        country: shippingData.country,
        isDefault: false,
      } : {
        id: 'billing-1',
        type: 'billing' as const,
        firstName: billingData.firstName,
        lastName: billingData.lastName,
        address1: billingData.address1,
        address2: billingData.address2,
        city: billingData.city,
        state: billingData.state,
        zipCode: billingData.zipCode,
        country: billingData.country,
        isDefault: false,
      },
      paymentMethod: `**** **** **** ${paymentData.cardNumber.slice(-4)}`,
      trackingNumber: 'TRK' + Date.now().toString().slice(-8),
    };

    const createdOrder = createOrder(orderData);
    setIsProcessing(false);
    navigate(`/order-confirmation/${createdOrder.id}`, { replace: true });
  };

  const renderShippingStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Shipping Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            value={shippingData.firstName}
            onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            value={shippingData.lastName}
            onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={shippingData.email}
            onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={shippingData.phone}
            onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
        <input
          type="text"
          value={shippingData.address1}
          onChange={(e) => setShippingData({ ...shippingData, address1: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Street address"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
        <input
          type="text"
          value={shippingData.address2}
          onChange={(e) => setShippingData({ ...shippingData, address2: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Apartment, suite, etc."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            value={shippingData.city}
            onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <select
            value={shippingData.state}
            onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select State</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
            <option value="FL">Florida</option>
            {/* Add more states as needed */}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
          <input
            type="text"
            value={shippingData.zipCode}
            onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* Shipping Method */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Method</h3>
        <div className="space-y-4">
          {shippingOptions.map((option) => (
            <label key={option.id} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="shipping"
                value={option.id}
                checked={shippingMethod === option.id}
                onChange={(e) => setShippingMethod(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{option.name}</p>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {option.price === 0 ? 'Free' : `$${option.price}`}
                  </p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Payment Information</h2>
      
      {/* Payment Method Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center p-4 border-2 border-blue-500 rounded-lg cursor-pointer bg-blue-50">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentData.paymentMethod === 'card'}
              onChange={(e) => setPaymentData({ ...paymentData, paymentMethod: e.target.value })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <CreditCard className="ml-3 h-5 w-5 text-blue-600" />
            <span className="ml-3 text-sm font-medium text-gray-900">Credit/Debit Card</span>
          </label>
          
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 opacity-50">
            <input
              type="radio"
              name="payment"
              value="paypal"
              disabled
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <div className="ml-3 h-5 w-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
            <span className="ml-3 text-sm font-medium text-gray-500">PayPal (Coming Soon)</span>
          </label>
        </div>
      </div>

      {/* Card Details */}
      {paymentData.paymentMethod === 'card' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
            <input
              type="text"
              value={paymentData.cardholderName}
              onChange={(e) => setPaymentData({ ...paymentData, cardholderName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              value={paymentData.cardNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                if (value.length <= 19) {
                  setPaymentData({ ...paymentData, cardNumber: value });
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="text"
                value={paymentData.expiryDate}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  const formatted = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
                  if (formatted.length <= 5) {
                    setPaymentData({ ...paymentData, expiryDate: formatted });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="MM/YY"
                maxLength={5}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                value={paymentData.cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 4) {
                    setPaymentData({ ...paymentData, cvv: value });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123"
                maxLength={4}
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Billing Address */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
        
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={billingData.sameAsShipping}
              onChange={(e) => setBillingData({ ...billingData, sameAsShipping: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Same as shipping address</span>
          </label>
        </div>

        {!billingData.sameAsShipping && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={billingData.firstName}
                  onChange={(e) => setBillingData({ ...billingData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={billingData.lastName}
                  onChange={(e) => setBillingData({ ...billingData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            {/* Additional billing fields would go here */}
          </div>
        )}
      </div>

      {/* Demo Payment Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Demo Payment</h3>
            <p className="text-sm text-yellow-700 mt-1">
              This is a prototype. No actual payment will be processed. You can use any card details for testing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Order Review</h2>
      
      {/* Order Items */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
        <div className="bg-white border border-gray-200 rounded-lg divide-y">
          {cartItems.map((item) => (
            <div key={item.productId} className="p-4 flex items-center space-x-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-16 w-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium text-gray-900">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-medium">{shippingData.firstName} {shippingData.lastName}</p>
          <p>{shippingData.address1}</p>
          {shippingData.address2 && <p>{shippingData.address2}</p>}
          <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
          <p>{shippingData.country}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            **** **** **** {paymentData.cardNumber.replace(/\s/g, '').slice(-4)}
          </p>
          <p className="text-sm text-gray-600 mt-1">{paymentData.cardholderName}</p>
        </div>
      </div>
    </div>
  );

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return shippingData.firstName && shippingData.lastName && 
               shippingData.email && shippingData.address1 && 
               shippingData.city && shippingData.state && shippingData.zipCode;
      case 2:
        return paymentData.cardNumber && paymentData.expiryDate && 
               paymentData.cvv && paymentData.cardholderName;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-8">
        {/* Mobile Progress Steps */}
        <div className="md:hidden mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Checkout</h2>
              <span className="text-sm text-gray-500">Step {currentStep} of 3</span>
            </div>
            
            {/* Mobile Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
            
            {/* Current Step Info */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white mr-3">
                {React.createElement(steps.find(s => s.id === currentStep)?.icon || Truck, { size: 16 })}
              </div>
              <span className="text-sm font-medium text-gray-900">
                {steps.find(s => s.id === currentStep)?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Progress Steps */}
        <div className="hidden md:block mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                      currentStep >= step.id
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    <step.icon size={20} />
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium transition-colors ${
                      currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex items-center mx-8">
                    <div
                      className={`h-0.5 w-20 transition-colors duration-300 ${
                        currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="order-2 lg:order-1 lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 md:p-6">
                {currentStep === 1 && renderShippingStep()}
                {currentStep === 2 && renderPaymentStep()}
                {currentStep === 3 && renderReviewStep()}
              </div>
              
              {/* Mobile Navigation - Fixed Bottom */}
              <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                  <div>
                    {currentStep > 1 && (
                      <button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </button>
                    )}
                  </div>

                  <div>
                    {currentStep < 3 ? (
                      <button
                        onClick={() => setCurrentStep(currentStep + 1)}
                        disabled={!isStepValid(currentStep)}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      >
                        <Lock className="mr-2 h-4 w-4" />
                        {isProcessing ? 'Processing...' : 'Place Order'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block border-t border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    {currentStep > 1 && (
                      <button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </button>
                    )}
                  </div>

                  <div>
                    {currentStep < 3 ? (
                      <button
                        onClick={() => setCurrentStep(currentStep + 1)}
                        disabled={!isStepValid(currentStep)}
                        className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Lock className="mr-2 h-4 w-4" />
                        {isProcessing ? 'Processing...' : 'Place Order'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-1 lg:order-2 lg:col-span-4 mb-6 lg:mb-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Mobile Summary Header */}
              <div className="md:hidden border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
              </div>
              
              <div className="p-4 md:p-6">
                {/* Desktop Summary Header */}
                <h3 className="hidden md:block text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
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

                {/* Security Notice */}
                <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Lock className="w-4 h-4" />
                  <span className="text-center">Secure 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;