"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Smartphone, Monitor } from "lucide-react";

interface DemoClientProps {
  templateKey: string;
  templateName: string;
  whatsappUrl: string;
}

export function DemoClient({
  templateKey,
  templateName,
  whatsappUrl,
}: DemoClientProps) {
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");

  return (
    <div className="min-h-screen bg-[#0f0f11] text-stone-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 py-3 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-stone-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Katalog</span>
          </Link>
          <span className="hidden sm:inline text-stone-700">|</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 hidden sm:inline">Demo Desain:</span>
            <span className="text-xs sm:text-sm font-semibold text-amber-300 font-serif">
              {templateName}
            </span>
          </div>
        </div>

        {/* Device Switcher (Mobile Mockup vs Fullscreen Desktop) */}
        <div className="hidden md:flex items-center p-1 bg-stone-800/80 rounded-xl border border-stone-700/60 shadow-inner">
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
              device === "mobile"
                ? "bg-[#844307] text-white shadow-xs font-semibold"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Tampilan HP (Mobile)</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
              device === "desktop"
                ? "bg-[#844307] text-white shadow-xs font-semibold"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Layar Penuh (Desktop)</span>
          </button>
        </div>

        {/* WhatsApp Order Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Pesan Template</span>
        </a>
      </header>

      {/* Main Showcase Stage */}
      <main className="flex-1 flex items-center justify-center p-0 sm:p-6 md:p-8 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-900 via-[#0f0f11] to-[#0a0a0c]">
        {device === "mobile" ? (
          /* Smartphone Device Frame (iPhone 15 Pro Style) */
          <div className="w-full h-[calc(100vh-57px)] sm:w-[410px] sm:h-[820px] sm:max-h-[88vh] sm:rounded-[52px] sm:border-[10px] sm:border-stone-800 sm:shadow-[0_25px_80px_rgba(0,0,0,0.95)] sm:ring-1 sm:ring-white/10 relative overflow-hidden bg-black flex flex-col">
            {/* Dynamic Island / Speaker Notch (only displayed on desktop mockup frame) */}
            <div className="hidden sm:block absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 pointer-events-none ring-1 ring-white/10 shadow-sm">
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-stone-900 ring-1 ring-stone-800" />
            </div>

            {/* Inner Phone Screen */}
            <div className="w-full h-full sm:rounded-[40px] overflow-hidden bg-white">
              <iframe
                src={`/demo/${templateKey}?view=raw`}
                title={`Preview ${templateName}`}
                allow="autoplay"
                loading="eager"
                className="w-full h-full border-0 select-none"
              />
            </div>
          </div>
        ) : (
          /* Fullscreen Desktop View */
          <div className="w-full h-[calc(100vh-57px)] bg-white overflow-hidden shadow-2xl">
            <iframe
              src={`/demo/${templateKey}?view=raw`}
              title={`Preview ${templateName}`}
              allow="autoplay"
              loading="eager"
              className="w-full h-full border-0"
            />
          </div>
        )}
      </main>
    </div>
  );
}

