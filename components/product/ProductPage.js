'use client'

import { useState } from 'react';
import { useBooks } from '../../hooks/useBooks';
import ProductGallery from '../../components/product/ProductGallery';
import ProductTags from './ProductTag';
import ProductInfo from '../../components/product/ProductInfo';
import ProductSpecs from '../../components/product/ProductSpecs';
import ProductActions from './ProductAction';

export default function ProductPage() {
  const { books, loading, error, refetch } = useBooks(5);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % books.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  const handleBuyNow = () => {
    console.log('Buy now clicked for book:', books[currentIndex]);
    alert(`Purchasing: ${books[currentIndex]?.title}`);
  };

  const handleAddToWishlist = () => {
    console.log('Added to wishlist:', books[currentIndex]);
    alert('Added to wishlist!');
  };

  const handleAddToCart = () => {
    console.log('Added to cart:', books[currentIndex]);
    alert('Added to cart!');
  };

  const handleQuickView = () => {
    console.log('Quick view:', books[currentIndex]);
    alert('Quick view opened!');
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  const currentBook = books[currentIndex] || {};
  const carouselImages = books.map(book => book.cover_image).filter(Boolean);

  const breadcrumbItems = [
    { label: 'Home', href: '/', active: true },
    { label: 'Shop', active: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Gallery */}
          <ProductGallery
            images={carouselImages}
            currentIndex={currentIndex}
            onPrev={handlePrev}
            onNext={handleNext}
          />
          
          {/* Right Side - Product Details */}
          <div className="space-y-6">
            <ProductTags tags={currentBook.categories} />
            <ProductInfo book={currentBook} />
            <ProductSpecs book={currentBook} />
            <ProductActions
              onBuyNow={handleBuyNow}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              onQuickView={handleQuickView}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

function ErrorState({ error, onRetry }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={onRetry}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}