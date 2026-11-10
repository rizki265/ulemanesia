"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Eye, Heart, MailOpen } from "lucide-react";
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
  const isEditorial = template.key === "editorial-photo";
  const isJavanese = template.key === "javanese-royal";
  const isModern = template.key === "modern-elegance";

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between group w-full max-w-[270px]">
      {/* 1. Realistic Smartphone Handphone Mockup (iPhone proportion ~9:19.5 like reference image) */}
      <Link
        href={`/demo/${template.key}`}
        className="w-[205px] sm:w-[218px] h-[435px] sm:h-[465px] rounded-[38px] sm:rounded-[42px] border-[4px] sm:border-[5px] border-[#18181b] shadow-[0_10px_25px_rgba(0,0,0,0.14)] group-hover:shadow-[0_20px_40px_rgba(132,67,7,0.25)] transition-all duration-300 relative overflow-hidden bg-black flex flex-col cursor-pointer ring-1 ring-black/25 select-none shrink-0"
        title={`Coba Demo ${template.name}`}
      >
        {/* Realistic iPhone Top Notch with Speaker Earphone Slit & Camera */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#18181b] rounded-b-2xl z-30 pointer-events-none flex items-center justify-center gap-1.5 shadow-xs">
          <div className="w-8 h-1 bg-stone-700/80 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-stone-900 ring-1 ring-stone-700/60" />
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/45 rounded-full z-20 pointer-events-none" />

        {/* Screen Area with Realistic Inner Bezel */}
        <div className="w-full h-full rounded-[33px] sm:rounded-[37px] overflow-hidden relative flex flex-col justify-between">
          {isEditorial ? (
            /* Cinematic Editorial Romance Phone Cover Preview */
            <div className="w-full h-full relative flex flex-col justify-between py-7 px-3.5 text-center">
              <Image
                src={template.thumbnailUrl}
                alt={template.name}
                fill
                priority={priority}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="220px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-black/90" />

              {/* Top Tagline */}
              <div className="relative z-10 pt-4 space-y-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-[8px] uppercase tracking-[0.2em] font-medium border border-white/20">
                  THE WEDDING INVITATION
                </span>
                <p className="text-[8px] uppercase tracking-[0.22em] text-stone-300 font-light">
                  WE ARE GETTING MARRIED
                </p>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                  Dimas &amp; Clarissa
                </h4>
                <p className="text-[10px] font-serif italic text-amber-200/90">
                  12 &middot; 12 &middot; 2026
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="relative z-10 pb-2 space-y-2 flex flex-col items-center">
                <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white w-full max-w-[170px] shadow-lg">
                  <p className="text-[8px] uppercase tracking-wider text-amber-300/90 mb-0.5">Kepada Yth:</p>
                  <p className="text-[11px] font-serif font-bold text-white">Tamu Undangan</p>
                </div>

                <div className="w-full max-w-[170px] py-1.5 px-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-[#844307] text-white font-semibold text-[10px] shadow-lg flex items-center justify-center gap-1.5 ring-1 ring-amber-400/40">
                  <MailOpen className="w-3 h-3 text-white" />
                  <span>Buka Undangan</span>
                </div>
              </div>
            </div>
          ) : isJavanese ? (
            /* Javanese Royal Heritage Phone Cover Preview */
            <div className="w-full h-full bg-[#0d0d0f] text-center flex flex-col justify-between py-7 px-3.5 relative overflow-hidden">
              {/* Subtle side kayon ornaments */}
              <div className="absolute -left-6 top-1/3 opacity-20 pointer-events-none scale-75">
                <GununganOrnament size={46} />
              </div>
              <div className="absolute -right-6 top-1/3 opacity-20 pointer-events-none scale-75 scale-x-[-1]">
                <GununganOrnament size={46} />
              </div>

              {/* Top: Gunungan & Title */}
              <div className="space-y-2 pt-4 relative z-10 flex flex-col items-center">
                <div className="transform group-hover:scale-105 transition-transform duration-500">
                  <GununganOrnament size={56} />
                </div>
                <p className="text-[9px] tracking-[0.22em] uppercase font-serif text-amber-300/90 font-medium">
                  WEDDING INVITATION
                </p>
                <h4 className="font-script text-2xl sm:text-3xl text-white font-normal leading-tight">
                  Arka &amp; Kayla
                </h4>
                <p className="text-[9px] font-sans text-stone-300 font-light">
                  We invite you to celebrate our wedding.
                </p>
              </div>

              {/* Bottom: Guest pill & Open button */}
              <div className="space-y-2 pb-2 relative z-10 flex flex-col items-center">
                <div className="px-3 py-1 rounded-full bg-stone-900/90 border border-amber-500/40 text-[10px] font-serif text-amber-200">
                  Tamu Undangan
                </div>
                <p className="text-[11px] font-serif text-stone-300 tracking-widest">
                  12 &middot; 12 &middot; 2026
                </p>
                <div className="w-full max-w-[170px] py-1.5 px-3 rounded-full bg-stone-950/90 border border-amber-500/50 text-[10px] font-serif tracking-wider uppercase text-amber-300 flex items-center justify-center gap-1.5 shadow-sm group-hover:bg-amber-600/30 transition-colors">
                  <MailOpen className="w-3 h-3 text-amber-400" />
                  <span>OPEN INVITATION</span>
                </div>
              </div>
            </div>
          ) : isModern ? (
            /* Modern Monochrome Elegance Phone Cover Preview */
            <div className="w-full h-full relative flex flex-col justify-between py-7 px-3.5 text-center">
              <Image
                src={template.thumbnailUrl}
                alt={template.name}
                fill
                priority={priority}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="220px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/85" />

              {/* Top Info */}
              <div className="relative z-10 pt-4 space-y-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-[9px] uppercase tracking-widest font-medium">
                  The Wedding Of
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Rama &amp; Shinta
                </h4>
                <p className="text-[10px] text-stone-300 font-light">
                  Kamis, 10 Desember 2026
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="relative z-10 pb-2 space-y-2 flex flex-col items-center">
                <div className="px-3 py-1.5 rounded-xl bg-black/55 backdrop-blur-md border border-white/20 text-white w-full max-w-[170px]">
                  <p className="text-[8px] uppercase tracking-wider text-amber-200 mb-0.5">Kepada Yth:</p>
                  <p className="text-[11px] font-serif font-bold text-white">Tamu Undangan</p>
                </div>

                <div className="w-full max-w-[170px] py-1.5 px-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-bold text-[10px] shadow-lg flex items-center justify-center gap-1.5">
                  <MailOpen className="w-3 h-3 text-stone-950" />
                  <span>Buka Undangan</span>
                </div>
              </div>
            </div>
          ) : (
            /* Floral Botanical Minimalist Phone Cover Preview */
            <div className="w-full h-full relative flex flex-col justify-between py-7 px-3.5 text-center">
              <Image
                src={template.thumbnailUrl}
                alt={template.name}
                fill
                priority={priority}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="220px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/20 to-black/85" />

              {/* Top Info */}
              <div className="relative z-10 pt-4 space-y-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-rose-200 text-[9px] uppercase tracking-widest font-medium">
                  <Heart className="w-2.5 h-2.5 text-rose-300 fill-rose-300" />
                  <span>The Wedding Of</span>
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Rama &amp; Shinta
                </h4>
                <p className="text-[10px] text-stone-200 font-light">
                  Kamis, 10 Desember 2026
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="relative z-10 pb-2 space-y-2 flex flex-col items-center">
                <div className="px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/25 text-white w-full max-w-[170px]">
                  <p className="text-[8px] uppercase tracking-wider text-rose-200 mb-0.5">Kepada Yth:</p>
                  <p className="text-[11px] font-serif font-bold text-white">Tamu Undangan</p>
                </div>

                <div className="w-full max-w-[170px] py-1.5 px-3 rounded-full bg-[#844307] text-white font-semibold text-[10px] shadow-lg flex items-center justify-center gap-1.5 group-hover:bg-[#6d3505] transition-colors">
                  <MailOpen className="w-3 h-3 text-white" />
                  <span>Buka Undangan</span>
                </div>
              </div>
            </div>
          )}

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/95 text-stone-900 rounded-full text-[11px] font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye className="w-3.5 h-3.5 text-[#844307]" />
              <span>Lihat Demo</span>
            </span>
          </div>
        </div>
      </Link>

      {/* 2. Di Bawah Handphone: HANYA Nama Template dan Tombol Demo & Pesan */}
      <div className="w-full mt-4 text-center space-y-3">
        <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg group-hover:text-[#844307] transition-colors leading-tight">
          {template.name}
        </h3>

        <div className="grid grid-cols-2 gap-2 w-full pt-1">
          {/* Tombol Demo */}
          <Link
            href={`/demo/${template.key}`}
            className="w-full py-2 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl border border-stone-200/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs hover:scale-[1.02] active:scale-98"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" />
            <span>Lihat Demo</span>
          </Link>

          {/* Tombol Pesan */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20 cursor-pointer hover:scale-[1.02] active:scale-98"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span>Pesan</span>
          </a>
        </div>
      </div>
    </div>
  );
}
