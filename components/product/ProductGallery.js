"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useBooks } from "@/app/hooks/useBooks";
import ProductTag from "./ProductTag";
import ProductInfo from "./ProductInfo";
import ProductSpecs from "./ProductSpecs";
import ProductAction from "./ProductAction";
import ProductSummary from "./ProductSummary";

export default function ProductGallery({ singleBook = null }) {
  const { books, loading, error, refetch } = useBooks(5);

  // BOOK DATA
  const displayBooks = singleBook ? [singleBook] : books || [];

  // SLIDER STATE
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // AUTOSLIDE
  useEffect(() => {
    if (!isPaused && displayBooks.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % displayBooks.length);
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, displayBooks.length]);

  // BASIC HANDLERS
  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % displayBooks.length);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + displayBooks.length) % displayBooks.length);


  // CURRENT BOOK
  const currentBook = displayBooks[currentIndex];
  const carouselImages = displayBooks
    .map((b) => b?.cover_image)
    .filter(Boolean);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT - IMAGE */}
      <div>
        <div
          className="relative bg-gray-200 rounded-lg overflow-hidden aspect-[3/4]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {carouselImages.length ? (
            <div className="relative w-full h-full">
              <Image
                src={carouselImages[currentIndex]}
                alt={currentBook.title || `Book ${currentIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-opacity duration-500"
                priority
                unoptimized
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="text-6xl mb-4">📚</p>
                <p>No Image Available</p>
              </div>
            </div>
          )}

          {/* ARROWS */}
          {carouselImages.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-4 rounded-full transition-all z-10"
              >
                <ChevronLeft size={32} className="text-white" strokeWidth={3} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-4 rounded-full transition-all z-10"
              >
                <ChevronRight size={32} className="text-white" strokeWidth={3} />
              </button>
            </>
          )}


          {/* DOTS */}
          {carouselImages.length > 1 && (
            <div className="absolute bottom-6 right-6 flex gap-2 z-10">
              {carouselImages.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? "bg-white w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT - PRODUCT INFO */}
      <div className="space-y-6 p-5 min-h-[700px] max-h-[800px] overflow-y-auto pr-2">
        <ProductTag tags={currentBook.tags} category={currentBook.category} />
        <ProductInfo book={currentBook} />
        <ProductSummary summary={currentBook.summary} />
        <ProductSpecs book={currentBook} />
        <ProductAction book={currentBook} />
      </div>
    </div>
  );
}
