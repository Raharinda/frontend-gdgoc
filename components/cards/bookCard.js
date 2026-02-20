// app/components/cards/bookCard.js
"use client";

import Image from "next/image";

export default function BookCard({ book }) {
  const firstTag = book.tags?.[0]?.name;
  const price = book.details?.price || book.price;
  const link = book.buy_links?.[0]?.url;

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="relative h-64 bg-gray-100">
        {book.cover_image && (
          <Image
            src={book.cover_image}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Category Tag */}
        <span className="inline-block text-xs px-3 py-1 text-gray-600">
          {firstTag}
        </span>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 min-h-3rem">
          {book.title}
        </h3>

        {/* Price */}
        <div className="pt-2">
          <span className="text-lg font-bold text-teal-700">{price}</span>
        </div>
      </div>
    </div>
  );
}
