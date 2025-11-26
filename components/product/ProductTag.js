export default function ProductTag({ tags = [] }) {
  // Ensure tags is an array and normalize the data
  const normalizedTags = Array.isArray(tags) 
    ? tags.map(tag => {
        if (typeof tag === 'string') return tag;
        if (typeof tag === 'object' && tag !== null) {
          return tag.name || tag.label || JSON.stringify(tag);
        }
        return String(tag);
      })
    : [];

  if (normalizedTags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {normalizedTags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}