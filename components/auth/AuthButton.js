"use client";
import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { IoClose, IoPersonOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function AuthButton() {
  const { user, login, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const u = result.user;
      // Simpan ke AuthContext
      login({
        id: u.uid,
        name: u.displayName,
        email: u.email,
        photo: u.photoURL,
        token: await u.getIdToken(),
      });
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    logout();
    setDropdownOpen(false);
  };

  // ── Sudah login: tampilkan foto + dropdown ──
  if (user) {
    return (
      <div className="relative">
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="flex items-center gap-2 cursor-pointer"
        >
          {user.photo ? (
            <Image
              src={user.photo}
              alt={user.name}
              width={36}
              height={36}
              className="rounded-full border-2 border-blue-500 object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              {user.name?.[0] ?? "U"}
            </div>
          )}
          <span className="font-semibold text-sm hidden sm:block">
            {user.name}
          </span>
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <>
            {/* backdrop tipis */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setDropdownOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50 py-1">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // ── Belum login: tampilkan tombol Login/Register ──
  return (
    <>
      <div
        className="flex items-center gap-2 cursor-pointer hover:text-blue-700 select-none"
        onClick={() => setOpen(true)}
      >
        <IoPersonOutline size={22} />

        <span className="font-semibold">Login / Register</span>
      </div>

      {/* Modal */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-80 p-6 rounded-2xl shadow-2xl animate-fadeIn relative"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 text-gray-500 hover:text-black"
            >
              <IoClose size={24} />
            </button>

            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
              Login to Continue
            </h2>

            <button
              onClick={loginGoogle}
              className="flex items-center gap-3 w-full border border-gray-300 rounded-xl py-3 px-4 hover:bg-gray-100 transition-all active:scale-[0.98]"
            >
              <FcGoogle size={25} />
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </button>

            <p className="text-xs text-center text-gray-500 mt-4">
              Kami tidak akan memposting apapun tanpa izinmu.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
