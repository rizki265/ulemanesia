"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TemplateProps } from "@/templates/types";
import { BaliOrnament } from "@/components/invitation/BaliOrnament";
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
  Sun,
} from "lucide-react";

export default function BaliBreezeTemplate({
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
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80";

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
    <div className="min-h-screen bg-[#fcf8f2] text-stone-900 font-sans selection:bg-amber-500/20 selection:text-[#844307] relative overflow-x-hidden">
      {/* ======================================================== */}
      {/* 1. COVER SCREEN: BALI SUNSET RESORT LUXE                  */}
      {/* ======================================================== */}
      {!isOpened && (
        <div
          className={`fixed inset-0 z-50 flex flex-col justify-between py-10 px-6 sm:px-10 transition-all duration-700 ease-in-out select-none overflow-hidden ${
            isClosingCover
              ? "-translate-y-full opacity-0 pointer-events-none"
              : "translate-y-0 opacity-100"
          }`}
        >
          {/* Parallax Photo Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src={coverBg}
              alt={title || coupleNames}
              fill
              priority
              className="object-cover scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#291a13]/85 via-[#291a13]/55 to-[#291a13]/90" />
          </div>

          {/* Top: Header Badge */}
          <div className="relative z-10 text-center pt-2">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-amber-200 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase shadow-lg">
              <Sun className="w-3.5 h-3.5 text-amber-300" />
              <span>{themeConfig.cover_tagline || "SENJA KEEMASAN BALI DI TEPI LAUT"}</span>
            </div>
          </div>

          {/* Center: Balinese Ornament & Couple Names */}
          <div className="relative z-10 text-center space-y-4 my-auto py-8">
            <div className="mx-auto flex justify-center mb-1">
              <BaliOrnament size={65} color="#e5c07b" />
            </div>
            <p className="text-xs font-light uppercase tracking-[0.3em] text-stone-200">
              PAWIKAHAN / THE WEDDING OF
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight drop-shadow-xl">
              {coupleNames}
            </h1>
            <p className="text-sm font-serif italic text-amber-200/90 tracking-wider">
              {formatDate(firstEventDate.toISOString())}
            </p>
          </div>

          {/* Bottom: Guest Box & Open Button */}
          <div className="relative z-10 w-full max-w-sm mx-auto space-y-4 text-center pb-2">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
              <p className="text-[10px] uppercase tracking-widest text-amber-300 font-medium mb-1">
                KEPADA YTH. TAMU KEHORMATAN:
              </p>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white capitalize">
                {guestName || "Tamu Undangan"}
              </h3>
            </div>

            <button
              type="button"
              onClick={handleOpen}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#b45309] via-[#873e23] to-[#5a2e05] hover:opacity-95 text-white font-semibold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer ring-2 ring-amber-400/40"
            >
              <MailOpen className="w-4 h-4 text-white" />
              <span>Buka Undangan</span>
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
          isPreview={isPreview}
        />
      )}

      {/* ======================================================== */}
      {/* 3. HERO BANNER: BALI TROPICAL SUNSET                     */}
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#291a13]/85 via-[#291a13]/60 to-[#fcf8f2]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-6 pt-16 pb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-amber-200 text-xs tracking-[0.25em] uppercase font-serif">
            BALI TROPICAL WEDDING
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight drop-shadow-md">
            {coupleNames}
          </h2>

          <p className="font-serif italic text-lg sm:text-xl text-amber-100">
            {formatDate(firstEventDate.toISOString())}
          </p>

          <div className="pt-4 max-w-md mx-auto">
            <div className="p-5 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
              <CountdownTimer targetDate={data.countdown_target || firstEventDate.toISOString()} />
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-6 animate-bounce text-stone-300">
          <ChevronDown className="w-6 h-6 mx-auto opacity-70" />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. BALINESE BLESSINGS & QUOTE                            */}
      {/* ======================================================== */}
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden bg-[#fcf8f2]">
        <RevealOnScroll animation="fade-up">
          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            <BaliOrnament size={56} color="#873e23" className="mx-auto" />
            <p className="text-xs uppercase font-serif tracking-[0.25em] text-[#873e23] font-bold">
              {themeConfig.greeting_title || "OM SWASTYASTU / SALAM HANGAT"}
            </p>
            <blockquote className="font-serif italic text-base sm:text-xl text-stone-700 leading-relaxed font-light px-4">
              &ldquo;{data.quote?.text ||
                "Cinta bukan sekadar saling memandang, melainkan bersama-sama menatap ke arah yang sama, berjalan berdampingan melintasi samudera kehidupan."}&rdquo;
            </blockquote>
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#873e23] font-serif">
              — {data.quote?.source || "Dewata Blessing & Love"}
            </p>
          </div>
        </RevealOnScroll>
      </section>

      {/* ======================================================== */}
      {/* 5. COUPLE SHOWCASE                                       */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 bg-[#f7f0e6] relative">
        <div className="max-w-4xl mx-auto space-y-16">
          <RevealOnScroll animation="fade-up">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase font-serif tracking-[0.25em] text-[#873e23] font-bold">
                SANGRIPTI SANG AHYAR
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight">
                Mempelai Bahagia
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
                Atas asung kerta wara nugraha Ida Sang Hyang Widhi Wasa, kami bermaksud menyatukan hati dalam ikatan suci pernikahan:
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {/* Pria */}
            <RevealOnScroll animation="fade-right" delay={100}>
              <div className="p-8 rounded-3xl bg-white border border-stone-200/80 hover:border-[#873e23]/50 transition-all text-center space-y-5 group shadow-sm hover:shadow-xl">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full overflow-hidden border-4 border-[#873e23]/30 shadow-lg group-hover:scale-105 transition-transform duration-500">
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
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
                    {data.groom.name}
                  </h3>
                  <p className="text-xs text-[#873e23] font-semibold">
                    {data.groom.child_order || "Putra dari"}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600">
                    {data.groom.father_name} &amp; {data.groom.mother_name}
                  </p>
                </div>

                {data.groom.instagram && (
                  <div className="pt-2">
                    <a
                      href={`https://instagram.com/${data.groom.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-xs font-medium text-stone-800 transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#873e23]" />
                      <span>@{data.groom.instagram.replace("@", "")}</span>
                    </a>
                  </div>
                )}
              </div>
            </RevealOnScroll>

            {/* Wanita */}
            <RevealOnScroll animation="fade-left" delay={200}>
              <div className="p-8 rounded-3xl bg-white border border-stone-200/80 hover:border-[#873e23]/50 transition-all text-center space-y-5 group shadow-sm hover:shadow-xl">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full overflow-hidden border-4 border-[#873e23]/30 shadow-lg group-hover:scale-105 transition-transform duration-500">
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
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
                    {data.bride.name}
                  </h3>
                  <p className="text-xs text-[#873e23] font-semibold">
                    {data.bride.child_order || "Putri dari"}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600">
                    {data.bride.father_name} &amp; {data.bride.mother_name}
                  </p>
                </div>

                {data.bride.instagram && (
                  <div className="pt-2">
                    <a
                      href={`https://instagram.com/${data.bride.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-xs font-medium text-stone-800 transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#873e23]" />
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
      {/* 6. RANGKAIAN ACARA (PAWIKAHAN & RESEPSI)                  */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 bg-[#fcf8f2] border-t border-stone-200/80">
        <div className="max-w-4xl mx-auto space-y-14">
          <RevealOnScroll animation="fade-up">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase font-serif tracking-[0.25em] text-[#873e23] font-bold">
                SAVE THE DATE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight">
                Rangkaian Acara
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.events.map((event, idx) => (
              <RevealOnScroll key={idx} animation={idx % 2 === 0 ? "fade-right" : "fade-left"} delay={idx * 150}>
                <div
                  className="p-8 rounded-3xl bg-white border border-stone-200/80 hover:border-[#873e23]/50 transition-all space-y-6 shadow-sm hover:shadow-xl flex flex-col justify-between h-full"
                >
                  <div className="space-y-4">
                    <div className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#873e23] text-xs font-semibold tracking-wider uppercase font-serif">
                      {event.title}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5 text-stone-800 text-sm">
                        <Calendar className="w-4 h-4 text-[#873e23] shrink-0" />
                        <span className="font-semibold">{formatDate(event.date)}</span>
                      </div>

                      <div className="flex items-center gap-2.5 text-stone-600 text-xs">
                        <Clock className="w-4 h-4 text-[#873e23] shrink-0" />
                        <span>
                          {event.start_time} - {event.end_time} {event.timezone || "WITA"}
                        </span>
                      </div>

                      <div className="flex items-start gap-2.5 text-stone-600 text-xs pt-1">
                        <MapPin className="w-4 h-4 text-[#873e23] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-stone-900">{event.location_name}</p>
                          <p className="text-stone-500 text-[11px] leading-relaxed mt-0.5">
                            {event.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {event.google_maps_url && (
                    <div className="pt-4 border-t border-stone-100">
                      <a
                        href={event.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#873e23] hover:bg-[#6e311a] text-white text-xs font-semibold transition-all hover:scale-[1.02] shadow-sm"
                      >
                        <MapPin className="w-3.5 h-3.5" />
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
        <section className="py-24 px-4 sm:px-6 bg-[#f7f0e6]">
          <div className="max-w-5xl mx-auto space-y-12">
            <RevealOnScroll animation="fade-up">
              <div className="text-center space-y-3">
                <span className="text-xs uppercase font-serif tracking-[0.25em] text-[#873e23] font-bold">
                  MOMEN TROPIS
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight">
                  Galeri Kenangan
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {data.gallery.map((imgUrl, i) => (
                <RevealOnScroll key={i} animation="scale-up" delay={i * 80}>
                  <div
                    onClick={() => setSelectedPhoto(imgUrl)}
                    className="relative aspect-4/5 rounded-2xl overflow-hidden cursor-pointer group bg-stone-200 border border-stone-300"
                  >
                    <Image
                      src={imgUrl}
                      alt={`Galeri ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
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
      {/* 8. DIGITAL ENVELOPE                                      */}
      {/* ======================================================== */}
      {data.bank_accounts && data.bank_accounts.length > 0 && (
        <section className="py-20 px-4 sm:px-6 bg-[#fcf8f2] border-t border-stone-200/80">
          <div className="max-w-2xl mx-auto">
            <RevealOnScroll animation="fade-up">
              <GiftSection bankAccounts={data.bank_accounts} giftAddress={data.gift_address} />
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 9. RSVP & DOA RESTU                                      */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 bg-[#f7f0e6] border-t border-stone-200/80">
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
      <footer className="py-16 px-4 text-center space-y-4 bg-[#291a13] text-stone-300 text-xs">
        <RevealOnScroll animation="fade-up">
          <div className="space-y-4">
            <p className="font-serif italic text-sm text-amber-200">
              Matur Suksma atas doa dan restu Anda.
            </p>
            <p className="font-serif font-bold text-base text-white">{coupleNames}</p>
            <p className="text-[11px] text-stone-500 pt-4">
              Powered by <span className="font-semibold text-stone-400">Ulemanesia</span> — Undangan Digital Eksklusif
            </p>
          </div>
        </RevealOnScroll>
      </footer>
    </div>
  );
}

