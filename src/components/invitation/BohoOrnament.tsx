"use client";

import React from "react";

interface OrnamentProps {
  size?: number;
  className?: string;
  color?: string;
}

export function BohoOrnament({
  size = 64,
  className = "",
  color = "#b08968", // Earthy Terracotta Sand
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
      {/* Rustic Pampas / Botanical Botanical Wreath */}
      <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="0.8" />
      {/* Botanical Leaves & Pampas Feathers along circle */}
      <path
        d="M20 50 C25 40, 35 42, 38 52 C32 55, 24 55, 20 50 Z"
        fill={color}
        fillOpacity="0.4"
      />
      <path
        d="M80 50 C75 40, 65 42, 62 52 C68 55, 76 55, 80 50 Z"
        fill={color}
        fillOpacity="0.4"
      />
      <path
        d="M50 20 C40 25, 42 35, 52 38 C55 32, 55 24, 50 20 Z"
        fill={color}
        fillOpacity="0.4"
      />
      <path
        d="M50 80 C40 75, 42 65, 52 62 C55 68, 55 76, 50 80 Z"
        fill={color}
        fillOpacity="0.4"
      />
      <circle cx="50" cy="50" r="4" fill={color} />
    </svg>
  );
}

