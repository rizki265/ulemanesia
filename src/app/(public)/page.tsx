import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Zap,
  Clock,
  Shield,
  Smartphone,
  ExternalLink,
  MessageCircle,
  CheckCircle2,
  ChevronRight,
  Music,
  Heart,
} from "lucide-react";
import { getAllRegisteredTemplates } from "@/templates/registry";
import { getWhatsAppOrderUrl } from "@/lib/whatsapp";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";

export const metadata = {
  title: "Ulemanesia - Platform Undangan Digital Elegan & Cepat Jadi",
  description:
    "Buat undangan pernikahan digital modern, cepat jadi kurang dari 30 menit, aktif 3 bulan, responsif di HP, dan pesan mudah via WhatsApp.",
};

export default function HomePage() {
  const templates = getAllRegisteredTemplates();

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.amber.100),theme(colors.white))] opacity-50" />

        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-[#844307] text-xs sm:text-sm font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-[#844307]" />
            <span>Platform Undangan Digital Personal &amp; Cepat</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15]">
            Bagikan Momen Bahagia dengan{" "}
            <span className="bg-gradient-to-r from-[#844307] via-amber-700 to-amber-600 bg-clip-text text-transparent">
              Undangan Digital Elegan
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Pilih template favoritmu, kirim data via WhatsApp, dan undangan siap disebar dalam waktu kurang dari 30 menit. Aktif 3 bulan, mudah disebar dengan nama tamu personal!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <a
              href="#katalog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#844307] hover:bg-[#6d3505] text-white font-medium text-sm rounded-full shadow-lg shadow-[#844307]/25 transition-all hover:scale-105"
            >
              <span>Pilih Template Sekarang</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#cara-pesan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-medium text-sm rounded-full shadow-xs transition-all"
            >
              <span>Cara Pemesanan</span>
            </a>
          </div>

          {/* Quick Stats Highlights */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-3xl mx-auto">
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200/70 shadow-xs">
              <Zap className="w-5 h-5 text-amber-500 mb-2" />
              <p className="font-bold text-stone-900 text-lg">&lt; 30 Menit</p>
              <p className="text-xs text-stone-500">Pengerjaan kilat</p>
            </div>
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200/70 shadow-xs">
              <Clock className="w-5 h-5 text-[#844307] mb-2" />
              <p className="font-bold text-stone-900 text-lg">3 Bulan</p>
              <p className="text-xs text-stone-500">Masa aktif tayang</p>
            </div>
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200/70 shadow-xs">
              <Smartphone className="w-5 h-5 text-emerald-500 mb-2" />
              <p className="font-bold text-stone-900 text-lg">100% Mobile</p>
              <p className="text-xs text-stone-500">Nyaman di WhatsApp</p>
            </div>
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200/70 shadow-xs">
              <Shield className="w-5 h-5 text-indigo-500 mb-2" />
              <p className="font-bold text-stone-900 text-lg">Nama Tamu</p>
              <p className="text-xs text-stone-500">Link otomatis /nama</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Template Catalog Section (FR-01, FR-02, FR-03, FR-04) */}
      <section id="katalog" className="py-20 px-4 sm:px-6 bg-white border-y border-stone-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#844307]">
              Koleksi Desain Pilihan
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              Katalog Template Undangan
            </h2>
            <p className="text-sm text-stone-600">
              Setiap template dibuat dengan perhatian detail estetika tinggi, musik latar, hitung mundur, peta lokasi, dan form RSVP real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {templates.map((tpl) => {
              const whatsappUrl = getWhatsAppOrderUrl(tpl.name, DEFAULT_WHATSAPP_NUMBER);

              return (
                <div
                  key={tpl.key}
                  className="group bg-stone-50/70 rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                    <Image
                      src={tpl.thumbnailUrl}
                      alt={tpl.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                      {tpl.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[11px] font-semibold bg-white/90 backdrop-blur-sm text-stone-800 rounded-full shadow-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-2">
                        {tpl.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {tpl.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-200/70 flex flex-col sm:flex-row items-center gap-3">
                      {/* Lihat Demo Button (FR-02, FR-03) */}
                      <Link
                        href={`/demo/${tpl.key}`}
                        className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs"
                      >
                        <ExternalLink className="w-4 h-4 text-stone-500" />
                        <span>Lihat Demo</span>
                      </Link>

                      {/* Pesan WhatsApp Button (FR-02, FR-04) */}
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md shadow-emerald-600/20 hover:scale-[1.02]"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Pesan via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. How It Works (Alur Bisnis Section 5) */}
      <section id="cara-pesan" className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#844307]">
              Mudah &amp; Personal
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900">
              Cara Pemesanan yang Praktis
            </h2>
            <p className="text-sm text-stone-600">
              Tanpa repot registrasi aplikasi. Cukup komunikasi lewat WhatsApp dan undangan Anda langsung kami siapkan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Pilih Desain",
                desc: "Jelajahi katalog dan coba langsung demo template yang paling sesuai dengan impian pernikahan Anda.",
              },
              {
                step: "02",
                title: "Kirim Data via WA",
                desc: "Klik tombol pesan WhatsApp untuk mengirim data mempelai, tanggal acara, lokasi peta, dan foto galeri.",
              },
              {
                step: "03",
                title: "Diproses & Ditinjau",
                desc: "Admin menyusun undangan Anda,dan memberikan link preview.",
              },
              {
                step: "04",
                title: "Sebar ke Seluruh Tamu",
                desc: "Dapatkan link utama. Tambahkan /nama-tamu di akhir link agar nama tamu muncul secara istimewa di undangan!",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-mono font-bold text-[#d7b588] mb-4 block">
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

      {/* 4. Fitur Utama & Kualitas Portofolio */}
      <section className="py-20 px-4 sm:px-6 bg-stone-900 text-stone-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Fitur Lengkap
            </span>
            <h2 className="text-3xl font-serif font-bold text-white">
              Semua yang Dibutuhkan Ada di Sini
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "Nama Tamu Personal",
                desc: "Cukup tambahkan /nama di belakang link. Tamu akan merasa sangat dihormati.",
              },
              {
                title: "Peta & Navigasi Terintegrasi",
                desc: "Tamu dapat langsung membuka rute Google Maps menuju gedung pernikahan.",
              },
              {
                title: "Konfirmasi Kehadiran (RSVP)",
                desc: "Ketahui perkiraan jumlah kehadiran tamu Anda secara real-time.",
              },
              {
                title: "Doa & Ucapan Restu",
                desc: "Kolom ucapan interaktif untuk menerima doa indah dari teman dan keluarga tercinta.",
              },
              {
                title: "Pustaka Musik Eksklusif",
                desc: "Alunan instrumen romantis yang otomatis berputar saat tamu menyentuh tombol buka undangan.",
              },
              {
                title: "Amplop Digital & Kado",
                desc: "Tombol salin nomor rekening rekening bank dan alamat pengiriman kado fisik.",
              },
            ].map((f, i) => (
              <div key={i} className="p-6 bg-stone-800/60 rounded-2xl border border-stone-700/80">
                <CheckCircle2 className="w-5 h-5 text-amber-400 mb-3" />
                <h3 className="font-semibold text-white text-sm mb-1.5">{f.title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#844307]">
              FAQ
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Berapa lama masa aktif undangan digital saya?",
                a: "Undangan aktif selama 3 bulan sejak tanggal dipublikasikan. Setelah 3 bulan, terdapat masa tenggang 15 hari di mana Anda dapat memperpanjang masa aktif dengan biaya Rp50.000/bulan.",
              },
              {
                q: "Bagaimana cara membagikan link ke masing-masing nama tamu?",
                a: "Sangat mudah! Anda cukup menggunakan satu link utama yang kami berikan, lalu menambahkan /nama-tamu di akhir link. Contoh: jika link Anda ulemanesia.com/rama-shinta, Anda cukup mengetik ulemanesia.com/rama-shinta/budi-santoso untuk mengundang Budi Santoso.",
              },
              {
                q: "Berapa foto yang bisa saya pasang di undangan?",
                a: "Maksimal 1 foto cover utama dan 10 foto pada galeri prewedding. Semua foto otomatis dikompres ke format WebP super ringan sehingga undangan termuat sangat cepat di jaringan 4G tamu.",
              },
              {
                q: "Apakah musik berputar otomatis begitu link dibuka?",
                a: "Untuk kenyamanan tamu dan mematuhi aturan browser modern, musik berputar lembut saat tamu menekan tombol 'Buka Undangan' pada amplop pembuka.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs"
              >
                <h3 className="font-serif font-bold text-stone-900 text-base mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

