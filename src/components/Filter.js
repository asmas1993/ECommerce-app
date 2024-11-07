import React from 'react';

const Filter = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ['All', 'Electronics', 'Clothing', 'Home'];

  return (
    <div className="filter">
      <label htmlFor="category">Filter by Category: </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
