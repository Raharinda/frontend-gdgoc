"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function SearchBooks() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const typingTimeout = useRef(null);

  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const searchBooks = async (q) => {
    if (!q) {
      setResults([]);
      return;
    }

    setLoading(true);
    let collected = [];

    try {
      for (let page = 1; page <= 3; page++) { 
        const res = await fetch(`${API}/book?page=${page}`);
        const data = await res.json();

        const match = data.books.filter((b) =>
          b.title.toLowerCase().includes(q.toLowerCase())
        );

        collected.push(...match);

        if (collected.length >= 10) break; 
      }

      setResults(collected);
    } catch (error) {
      console.error("Search error:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      searchBooks(keyword);
    }, 600); 

    return () => clearTimeout(typingTimeout.current);
  }, [keyword]);

  return (
    <div className="p-2 relative">
      <input
        className="border px-3 py-2 rounded w-full"
        placeholder="Cari buku..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {loading && (
        <p className="mt-3 text-sm text-gray-500">Mencari...</p>
      )}

      {!loading && keyword && results.length === 0 && (
        <p className="mt-3 text-sm text-gray-500">Tidak ditemukan</p>
      )}

      {!loading && results.length > 0 && (
        <div className="absolute z-50 bg-white mt-2 w-full max-h-64 overflow-y-auto border rounded-md shadow">
          {results.map((book) => {
            if (!book.cover_image) return null;

            const link = book.buy_links?.[0]?.url;

            return (
              <div
                key={book._id}
                onClick={() => link && window.open(link, "_blank")}
                className="flex items-start gap-3 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <Image
                  src={book.cover_image}
                  alt={book.title}
                  width={50}
                  height={70}
                  className="w-10 h-14 object-cover rounded"
                />

                <div className="flex flex-col">
                  <p className="text-sm leading-tight">{book.title}</p>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
