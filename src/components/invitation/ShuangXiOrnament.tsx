"use client";

import React from "react";

interface OrnamentProps {
  size?: number;
  className?: string;
  color?: string;
}

export function ShuangXiOrnament({
  size = 60,
  className = "",
  color = "#d4af37", // Imperial Gold
}: OrnamentProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`inline-flex items-center justify-center font-serif select-none ${className}`}
    >
      <span
        style={{ color, fontSize: size * 0.75, lineHeight: 1 }}
        className="font-bold tracking-tight drop-shadow-sm"
      >
        囍
      </span>
    </div>
  );
}

