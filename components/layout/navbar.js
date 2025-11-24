'use client';
import Link from "next/link";

import { useState } from 'react';
// Social Icons
import { SiInstagram } from "react-icons/si";
import { FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";
// UI Icons
import { BsTelephone, BsCart2 } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { IoSearchOutline, IoPersonOutline, IoMenu, IoClose } from "react-icons/io5";
import { FiHeart, FiChevronDown } from "react-icons/fi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <div className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="w-full bg-teal-700 text-white text-sm p-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
          {/* Left: Phone + Email - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-6">
            <span className="flex items-center gap-2">
              <BsTelephone /> (225) 555-0118
            </span>
            <span className="flex items-center gap-2">
              <MdOutlineEmail /> michelle.rivera@example.com
            </span>
          </div>
          
          {/* Middle: Promo */}
          <div className="hidden md:block font-semibold text-xs sm:text-sm">
            Follow Us and get a chance to win 80% off
          </div>
          
          {/* Mobile: Only Promo */}
          <div className="md:hidden text-xs font-semibold">
            Win 80% off!
          </div>
          
          {/* Right: Social icons */}
          <div className="flex items-center gap-2 sm:gap-4 text-base sm:text-lg">
            <span className="text-xs sm:text-sm hidden sm:inline">Follow Us :</span>
            <div className="flex gap-2 sm:gap-3 text-white items-center">
              <SiInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
              <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5" />
              <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
              <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <span className="text-lg sm:text-xl font-semibold">Bookstar</span>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-evenly gap-6">
            <Link href="/" className="cursor-pointer px-2 py-2 hover:text-teal-600">Home</Link>
            {/* SHOP + DROPDOWN */}
            <div className="relative group">
              <span className="flex items-center gap-1 cursor-pointer font-medium px-2 py-2 text-gray-700 group-hover:text-teal-600">
                Shop
                <FiChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
              </span>
              <div className="absolute left-0 top-6 hidden group-hover:flex flex-col bg-white shadow-md rounded-md w-40 p-3 gap-2 text-sm z-50">
                <span className="cursor-pointer hover:text-teal-600">All Products</span>
                <span className="cursor-pointer hover:text-teal-600">Best Seller</span>
                <span className="cursor-pointer hover:text-teal-600">Categories</span>
              </div>
            </div>
            <Link href="/about" className="cursor-pointer hover:text-teal-600 px-2 py-2">About</Link>
            <Link href="/blog" className="cursor-pointer hover:text-teal-600 px-2 py-2">Blog</Link>
            <Link href="/contact" className="cursor-pointer hover:text-teal-600 px-2 py-2">Contact</Link>
            <Link href="/info" className="cursor-pointer hover:text-teal-600 px-2 py-2">Pages</Link>
          </div>

          {/* Desktop Icons */}
          <div className="hidden lg:flex justify-between text-blue-400 gap-10">
            <div className="flex gap-3">
              <IoPersonOutline size={22} />
              <span className="cursor-pointer hover:text-blue-800 font-semibold">Login / Register</span>
            </div>
            <div className="cursor-pointer hover:text-blue-800"><IoSearchOutline size={22} /></div>
            <div className="cursor-pointer hover:text-blue-800"><BsCart2 size={20} /></div>
            <div className="cursor-pointer hover:text-blue-800"><FiHeart size={20} /></div>
          </div>

          {/* Mobile Icons + Menu Button */}
          <div className="flex lg:hidden items-center gap-4 text-blue-400">
            <div className="cursor-pointer hover:text-blue-800"><IoSearchOutline size={20} /></div>
            <div className="cursor-pointer hover:text-blue-800"><BsCart2 size={20} /></div>
            <div className="cursor-pointer hover:text-blue-800"><FiHeart size={20} /></div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer hover:text-blue-800"
            >
              {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 mt-4 pt-4">
            <div className="flex flex-col space-y-4">
              <span className="cursor-pointer hover:text-teal-600 px-2 py-2">Home</span>
              
              {/* Mobile Shop Dropdown */}
              <div>
                <button
                  onClick={() => setIsShopOpen(!isShopOpen)}
                  className="flex items-center justify-between w-full cursor-pointer hover:text-teal-600 px-2 py-2"
                >
                  <span>Shop</span>
                  <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isShopOpen ? 'rotate-180' : ''}`} />
                </button>
                {isShopOpen && (
                  <div className="flex flex-col pl-6 mt-2 space-y-2 text-sm">
                    <span className="cursor-pointer hover:text-teal-600 py-1">All Products</span>
                    <span className="cursor-pointer hover:text-teal-600 py-1">Best Seller</span>
                    <span className="cursor-pointer hover:text-teal-600 py-1">Categories</span>
                  </div>
                )}
              </div>

            <Link href="/about" className="cursor-pointer hover:text-teal-600 px-2 py-2">About</Link>
            <Link href="/blog" className="cursor-pointer hover:text-teal-600 px-2 py-2">Blog</Link>
            <Link href="/contact" className="cursor-pointer hover:text-teal-600 px-2 py-2">Contact</Link>
            <Link href="/info" className="cursor-pointer hover:text-teal-600 px-2 py-2">Pages</Link>

              
              {/* Mobile Login/Register */}
              <div className="flex items-center gap-3 px-2 py-2 border-t border-gray-200 pt-4 text-blue-400">
                <IoPersonOutline size={22} />
                <span className="cursor-pointer hover:text-blue-800 font-semibold">Login / Register</span>
              </div>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}