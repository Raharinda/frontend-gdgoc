'use client';

import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border-b border-gray-200 py-7 px-57 justify-between">
      <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-600 gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight size={16} />}
            {item.href ? (
              <a 
                href={item.href} 
                className={`${item.active ? 'text-gray-900 font-medium' : 'text-gray-400'} hover:text-gray-900 no-underline`}
              >
                {item.label}
              </a>
            ) : (
              <span className={item.active ? 'text-gray-900' : 'text-gray-400'}>
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
