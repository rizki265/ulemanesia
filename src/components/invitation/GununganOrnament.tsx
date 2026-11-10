import React from "react";

interface GununganProps {
  className?: string;
  size?: number;
}

/**
 * Authentic Javanese Gunungan (Kayon) SVG Ornament
 * Represents the Tree of Life (Kalpataru), the Sacred Pavilion (Joglo),
 * and royal keraton filigree in traditional Javanese wedding arts.
 */
export function GununganOrnament({ className = "w-28 h-40", size }: GununganProps) {
  const style = size ? { width: size, height: size * 1.45 } : undefined;

  return (
    <svg
      viewBox="0 0 200 290"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="gununganGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#d97706" />
          <stop offset="70%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#d97706" floodOpacity="0.4" />
        </filter>
      </defs>

      <g filter="url(#goldGlow)" stroke="url(#gununganGoldGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Outer Gunungan Silhouette */}
        <path
          d="M 100 8
             C 125 55, 172 105, 178 160
             C 183 205, 165 235, 158 245
             L 142 245
             L 142 258
             L 108 258
             L 108 285
             L 92 285
             L 92 258
             L 58 258
             L 58 245
             L 42 245
             C 35 235, 17 205, 22 160
             C 28 105, 75 55, 100 8 Z"
          fill="rgba(217, 119, 6, 0.08)"
          stroke="url(#gununganGoldGrad)"
          strokeWidth="3"
        />

        {/* Inner Border Ridge */}
        <path
          d="M 100 24
             C 120 65, 158 110, 163 158
             C 167 195, 152 225, 146 233
             L 132 233
             L 132 245
             L 68 245
             L 68 233
             L 54 233
             C 48 225, 33 195, 37 158
             C 42 110, 80 65, 100 24 Z"
          stroke="url(#gununganGoldGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />

        {/* Central Spire (Mustaka / Cucuk Kayon) */}
        <path d="M 100 8 L 100 65" strokeWidth="2.5" />
        <circle cx="100" cy="8" r="3" fill="#fef08a" />
        <path d="M 94 30 Q 100 22 106 30" />
        <path d="M 91 45 Q 100 35 109 45" />

        {/* Top Filigree Vines (Lung-lungan / Branches) */}
        <path d="M 100 55 C 115 50, 130 62, 126 78 C 122 92, 108 92, 100 85" strokeWidth="2" />
        <path d="M 100 55 C 85 50, 70 62, 74 78 C 78 92, 92 92, 100 85" strokeWidth="2" />
        <circle cx="126" cy="74" r="2.5" fill="#fef08a" />
        <circle cx="74" cy="74" r="2.5" fill="#fef08a" />

        {/* Middle Foliage Spirals */}
        <path d="M 100 85 C 122 80, 148 95, 145 118 C 142 138, 118 135, 106 122" strokeWidth="2" />
        <path d="M 100 85 C 78 80, 52 95, 55 118 C 58 138, 82 135, 94 122" strokeWidth="2" />

        {/* Traditional Tree of Life Heart Curves */}
        <path d="M 100 120 C 130 115, 155 135, 150 162 C 145 185, 120 180, 108 168" strokeWidth="2" />
        <path d="M 100 120 C 70 115, 45 135, 50 162 C 55 185, 80 180, 92 168" strokeWidth="2" />

        {/* Central Trunk */}
        <path d="M 100 85 L 100 190" strokeWidth="3" />

        {/* Sacred Pavilion / Joglo (Rumah Joglo Gapura) at Base */}
        {/* Joglo Roof (Atap Tajug Joglo) */}
        <path
          d="M 100 180
             L 125 195
             L 140 205
             L 60 205
             L 75 195 Z"
          fill="rgba(217, 119, 6, 0.2)"
          strokeWidth="2"
        />
        <path d="M 100 174 L 100 180" strokeWidth="2" />
        <circle cx="100" cy="173" r="2" fill="#fef08a" />

        {/* Joglo Lower Tier */}
        <path d="M 60 205 L 52 215 L 148 215 L 140 205" strokeWidth="2" />

        {/* Pavilion Pillars (Soko Guru) */}
        <line x1="72" y1="215" x2="72" y2="245" strokeWidth="2.5" />
        <line x1="88" y1="215" x2="88" y2="245" strokeWidth="2" />
        <line x1="112" y1="215" x2="112" y2="245" strokeWidth="2" />
        <line x1="128" y1="215" x2="128" y2="245" strokeWidth="2.5" />

        {/* Central Gapura Door (Pintu Gerbang Kori) */}
        <path
          d="M 92 245
             L 92 225
             Q 100 220 108 225
             L 108 245 Z"
          fill="rgba(254, 240, 138, 0.25)"
          strokeWidth="2"
        />

        {/* Pavilion Base Floor (Batur Joglo) */}
        <rect x="52" y="245" width="96" height="8" rx="2" fill="rgba(217, 119, 6, 0.3)" strokeWidth="2" />

        {/* Stem Handle (Gagang Gapit Wayang) */}
        <path d="M 95 258 L 95 285 A 5 5 0 0 0 105 285 L 105 258 Z" fill="rgba(217, 119, 6, 0.3)" strokeWidth="2" />
      </g>
    </svg>
  );
}

