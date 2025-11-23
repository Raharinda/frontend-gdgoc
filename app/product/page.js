'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Eye, ZoomIn } from 'lucide-react';

export default function ProductPage() {
  const [books, setBooks] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const bookPromises = Array(5).fill(null).map(() => 
        fetch(`${API_BASE_URL}/random_book`)
          .then(async (r) => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            
            const contentType = r.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
              throw new Error('Response is not JSON');
            }
            
            return r.json();
          })
      );
      
      const booksData = await Promise.all(bookPromises);
      setBooks(booksData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (books.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % books.length);
    }
  };

  const prevImage = () => {
    if (books.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + books.length) % books.length);
    }
  };

  if (!mounted || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            type="button"
            onClick={fetchBooks}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No books found</p>
          <button
            type="button"
            onClick={fetchBooks}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  const currentBook = books[currentImageIndex] || {};
  const carouselImages = books.map(book => book?.cover_image).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-600 gap-2">
          <Link 
            href="/" 
            className="text-gray-900 font-medium hover:text-gray-700 no-underline"
          >
            Home
          </Link>
          <ChevronRight size={16} />
          <span className="text-gray-400">Shop</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Gallery */}
          <div>
            <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-[3/4]">
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded">
                  Featured
                </span>
              </div>

              {carouselImages.length > 0 ? (
                <div className="relative w-full h-full">
                  <Image
                    src={carouselImages[currentImageIndex]}
                    alt={currentBook.title || `Book ${currentImageIndex + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
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
                    onClick={prevImage}
                    type="button"
                    aria-label="Previous image"
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-4 rounded-full transition-all z-10"
                  >
                    <ChevronLeft size={32} className="text-white" strokeWidth={3} />
                  </button>
                  <button
                    onClick={nextImage}
                    type="button"
                    aria-label="Next image"
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-4 rounded-full transition-all z-10"
                  >
                    <ChevronRight size={32} className="text-white" strokeWidth={3} />
                  </button>
                </>
              )}

              {/* Zoom Icon */}
              <div className="absolute bottom-6 left-6 z-10">
                <button 
                  type="button"
                  className="bg-white rounded-full p-2 cursor-pointer hover:bg-gray-100 transition-colors"
                  aria-label="Zoom image"
                >
                  <ZoomIn size={20} className="text-gray-700" />
                </button>
              </div>

              {/* Image Indicators */}
              {carouselImages.length > 1 && (
                <div className="absolute bottom-6 right-6 flex gap-2 z-10">
                  {carouselImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentImageIndex(idx)}
                      aria-label={`Go to image ${idx + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 w-2'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Category Tags */}
            <div className="flex gap-2 flex-wrap">
              {currentBook.tags && currentBook.tags.length > 0 ? (
                currentBook.tags.slice(0, 2).map((tag, idx) => (
                  <span 
                    key={idx} 
                    className={`text-sm px-4 py-1.5 rounded ${
                      idx === 0 ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'
                    }`}
                  >
                    {typeof tag === 'object' ? tag.name : tag}
                  </span>
                ))
              ) : (
                <>
                  <span className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded">
                    Books
                  </span>
                  <span className="bg-gray-800 text-white text-sm px-4 py-1.5 rounded">
                    Featured
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {currentBook.title || 'Book Title'}
            </h1>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900">
              {currentBook.details?.price || currentBook.price || 'Price not available'}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Availability:</span>
              <span className="text-blue-600 font-medium">In Stock</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {currentBook.summary || currentBook.description || 'No description available.'}
            </p>

            {/* Book Details */}
            <div className="space-y-2 text-sm">
              {currentBook.details?.total_pages && (
                <div className="flex">
                  <span className="text-gray-600 font-medium w-28">Pages:</span>
                  <span className="text-gray-900">{currentBook.details.total_pages}</span>
                </div>
              )}
              {currentBook.publisher && (
                <div className="flex">
                  <span className="text-gray-600 font-medium w-28">Publisher:</span>
                  <span className="text-gray-900">{currentBook.publisher}</span>
                </div>
              )}
              {currentBook.details?.isbn && (
                <div className="flex">
                  <span className="text-gray-600 font-medium w-28">ISBN:</span>
                  <span className="text-gray-900">{currentBook.details.isbn}</span>
                </div>
              )}
              {currentBook.details?.published_date && (
                <div className="flex">
                  <span className="text-gray-600 font-medium w-28">Published:</span>
                  <span className="text-gray-900">{currentBook.details.published_date}</span>
                </div>
              )}
              {currentBook.author?.name && (
                <div className="flex">
                  <span className="text-gray-600 font-medium w-28">Author:</span>
                  <span className="text-gray-900">{currentBook.author.name}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button 
                type="button"
                className="flex-1 bg-blue-600 text-white px-8 py-3.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-base"
                onClick={() => {
                  if (currentBook.buy_links) {
                    const link = Array.isArray(currentBook.buy_links) 
                      ? currentBook.buy_links[0] 
                      : currentBook.buy_links;
                    const url = typeof link === 'object' ? link.url : link;
                    if (url) window.open(url, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                Buy Now
              </button>
              <button 
                type="button"
                className="p-3.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart size={24} className="text-gray-700" />
              </button>
              <button 
                type="button"
                className="p-3.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Add to cart"
              >
                <ShoppingCart size={24} className="text-gray-700" />
              </button>
              <button 
                type="button"
                className="p-3.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Quick view"
              >
                <Eye size={24} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}