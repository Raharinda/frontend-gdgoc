'use client';

import { Heart, ShoppingCart, Eye } from 'lucide-react';

export default function ProductAction({ 
  book = {},
  onAddToWishlist, 
  onAddToCart, 
  onQuickView 
}) {
  const link = book.buy_links?.[0]?.url;

  const handleBuyNow = () => {
    window.open(link, "_blank");
  };

  return (
    <div className="flex gap-2 pt-4">
      <button 
        onClick={handleBuyNow}
        className=" py-1 px-8 font-semibold rounded-xl transition-colors text-base flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
      >
        Buy Now
      </button>

      
      <button 
        onClick={onAddToWishlist}
        className="p-3.5 bg-blue-100 rounded-4xl hover:bg-blue-200 transition-colors"
      >
        <Heart size={24} className="text-gray-700" />
      </button>
      
      <button 
        onClick={onAddToCart}
        className="p-3.5 bg-blue-100 rounded-4xl hover:bg-blue-200 transition-colors"
      >
        <ShoppingCart size={24} className="text-gray-700" />
      </button>
      
      <button 
        onClick={onQuickView}
        className="p-3.5 bg-blue-100 rounded-4xl hover:bg-blue-200 transition-colors"
      >
        <Eye size={24} className="text-gray-700" />
      </button>
    </div>
  );
}
