'use client';

export default function ProductTag({ tags = [], category }) {
  const getTagName = (tag) => {
    if (typeof tag === 'object' && tag.name) {
      return tag.name;
    }
    return tag;
  };

  const displayTags = tags && tags.length > 0 
    ? tags.slice(0, 3).map(getTagName) 
    : category 
    ? [category.name || category] 
    : [];

  if (displayTags.length === 0) return null;

  return (
    <div className="flex gap-2 flex-wrap">
      {displayTags.map((tag, index) => (
        <span
          key={index}
          className={`text-sm px-4 py-1.5 rounded ${
            index === 0 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-800 text-white'
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}