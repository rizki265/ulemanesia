"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TemplateProps } from "@/templates/types";
import { ShuangXiOrnament } from "@/components/invitation/ShuangXiOrnament";
import { FloatingControls } from "@/components/invitation/FloatingControls";
import { RevealOnScroll } from "@/components/invitation/RevealOnScroll";
import { CountdownTimer } from "@/components/invitation/CountdownTimer";
import { RsvpAndWishes } from "@/components/invitation/RsvpAndWishes";
import { GiftSection } from "@/components/invitation/GiftSection";
import { formatDate } from "@/lib/utils";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Instagram,
  Heart,
  MailOpen,
  Sparkles,
  ChevronDown,
} from "lucide-react";

export default function ChineseModernTemplate({
  slug,
  guestName,
  title,
  coverImageUrl,
  audioUrl,
  audioTitle,
  data,
  wishes,
  isPreview = false,
  onSendWish,
}: TemplateProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isClosingCover, setIsClosingCover] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const themeConfig = data.theme_config || data.theme_options || {};
  const coverBg =
    themeConfig.cover_bg_url ||
    coverImageUrl ||
    data.gallery[0] ||
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80";

  const coupleNames = `${data.groom.nickname} & ${data.bride.nickname}`;
  const firstEventDate = data.events[0]?.date ? new Date(data.events[0].date) : new Date();

  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened]);

  const handleOpen = () => {
    setIsClosingCover(true);
    setTimeout(() => {
      setIsOpened(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#1c080b] text-stone-100 font-sans selection:bg-amber-500/20 selection:text-amber-200 relative overflow-x-hidden">
      {/* ======================================================== */}
      {/* 1. COVER SCREEN: ORIENTAL DOUBLE HAPPINESS                */}
      {/* ======================================================== */}
      {!isOpened && (
        <div
          className={`fixed inset-0 z-50 flex flex-col justify-between py-10 px-6 sm:px-10 bg-[#1c080b] transition-all duration-700 ease-in-out select-none overflow-hidden ${
            isClosingCover
              ? "-translate-y-full opacity-0 pointer-events-none"
              : "translate-y-0 opacity-100"
          }`}
        >
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top: Shuang Xi Emblem */}
          <div className="relative z-10 text-center pt-2">
            <div className="inline-flex flex-col items-center gap-1.5">
              <ShuangXiOrnament size={65} color="#e5c07b" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300 font-serif font-medium mt-1">
                {themeConfig.cover_tagline || "DOUBLE HAPPINESS • 囍"}
              </p>
            </div>
          </div>

          {/* Center: Couple Names */}
          <div className="relative z-10 text-center space-y-4 my-auto py-8">
            <p className="text-xs font-light uppercase tracking-[0.3em] text-stone-300">
              THE WEDDING CELEBRATION
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-amber-100 tracking-tight drop-shadow-xl">
              {coupleNames}
            </h1>
            <p className="text-sm font-serif italic text-amber-300/90 tracking-wider">
              {formatDate(firstEventDate.toISOString())}
            </p>
          </div>

          {/* Bottom: Guest Box & Open Button */}
          <div className="relative z-10 w-full max-w-sm mx-auto space-y-4 text-center pb-2">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#2e0e13]/90 backdrop-blur-xl border border-amber-500/30 text-white shadow-2xl">
              <p className="text-[10px] uppercase tracking-widest text-amber-300 font-medium mb-1">
                DEAR SPECIAL GUEST:
              </p>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white capitalize">
                {guestName || "Tamu Undangan"}
              </h3>
            </div>

            <button
              type="button"
              onClick={handleOpen}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#a4161a] via-[#ba181b] to-[#660708] hover:opacity-95 text-white font-semibold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer ring-2 ring-amber-400/40"
            >
              <MailOpen className="w-4 h-4 text-white" />
              <span>Open Invitation • 打开</span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. FLOATING CONTROLS: AUDIO & AUTO-SCROLL                */}
      {/* ======================================================== */}
      {isOpened && (
        <FloatingControls
          audioUrl={audioUrl || data.custom_music_url}
          autoPlayTrigger={true}
        />
      )}

      {/* ======================================================== */}
      {/* 3. HERO BANNER: CHINESE MODERN LUXE                      */}
      {/* ======================================================== */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={coverBg}
            alt={coupleNames}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c080b]/90 via-[#1c080b]/75 to-[#1c080b]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-6 pt-16 pb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs tracking-[0.25em] uppercase font-serif">
            A LIFETIME OF LOVE • 百年好合
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-amber-100 tracking-tight drop-shadow-md">
            {coupleNames}
          </h2>

          <p className="font-serif italic text-lg sm:text-xl text-stone-200">
            {formatDate(firstEventDate.toISOString())}
          </p>

          <div className="pt-4 max-w-md mx-auto">
            <div className="p-5 rounded-3xl bg-[#2e0e13]/85 backdrop-blur-xl border border-amber-500/30 text-white shadow-2xl">
              <CountdownTimer targetDate={data.countdown_target || firstEventDate.toISOString()} />
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-6 animate-bounce text-stone-400">
          <ChevronDown className="w-6 h-6 mx-auto opacity-70" />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. ORIENTAL PROVERB & BLESSING                           */}
      {/* ======================================================== */}
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden bg-[#160608] border-y border-amber-500/20">
        <RevealOnScroll animation="fade-up">
          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            <ShuangXiOrnament size={56} color="#d4af37" className="mx-auto" />
            <p className="text-xs uppercase font-serif tracking-[0.25em] text-amber-400 font-bold">
              {themeConfig.greeting_title || "BLESSINGS OF DOUBLE HAPPINESS"}
            </p>
            <blockquote className="font-serif italic text-base sm:text-xl text-stone-200 leading-relaxed font-light px-4">
              &ldquo;{data.quote?.text ||
                "May your love grow stronger with each passing year, and may your home be filled with peace, joy, and endless prosperity. 百年偕老，永结同心。"}&rdquo;
            </blockquote>
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-300 font-serif">
              — {data.quote?.source || "Chinese Wedding Blessing"}
            </p>
          </div>
        </RevealOnScroll>
      </section>

      {/* ======================================================== */}
      {/* 5. COUPLE SHOWCASE                                       */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 bg-[#1c080b] relative">
        <div className="max-w-4xl mx-auto space-y-16">
          <RevealOnScroll animation="fade-up">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase font-serif tracking-[0.25em] text-amber-400 font-bold">
                BRIDE &amp; GROOM
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                Mempelai Bahagia
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto">
                Dengan penuh sukacita dan restu dari kedua keluarga besar, kami mengundang Anda untuk hadir:
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {/* Pria */}
            <RevealOnScroll animation="fade-right" delay={100}>
              <div className="p-8 rounded-3xl bg-[#2e0e13]/80 border border-amber-500/30 hover:border-amber-400/60 transition-all text-center space-y-5 group shadow-xl">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full overflow-hidden border-4 border-amber-500/50 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={
                      data.groom.photo_url ||
                      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
                    }
                    alt={data.groom.name}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-amber-200">
                    {data.groom.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold">
                    {data.groom.child_order || "Putra dari"}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-300">
                    {data.groom.father_name} &amp; {data.groom.mother_name}
                  </p>
                </div>

                {data.groom.instagram && (
                  <div className="pt-2">
                    <a
                      href={`https://instagram.com/${data.groom.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-stone-200 transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-amber-300" />
                      <span>@{data.groom.instagram.replace("@", "")}</span>
                    </a>
                  </div>
                )}
              </div>
            </RevealOnScroll>

            {/* Wanita */}
            <RevealOnScroll animation="fade-left" delay={200}>
              <div className="p-8 rounded-3xl bg-[#2e0e13]/80 border border-amber-500/30 hover:border-amber-400/60 transition-all text-center space-y-5 group shadow-xl">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full overflow-hidden border-4 border-amber-500/50 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={
                      data.bride.photo_url ||
                      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                    }
                    alt={data.bride.name}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-amber-200">
                    {data.bride.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold">
                    {data.bride.child_order || "Putri dari"}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-300">
                    {data.bride.father_name} &amp; {data.bride.mother_name}
                  </p>
                </div>

                {data.bride.instagram && (
                  <div className="pt-2">
                    <a
                      href={`https://instagram.com/${data.bride.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-stone-200 transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-amber-300" />
                      <span>@{data.bride.instagram.replace("@", "")}</span>
                    </a>
                  </div>
                )}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. RANGKAIAN ACARA (TEAPAI & RESEPSI)                     */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 bg-[#160608] border-t border-amber-500/20">
        <div className="max-w-4xl mx-auto space-y-14">
          <RevealOnScroll animation="fade-up">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase font-serif tracking-[0.25em] text-amber-400 font-bold">
                CELEBRATION TIMELINE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                Rangkaian Acara
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.events.map((event, idx) => (
              <RevealOnScroll key={idx} animation={idx % 2 === 0 ? "fade-right" : "fade-left"} delay={idx * 150}>
                <div
                  className="p-8 rounded-3xl bg-[#2e0e13]/90 backdrop-blur-xl border border-amber-500/30 hover:border-amber-400/60 transition-all space-y-6 shadow-2xl flex flex-col justify-between h-full"
                >
                  <div className="space-y-4">
                    <div className="inline-block px-3 py-1 rounded-full bg-red-950/80 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-wider uppercase font-serif">
                      {event.title}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5 text-stone-200 text-sm">
                        <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="font-semibold">{formatDate(event.date)}</span>
                      </div>

                      <div className="flex items-center gap-2.5 text-stone-300 text-xs">
                        <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>
                          {event.start_time} - {event.end_time} {event.timezone || "WIB"}
                        </span>
                      </div>

                      <div className="flex items-start gap-2.5 text-stone-300 text-xs pt-1">
                        <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-white">{event.location_name}</p>
                          <p className="text-stone-400 text-[11px] leading-relaxed mt-0.5">
                            {event.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {event.google_maps_url && (
                    <div className="pt-4 border-t border-amber-500/20">
                      <a
                        href={event.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-200 text-xs font-semibold transition-all hover:scale-[1.02]"
                      >
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>Buka Google Maps</span>
                        <ExternalLink className="w-3 h-3 opacity-60 ml-1" />
                      </a>
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. GALERI KENANGAN                                       */}
      {/* ======================================================== */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-24 px-4 sm:px-6 bg-[#1c080b]">
          <div className="max-w-5xl mx-auto space-y-12">
            <RevealOnScroll animation="fade-up">
              <div className="text-center space-y-3">
                <span className="text-xs uppercase font-serif tracking-[0.25em] text-amber-400 font-bold">
                  PORTRAITS OF LOVE
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                  Galeri Kenangan
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {data.gallery.map((imgUrl, i) => (
                <RevealOnScroll key={i} animation="scale-up" delay={i * 80}>
                  <div
                    onClick={() => setSelectedPhoto(imgUrl)}
                    className="relative aspect-4/5 rounded-2xl overflow-hidden cursor-pointer group bg-[#2e0e13] border border-amber-500/20"
                  >
                    <Image
                      src={imgUrl}
                      alt={`Galeri ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-3xl max-h-[85vh] w-full h-full">
            <Image
              src={selectedPhoto}
              alt="Foto Pilihan"
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 8. DIGITAL ANGPAO / ENVELOPE                             */}
      {/* ======================================================== */}
      {data.bank_accounts && data.bank_accounts.length > 0 && (
        <section className="py-20 px-4 sm:px-6 bg-[#160608] border-t border-amber-500/20">
          <div className="max-w-2xl mx-auto">
            <RevealOnScroll animation="fade-up">
              <GiftSection bankAccounts={data.bank_accounts} giftAddress={data.gift_address} />
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 9. RSVP & WISHES                                         */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 bg-[#1c080b] border-t border-amber-500/20">
        <div className="max-w-3xl mx-auto">
          <RevealOnScroll animation="fade-up">
            <RsvpAndWishes
              invitationId={slug}
              defaultGuestName={guestName}
              wishes={wishes}
              onSendWish={onSendWish}
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. PENUTUP                                              */}
      {/* ======================================================== */}
      <footer className="py-16 px-4 text-center space-y-4 bg-[#0d0305] border-t border-amber-500/20 text-stone-400 text-xs">
        <RevealOnScroll animation="fade-up">
          <div className="space-y-4">
            <p className="font-serif italic text-sm text-amber-200">
              Warmest regards and thank you for being part of our story.
            </p>
            <p className="font-serif font-bold text-base text-white">{coupleNames}</p>
            <p className="text-[11px] text-stone-600 pt-4">
              Powered by <span className="font-semibold text-stone-400">Ulemanesia</span> — Undangan Digital Eksklusif
            </p>
          </div>
        </RevealOnScroll>
      </footer>
    </div>
  );
}

