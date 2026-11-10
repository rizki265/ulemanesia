"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  MessageCircle,
  Smartphone,
  Sparkles,
  CheckCircle2,
  Eye,
  Search,
} from "lucide-react";
import { RegisteredTemplate } from "@/templates/types";
import { getWhatsAppOrderUrl } from "@/lib/whatsapp";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";

interface TemplatesClientProps {
  templates: RegisteredTemplate[];
}

export function TemplatesClient({ templates }: TemplatesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "Semua Desain" },
    { id: "Adat Jawa", label: "Adat Jawa & Tradisional" },
    { id: "Modern", label: "Modern Luxury" },
    { id: "Floral", label: "Botanical Minimalist" },
  ];

  const filtered = templates.filter((tpl) => {
    const matchesCategory =
      selectedCategory === "all" ||
      tpl.tags.some((tag) =>
        tag.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-[#844307] text-xs font-semibold uppercase tracking-widest border border-amber-200/80">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Galeri Pilihan</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Katalog Template Undangan
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Pilihan tema pernikahan modern, adat nusantara, dan minimalis. Setiap template siap pakai, aktif 3 bulan penuh, dan langsung responsif di HP tamu Anda.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-b border-stone-200/80 pb-6">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
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

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari tema / gaya..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 shadow-2xs"
          />
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((tpl, idx) => {
          const whatsappUrl = getWhatsAppOrderUrl(tpl.name, DEFAULT_WHATSAPP_NUMBER);

          return (
            <div
              key={tpl.key}
              className="group bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgb(132,67,7,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/11] overflow-hidden bg-stone-100">
                  <Image
                    src={tpl.thumbnailUrl}
                    alt={tpl.name}
                    fill
                    priority={idx < 3}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Tags */}
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                    {tpl.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[10px] font-semibold bg-white/95 text-stone-800 rounded-full shadow-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Mobile Preview Badge */}
                  <div className="absolute bottom-3 right-3">
                    <Link
                      href={`/demo/${tpl.key}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/75 hover:bg-black text-white text-xs font-medium rounded-full backdrop-blur-md shadow-md transition-all hover:scale-105"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                      <span>Coba Demo HP</span>
                    </Link>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <h2 className="text-xl font-serif font-bold text-stone-900 group-hover:text-[#844307] transition-colors">
                    {tpl.name}
                  </h2>
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {tpl.description}
                  </p>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Aktif 3 Bulan</span>
                    </span>
                    <span>Link Tamu /nama Gratis</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 pt-0">
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-100">
                  <Link
                    href={`/demo/${tpl.key}`}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    <span>Lihat Demo</span>
                  </Link>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-emerald-600/20 hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Pesan Desain</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 space-y-3">
          <p className="text-base font-serif font-bold text-stone-800">
            Tidak ditemukan desain untuk kategori ini.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-xs text-[#844307] font-semibold underline"
          >
            Reset filter
          </button>
        </div>
      )}
    </div>
  );
}
