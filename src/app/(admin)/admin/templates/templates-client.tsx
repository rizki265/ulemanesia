"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ExternalLink,
  Paintbrush,
  Search,
  CheckCircle2,
  Sliders,
  Layers,
  ArrowRight,
  Eye,
  PlusCircle,
} from "lucide-react";

export interface AdminTemplateItem {
  key: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  tags: string[];
  customFieldsCount: number;
  customNames?: string;
}

interface Props {
  templates: AdminTemplateItem[];
}

export function AdminTemplatesClient({ templates }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { key: "all", label: "Semua Desain" },
    { key: "Polaroid", label: "Luxury Polaroid" },
    { key: "Editorial Photo", label: "Editorial Photo" },
    { key: "Adat Jawa", label: "Adat Jawa" },
    { key: "Islami", label: "Islami" },
    { key: "Bali & Tropis", label: "Bali & Tropis" },
    { key: "Rustic Boho", label: "Rustic Boho" },
    { key: "Oriental", label: "Oriental" },
    { key: "Modern", label: "Modern Luxury" },
    { key: "Floral", label: "Botanical Floral" },
  ];

  const filteredTemplates = templates.filter((tpl) => {
    const matchesCategory =
      selectedCategory === "all" ||
      tpl.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-[#844307] text-xs font-bold uppercase tracking-wider border border-amber-200">
              Katalog &amp; Studio Desain
            </span>
            <span className="text-xs text-stone-500 font-medium">
              • {templates.length} Template Eksklusif Siap Pakai
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Katalog Desain &amp; Master Template
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            Pilih template untuk disesuaikan. Anda dapat menyimpannya sebagai{" "}
            <strong className="text-stone-700">referensi tampilan katalog web customer</strong>, atau langsung menerbitkan{" "}
            <strong className="text-stone-700">undangan klien resmi</strong> tanpa mengubah master template.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/templates"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700 shadow-2xs transition-all"
          >
            <span>Katalog Web Customer</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
          </Link>
        </div>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const count =
              cat.key === "all"
                ? templates.length
                : templates.filter((t) =>
                    t.category.toLowerCase().includes(cat.key.toLowerCase())
                  ).length;
            if (count === 0 && cat.key !== "all") return null;

            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#844307] text-white shadow-xs font-semibold"
                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama tema atau tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-[#844307] focus:ring-1 focus:ring-[#844307]/20 shadow-2xs"
          />
        </div>
      </div>

      {/* 3. Template Cards Grid with Real Smartphone Mockup Frame */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {filteredTemplates.map((tpl) => (
          <div
            key={tpl.key}
            className="bg-white rounded-3xl border border-stone-200/90 hover:border-amber-500/50 shadow-xs hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between group"
          >
            {/* Top Smartphone Mockup Frame */}
            <div className="flex flex-col items-center">
              {/* Smartphone Frame */}
              <div className="w-[210px] h-[340px] rounded-[36px] border-[6px] border-[#18181b] shadow-lg relative overflow-hidden bg-stone-900 group-hover:scale-[1.02] transition-transform duration-500">
                {/* Camera Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-[#18181b] rounded-b-xl z-20 flex items-center justify-center gap-1.5 pointer-events-none">
                  <div className="w-6 h-0.5 bg-stone-700 rounded-full" />
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-800" />
                </div>

                {/* Cover Image inside Phone Frame */}
                <div className="w-full h-full relative overflow-hidden bg-stone-950">
                  <Image
                    src={tpl.thumbnailUrl}
                    alt={tpl.name}
                    fill
                    sizes="220px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />

                  {/* Badges on Phone Screen */}
                  <div className="absolute top-5 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[9px] font-bold tracking-wider uppercase border border-white/20">
                      {tpl.category}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm" />
                  </div>

                  {/* Bottom Text Inside Phone */}
                  <div className="absolute bottom-3 left-3 right-3 text-center text-white space-y-1 z-10">
                    <p className="text-[10px] font-medium text-amber-200 tracking-wider uppercase font-serif line-clamp-1">
                      {tpl.customNames || tpl.subtitle || "Eksklusif"}
                    </p>
                    <p className="font-serif font-bold text-sm text-white line-clamp-1">
                      {tpl.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Information */}
            <div className="pt-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#844307] transition-colors">
                    {tpl.name}
                  </h3>
                  {tpl.customFieldsCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-[#844307] text-[10px] font-bold border border-amber-200 shrink-0">
                      <Sliders className="w-3 h-3" />
                      <span>{tpl.customFieldsCount} Opsi</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {tpl.description}
                </p>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2.5">
                  {tpl.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3 Action Buttons per Template */}
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {/* Button 1: Edit Template (Sesuaikan untuk website customer) */}
                  <Link
                    href={`/admin/templates/${tpl.key}/edit`}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-[#844307] text-xs font-semibold transition-all hover:scale-[1.02] active:scale-98 text-center"
                    title="Sesuaikan data dan tampilan template untuk website customer"
                  >
                    <Paintbrush className="w-3.5 h-3.5 shrink-0 text-[#844307]" />
                    <span className="truncate">Edit Template</span>
                  </Link>

                  {/* Button 2: Lihat Demo (Buka live demo) */}
                  <Link
                    href={`/demo/${tpl.key}`}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-98 text-center shadow-2xs"
                    title="Buka pratinjau live demo template di tab baru"
                  >
                    <Eye className="w-3.5 h-3.5 shrink-0 text-stone-500" />
                    <span className="truncate">Lihat Demo</span>
                  </Link>
                </div>

                {/* Button 3: Buat Undangan (Generate untuk dipublikasikan) */}
                <Link
                  href={`/admin/invitations/new?template=${tpl.key}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#844307] via-[#9e5108] to-[#6d3505] hover:opacity-95 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all hover:scale-[1.01] active:scale-98"
                  title="Generate dan buat undangan baru untuk dipublikasikan ke klien"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-amber-200 shrink-0" />
                  <span>Buat Undangan</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
          <p className="text-stone-500 text-sm">Tidak ada template yang cocok dengan pencarian.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-xs font-semibold text-[#844307] hover:underline"
          >
            Reset filter
          </button>
        </div>
      )}
    </div>
  );
}

