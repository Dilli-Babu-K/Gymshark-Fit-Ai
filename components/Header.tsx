import React from 'react';
import UserIcon from './icons/UserIcon';
import HeartIcon from './icons/HeartIcon';
import CartIcon from './icons/CartIcon';
import SearchIcon from './icons/SearchIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white py-4 border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Left Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-semibold uppercase tracking-wider hover:text-gray-700 transition-colors">Women</a>
          <a href="#" className="text-sm font-semibold uppercase tracking-wider hover:text-gray-700 transition-colors">Men</a>
          <a href="#" className="text-sm font-semibold uppercase tracking-wider hover:text-gray-700 transition-colors">Accessories</a>
        </div>

        {/* Center Logo */}
        <div className="flex-1 flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
          <h1 className="text-2xl font-black tracking-widest text-black uppercase">
            GYMSHARK
          </h1>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <SearchIcon className="h-6 w-6 text-black" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <UserIcon className="h-6 w-6 text-black" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <HeartIcon className="h-6 w-6 text-black" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <CartIcon className="h-6 w-6 text-black" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;