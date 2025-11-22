'use client';

import { Heart, ShoppingCart, Eye } from 'lucide-react';

export default function ProductAction({ 
  onBuyNow, 
  onAddToWishlist, 
  onAddToCart, 
  onQuickView 
}) {
  return (
    <div className="flex gap-3 pt-4">
      <button 
        onClick={onBuyNow}
        className="flex-1 bg-blue-600 text-white px-8 py-3.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-base"
      >
        Buy Now
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
