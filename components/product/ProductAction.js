"use client";
import { Heart, ShoppingCart, Eye, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WhishlistContext";

export default function ProductAction({ book = {}, onQuickView }) {
  const { user } = useAuth();
  const { addToCart, items: cartItems } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const link = book.buy_links?.[0]?.url;
  const alreadyWishlisted = isInWishlist(book._id);
  const alreadyInCart = cartItems.some((i) => i._id === book._id);

  const requireLogin = (action) => {
    if (!user) {
      alert("Kamu harus login dulu!");
      return;
    }
    action();
  };

  const handleBuyNow = () => {
    if (link) window.open(link, "_blank");
  };

  const handleAddToCart = () =>
    requireLogin(() => {
      addToCart(book);
    });

  const handleAddToWishlist = () =>
    requireLogin(() => {
      addToWishlist(book);
    });

  return (
    <div className="flex gap-2 pt-4">
      <button
        onClick={handleBuyNow}
        className="py-1 px-8 font-semibold rounded-xl transition-colors text-base flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
      >
        Buy Now
      </button>

      {/* Wishlist */}
      <button
        onClick={handleAddToWishlist}
        title={alreadyWishlisted ? "Sudah di wishlist" : "Tambah ke wishlist"}
        className="p-3.5 bg-blue-100 rounded-4xl hover:bg-blue-200 transition-colors"
      >
        <Heart
          size={24}
          className={
            alreadyWishlisted ? "text-red-500 fill-red-500" : "text-gray-700"
          }
        />
      </button>

      {/* Cart — hijau + centang jika sudah ada di cart */}
      <button
        onClick={handleAddToCart}
        title={alreadyInCart ? "Sudah di cart" : "Tambah ke cart"}
        className={`p-3.5 rounded-4xl transition-all duration-200 ${
          alreadyInCart
            ? "bg-green-100 hover:bg-green-200"
            : "bg-blue-100 hover:bg-blue-200"
        }`}
      >
        {alreadyInCart ? (
          <Check size={24} className="text-green-600" />
        ) : (
          <ShoppingCart size={24} className="text-gray-700" />
        )}
      </button>

      {/* Quick View */}
      <button
        onClick={onQuickView}
        title="Quick view"
        className="p-3.5 bg-blue-100 rounded-4xl hover:bg-blue-200 transition-colors"
      >
        <Eye size={24} className="text-gray-700" />
      </button>
    </div>
  );
}
