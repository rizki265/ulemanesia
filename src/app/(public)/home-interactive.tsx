"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  MessageCircle,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Heart,
  Star,
  Smartphone,
  Eye,
} from "lucide-react";
import { RegisteredTemplate } from "@/templates/types";
import { getWhatsAppOrderUrl, formatWhatsAppPhone } from "@/lib/whatsapp";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";
import { TemplatePhoneCard } from "@/components/invitation/TemplatePhoneCard";

interface HomeInteractiveProps {
  templates: RegisteredTemplate[];
}

export function HomeInteractive({ templates }: HomeInteractiveProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const categories = [
    { id: "all", label: "Semua Desain" },
    { id: "Editorial", label: "Editorial Full Photo" },
    { id: "Adat Jawa", label: "Adat Jawa Keraton" },
    { id: "Islami", label: "Islami & Kaligrafi" },
    { id: "Bali", label: "Bali & Tropis" },
    { id: "Rustic", label: "Rustic & Boho" },
    { id: "Oriental", label: "Oriental Sangjit" },
    { id: "Modern", label: "Modern Luxury" },
    { id: "Floral", label: "Botanical Minimalist" },
  ];

  const filteredTemplates = templates.filter((tpl) => {
    if (selectedCategory === "all") return true;
    return tpl.tags.some((tag) =>
      tag.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });

  const faqs = [
    {
      q: "Berapa lama masa aktif undangan digital saya?",
      a: "Undangan digital Ulemanesia aktif penuh selama 3 bulan sejak tanggal dipublikasikan. Setelah 3 bulan, terdapat masa tenggang aman 15 hari di mana Anda dapat memperpanjang masa aktif dengan biaya terjangkau Rp50.000/bulan.",
    },
    {
      q: "Bagaimana cara membagikan link ke masing-masing nama tamu?",
      a: "Sangat mudah dan praktis! Anda cukup menggunakan satu link utama yang kami berikan, lalu menambahkan /nama-tamu di akhir URL. Contoh: ulemanesia.com/arka-kayla/bapak-budi-santoso. Nama tamu otomatis tampil elegan di cover pembuka undangan!",
    },
    {
      q: "Berapa foto prewedding yang bisa saya pasang di undangan?",
      a: "Anda dapat menyertakan 1 foto cover utama dan hingga 10 foto pada galeri momen prewedding. Seluruh foto secara otomatis dioptimasi ke format WebP super ringan sehingga undangan termuat sangat cepat di HP tamu.",
    },
    {
      q: "Apakah musik berputar otomatis begitu link undangan dibuka?",
      a: "Untuk mematuhi aturan browser modern dan memberikan kenyamanan bagi tamu, musik latar romantis akan berputar lembut sesaat setelah tamu menyentuh tombol 'Buka Undangan' pada amplop pembuka.",
    },
    {
      q: "Apakah saya bisa mengubah data acara jika ada revisi mendadak?",
      a: "Tentu bisa! Anda cukup menghubungi Admin Ulemanesia melalui WhatsApp. Revisi teks, jam acara, maupun nomor rekening akan kami perbarui secara kilat tanpa mengubah link undangan yang sudah tersebar.",
    },
  ];

  const testimonials = [
    {
      name: "Bagas & Anindya",
      city: "Yogyakarta",
      template: "Javanese Royal Heritage",
      comment:
        "Tema adat Jawanya luar biasa sakral dan mewah! Ornamen Gunungan emasnya sangat elegan di HP tamu, dan keluarga besar kami sangat memuji tampilan undangannya.",
      rating: 5,
    },
    {
      name: "Rama & Shinta",
      city: "Jakarta Selatan",
      template: "Floral Botanical Minimalist",
      comment:
        "Pelayanan kilat banget, nggak sampai 30 menit undangan kami sudah beres! Fitur link nama tamu personal bikin tamu undangan merasa sangat dihargai.",
      rating: 5,
    },
    {
      name: "Dimas & Clarissa",
      city: "Surabaya",
      template: "Modern Elegance",
      comment:
        "Tampilan gelap modernnya keren banget. Form RSVP dan ucapan langsung masuk real-time, jadi kami gampang memperkirakan katering yang hadir.",
      rating: 5,
    },
  ];

  return (
    <>
      {/* 2. Template Catalog Section with Category Filter */}
      <section id="katalog" className="py-24 px-4 sm:px-6 bg-[#faf8f5] border-y border-stone-200/80">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-[#844307] text-xs font-semibold uppercase tracking-widest border border-amber-200/80">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Koleksi Desain Eksklusif</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
              Pilih Template Pernikahan Impian
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Dibuat dengan estetika tinggi, musik romantis, hitung mundur, integrasi Google Maps, dan buku tamu RSVP interaktif.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#844307] text-white shadow-md shadow-[#844307]/20 scale-105"
                      : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Grid with Smartphone Mockups */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 justify-items-center pt-4">
            {filteredTemplates.map((tpl, idx) => {
              const whatsappUrl = getWhatsAppOrderUrl(tpl.name, DEFAULT_WHATSAPP_NUMBER);

              return (
                <TemplatePhoneCard
                  key={tpl.key}
                  template={tpl}
                  whatsappUrl={whatsappUrl}
                  priority={idx < 3}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Client Testimonials (Social Proof) */}
      <section className="py-24 px-4 sm:px-6 bg-[#fbf9f4] border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#844307]">
              Kisah Bahagia
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              Dipercaya Pasangan Pengantin
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Momen sakral pernikahan mereka semakin berkesan dengan kemudahan undangan digital Ulemanesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-7 bg-white rounded-3xl border border-stone-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-stone-700 leading-relaxed">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">{t.name}</h4>
                    <p className="text-[11px] text-stone-500">{t.city}</p>
                  </div>
                  <span className="text-[10px] font-medium bg-amber-50 text-[#844307] px-2.5 py-1 rounded-full border border-amber-200/60">
                    {t.template}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Interactive FAQ Section (Accordion) */}
      <section id="faq" className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#844307]">
              Pertanyaan Populer
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              Tanya Jawab Seputar Layanan
            </h2>
            <p className="text-sm text-stone-600">
              Semua hal yang perlu Anda ketahui mengenai pembuatan dan penggunaan undangan digital.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200/90 overflow-hidden bg-stone-50/50 transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50 transition-colors focus:outline-hidden"
                  >
                    <span className="text-sm sm:text-base font-serif font-bold text-stone-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#844307]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Need help footer card */}
          <div className="p-6 rounded-3xl bg-amber-50/80 border border-amber-200/80 text-center space-y-3">
            <h3 className="font-serif font-bold text-stone-900 text-base">
              Masih punya pertanyaan lain seputar undangan?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
              Tim support Ulemanesia siap membantu menjawab kebutuhan konsep acara dan tema impian Anda.
            </p>
            <div className="pt-1">
              <a
                href={`https://wa.me/${formatWhatsAppPhone(
                  DEFAULT_WHATSAPP_NUMBER
                )}?text=${encodeURIComponent("Halo Admin Ulemanesia, saya ingin konsultasi lebih lanjut.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#844307] hover:bg-[#6d3505] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi Gratis via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
