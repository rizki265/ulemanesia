"use client";

import React, { useState } from "react";
import { MailOpen, Heart } from "lucide-react";

interface EnvelopeModalProps {
  title: string;
  coupleNames: string;
  guestName: string;
  eventDate?: string;
  coverImageUrl?: string | null;
  onOpen: () => void;
}

export function EnvelopeModal({
  title,
  coupleNames,
  guestName,
  eventDate,
  coverImageUrl,
  onOpen,
}: EnvelopeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    onOpen();
  };

  if (isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity duration-700 animate-fadeIn">
      {/* Background with blur if cover image provided */}
      {coverImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-lg opacity-40 scale-105"
          style={{ backgroundImage: `url(${coverImageUrl})` }}
        />
      )}

      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl border border-rose-100 rounded-3xl p-8 sm:p-10 shadow-2xl text-center transform transition-all duration-500 hover:shadow-rose-500/10">
        {/* Subtle decorative heart */}
        <div className="mx-auto w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-rose-50">
          <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-pulse" />
        </div>

        <p className="text-xs uppercase tracking-widest text-rose-800/80 font-medium mb-1">
          The Wedding of
        </p>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-rose-950 mb-3 tracking-tight">
          {coupleNames}
        </h1>

        {eventDate && (
          <p className="text-sm text-gray-500 mb-6 font-light">{eventDate}</p>
        )}

        {/* Guest Name Card */}
        <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-5 mb-8">
          <p className="text-xs text-rose-800/70 font-medium mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-rose-900 break-words">
            {guestName}
          </h2>
          <p className="text-[11px] text-gray-500 italic mt-1.5">
            *Mohon maaf jika ada kesalahan penulisan nama dan gelar
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleOpenInvitation}
          className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-medium rounded-full shadow-lg shadow-rose-600/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <MailOpen className="w-5 h-5" />
          <span>Buka Undangan</span>
        </button>

        <p className="text-[11px] text-gray-400 mt-4">
          Sentuh tombol untuk membuka undangan & memutar musik
        </p>
      </div>
    </div>
  );
}

