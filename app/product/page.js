'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Eye, ZoomIn } from 'lucide-react';

export default function ProductPage() {
  const [books, setBooks] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch 5 random books untuk carousel
      const bookPromises = Array(5).fill(null).map(() => 
        fetch('https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/random_book').then(r => r.json())
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
    setCurrentImageIndex((prev) => (prev + 1) % books.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  if (loading) {
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
            onClick={fetchBooks}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const currentBook = books[currentImageIndex] || {};
  const carouselImages = books.map(book => book.cover_image).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-600 gap-2">
          <a href="#" className="text-gray-900 font-medium hover:text-gray-900 no-underline">
            Home
          </a>
          <ChevronRight size={16} />
          <span className="text-gray-400">Shop</span>
        </div>
      </div>

      {/* Debug Info */}
      <div className="max-w-7xl mx-auto px-6 py-4 bg-yellow-100 border border-yellow-400 rounded my-4">
        <h3 className="font-bold mb-2">🔍 Debug Info:</h3>
        <p>Total books: {books.length}</p>
        <p>Valid images: {carouselImages.length}</p>
        <p>Current index: {currentImageIndex}</p>
        <details className="mt-2">
          <summary className="cursor-pointer font-semibold">Show Current Book Data</summary>
          <pre className="bg-white p-4 rounded mt-2 overflow-auto text-xs max-h-96">
            {JSON.stringify(currentBook, null, 2)}
          </pre>
        </details>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Gallery */}
          <div>
            <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-3/4">
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded">
                  1440 x 92 Hug
                </span>
              </div>

              {carouselImages.length > 0 ? (
                <image
                  src={carouselImages[currentImageIndex]}
                  alt={`Book ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image load error:', e);
                    console.log('Failed image URL:', carouselImages[currentImageIndex]);
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <p className="text-6xl mb-4">📚</p>
                    <p>No Image Available</p>
                    <p className="text-xs mt-2">Images count: {carouselImages.length}</p>
                  </div>
                </div>
              )}

              {/* Navigation Arrows */}
              {carouselImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-4 rounded-full transition-all"
                  >
                    <ChevronLeft size={32} className="text-white" strokeWidth={3} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-4 rounded-full transition-all"
                  >
                    <ChevronRight size={32} className="text-white" strokeWidth={3} />
                  </button>
                </>
              )}

              {/* Zoom Icon */}
              <div className="absolute bottom-6 left-6">
                <div className="bg-white rounded-full p-2 cursor-pointer hover:bg-gray-100 transition-colors">
                  <ZoomIn size={20} className="text-gray-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Category Tags */}
            <div className="flex gap-2 flex-wrap">
              <span className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded">
                Self Improvement
              </span>
              <span className="bg-gray-800 text-white text-sm px-4 py-1.5 rounded">
                Technology
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {currentBook.title || 'Beyond the Stars'}
            </h1>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900">
              ${currentBook.price || '1,139.33'}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Availability:</span>
              <span className="text-blue-600 font-medium">In Stock</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {currentBook.description || 'Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.'}
            </p>

            {/* Book Details */}
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="text-gray-600 font-medium w-28">Pages:</span>
                <span className="text-gray-900">{currentBook.pages || '328'}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 font-medium w-28">Publisher:</span>
                <span className="text-gray-900">{currentBook.publisher || 'Noir House Books'}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 font-medium w-28">ISBN:</span>
                <span className="text-gray-900">{currentBook.isbn || '978-1-234567-90-6'}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 font-medium w-28">Published:</span>
                <span className="text-gray-900">{currentBook.publication_date || 'January 20, 2024'}</span>
              </div>
              {currentBook.authors && currentBook.authors.length > 0 && (
                <div className="flex">
                  <span className="text-gray-600 font-medium w-28">Author:</span>
                  <span className="text-gray-900">{currentBook.authors.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button className="flex-1 bg-blue-600 text-white px-8 py-3.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-base">
                Buy Now
              </button>
              <button className="p-3.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart size={24} className="text-gray-700" />
              </button>
              <button className="p-3.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <ShoppingCart size={24} className="text-gray-700" />
              </button>
              <button className="p-3.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye size={24} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}