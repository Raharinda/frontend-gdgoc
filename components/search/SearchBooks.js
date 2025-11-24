"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image"

export default function SearchBooks() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const typingTimeout = useRef(null);
  const [loading, setLoading] = useState(false);

  const searchBooks = async (q) => {
    if (!q) return setResults([]);

    setLoading(true);
    const all = [];

    // fetch page 1 dulu
    const firstRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/book?page=1`
    );
    const firstData = await firstRes.json();
    const totalPages = firstData.pagination.totalPages;

    // filter page 1
    all.push(
      ...firstData.books.filter((b) =>
        b.title.toLowerCase().includes(q.toLowerCase())
      )
    );

    // kalau ketemu → stop
    if (all.length > 0) {
      setResults(all);
      setLoading(false);
      return;
    }

    // fetch page selanjutnya sampai ketemu
    for (let page = 2; page <= totalPages; page++) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/book?page=${page}`
      );
      const data = await res.json();

      const match = data.books.filter((b) =>
        b.title.toLowerCase().includes(q.toLowerCase())
      );

      if (match.length > 0) {
        all.push(...match);
        break;
      }
    }

    setResults(all);
    setLoading(false);
  };

  // Debounce search
  useEffect(() => {
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      searchBooks(keyword);
    }, 600);
  }, [keyword]);

  return (
    <div className="p-2">
      {/* INPUT SEARCH */}
      <input
        className="border px-3 py-2 rounded w-full"
        placeholder="Cari buku..."
        onChange={(e) => setKeyword(e.target.value)}
      />

      {/* LOADING */}
      {loading && (
        <p className="mt-3 text-sm text-gray-500">Mencari...</p>
      )}

      {/* NO RESULT */}
      {!loading && results.length === 0 && keyword && (
        <p className="mt-3 text-sm text-gray-500">Tidak ditemukan</p>
      )}

      {/* HASIL SEARCH */}
      {!loading && results.length > 0 && (
        <div className="mt-4 max-h-64 overflow-y-auto space-y-2">
          {results.map((book) => (
            <div
              key={book._id}
              className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              {/* THUMBNAIL KECIL */}
              <Image
                src={book.cover_image}
                alt={book.title}
                className="w-10 h-14 object-cover rounded"
                width={50}
                height={50}
              />

              {/* JUDUL */}
              <p className="text-sm leading-tight">
                {book.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
