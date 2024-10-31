import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Product = () => {
  const { productId } = useParams();  // Call useParams as a function and destructure productId
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchProductData = () => {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);  // Set the first image as default
        console.log(product); // Fixed typo in console.log
      }
    };

    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img 
                src={item} 
                key={index} 
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink cursor-pointer' 
                onClick={() => setImage(item)}  // Set clicked image as main image
                alt='' 
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(127)</p>
          </div>
          <p className='mt-5 text-3xl font-me'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
        
          </div>
          <button onClick={()=>addToCart(productData)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'> ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on delivery is accepted on this product</p>
            <p>Easy return and exchange policy within 5 days</p>
          </div>

        </div>
    
      </div>
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <b className='border px-5 py-3 text-sm'>Reviews</b>

        </div>
        <div className='flex flex-col gap-4 border px-6 text-sm text-gray-500'>
          <p>Thank you for choosing us as your go-to online store. Were excited to continue serving you with quality products and exceptional service. Shop with ease, explore our latest collections, and enjoy convenient ordering right from our platform. Whether you’re looking for something special or stocking up on essentials, we’re here to make your shopping experience seamless. Place your order today and let us handle the rest!</p>
        </div>
      </div>
    </div>
  ) : (
    <div className='opacity-0'>Loading...</div>
  );
};

export default Product;
