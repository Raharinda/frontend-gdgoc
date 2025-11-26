"use client";

import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase";
import { IoClose } from "react-icons/io5";
import Image from "next/image"

export default function AuthButton() {
  const [open, setOpen] = useState(false);

  const loginGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <div
        className="flex items-center gap-2 cursor-pointer hover:text-blue-700 select-none"
        onClick={() => setOpen(true)}
      >
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
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 text-gray-500 hover:text-black"
            >
              <IoClose size={24} />
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
              Login to Continue
            </h2>

            {/* Google Button */}
            <button
              onClick={loginGoogle}
              className="
                flex items-center gap-3 w-full 
                border border-gray-300 rounded-xl py-3 px-4
                hover:bg-gray-100 transition-all
                active:scale-[0.98]
              "
            >
              <Image
                src='https://www.svgrepo.com/show/475656/google-color.svg'
                alt="google"
                className="w-6 h-6"
              />
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
