'use client'

import { useBooks } from '../../hooks/useBooks';
import ProductGallery from '../../components/product/ProductGallery';
import ProductTags from './ProductTag';
import ProductInfo from '../../components/product/ProductInfo';
import ProductSpecs from '../../components/product/ProductSpecs';
import ProductActions from './ProductAction';

export default function ProductPage() {
  const { books, loading, error, refetch } = useBooks(1);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  const book = books[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT - IMAGE */}
        <ProductGallery singleBook={book} />

        {/* RIGHT - INFO */}
        <div className="space-y-6">
          <ProductTags tags={book.categories} />
          <ProductInfo book={book} />
          <ProductSpecs book={book} />
          <ProductActions book={book} />
        </div>

      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

function ErrorState({ error, onRetry }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
