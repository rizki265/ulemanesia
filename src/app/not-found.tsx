import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-stone-200">
        <div className="flex justify-center mb-4">
          <Image
            src="/logo.png"
            alt="Logo Ulemanesia"
            width={240}
            height={140}
            className="h-16 sm:h-20 w-auto object-contain"
          />
        </div>

        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">404</h1>
        <h2 className="text-lg font-serif font-bold text-stone-800 mb-3">
          Undangan Tidak Ditemukan
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
          Tautan undangan yang Anda buka tidak tersedia, berstatus draft, atau telah selesai masa tayangnya dan dihapus permanen oleh sistem.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs rounded-xl shadow-xs transition-all w-full"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Halaman Utama</span>
        </Link>
      </div>
    </div>
  );
}

