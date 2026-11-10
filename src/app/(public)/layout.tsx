import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, MessageCircle, ShieldCheck } from "lucide-react";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";
import { formatWhatsAppPhone } from "@/lib/whatsapp";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminWhatsApp = formatWhatsAppPhone(DEFAULT_WHATSAPP_NUMBER);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-stone-900 selection:bg-[#f4ebd9] selection:text-[#844307]">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center group py-2" title="Ulemanesia - Beranda">
            <Image
              src="/logo.png"
              alt="Ulemanesia"
              width={260}
              height={155}
              className="h-14 sm:h-16 w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
            <span className="sr-only">Ulemanesia</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <Link href="/" className="hover:text-[#844307] transition-colors">
              Beranda
            </Link>
            <Link href="/templates" className="hover:text-[#844307] transition-colors">
              Katalog Template
            </Link>
            <Link href="/#cara-pesan" className="hover:text-[#844307] transition-colors">
              Cara Pesan
            </Link>
            <Link href="/#faq" className="hover:text-[#844307] transition-colors">
              Tanya Jawab
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${adminWhatsApp}?text=${encodeURIComponent("Halo Admin Ulemanesia, saya ingin konsultasi pembuatan undangan digital.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="inline-flex items-center p-2.5 bg-white rounded-2xl shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Ulemanesia"
                  width={220}
                  height={130}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
                Platform undangan pernikahan digital modern &amp; personal. Cepat jadi kurang dari 30 menit, aktif 3 bulan, dan siap dibagikan ke seluruh tamu via WhatsApp.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
                Navigasi
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="hover:text-white transition-colors">
                    Katalog Desain
                  </Link>
                </li>
                <li>
                  <Link href="/#cara-pesan" className="hover:text-white transition-colors">
                    Alur Pemesanan
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="hover:text-white transition-colors">
                    Pertanyaan Umum
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
                Hukum &amp; Kebijakan
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
                <li>
                  <Link href="/privacy-policy" className="hover:text-white transition-colors">
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-white transition-colors">
                    Syarat &amp; Ketentuan
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <p>&copy; {new Date().getFullYear()} Ulemanesia. Hak Cipta Dilindungi Undang-Undang.</p>
            <p className="flex items-center gap-1 text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Privasi Tamu &amp; Customer Terlindungi</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

