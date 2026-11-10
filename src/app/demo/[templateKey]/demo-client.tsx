"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  Smartphone,
  Monitor,
  Share2,
  Check,
  Sparkles,
} from "lucide-react";

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
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-stone-100 flex flex-col selection:bg-amber-500/30">
      {/* Top Studio Control Bar */}
      <header className="sticky top-0 z-50 bg-[#121217]/90 backdrop-blur-xl border-b border-stone-800/80 py-3 px-4 sm:px-6 flex items-center justify-between shadow-lg">
        {/* Left: Back Link & Template Indicator */}
        <div className="flex items-center gap-3">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors py-1.5 px-3 rounded-xl hover:bg-stone-800/80 border border-transparent hover:border-stone-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Katalog</span>
          </Link>
          <span className="hidden sm:inline text-stone-700">|</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 hidden sm:inline">Desain:</span>
            <span className="text-xs sm:text-sm font-semibold text-amber-300 font-serif tracking-wide">
              {templateName}
            </span>
          </div>
        </div>

        {/* Center: Device Switcher (Mobile Mockup vs Fullscreen Desktop) */}
        <div className="hidden md:flex items-center p-1 bg-stone-900/90 rounded-2xl border border-stone-700/60 shadow-inner">
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              device === "mobile"
                ? "bg-[#844307] text-white shadow-md shadow-[#844307]/30 scale-[1.02]"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Tampilan HP (Mobile)</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              device === "desktop"
                ? "bg-[#844307] text-white shadow-md shadow-[#844307]/30 scale-[1.02]"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Layar Penuh (Desktop)</span>
          </button>
        </div>

        {/* Right Actions: Share Link & WhatsApp CTA */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyLink}
            title="Salin Link Demo"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-medium rounded-full border border-stone-700/70 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-semibold">Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Salin Link</span>
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md shadow-emerald-700/25 transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Pesan Desain</span>
          </a>
        </div>
      </header>

      {/* Main Studio Stage with Ambient Light Radial Background */}
      <main className="flex-1 flex items-center justify-center p-0 sm:p-6 md:p-8 overflow-hidden relative">
        {/* Subtle Warm Spotlight Glow centered on stage */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(217,119,6,0.12),transparent_70%)] pointer-events-none" />

        {device === "mobile" ? (
          /* Smartphone Device Frame (iPhone 15 Pro Titanium Style) */
          <div className="w-full h-[calc(100vh-61px)] sm:w-[420px] sm:h-[840px] sm:max-h-[89vh] sm:rounded-[54px] sm:border-[12px] sm:border-stone-800/90 sm:shadow-[0_25px_80px_rgba(0,0,0,0.95)] sm:ring-1 sm:ring-white/15 relative overflow-hidden bg-black flex flex-col transition-all duration-300">
            {/* Dynamic Island / Speaker Notch (only shown in desktop studio frame) */}
            <div className="hidden sm:block absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 pointer-events-none ring-1 ring-white/10 shadow-sm">
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-stone-900 ring-1 ring-stone-800" />
            </div>

            {/* Inner Phone Screen */}
            <div className="w-full h-full sm:rounded-[42px] overflow-hidden bg-white relative">
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
          <div className="w-full h-[calc(100vh-61px)] bg-white overflow-hidden shadow-2xl relative">
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
