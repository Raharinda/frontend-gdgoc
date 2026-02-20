"use client";
import { createContext, useContext, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToWishlist = (book) => {
    setItems((prev) => {
      const exists = prev.find((i) => i._id === book._id);
      if (exists) return prev;
      return [...prev, book];
    });
  };

  const removeFromWishlist = (bookId) =>
    setItems((prev) => prev.filter((i) => i._id !== bookId));

  const isInWishlist = (bookId) => items.some((i) => i._id === bookId);

  const totalItems = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        totalItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
