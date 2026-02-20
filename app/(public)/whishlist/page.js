"use client";
import { useWishlist } from "@/context/WhishlistContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Trash2, ShoppingCart, Eye, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BookPopup from "@/app/(public)/recomendation/bookPopup"; // sesuaikan path

export default function WishlistPage() {
  const { user } = useAuth();
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [quickViewBook, setQuickViewBook] = useState(null);

  const handleMoveToCart = (book) => {
    addToCart(book);
    removeFromWishlist(book._id);
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-gray-500">
        <Heart size={64} className="text-gray-300" />
        <p className="text-lg font-medium">
          Kamu harus login untuk melihat wishlist
        </p>
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-gray-500">
        <Heart size={64} className="text-gray-300" />
        <p className="text-lg font-medium">Wishlist kamu masih kosong</p>
        <Link
          href="/"
          className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Temukan Buku
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Wishlist</h1>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="border-b-2 border-gray-200 text-xs uppercase tracking-wider text-gray-400">
                <th className="pb-3 text-left">Buku</th>
                <th className="pb-3 text-left">Author</th>
                <th className="pb-3 text-right">Harga</th>
                <th className="pb-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((book) => (
                <WishlistRow
                  key={book._id}
                  book={book}
                  onMoveToCart={() => handleMoveToCart(book)}
                  onRemove={() => removeFromWishlist(book._id)}
                  onQuickView={() => setQuickViewBook(book)}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <Link href="/" className="text-xs text-blue-500 hover:underline">
            ← Lanjut Belanja
          </Link>
        </div>
      </div>

      {/* Quick View Popup */}
      {quickViewBook && (
        <BookPopup
          book={quickViewBook}
          onClose={() => setQuickViewBook(null)}
        />
      )}
    </>
  );
}

function WishlistRow({ book, onMoveToCart, onRemove, onQuickView }) {
  const cover =
    typeof book.cover_image === "object"
      ? book.cover_image?.url
      : book.cover_image;
  const title = typeof book.title === "object" ? book.title?.name : book.title;
  const author =
    typeof book.author === "object" ? book.author?.name : book.author;
  const price = parseFloat(book.price) || 0;

  return (
    <tr className="group">
      {/* Buku */}
      <td className="py-4 pr-4">
        <div className="flex items-center gap-3">
          {cover ? (
            <img
              src={cover}
              alt={title}
              className="w-12 h-16 object-cover rounded-lg shadow-sm flex-shrink-0"
            />
          ) : (
            <div className="w-12 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
          )}
          <span className="font-medium text-gray-800 line-clamp-2">
            {title}
          </span>
        </div>
      </td>

      {/* Author */}
      <td className="py-4 pr-4 text-gray-500">{author || "-"}</td>

      {/* Harga */}
      <td className="py-4 text-right font-semibold text-gray-800">
        {price > 0 ? `Rp ${price.toLocaleString("id-ID")}` : "-"}
      </td>

      {/* Aksi */}
      <td className="py-4 pl-4">
        <div className="flex items-center justify-center gap-2">
          {/* Pindah ke Cart */}
          <button
            onClick={onMoveToCart}
            title="Pindahkan ke Cart"
            className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
          >
            <ShoppingCart size={16} />
          </button>

          {/* Quick View */}
          <button
            onClick={onQuickView}
            title="Quick View"
            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition"
          >
            <Eye size={16} />
          </button>

          {/* Hapus */}
          <button
            onClick={onRemove}
            title="Hapus dari Wishlist"
            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-400 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
