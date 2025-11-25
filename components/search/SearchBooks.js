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

    const firstRes = await fetch(`${API}/book?page=1`);
    const firstData = await firstRes.json();
    const totalPages = firstData.pagination.totalPages;

    const all = firstData.books.filter((b) =>
      b.title.toLowerCase().includes(q.toLowerCase())
    );

    if (all.length > 0) {
      setResults(all);
      setLoading(false);
      return;
    }

    for (let page = 2; page <= totalPages; page++) {
      const res = await fetch(`${API}/book?page=${page}`);
      const data = await res.json();

      const match = data.books.filter((b) =>
        b.title.toLowerCase().includes(q.toLowerCase())
      );

      if (match.length > 0) {
        setResults(match);
        break;
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      searchBooks(keyword);
    }, 600);
  }, [keyword]);

  return (
    <div className="p-2">
      <input
        className="border px-3 py-2 rounded w-full"
        placeholder="Cari buku..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {loading && <p className="mt-3 text-sm text-gray-500">Mencari...</p>}

      {!loading && keyword && results.length === 0 && (
        <p className="mt-3 text-sm text-gray-500">Tidak ditemukan</p>
      )}

      {!loading && results.length > 0 && (
        <div className="mt-4 max-h-64 overflow-y-auto space-y-2">
          {results.map((book) => {
            if (!book.cover_image) return null; // ⬅ SKIP buku tanpa gambar

            return (
              <div
                key={book._id}
                className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <Image
                  src={book.cover_image}
                  alt={book.title}
                  width={50}
                  height={70}
                  className="w-10 h-14 object-cover rounded"
                />

                <p className="text-sm leading-tight">{book.title}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
