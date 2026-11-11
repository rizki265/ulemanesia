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
import { TemplatePhoneCard } from "@/components/invitation/TemplatePhoneCard";

interface TemplatesClientProps {
  templates: RegisteredTemplate[];
}

export function TemplatesClient({ templates }: TemplatesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="min-h-screen bg-[#fcfaf7] py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
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

      {/* Grid of Templates in Smartphone Mockup Frames */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 justify-items-center pt-4">
        {filtered.map((tpl, idx) => {
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
  </div>
  );
}

