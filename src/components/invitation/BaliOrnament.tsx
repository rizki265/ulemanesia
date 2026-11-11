"use client";

import React from "react";

interface OrnamentProps {
  size?: number;
  className?: string;
  color?: string;
}

export function BaliOrnament({
  size = 64,
  className = "",
  color = "#c28b38", // Terracotta Gold
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
      {/* Candi Bentar / Balinese Gate Stylized Silhouette & Frangipani Lotus Flower */}
      <path
        d="M50 15 C55 25, 65 30, 75 35 C68 45, 60 48, 50 60 C40 48, 32 45, 25 35 C35 30, 45 25, 50 15 Z"
        stroke={color}
        strokeWidth="1.8"
        fill={color}
        fillOpacity="0.15"
      />
      {/* Central Frangipani / Lotus Petals */}
      <circle cx="50" cy="55" r="8" stroke={color} strokeWidth="1.5" />
      <circle cx="50" cy="55" r="3" fill={color} />
      {/* Left Wing / Carving */}
      <path
        d="M25 35 C15 45, 12 60, 20 75 C25 68, 30 65, 35 65"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Right Wing / Carving */}
      <path
        d="M75 35 C85 45, 88 60, 80 75 C75 68, 70 65, 65 65"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Bottom Shrine Base */}
      <path
        d="M30 80 L70 80 M25 86 L75 86 M20 92 L80 92"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="50" cy="22" r="2.5" fill={color} />
    </svg>
  );
}

