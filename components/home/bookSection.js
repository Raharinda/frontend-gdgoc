'use client';

import { useEffect, useState } from 'react';
import BookCard from '../cards/bookCard';

export default function BookSection() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcode API URL untuk memastikan tidak ada undefined
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1';

  useEffect(() => {
    async function fetchBooks() {
      try {
        
        // Fetch 8 buku dengan error handling yang lebih baik
        const promises = Array(8).fill(null).map((_, index) =>
          fetch(`${API_BASE_URL}/random_book`)
            .then(async (response) => {
              
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              
              // Check content type
              const contentType = response.headers.get('content-type');
              if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error(`❌ Not JSON response ${index + 1}:`, text.substring(0, 100));
                throw new Error('Response was not JSON');
              }
              
              return response.json();
            })
            .catch(err => {
              console.error(`❌ Fetch error ${index + 1}:`, err);
              throw err;
            })
        );
        
        const data = await Promise.all(promises);
        console.log('✅ Books loaded:', data.length);
        setBooks(data);
      } catch (error) {
        console.error('❌ Error loading books:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [API_BASE_URL]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500">No books found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-10 p-4 shadow-[0_2px_0_rgba(0,0,0,0.12)]">
        Books For You
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <BookCard key={book._id || index} book={book} />
        ))}
      </div>
    </div>
  );
}