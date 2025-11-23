'use client';

import { useState, useEffect } from 'react';

export const useBooks = (count = 5) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const bookPromises = Array(count).fill(null).map(() => 
        fetch('https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/random_book')
          .then(r => r.json())
      );
      const booksData = await Promise.all(bookPromises);
      setBooks(booksData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  },);

  return { books, loading, error, refetch: fetchBooks };
};
