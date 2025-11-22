"use client";

export default function ProductSpecs({ book = {} }) {
  const d = book.details || {};

  const specs = [
    { label: 'Pages', value: d.total_pages || '-' },
    { label: 'Publisher', value: book.publisher || '-' },
    { label: 'ISBN', value: d.isbn || '-' },
    { label: 'Published', value: d.published_date || '-' },
    { label: 'Format', value: d.format || '-' },
    { label: 'Size', value: d.size || '-' },
  ];

  // Add Author if exists
  if (book.author?.name) {
    specs.push({ label: 'Author', value: book.author.name });
  }

  return (
    <div className="space-y-2 text-sm">
      {specs.map((spec, index) => (
        <div key={index} className="flex">
          <span className="text-gray-600 font-medium w-28">{spec.label}:</span>
          <span className="text-gray-900">{spec.value}</span>
        </div>
      ))}
    </div>
  );
}
