'use client';

export default function ProductTag({ tags = [] }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`text-sm px-4 py-1.5 rounded ${
            index === 0
              ? 'bg-blue-600 text-white'
              : 'bg-gray-500 text-white'
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
