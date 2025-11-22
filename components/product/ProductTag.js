export default function ProductTag({ tags = [], category = null }) {
  return (
    <div className="flex flex-wrap gap-2">
      {category && (
        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
          {category.name}
        </span>
      )}

      {tags.map((tag, i) => (
        <span
          key={i}
          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
}
