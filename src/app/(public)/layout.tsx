import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Heart, Sparkles, Clock, CheckCircle2 } from "lucide-react";
import { PublicNavbar } from "./navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-stone-900 selection:bg-[#f4ebd9] selection:text-[#844307]">
      {/* Dynamic Interactive Header */}
      <PublicNavbar />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Premium Redesigned Footer */}
      <footer className="bg-stone-950 text-stone-300 pt-20 pb-12 border-t border-stone-800/80 relative overflow-hidden">
        {/* Subtle Warm Amber Glow in background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-gradient-to-b from-amber-600/10 via-amber-700/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-16">
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-5">
              <div className="inline-flex items-center p-3 bg-white/95 rounded-2xl shadow-md border border-stone-800">
                <Image
                  src="/logo.png"
                  alt="Ulemanesia"
                  width={220}
                  height={130}
                  className="h-12 w-auto object-contain"
                />
              </div>

              <p className="font-serif italic text-amber-200/90 text-sm">
                &ldquo;Saben Momen, Dadi Kenangan&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md">
                Platform undangan pernikahan digital personal, estetik, dan cepat jadi kurang dari 30 menit. Desain elegan khas Nusantara dan modern siap disebar dengan nama tamu otomatis via WhatsApp.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-[11px] text-amber-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Aktif 3 Bulan</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Link Nama Tamu Tanpa Batas</span>
                </span>
              </div>
            </div>

            {/* Navigasi Cepat */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                Koleksi &amp; Alur
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
                <li>
                  <Link href="/" className="hover:text-amber-200 transition-colors">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="hover:text-amber-200 transition-colors">
                    Katalog Desain Template
                  </Link>
                </li>
                <li>
                  <Link href="/demo/luxury-polaroid" className="hover:text-amber-200 transition-colors">
                    Demo Luxury Chocolate &amp; Gold
                  </Link>
                </li>
              </ul>
            </div>

            {/* Bantuan & Info */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                Informasi
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
                <li>
                  <Link href="/#cara-pesan" className="hover:text-amber-200 transition-colors">
                    Cara Pemesanan
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="hover:text-amber-200 transition-colors">
                    Tanya Jawab (FAQ)
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-amber-200 transition-colors">
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-amber-200 transition-colors">
                    Syarat &amp; Ketentuan
                  </Link>
                </li>
              </ul>
            </div>

            {/* Hubungi Kami */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                Pusat Bantuan
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Punya pertanyaan atau ingin custom tema khusus? Tim Ulemanesia siap melayani konsultasi Anda.
              </p>
              <div className="pt-2">
                <span className="text-[11px] font-mono text-stone-400 block mb-1">Jam Operasional:</span>
                <span className="text-xs text-amber-200 font-medium block">Setiap Hari (08.00 - 22.00 WIB)</span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Security Badges */}
          <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <p>&copy; {new Date().getFullYear()} Ulemanesia. Hak Cipta Dilindungi.</p>
            <div className="flex items-center gap-4 text-stone-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Privasi Data Terjamin</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <span>Dibuat dengan</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>di Indonesia</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
