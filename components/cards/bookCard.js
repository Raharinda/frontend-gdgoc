// app/components/cards/bookCards.js
'use client';

export default function BookCard({ book }) {
  // Handle tags
  const getFirstTag = () => {
    if (!book.tags || book.tags.length === 0) return null;
    
    const firstTag = book.tags[0];
    
    if (typeof firstTag === 'object' && firstTag.name) {
      return firstTag.name;
    }
    
    return firstTag;
  };

  // Get price dari details atau book langsung
  const getPrice = () => {
    // Cek di book.details.price
    if (book.details && book.details.price) {
      return book.details.price;
    }
    
    // Cek di book.price
    if (book.price) {
      return book.price;
    }
    
    return null;
  };

  const firstTag = getFirstTag();
  const price = getPrice();

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative h-64 bg-gray-100">
        {book.cover_image ? (
          <img
            src={book.cover_image}
            alt={book.title || 'Book cover'}
            className="w-full h-full object-cover"
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

        {/* Price - HANYA 1 HARGA */}
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