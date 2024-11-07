import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductListing from './components/ProductListing';
import Filter from './components/Filter';
import Cart from './components/Cart';
import Loader from './components/Loader';
import ReviewList from './components/ReviewList';
import ReviewForm from './components/ReviewForm';
import AdminDashboard from './components/AdminDashboard';
import useCartStore from './store/useCartStore';
import debounce from 'lodash.debounce';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Debounced search handler
  const handleSearch = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  // Notify when item is added to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="container">
          <ToastContainer />
          <div className="row">
            <div className="col-sm-12">
              <h1 className="text-2xl font-bold text-center mb-4">Product Listing</h1>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="row">
            <div className="col-sm-6">
              <Filter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </div>
            <div className="col-sm-6 search_wrapper">
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Search products..."
                  onChange={(e) => handleSearch(e.target.value)}
                  className="p-2 border rounded-md w-80"
                />
              </div>
            </div>
          </div>

          {/* Routes */}
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  {/* Product Listing */}
                  <div className="">
                    <Suspense fallback={<Loader />}>
                      <ProductListing
                        addToCart={handleAddToCart}
                        selectedCategory={selectedCategory}
                        searchQuery={searchQuery}
                        setSelectedProduct={setSelectedProduct} // Set selected product for review page
                      />
                    </Suspense>
                  </div>
                  {/* Cart */}
                  <div className="mt-8 md:mt-0 md:w-80">
                    <Cart
                      removeFromCart={removeFromCart}
                      updateQuantity={updateQuantity}
                    />
                  </div>
                </>
              } 
            />
            <Route 
              path="/product/:id" 
              element={
                <>
                  <ReviewList productId={selectedProduct?.id} />
                  <ReviewForm productId={selectedProduct?.id} />
                </>
              } 
            />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;