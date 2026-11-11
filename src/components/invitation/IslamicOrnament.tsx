"use client";

import React from "react";

interface OrnamentProps {
  size?: number;
  className?: string;
  color?: string;
}

export function IslamicOrnament({
  size = 64,
  className = "",
  color = "#d4af37", // Warm Gold
}: OrnamentProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Eight-Pointed Star (Rub el Hizb) Islamic Geometric Motifs */}
      <rect
        x="20"
        y="20"
        width="60"
        height="60"
        stroke={color}
        strokeWidth="1.8"
        fill="none"
        rx="2"
      />
      <rect
        x="20"
        y="20"
        width="60"
        height="60"
        stroke={color}
        strokeWidth="1.8"
        fill="none"
        transform="rotate(45 50 50)"
        rx="2"
      />
      <circle cx="50" cy="50" r="22" stroke={color} strokeWidth="1.2" strokeDasharray="2 2" />
      <circle cx="50" cy="50" r="14" stroke={color} strokeWidth="1.5" />
      <circle cx="50" cy="50" r="5" fill={color} />
      {/* Decorative floral rays */}
      <circle cx="50" cy="10" r="2.5" fill={color} />
      <circle cx="50" cy="90" r="2.5" fill={color} />
      <circle cx="10" cy="50" r="2.5" fill={color} />
      <circle cx="90" cy="50" r="2.5" fill={color} />
      <line x1="50" y1="2" x2="50" y2="10" stroke={color} strokeWidth="1.5" />
      <line x1="50" y1="90" x2="50" y2="98" stroke={color} strokeWidth="1.5" />
      <line x1="2" y1="50" x2="10" y2="50" stroke={color} strokeWidth="1.5" />
      <line x1="90" y1="50" x2="98" y2="50" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export function BismillahCalligraphy({
  className = "w-48 sm:w-60 h-auto text-amber-300 mx-auto",
}: {
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-2 ${className}`}>
      <span className="font-serif text-2xl sm:text-3xl text-amber-300 tracking-wider">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </span>
      <span className="text-[10px] sm:text-xs text-stone-300 font-light italic mt-1 tracking-wide">
        Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang
      </span>
    </div>
  );
}

