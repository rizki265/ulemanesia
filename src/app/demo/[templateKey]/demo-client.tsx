"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  Maximize2,
  ExternalLink,
  MousePointerClick,
  ChevronRight,
} from "lucide-react";
import { PublicNavbar } from "@/app/(public)/navbar";

interface TemplateSummary {
  key: string;
  name: string;
  tags: string[];
}

interface DemoClientProps {
  templateKey: string;
  templateName: string;
  templateDescription: string;
  templateTags: string[];
  whatsappUrl: string;
  allTemplates: TemplateSummary[];
}

export function DemoClient({
  templateKey,
  templateName,
  templateDescription,
  templateTags,
  whatsappUrl,
  allTemplates,
}: DemoClientProps) {
  const phoneRef = useRef<HTMLDivElement>(null);

  const scrollToPhone = () => {
    if (phoneRef.current) {
      phoneRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Distinctive poetic subtitle and description per template matching the reference layout
  const templateMeta: Record<
    string,
    { badge: string; detailedDescription: string }
  > = {
    "editorial-photo": {
      badge: "FOTO EDITORIAL SINEMATIK KONTEMPORER",
      detailedDescription:
        "Desain tren modern bergaya majalah editorial dengan latar belakang foto pengantin layar penuh, tipografi mewah di atas background, dan transisi sinematik. Menghadirkan kesan visual intim, berkelas, dan memikat di layar smartphone para tamu.",
    },
    "javanese-royal": {
      badge: "KOSMOLOGI SAKRAL ADAT JAWA KRATON",
      detailedDescription:
        "Undangan sakral bernuansa adat Jawa Kraton berlatar hitam obsidian megah, berhiaskan Gunungan Wayang emas, kaligrafi anggun, serta alunan gending yang syahdu. Sempurna untuk menyambut keluarga besar dan para sahabat dalam sakralnya prosesi pernikahan adat Jawa yang agung.",
    },
    "islamic-elegance": {
      badge: "KEMULIAAN ISLAMI & ARABESQUE EMAS",
      detailedDescription:
        "Kemuliaan pernikahan syar'i berbalut hijau zamrud (emerald) dan kaligrafi emas. Dilengkapi Bismillah agung, lantunan ayat suci QS Ar-Rum 21, dan ornamen Arabesque memikat untuk menyempurnakan ibadah terpanjang Anda.",
    },
    "bali-breeze": {
      badge: "SENJA KEEMASAN BALI DI TEPI LAUT",
      detailedDescription:
        "Undangan paralaks Bali yang fotorealistik — gerbang Candi Bentar, panorama laut dari tebing senja, dan kamboja yang melayang dalam cahaya temaram. Hangat, sinematik, dan begitu khas Pulau Dewata.",
    },
    "rustic-boho": {
      badge: "BOHEMIAN EARTHY & PAMPAS KRAFT",
      detailedDescription:
        "Sentuhan estetik daun pampas kering, tekstur kertas kraft hangat, karangan bunga bohemian, dan kerlip lampu temaram yang romantis dan intim untuk momen pernikahan berkesan.",
    },
    "chinese-modern": {
      badge: "ORIENTAL DOUBLE HAPPINESS & SANGJIT",
      detailedDescription:
        "Kemegahan ornamen Shuang Xi (囍) berbalut merah crimson kekaisaran dan emas murni. Didesain istimewa untuk prosesi Sangjit, Tea Ceremony (Teapai), dan resepsi pernikahan modern berkelas.",
    },
    "minimalist-floral": {
      badge: "SENTUHAN BOTANIKAL PASTEL HANGAT",
      detailedDescription:
        "Undangan bernuansa botanical dengan ilustrasi bunga lembut, aksen pastel hangat, dan tipografi minimalis kontemporer. Menghadirkan atmosfer romantis, intim, dan memikat untuk momen terindah hari bahagia Anda.",
    },
    "modern-elegance": {
      badge: "ELEGANSI MONOKROM KONTEMPORER MEWAH",
      detailedDescription:
        "Kemewahan kontemporer monokrom berpadu aksen emas temaram. Kontras tajam yang berkarakter, tipografi modern berkelas, dan animasi halus yang memukau di layar smartphone para tamu kehormatan.",
    },
  };

  const currentMeta = templateMeta[templateKey] || {
    badge: templateTags[0]?.toUpperCase() || "DESAIN EKSKLUSIF",
    detailedDescription: templateDescription,
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-900 flex flex-col selection:bg-amber-500/20">
      {/* 1. Website Navbar Header */}
      <PublicNavbar />

      {/* 2. Main Showcase Split Section */}
      <main className="flex-1 flex items-center justify-center py-10 lg:py-16 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        {/* Subtle Warm Amber / Rose Ambient Light in Background */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-br from-amber-200/30 via-rose-100/25 to-transparent blur-3xl pointer-events-none" />

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Template Details & Action CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Top Subtitle Badge */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100/70 text-[#844307] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-amber-200/80 shadow-2xs">
                {currentMeta.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-[1.1]">
              {templateName}
            </h1>

            {/* Rich Detailed Description */}
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {currentMeta.detailedDescription}
            </p>

            {/* Quick Template Switcher Pills */}
            <div className="pt-1">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2.5">
                Pilihan Desain Lainnya:
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {allTemplates.map((item) => {
                  const isActive = item.key === templateKey;
                  return (
                    <Link
                      key={item.key}
                      href={`/demo/${item.key}`}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#844307] text-white shadow-sm font-semibold scale-105"
                          : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-3.5">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                {/* Button 1: Coba Demo Langsung */}
                <button
                  type="button"
                  onClick={scrollToPhone}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#18191d] hover:bg-black text-white text-sm font-semibold rounded-2xl shadow-lg shadow-black/10 transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
                >
                  <MousePointerClick className="w-4 h-4 text-amber-400" />
                  <span>Coba Demo Langsung &rarr;</span>
                </button>

                {/* Button 2: Pakai Template */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#844307] via-[#9e5108] to-[#b45309] hover:from-[#6d3505] hover:to-[#844307] text-white text-sm font-semibold rounded-2xl shadow-lg shadow-[#844307]/25 transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>Pakai Template</span>
                </a>
              </div>

              {/* Fullscreen Alternative Link */}
              <div className="pt-1">
                <Link
                  href={`/demo/${templateKey}?view=raw`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Atau buka layar penuh di tab baru</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Smartphone Handphone Mockup */}
          <div
            ref={phoneRef}
            className="lg:col-span-6 flex flex-col items-center justify-center relative"
          >
            {/* Floating Top Pill: ● PRATINJAU LANGSUNG */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 text-white text-[11px] font-semibold tracking-wider shadow-lg mb-4 backdrop-blur-md border border-stone-700/60 z-20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PRATINJAU LANGSUNG</span>
            </div>

            {/* Smartphone Handphone Frame */}
            <div className="w-[310px] sm:w-[350px] lg:w-[370px] h-[640px] sm:h-[700px] lg:h-[740px] rounded-[48px] sm:rounded-[54px] border-[8px] sm:border-[10px] border-[#18181b] shadow-[0_25px_70px_rgba(0,0,0,0.18)] relative overflow-hidden bg-black flex flex-col ring-1 ring-black/25">
              {/* iPhone Top Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#18181b] rounded-b-2xl z-30 pointer-events-none flex items-center justify-center gap-2 shadow-xs">
                <div className="w-10 h-1 bg-stone-700/80 rounded-full" />
                <div className="w-2.5 h-2.5 rounded-full bg-stone-900 ring-1 ring-stone-700/60" />
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-20 pointer-events-none" />

              {/* Inner Screen Area running the live interactive template */}
              <div className="w-full h-full rounded-[38px] sm:rounded-[44px] overflow-hidden bg-white relative">
                <iframe
                  src={`/demo/${templateKey}?view=raw`}
                  title={`Live Preview ${templateName}`}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  loading="eager"
                  className="w-full h-full border-0 select-none"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
