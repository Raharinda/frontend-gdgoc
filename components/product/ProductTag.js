'use client';

export default function ProductTag({ tags = [] }) {
  // Hilangkan duplikasi
  const uniqueTags = [...new Set(tags)];

  return (
    <div className="flex gap-2 flex-wrap">
      {uniqueTags.map((tag, index) => (
        <span
          key={index}
          className="text-sm px-4 py-1.5 rounded-4xl bg-gray-200 text-black"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
