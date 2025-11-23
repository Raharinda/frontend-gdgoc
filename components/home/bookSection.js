// app/components/home/bookSection.js
'use client';

import { useEffect, useState } from 'react';
import BookCard from '../cards/bookCard';

export default function BookSection() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        // Fetch 8 random books
        const promises = Array(8).fill(null).map(() =>
          fetch('https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/random_book')
            .then(r => r.json())
        );
        const data = await Promise.all(promises);
        setBooks(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 shadow-[0_3px_0_rgba(0,0,0,0.12)]">Books For You</h2>
      
      {/* Grid 4 columns, 2 rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
        {books.map((book, index) => (
          <BookCard key={book._id || index} book={book} />
        ))}
      </div>
    </div>
  );
}