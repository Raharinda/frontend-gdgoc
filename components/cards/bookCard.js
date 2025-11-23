// app/components/cards/bookCard.js
'use client';

import Image from 'next/image';

export default function BookCard({ book, onClick }) {
  const getFirstTag = () => {
    if (!book.tags || book.tags.length === 0) return null;
    
    const firstTag = book.tags[0];
    
    if (typeof firstTag === 'object' && firstTag.name) {
      return firstTag.name;
    }
    
    return firstTag;
  };

  const getPrice = () => {
    if (book.details && book.details.price) {
      return book.details.price;
    }
    
    if (book.price) {
      return book.price;
    }
    
    return null;
  };

  const handleClick = () => {
    // Prioritas: buy_links.url > buy_links array > callback onClick
    if (book.buy_links) {
      if (typeof book.buy_links === 'string') {
        window.open(book.buy_links, '_blank');
      } else if (Array.isArray(book.buy_links) && book.buy_links.length > 0) {
        const firstLink = book.buy_links[0];
        if (typeof firstLink === 'object' && firstLink.url) {
          window.open(firstLink.url, '_blank');
        } else if (typeof firstLink === 'string') {
          window.open(firstLink, '_blank');
        }
      } else if (typeof book.buy_links === 'object' && book.buy_links.url) {
        window.open(book.buy_links.url, '_blank');
      }
    } else if (onClick) {
      onClick(book);
    }
  };

  const firstTag = getFirstTag();
  const price = getPrice();

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-64 bg-gray-100">
        {book.cover_image ? (
          <Image
            src={book.cover_image}
            alt={book.title || 'Book cover'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-5xl mb-2">📚</p>
              <p className="text-sm">No Cover</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Category Tag */}
        {firstTag && (
          <span className="inline-block text-xs px-3 py-1 text-gray-600">
            {firstTag}
          </span>
        )}

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">
          {book.title || 'Untitled Book'}
        </h3>

        {/* Price */}
        <div className="pt-2">
          {price ? (
            <span className="text-lg font-bold text-teal-700">
              {price}
            </span>
          ) : (
            <span className="text-lg font-bold text-gray-400">
              Price not available
            </span>
          )}
        </div>
      </div>
    </div>
  );
}