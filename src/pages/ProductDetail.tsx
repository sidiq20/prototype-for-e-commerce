import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2, ShoppingCart, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';

function ProductDetail() {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('features');
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product.id);
      }
    }
  };

  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link to="/" className="text-gray-400 hover:text-gray-500">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-400 mx-2">/</span>
                <Link to={`/category/${product.category.toLowerCase()}`} className="text-gray-400 hover:text-gray-500">
                  {product.category}
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-gray-500">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image */}
          <div className="flex flex-col-reverse">
            <div className="aspect-w-1 aspect-h-1 w-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover object-center sm:rounded-lg"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
              <button
                onClick={handleWishlistToggle}
                className={`p-2 rounded-full ${product && isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
              >
                <Heart className={`h-6 w-6 ${product && isInWishlist(product.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Brand and Category */}
            <div className="mt-3 flex items-center space-x-4">
              <span className="text-sm text-gray-500">by {product.brand}</span>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">{product.category}</span>
            </div>

            {/* Rating */}
            <div className="mt-3 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className={`h-5 w-5 ${
                      product.rating > rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="ml-3 text-sm text-gray-500">
                {product.rating} out of 5 stars ({product.reviews} reviews)
              </p>
            </div>

            {/* Price */}
            <div className="mt-6">
              <div className="flex items-center space-x-4">
                <p className="text-3xl font-bold text-gray-900">${product.price}</p>
                {product.originalPrice && (
                  <p className="text-xl text-gray-500 line-through">${product.originalPrice}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <p className="text-base text-gray-700">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="mt-6">
              <div className={`flex items-center ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                <Check className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="mt-4 flex space-x-2">
              {product.isNew && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">New</span>
              )}
              {product.isFeatured && (
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Featured</span>
              )}
            </div>

            {/* Add to Cart */}
            <div className="mt-8">
              <div className="flex items-center space-x-4 mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!product.inStock}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button className="bg-gray-200 border border-transparent rounded-md py-3 px-6 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-gray-300">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {['features', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === 'features' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Technical Specifications</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm font-medium text-gray-500">{key}</dt>
                      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Reviews</h3>
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <Star
                        key={rating}
                        className={`h-5 w-5 ${
                          product.rating > rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-600">
                    Based on {product.reviews} reviews
                  </p>
                </div>
                <p className="text-gray-500">Reviews coming soon...</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="h-48 w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{relatedProduct.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">${relatedProduct.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;