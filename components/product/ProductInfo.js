'use client';

export default function ProductInfo({ book = {} }) {
  const d = book.details || {};
  return (
    <div className="space-y-4">
      {/* Title */}
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
        {book.title || 'Beyond the Stars'}
      </h1>

     {/* HARGA*/}
      <p className="text-3xl font-semibold text-gray-900">
        {d.price || "Rp -"}
      </p>

      {/* Availability */}
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Availability:</span>
        <span className="text-blue-600 font-medium">In Stock</span>
      </div>

    </div>
  );
}
