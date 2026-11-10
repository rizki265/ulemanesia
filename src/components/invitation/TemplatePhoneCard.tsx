"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  MessageCircle,
  Eye,
  CheckCircle2,
  Sparkles,
  Heart,
  MailOpen,
} from "lucide-react";
import { RegisteredTemplate } from "@/templates/types";
import { GununganOrnament } from "./GununganOrnament";

interface TemplatePhoneCardProps {
  template: RegisteredTemplate;
  whatsappUrl: string;
  priority?: boolean;
}

export function TemplatePhoneCard({
  template,
  whatsappUrl,
  priority = false,
}: TemplatePhoneCardProps) {
  const isJavanese = template.key === "javanese-royal";
  const isModern = template.key === "modern-elegance";

  return (
    <div className="group flex flex-col items-center justify-between text-center space-y-6">
      {/* 1. Smartphone Handphone Device Mockup */}
      <Link
        href={`/demo/${template.key}`}
        className="w-[260px] sm:w-[280px] h-[480px] sm:h-[510px] rounded-[44px] sm:rounded-[48px] border-[10px] border-stone-800/95 shadow-[0_15px_40px_rgba(0,0,0,0.12)] group-hover:shadow-[0_25px_60px_rgba(132,67,7,0.22)] group-hover:-translate-y-2 transition-all duration-500 relative overflow-hidden bg-black flex flex-col cursor-pointer ring-1 ring-black/15 select-none"
        title={`Coba Demo ${template.name}`}
      >
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30 pointer-events-none ring-1 ring-white/10 shadow-xs flex items-center justify-end px-2">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-900 ring-1 ring-stone-800" />
        </div>

        {/* Screen Area */}
        <div className="w-full h-full rounded-[34px] sm:rounded-[38px] overflow-hidden relative flex flex-col justify-between">
          {/* Cover Screen Designs per Template */}
          {isJavanese ? (
            /* Javanese Royal Heritage Authentic Phone Cover */
            <div className="w-full h-full bg-[#0d0d0f] text-center flex flex-col justify-between py-8 px-4 relative overflow-hidden">
              {/* Subtle side kayon ornaments */}
              <div className="absolute -left-7 top-1/3 opacity-25 pointer-events-none scale-75">
                <GununganOrnament size={50} />
              </div>
              <div className="absolute -right-7 top-1/3 opacity-25 pointer-events-none scale-75 scale-x-[-1]">
                <GununganOrnament size={50} />
              </div>

              {/* Top: Gunungan & Title */}
              <div className="space-y-3 pt-4 relative z-10 flex flex-col items-center">
                <div className="transform group-hover:scale-105 transition-transform duration-500">
                  <GununganOrnament size={65} />
                </div>
                <p className="text-[10px] tracking-[0.25em] uppercase font-serif text-amber-300 font-medium">
                  WEDDING INVITATION
                </p>
                <h3 className="font-script text-3xl sm:text-4xl text-white font-normal leading-tight">
                  Arka &amp; Kayla
                </h3>
                <p className="text-[10px] font-sans text-stone-300 font-light">
                  We invite you to celebrate our wedding.
                </p>
              </div>

              {/* Bottom: Guest pill & Open button */}
              <div className="space-y-3 pb-2 relative z-10 flex flex-col items-center">
                <div className="px-4 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/40 text-[11px] font-serif text-amber-200">
                  Tamu Undangan
                </div>
                <p className="text-xs font-serif text-stone-200 tracking-widest">
                  12 &middot; 12 &middot; 2026
                </p>
                <div className="w-full max-w-[200px] py-2 px-4 rounded-full bg-stone-950/90 border border-amber-500/50 text-[11px] font-serif tracking-wider uppercase text-amber-300 flex items-center justify-center gap-1.5 shadow-sm group-hover:bg-amber-600/30 transition-colors">
                  <MailOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>OPEN INVITATION</span>
                </div>
              </div>
            </div>
          ) : isModern ? (
            /* Modern Monochrome Elegance Phone Cover */
            <div className="w-full h-full relative flex flex-col justify-between py-8 px-4 text-center">
              <Image
                src={template.thumbnailUrl}
                alt={template.name}
                fill
                priority={priority}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="280px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/85" />

              {/* Top Info */}
              <div className="relative z-10 pt-5 space-y-2">
                <span className="inline-block px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-[10px] uppercase tracking-widest font-medium">
                  The Wedding Of
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Rama &amp; Shinta
                </h3>
                <p className="text-[11px] text-stone-300 font-light">
                  Kamis, 10 Desember 2026
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="relative z-10 pb-3 space-y-3">
                <div className="p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 text-white">
                  <p className="text-[9px] uppercase tracking-wider text-amber-200 mb-0.5">Kepada Yth:</p>
                  <p className="text-xs font-serif font-bold text-white">Tamu Undangan</p>
                </div>

                <div className="py-2.5 px-4 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-bold text-xs shadow-lg flex items-center justify-center gap-1.5">
                  <MailOpen className="w-3.5 h-3.5 text-stone-950" />
                  <span>Buka Undangan</span>
                </div>
              </div>
            </div>
          ) : (
            /* Floral Botanical Minimalist Phone Cover */
            <div className="w-full h-full relative flex flex-col justify-between py-8 px-4 text-center">
              <Image
                src={template.thumbnailUrl}
                alt={template.name}
                fill
                priority={priority}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="280px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/85" />

              {/* Top Info */}
              <div className="relative z-10 pt-5 space-y-2">
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-rose-200 text-[10px] uppercase tracking-widest font-medium">
                  <Heart className="w-3 h-3 text-rose-300 fill-rose-300" />
                  <span>The Wedding Of</span>
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Rama &amp; Shinta
                </h3>
                <p className="text-[11px] text-stone-200 font-light">
                  Kamis, 10 Desember 2026
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="relative z-10 pb-3 space-y-3">
                <div className="p-3 rounded-2xl bg-black/45 backdrop-blur-md border border-white/25 text-white">
                  <p className="text-[9px] uppercase tracking-wider text-rose-200 mb-0.5">Kepada Yth:</p>
                  <p className="text-xs font-serif font-bold text-white">Tamu Undangan</p>
                </div>

                <div className="py-2.5 px-4 rounded-full bg-[#844307] text-white font-semibold text-xs shadow-lg flex items-center justify-center gap-1.5 group-hover:bg-[#6d3505] transition-colors">
                  <MailOpen className="w-3.5 h-3.5 text-white" />
                  <span>Buka Undangan</span>
                </div>
              </div>
            </div>
          )}

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/95 text-stone-900 rounded-full text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye className="w-4 h-4 text-[#844307]" />
              <span>Coba Demo Interaktif</span>
            </span>
          </div>
        </div>
      </Link>

      {/* 2. Template Details & Title under the Handphone */}
      <div className="w-full max-w-[280px] space-y-2">
        <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 group-hover:text-[#844307] transition-colors">
          {template.name}
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[10px] font-semibold bg-amber-50 text-[#844307] rounded-full border border-amber-200/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
          {template.description}
        </p>

        <div className="flex items-center justify-center gap-1 text-[11px] text-emerald-600 font-medium pt-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Aktif 3 Bulan &middot; Link Nama Tamu Gratis</span>
        </div>
      </div>

      {/* 3. Action Buttons underneath the Handphone */}
      <div className="w-full max-w-[280px] grid grid-cols-2 gap-2.5 pt-1">
        {/* Tombol Demo */}
        <Link
          href={`/demo/${template.key}`}
          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl border border-stone-200/80 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer shadow-2xs"
        >
          <Eye className="w-3.5 h-3.5 text-stone-500" />
          <span>Lihat Demo</span>
        </Link>

        {/* Tombol Pesan via WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-98 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Pesan Desain</span>
        </a>
      </div>
    </div>
  );
}

