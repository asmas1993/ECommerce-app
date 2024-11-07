import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const categories = ['Electronics', 'Clothing', 'Home'];

export const fetchProducts = async () => {
  const response = await axios.get(`${BASE_URL}/photos?_limit=12`);
  return response.data.map((product) => ({
    id: product.id,
    name: `Product ${product.id}`,
    price: (Math.random() * 100).toFixed(2),
    imageUrl: product.thumbnailUrl,
    category: categories[Math.floor(Math.random() * categories.length)],
  }));
};
