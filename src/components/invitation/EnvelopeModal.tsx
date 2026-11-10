"use client";

import React, { useState, useEffect } from "react";
import { MailOpen, Heart } from "lucide-react";

interface EnvelopeModalProps {
  title: string;
  coupleNames: string;
  guestName: string;
  eventDate?: string;
  coverImageUrl?: string | null;
  onOpen: () => void;
}

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80";

export function EnvelopeModal({
  title,
  coupleNames,
  guestName,
  eventDate,
  coverImageUrl,
  onOpen,
}: EnvelopeModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  // Kunci scroll halaman sebelum undangan dibuka
  useEffect(() => {
    if (!isClosed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isClosed]);

  const handleOpenInvitation = () => {
    setIsClosing(true);
    onOpen();
    setTimeout(() => {
      setIsClosed(true);
    }, 750);
  };

  if (isClosed) return null;

  const bgImage = coverImageUrl || DEFAULT_COVER;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between transition-all duration-700 ease-in-out ${
        isClosing
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      {/* 1. Fullscreen Background Image - Jelas tanpa blur agar foto tetap terlihat */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgImage}
          alt={coupleNames}
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000"
        />
        {/* Gradient lembut dari atas dan bawah agar teks terbaca tajam namun foto tetap terlihat jelas */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/20 to-black/85" />
      </div>

      {/* 2. Bagian Atas: Tulisan Judul & Nama Kedua Mempelai langsung di atas gambar */}
      <div className="pt-14 sm:pt-20 px-6 text-center text-white space-y-3">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-amber-200 text-xs tracking-widest uppercase font-medium shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>The Wedding Of</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          {coupleNames}
        </h1>

        {eventDate && (
          <p className="text-sm sm:text-base text-stone-200 font-light tracking-wide drop-shadow-md">
            {eventDate}
          </p>
        )}
      </div>

      {/* 3. Bagian Bawah: Nama Tamu & Tombol Buka Undangan (Glassmorphism tipis, tanpa popup tebal) */}
      <div className="pb-10 sm:pb-14 px-6 max-w-md mx-auto w-full text-center space-y-5">
        {/* Kotak Transparan Tipis Nama Tamu */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/45 backdrop-blur-md border border-white/20 text-white shadow-xl space-y-1.5">
          <p className="text-[11px] sm:text-xs text-amber-200 tracking-wider font-light uppercase">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide drop-shadow-md">
            {guestName || "Tamu Undangan"}
          </h2>
          <p className="text-[10px] sm:text-[11px] text-white/70 italic">
            *Mohon maaf jika ada kesalahan penulisan nama dan gelar
          </p>
        </div>

        {/* Tombol Buka Undangan */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleOpenInvitation}
            className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#844307] via-[#a97532] to-[#844307] hover:from-[#6d3505] hover:to-[#844307] text-white font-medium text-sm sm:text-base rounded-full shadow-2xl shadow-black/70 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-amber-300/30 cursor-pointer"
          >
            <MailOpen className="w-5 h-5 animate-bounce text-amber-200" />
            <span className="font-semibold tracking-wide">Buka Undangan</span>
          </button>

          <p className="text-[11px] text-white/80 drop-shadow-md font-light">
            Sentuh tombol untuk membuka undangan & memutar musik
          </p>
        </div>
      </div>
    </div>
  );
}

