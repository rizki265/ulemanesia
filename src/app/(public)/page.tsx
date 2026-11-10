import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  Clock,
  Shield,
  Smartphone,
  ChevronRight,
  Music,
  MapPin,
  CheckCircle2,
  Gift,
  Users,
  MessageCircle,
  Image as ImageIcon,
} from "lucide-react";
import { getAllRegisteredTemplates } from "@/templates/registry";
import { formatWhatsAppPhone } from "@/lib/whatsapp";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";
import { HomeInteractive } from "./home-interactive";

export const metadata = {
  title: "Ulemanesia - Platform Undangan Pernikahan Digital Elegan",
  description:
    "Platform undangan pernikahan digital modern & adat Jawa eksklusif. Jadi kurang dari 30 menit, aktif 3 bulan penuh, responsif di HP, dan mudah disebar via WhatsApp dengan nama tamu personal.",
};

export default function HomePage() {
  const templates = getAllRegisteredTemplates();
  const adminWhatsApp = formatWhatsAppPhone(DEFAULT_WHATSAPP_NUMBER);

  return (
    <div className="overflow-hidden">
      {/* 1. Hero Section - Soft UI Evolution with Warm Ambient Glow */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 px-4 sm:px-6">
        {/* Subtle radial backdrop illumination */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(217,119,6,0.15),rgba(255,255,255,0))]" />

        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-amber-200/90 text-[#844307] text-xs sm:text-sm font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-600 animate-spin-slow" />
            <span>Platform Undangan Digital Personal &amp; Kilat</span>
          </div>

          {/* Hero Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-stone-900 tracking-tight leading-[1.12]">
              Bagikan Momen Bahagiamu dengan{" "}
              <span className="bg-gradient-to-r from-[#844307] via-amber-700 to-amber-600 bg-clip-text text-transparent">
                Undangan Digital Elegan
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Pilih template favoritmu, kirim data via WhatsApp, dan undangan siap disebar dalam waktu kurang dari 30 menit. Aktif 3 bulan penuh, tampil memukau di layar smartphone!
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href="#katalog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#844307] hover:bg-[#6d3505] text-white font-medium text-sm sm:text-base rounded-full shadow-lg shadow-[#844307]/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Pilih Desain Impian</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href="#cara-pesan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/90 hover:bg-stone-50 border border-stone-200 text-stone-700 font-medium text-sm sm:text-base rounded-full shadow-xs transition-all hover:border-stone-300"
            >
              <span>Pelajari Alur Pemesanan</span>
            </a>
          </div>

          {/* 4 Value Proposition Stat Cards */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-3xl mx-auto">
            <div className="p-5 bg-white/85 backdrop-blur-md rounded-2xl border border-stone-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all">
              <Zap className="w-5 h-5 text-amber-500 mb-2.5" />
              <p className="font-bold text-stone-900 text-lg font-serif">&lt; 30 Menit</p>
              <p className="text-xs text-stone-500">Pengerjaan kilat &amp; rapi</p>
            </div>

            <div className="p-5 bg-white/85 backdrop-blur-md rounded-2xl border border-stone-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all">
              <Clock className="w-5 h-5 text-[#844307] mb-2.5" />
              <p className="font-bold text-stone-900 text-lg font-serif">3 Bulan</p>
              <p className="text-xs text-stone-500">Masa aktif tayang aman</p>
            </div>

            <div className="p-5 bg-white/85 backdrop-blur-md rounded-2xl border border-stone-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all">
              <Smartphone className="w-5 h-5 text-emerald-500 mb-2.5" />
              <p className="font-bold text-stone-900 text-lg font-serif">100% Mobile</p>
              <p className="text-xs text-stone-500">Desain pas layar HP</p>
            </div>

            <div className="p-5 bg-white/85 backdrop-blur-md rounded-2xl border border-stone-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all">
              <Shield className="w-5 h-5 text-indigo-500 mb-2.5" />
              <p className="font-bold text-stone-900 text-lg font-serif">Nama Tamu</p>
              <p className="text-xs text-stone-500">Link otomatis tanpa batas</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Catalog & Testimonials & FAQ Section */}
      <HomeInteractive templates={templates} />

      {/* 3. Cara Pemesanan yang Praktis (Stepped Journey) */}
      <section id="cara-pesan" className="py-24 px-4 sm:px-6 bg-white border-b border-stone-200/80">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#844307]">
              Mudah &amp; Nyaman
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              Alur Pemesanan 4 Langkah
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Tanpa perlu daftar akun atau instal aplikasi rumit. Cukup lewat WhatsApp, undangan langsung kami proses dan siap sebar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              {
                step: "01",
                title: "Pilih Desain",
                desc: "Lihat katalog kami dan coba langsung demo di HP untuk memilih tema yang paling cocok.",
              },
              {
                step: "02",
                title: "Kirim Data via WA",
                desc: "Kirimkan teks nama mempelai, tanggal acara, jam, lokasi Google Maps, dan foto prewedding.",
              },
              {
                step: "03",
                title: "Proses & Review",
                desc: "Admin kami menyusun undangan dalam waktu kurang dari 30 menit dan mengirimkan link preview.",
              },
              {
                step: "04",
                title: "Sebar ke Tamu",
                desc: "Dapatkan link utama. Tambahkan /nama-tamu di akhir link agar nama tamu muncul secara personal!",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-7 bg-[#fdfbf7] rounded-3xl border border-stone-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-lg transition-all flex flex-col justify-between space-y-5"
              >
                <div>
                  <span className="text-3xl font-mono font-bold text-amber-500/80 mb-3 block">
                    {item.step}
                  </span>
                  <h3 className="text-base font-serif font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Fitur Lengkap & Keunggulan Undangan */}
      <section id="fitur" className="py-24 px-4 sm:px-6 bg-stone-950 text-stone-200 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Eksklusif &amp; Fungsional
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Semua Fitur Unggulan Tersedia
            </h2>
            <p className="text-sm text-stone-400 leading-relaxed">
              Undangan digital bukan sekadar link informasi, melainkan perantara doa dan rasa hormat kepada setiap tamu Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: Users,
                title: "Personalisasi Nama Tamu",
                desc: "Cukup tambahkan /nama-tamu di belakang link utama. Tamu akan merasa sangat dihargai.",
              },
              {
                icon: MapPin,
                title: "Peta & Rute Google Maps",
                desc: "Tamu dapat langsung mengklik tombol navigasi untuk membuka rute menuju gedung pernikahan.",
              },
              {
                icon: CheckCircle2,
                title: "Konfirmasi Kehadiran (RSVP)",
                desc: "Ketahui perkiraan jumlah kehadiran tamu secara real-time untuk kemudahan katering acara.",
              },
              {
                icon: MessageCircle,
                title: "Buku Tamu Doa & Restu",
                desc: "Kolom ucapan doa restu interaktif dari sahabat dan kerabat yang tersimpan abadi.",
              },
              {
                icon: Music,
                title: "Autoplay Musik Romantis",
                desc: "Alunan instrumen pernikahan yang otomatis berputar lembut saat amplop pembuka disentuh.",
              },
              {
                icon: Gift,
                title: "Amplop Digital & Kado Fisik",
                desc: "Tombol 1-klik salin nomor rekening bank digital dan alamat pengiriman kado pernikahan.",
              },
            ].map((f, i) => {
              const IconComp = f.icon;
              return (
                <div
                  key={i}
                  className="p-7 bg-stone-900/60 rounded-3xl border border-stone-800 hover:border-amber-500/40 hover:bg-stone-900/90 transition-all duration-300 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-white text-base">{f.title}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Bottom Conversion CTA Banner */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-stone-950 to-[#141210] text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-serif uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mulai Sekarang</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-snug">
            Siap Bagikan Momen Bahagiamu dengan Mudah?
          </h2>

          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
            Hubungi Admin Ulemanesia sekarang via WhatsApp. Kami bantu siapkan undangan pernikahan digital impian Anda hari ini juga.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(
                "Halo Admin Ulemanesia, saya ingin memesan undangan digital pernikahan."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base rounded-full shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat WhatsApp Admin</span>
            </a>

            <Link
              href="/templates"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-stone-200 border border-white/20 font-semibold text-sm sm:text-base rounded-full transition-all"
            >
              <span>Jelajahi Semua Desain</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
