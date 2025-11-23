'use client';
import { useState, useEffect, useCallback } from 'react';

export const useBooks = (count = 5) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      
      const bookPromises = Array(count).fill(null).map(() => 
        fetch(`${apiBaseUrl}/random_book`)
          .then(r => r.json())
      );
      const booksData = await Promise.all(bookPromises);
      
      // Tambahkan unique identifier untuk setiap buku agar key tetap unik
      const booksWithUniqueId = booksData.map((book, index) => ({
        ...book,
        _uniqueKey: `${book._id}-${index}-${Date.now()}`
      }));
      
      setBooks(booksWithUniqueId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [count]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return { books, loading, error, refetch: fetchBooks };
};