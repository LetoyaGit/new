import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from "../components/Title"; 
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOption, setSortOption] = useState('relevance');

  useEffect(() => {
    const filtered = products.filter(product => {
      const categoryMatch = !Object.keys(selectedCategories).length || selectedCategories[product.category];
      const searchMatch = search ? product.name.toLowerCase().includes(search.toLowerCase()) : true;

      return categoryMatch && searchMatch;
    });

    const sorted = filtered.sort((a, b) => {
      if (sortOption === 'lowToHigh') return a.price - b.price;
      if (sortOption === 'highToLow') return b.price - a.price;
      return 0; 
    });

    setFilteredProducts(sorted);
  }, [products, selectedCategories, sortOption, search]);

  const handleCheckboxChange = (category) => {
    setSelectedCategories(prev => {
      const newSelectedCategories = {
        ...prev,
        [category]: !prev[category],
      };
      return !Object.values(newSelectedCategories).includes(true) ? {} : newSelectedCategories;
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 pt-8 border-t'>
      <div className='min-w-60'>
        <p 
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img 
            className={`h-3 sm:hidden ${!showFilter ? 'rotate-90' : ''}`} 
            src={assets.dropdown_icon} 
            alt='Dropdown Icon' 
          />
        </p>
        <div className={`border border-gray-500 pl-5 py-3 mt-6 ${!showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-800'>
            {['Kids', 'Perfume', 'KitchenWare', 'Bathroom', 'Organisers'].map((category) => (
              <label className='flex gap-2' key={category}>
                <input 
                  className='w-3' 
                  type="checkbox" 
                  value={category} 
                  checked={selectedCategories[category] || false}
                  onChange={() => handleCheckboxChange(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select 
            className='border-2 border-gray-300 text-sm px-2'
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="relevance">Sort by: Relevance</option>
            <option value="lowToHigh">Sort by: Low to High</option>
            <option value="highToLow">Sort by: High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductItem key={item._id} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          ) : (
            <p className='text-gray-600'>No products found for the selected categories and search term.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collection;


