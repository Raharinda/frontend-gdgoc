'use client';

import { Heart, ShoppingCart, Eye, ExternalLink } from 'lucide-react';

export default function ProductAction({ 
  book = {},
  onAddToWishlist, 
  onAddToCart, 
  onQuickView 
}) {
  const handleBuyNow = () => {
    // Cek buy_links dari book
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
    } else {
      alert('Buy link not available for this book');
    }
  };

  // Cek apakah buy_links tersedia
  const hasBuyLink = book.buy_links && (
    typeof book.buy_links === 'string' ||
    (Array.isArray(book.buy_links) && book.buy_links.length > 0) ||
    (typeof book.buy_links === 'object' && book.buy_links.url)
  );

  return (
    <div className="flex gap-3 pt-4">
      <button 
        onClick={handleBuyNow}
        disabled={!hasBuyLink}
        className={`flex-1 px-8 py-3.5 rounded-lg transition-colors font-medium text-base flex items-center justify-center gap-2 ${
          hasBuyLink 
            ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Buy Now
        {hasBuyLink && <ExternalLink size={18} />}
      </button>
      
      <button 
        onClick={onAddToWishlist}
        className="p-3.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Heart size={24} className="text-gray-700" />
      </button>
      
      <button 
        onClick={onAddToCart}
        className="p-3.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <ShoppingCart size={24} className="text-gray-700" />
      </button>
      
      <button 
        onClick={onQuickView}
        className="p-3.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Eye size={24} className="text-gray-700" />
      </button>
    </div>
  );
}