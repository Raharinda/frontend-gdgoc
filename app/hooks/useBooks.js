import { useState, useEffect, useCallback } from 'react';

export function useBooks(count = 5) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const promises = Array(count).fill(null).map((_, index) =>
        fetch(`${API_BASE_URL}/random_book`)
          .then(async (response) => {
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
              throw new Error('Response is not JSON');
            }

            return response.json();
          })
      );

      const data = await Promise.all(promises);
      
      // Add unique key untuk setiap buku
      const booksWithKeys = data.map((book, index) => ({
        ...book,
        _uniqueKey: `${book._id}-${index}-${Date.now()}`
      }));

      setBooks(booksWithKeys);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [count, API_BASE_URL]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return {
    books,
    loading,
    error,
    refetch: fetchBooks
  };
}