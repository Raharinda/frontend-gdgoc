'use client';

export default function ProductSummary({ summary }) {
  if (!summary) return null;

  return (
    <div className="text-gray-700 leading-relaxed text-sm">
      <p className="whitespace-pre-line">
        {summary}
      </p>
    </div>
  );
}
