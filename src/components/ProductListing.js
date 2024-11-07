import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
};

const ProductListing = ({ addToCart, selectedCategory, searchQuery }) => {
  const { data: products, isLoading, error } = useQuery('products', fetchProducts, { suspense: true });

  // If the data is still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If there was an error fetching the data
  if (error) {
    return <div>Error fetching products</div>;
  }

  // Filter products based on selected category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    const matchesSearch =
      (product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="row ">
      {filteredProducts.map((product) => (
        <div className='col-sm-4 mt-4 mb-4'>
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} className="img-fluid" />
          <h3 className="text-lg font-semibold text-gray-800 product-name">{product.title}</h3>
          <p className="text-gray-600 mt-2">${product.price}</p>
          <p>{product.category}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
