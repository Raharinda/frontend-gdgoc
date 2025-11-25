'use client';

import { ChevronRight } from 'lucide-react';

export default function Breadcrumb() {
  return (
    <div className="bg-white border-b border-gray-200 p-10">
      <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-600 gap-2">
        <span className="text-black">Home</span>
        <ChevronRight size={16} />
        <span className="text-gray-400">Shop</span>
      </div>
    </div>
  );
}
