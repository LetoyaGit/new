import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='p-10 bg-white  text-black text-sm'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10'>
        
        {/* Logo and Description */}
        <div>
          <Link to='/'>
            <img src={assets.logo} className='mb-5 w-64' alt='Company Logo' />
          </Link>
          <p className='max-w-md'>
            Discover our range of trusted household and personal products designed to enhance your everyday life. Shop with confidence and ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='font-bold mb-3'>Quick Links</h3>
          <ul className='space-y-2'>
            <li><Link to='/' className='hover:text-gray-400'>Home</Link></li>
            <li><Link to='/collection' className='hover:text-gray-400'>Collection</Link></li>
            <li><Link to='/about' className='hover:text-gray-400'>About Us</Link></li>
            <li><Link to='/contact' className='hover:text-gray-400'>Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className='font-bold mb-3'>GET IN TOUCH</h3>
          <ul className='space-y-2'>
            <li className='hover:text-gray-400'>Biashara Pamoja</li>
            <li className='hover:text-gray-400'>Taveta Lane</li>
            <li className='hover:text-gray-400'>simaloilemaikiai@gmail.com</li>
            <li className='hover:text-gray-400'>Phone +254 718 471124</li>
          </ul>
        </div>
        
      </div>
      <hr className='my-8 border-gray-600' />
      {/* Copyright Section */}
      <div className='mt-10 text-center text-gray-500'>
        © 2024 Letoya.dev - All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

