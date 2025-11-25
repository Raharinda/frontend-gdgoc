'use client';

import { useEffect, useState } from 'react';
import BookCard from '../cards/bookCard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function BookSection() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchSingleBook = async () => {
  const res = await fetch(`${API_BASE_URL}/random_book`);
  return res.json();
  };

  useEffect(() => {
    async function loadBooks() {
      try {
        const requests = Array.from({ length: 8 }, () => fetchSingleBook());
        const results = await Promise.all(requests);
        setBooks(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  // LOADING
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );


  // SUCCESS
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-10 p-4 shadow-[0_2px_0_rgba(0,0,0,0.12)]">
        Books For You
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book, i) => (
          <BookCard key={book._id || i} book={book} />
        ))}
      </div>
    </div>
  );
}
