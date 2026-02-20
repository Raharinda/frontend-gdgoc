"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (book) => {
    setItems((prev) => {
      const exists = prev.find((i) => i._id === book._id);
      if (exists) {
        return prev.map((i) =>
          i._id === book._id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...book, qty: 1 }];
    });
  };

  const decreaseQty = (bookId) => {
    setItems(
      (prev) =>
        prev
          .map((i) => (i._id === bookId ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0), // hapus otomatis jika qty jadi 0
    );
  };

  const removeFromCart = (bookId) =>
    setItems((prev) => prev.filter((i) => i._id !== bookId));

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        decreaseQty,
        removeFromCart,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
