"use client";
import ProductAction from "@/components/product/ProductAction";
import { useEffect } from "react";
import { BsCart2 } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";

// Helper: if value is an object, try common keys; otherwise return as-is
function resolveValue(val) {
  if (val === null || val === undefined) return null;
  if (typeof val === "object" && !Array.isArray(val)) {
    return val.url ?? val.name ?? val.value ?? val.label ?? JSON.stringify(val);
  }
  return val;
}

export default function BookPopup({ book, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!book) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal box — stop click from bubbling to backdrop */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-[90vw] max-w-3xl max-h-[85vh] overflow-y-auto flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold z-10"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Book Cover */}
        <div className="flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none p-6 md:w-64">
          {resolveValue(book.cover_image) ? (
            <img
              src={resolveValue(book.cover_image)}
              alt={resolveValue(book.title)}
              className="w-40 md:w-52 object-cover rounded-lg shadow-md"
            />
          ) : (
            <div className="w-40 md:w-52 h-60 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm">
              No Cover
            </div>
          )}
        </div>

        {/* Book Details */}
        <div className="flex flex-col gap-3 p-6 flex-1">
          {/* Availability */}
          <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
            {resolveValue(book.availability) ?? "In Stock"}
          </span>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">
            {resolveValue(book.title)}
          </h2>

          {/* Description */}
          {resolveValue(book.description) && (
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-5">
              {resolveValue(book.description)}
            </p>
          )}

          {/* Meta info */}
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700 border-t pt-3">
            {resolveValue(book.pages) && (
              <>
                <span className="font-medium text-gray-500">Pages</span>
                <span>{resolveValue(book.pages)} pages</span>
              </>
            )}
            {resolveValue(book.publisher) && (
              <>
                <span className="font-medium text-gray-500">Publisher</span>
                <span>{resolveValue(book.publisher)}</span>
              </>
            )}
            {resolveValue(book.isbn) && (
              <>
                <span className="font-medium text-gray-500">ISBN</span>
                <span>{resolveValue(book.isbn)}</span>
              </>
            )}
            {resolveValue(book.published_date) && (
              <>
                <span className="font-medium text-gray-500">Published</span>
                <span>{resolveValue(book.published_date)}</span>
              </>
            )}
            {resolveValue(book.format) && (
              <>
                <span className="font-medium text-gray-500">Format</span>
                <span>{resolveValue(book.format)}</span>
              </>
            )}
            {resolveValue(book.author) && (
              <>
                <span className="font-medium text-gray-500">Author</span>
                <span>{resolveValue(book.author)}</span>
              </>
            )}
          </div>

          {/* Actions */}
          <ProductAction book={book} />
        </div>
      </div>
    </div>
  );
}
