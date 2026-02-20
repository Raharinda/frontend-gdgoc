"use client";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { user } = useAuth();
  const {
    items,
    removeFromCart,
    addToCart,
    decreaseQty,
    clearCart,
    totalItems,
  } = useCart();

  const totalPrice = items.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    return sum + price * item.qty;
  }, 0);

  const hasPrice = items.some((i) => parseFloat(i.price) > 0);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-gray-500">
        <ShoppingCart size={64} className="text-gray-300" />
        <p className="text-lg font-medium">
          Kamu harus login untuk melihat cart
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
        <ShoppingCart size={64} className="text-gray-300" />
        <p className="text-lg font-medium">Cart kamu masih kosong</p>
        <Link
          href="/"
          className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tabel */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="border-b-2 border-gray-200 text-xs uppercase tracking-wider text-gray-400">
                <th className="pb-3 text-left">Buku</th>
                <th className="pb-3 text-center">Qty</th>
                {hasPrice && <th className="pb-3 text-right">Harga</th>}
                <th className="pb-3 text-right">Subtotal</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <CartRow
                  key={item._id}
                  item={item}
                  hasPrice={hasPrice}
                  onIncrease={() => addToCart(item)}
                  onDecrease={() => decreaseQty(item._id)}
                  onRemove={() => removeFromCart(item._id)}
                />
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={clearCart}
              className="text-xs text-red-400 hover:text-red-600 transition underline"
            >
              Kosongkan Cart
            </button>
            <Link href="/" className="text-xs text-blue-500 hover:underline">
              ← Lanjut Belanja
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:w-72 w-full">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Ringkasan</h2>

            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Total Item</span>
              <span>{totalItems} buku</span>
            </div>

            {hasPrice && (
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Total Harga</span>
                <span className="font-semibold text-gray-900">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            )}

            <hr className="my-4 border-gray-200" />

            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartRow({ item, hasPrice, onIncrease, onDecrease, onRemove }) {
  const price = parseFloat(item.price) || 0;
  const cover =
    typeof item.cover_image === "object"
      ? item.cover_image?.url
      : item.cover_image;
  const title = typeof item.title === "object" ? item.title?.name : item.title;

  return (
    <tr>
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

      <td className="py-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={onDecrease}
            className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
          >
            <Minus size={12} />
          </button>
          <span className="w-6 text-center font-semibold">{item.qty}</span>
          <button
            onClick={onIncrease}
            className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
          >
            <Plus size={12} />
          </button>
        </div>
      </td>

      {hasPrice && (
        <td className="py-4 text-right text-gray-600">
          {price > 0 ? `Rp ${price.toLocaleString("id-ID")}` : "-"}
        </td>
      )}

      <td className="py-4 text-right font-semibold text-gray-800">
        {hasPrice && price > 0
          ? `Rp ${(price * item.qty).toLocaleString("id-ID")}`
          : `x${item.qty}`}
      </td>

      <td className="py-4 pl-4 text-right">
        <button
          onClick={onRemove}
          className="text-gray-300 hover:text-red-500 transition"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
}
