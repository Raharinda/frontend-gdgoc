"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBooks } from "@/app/hooks/useBooks";
import ProductTag from "./ProductTag";
import ProductInfo from "./ProductInfo";
import ProductSpecs from "./ProductSpecs";
import ProductAction from "./ProductAction";
import ProductSummary from "./ProductSummary";

export default function ProductGallery({ singleBook = null }) {
  const { books} = useBooks(5);

  const displayBooks = singleBook ? [singleBook] : books || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // AUTOSLIDE
  useEffect(() => {
    if (!isPaused && displayBooks.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((i) => (i + 1) % displayBooks.length);
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, displayBooks.length]);

  const next = () =>
    setCurrentIndex((i) => (i + 1) % displayBooks.length);

  const prev = () =>
    setCurrentIndex((i) => (i - 1 + displayBooks.length) % displayBooks.length);

  if (!displayBooks.length) return null;

  const currentBook = displayBooks[currentIndex];
  const carouselImages = displayBooks
    .map((b) => b?.cover_image)
    .filter(Boolean);

  const hasMultiple = carouselImages.length > 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT - IMAGE */}
      <div>
        <div
          className="relative bg-gray-200 rounded-lg overflow-hidden aspect-[3/4]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* IMAGE */}
          <Image
            src={carouselImages[currentIndex]}
            alt={currentBook?.title}
            fill
            className="object-cover transition-opacity duration-500"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />

          {/* ARROWS */}
          <div>
            <button
              onClick={prev}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm 
                hover:bg-white/20 p-4 rounded-full transition-all z-10"
            >
              <ChevronLeft size={32} className="text-white" strokeWidth={3} />
            </button>

            <button
              onClick={next}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm 
                hover:bg-white/20 p-4 rounded-full transition-all z-10"
            >
              <ChevronRight size={32} className="text-white" strokeWidth={3} />
            </button>
          </div>

        {/* DOTS */}
          {hasMultiple && (
            <div className="absolute bottom-6 right-6 flex gap-2 z-10">
              {carouselImages.map((_, idx) => {
                const active = idx === currentIndex;
                return (
                  <div
                    key={idx}
                    className={`rounded-full transition-all ${
                      active ? "bg-white w-6 h-2" : "bg-white/50 w-2 h-2"
                    }`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT - INFO */}
      <div className="space-y-6 p-5 min-h-[700px] max-h-[800px] overflow-y-auto pr-2">
        {currentBook && (
          <>
            <ProductTag 
              tags={Array.isArray(currentBook.tags)
                ? currentBook.tags.map(t => typeof t === "string" ? t : t.name)
                : []
              }
            />
            <ProductInfo book={currentBook} />
            <ProductSummary summary={currentBook.summary} />
            <ProductSpecs book={currentBook} />
            <ProductAction book={currentBook} />
          </>
        )}
      </div>
    </div>
  );
}
