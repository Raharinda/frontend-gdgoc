'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useBooks } from '../../app/hooks/useBooks';
import ProductTag from './ProductTag';
import ProductInfo from './ProductInfo';
import ProductSpecs from './ProductSpecs';
import ProductAction from './ProductAction';
import ProductSummary from "./ProductSummary";

export default function ProductGallery({ singleBook = null }) {
  const { books, loading, error, refetch } = useBooks(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const displayBooks = useMemo(() => {
    return singleBook ? [singleBook] : books;
  }, [singleBook, books]);
  
  const isRandomMode = !singleBook;

  // AUTOSLIDE
  useEffect(() => {
    if (!isPaused && displayBooks.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % displayBooks.length);
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, displayBooks.length]);

  const handleNext = () => {
    if (displayBooks.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % displayBooks.length);
    }
  };

  const handlePrev = () => {
    if (displayBooks.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + displayBooks.length) % displayBooks.length);
    }
  };

  const handleAddToWishlist = () => {
    alert('Added to wishlist!');
  };

  const handleAddToCart = () => {
    alert('Added to cart!');
  };

  const handleQuickView = () => {
    alert('Quick view opened!');
  };

  if (loading && isRandomMode) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && isRandomMode) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={refetch}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if ((!displayBooks || displayBooks.length === 0) && isRandomMode) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center text-gray-500">
          <p>No books found</p>
          <button
            onClick={refetch}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  // Jika singleBook mode dan tidak ada data, return null
  if (!displayBooks || displayBooks.length === 0) {
    return null;
  }

  const currentBook = displayBooks[currentIndex] || {};
  const carouselImages = displayBooks.map(book => book?.cover_image).filter(Boolean);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Side - Image Carousel */}
      <div>
        <div 
          className="relative bg-gray-200 rounded-lg overflow-hidden aspect-[3/4]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Image */}
          {carouselImages.length > 0 ? (
            <div className="relative w-full h-full">
              <Image
                src={carouselImages[currentIndex]}
                alt={currentBook.title || `Book ${currentIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-opacity duration-500"
                priority
                unoptimized
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="text-6xl mb-4">📚</p>
                <p>No Image Available</p>
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          {carouselImages.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-4 rounded-full transition-all z-10"
              >
                <ChevronLeft size={32} className="text-white" strokeWidth={3} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-4 rounded-full transition-all z-10"
              >
                <ChevronRight size={32} className="text-white" strokeWidth={3} />
              </button>
            </>
          )}

          {/* Zoom Icon */}
          <div className="absolute bottom-6 left-6 z-10">
            <div className="bg-white rounded-full p-2 cursor-pointer hover:bg-gray-100 transition-colors">
              <ZoomIn size={20} className="text-gray-700" />
            </div>
          </div>

          {/* Thumbnail Indicators */}
          {carouselImages.length > 1 && (
            <div className="absolute bottom-6 right-6 flex gap-2 z-10">
              {carouselImages.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Product Details */}
      <div className="space-y-6 p-5 min-h-[700px] max-h-[800px] overflow-y-auto pr-2">
        <ProductTag 
          tags={currentBook.tags} 
          category={currentBook.category}
        />
        <ProductInfo book={currentBook} />
        <ProductSummary summary={currentBook.summary} />
        <ProductSpecs book={currentBook} />
        <ProductAction
          book={currentBook}
          onAddToWishlist={handleAddToWishlist}
          onAddToCart={handleAddToCart}
          onQuickView={handleQuickView}
        />
      </div>
    </div>
  );
}