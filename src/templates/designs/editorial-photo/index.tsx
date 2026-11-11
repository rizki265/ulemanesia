"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TemplateProps } from "@/templates/types";
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
  Volume2,
  ChevronDown,
} from "lucide-react";

export default function EditorialPhotoTemplate({
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

  const heroPhoto =
    coverImageUrl ||
    data.gallery[0] ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85";

  const coupleNames = `${data.groom.nickname} & ${data.bride.nickname}`;
  const firstEventDate = data.events[0]?.date ? new Date(data.events[0].date) : new Date();

  // Lock body scroll until cover is opened
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
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500/30 selection:text-white relative overflow-x-hidden">
      {/* ======================================================== */}
      {/* 1. COVER SCREEN: FULL PHOTO BACKGROUND DENGAN TEKS OVERLAY */}
      {/* ======================================================== */}
      {!isOpened && (
        <div
          className={`fixed inset-0 z-50 flex flex-col justify-between py-10 px-6 sm:px-10 transition-all duration-700 ease-in-out select-none overflow-hidden ${
            isClosingCover
              ? "-translate-y-full opacity-0 pointer-events-none"
              : "translate-y-0 opacity-100"
          }`}
        >
          {/* Full-bleed Photo Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src={heroPhoto}
              alt={title || coupleNames}
              fill
              priority
              className="object-cover scale-105 animate-pulse-slow"
              sizes="100vw"
            />
            {/* Cinematic Gradient Vignette Overlays for Maximum Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/75" />
          </div>

          {/* Top: Header Tagline */}
          <div className="relative z-10 text-center pt-2 sm:pt-4">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-amber-200 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase shadow-lg">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>THE WEDDING INVITATION</span>
            </div>
          </div>

          {/* Center: Large Romantic Editorial Couple Names */}
          <div className="relative z-10 text-center space-y-4 my-auto py-8">
            <p className="text-xs sm:text-sm font-light uppercase tracking-[0.3em] text-stone-300">
              WE ARE GETTING MARRIED
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none drop-shadow-xl">
              {coupleNames}
            </h1>
            <p className="text-sm sm:text-base font-serif italic text-amber-200/90 tracking-wider">
              {formatDate(firstEventDate.toISOString())}
            </p>
          </div>

          {/* Bottom: Guest Box & Open Button */}
          <div className="relative z-10 w-full max-w-sm mx-auto space-y-4 text-center pb-2 sm:pb-4">
            {/* Guest Pill */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
              <p className="text-[10px] uppercase tracking-widest text-amber-300/90 font-medium mb-1">
                KEPADA YTH. BAPAK/IBU/SAUDARA/I:
              </p>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white capitalize">
                {guestName || "Tamu Undangan"}
              </h3>
              <p className="text-[10px] text-stone-400 italic mt-0.5">
                *Mohon maaf bila ada kesalahan penulisan nama/gelar
              </p>
            </div>

            {/* Buka Undangan CTA Button */}
            <button
              type="button"
              onClick={handleOpen}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-[#844307] hover:from-amber-700 hover:to-[#6d3505] text-white font-semibold text-xs sm:text-sm shadow-xl shadow-amber-900/40 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer ring-2 ring-amber-400/30"
            >
              <MailOpen className="w-4 h-4 text-white" />
              <span>Buka Undangan</span>
            </button>
            <p className="text-[10px] text-stone-300/80 flex items-center justify-center gap-1">
              <Volume2 className="w-3 h-3 text-amber-300" />
              <span>Sentuh untuk membuka undangan &amp; memutar musik</span>
            </p>
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
          enableAutoScroll={true}
        />
      )}

      {/* ======================================================== */}
      {/* 3. HERO PARALLAX BANNER (FULL PHOTO OVERLAY)             */}
      {/* ======================================================== */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden">
        {/* Background Photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroPhoto}
            alt={coupleNames}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-stone-950" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl mx-auto space-y-6 pt-16 pb-12 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs tracking-[0.25em] uppercase font-serif">
            SAVE OUR DATE
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight drop-shadow-md">
            {coupleNames}
          </h2>

          <p className="font-serif italic text-lg sm:text-xl text-amber-200/90">
            {formatDate(firstEventDate.toISOString())}
          </p>

          {/* Minimalist Countdown Timer overlaid on frosted glass */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="p-5 rounded-3xl bg-black/55 backdrop-blur-xl border border-white/15 shadow-2xl">
              <CountdownTimer targetDate={data.countdown_target || firstEventDate.toISOString()} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="relative z-10 pb-6 animate-bounce text-stone-400">
          <ChevronDown className="w-6 h-6 mx-auto opacity-70" />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. QUOTE SECTION OVER PHOTO VIGNETTE                     */}
      {/* ======================================================== */}
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden bg-stone-950">
        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <Heart className="w-8 h-8 text-amber-400 fill-amber-400 mx-auto opacity-80" />
          <blockquote className="font-serif italic text-base sm:text-xl md:text-2xl text-stone-200 leading-relaxed font-light px-4">
            &ldquo;{data.quote?.text ||
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."}&rdquo;
          </blockquote>
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-400 font-serif">
            — {data.quote?.source || "QS. Ar-Rum: 21"}
          </p>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. BRIDE & GROOM PROFILE (EDITORIAL MAGAZINE CARDS)      */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 relative">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-serif tracking-[0.25em] text-amber-400 font-medium">
              PASANGAN MEMPELAI
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Mempelai Bahagia
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto">
              Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan syukuran pernikahan putra-putri kami:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {/* Mempelai Pria */}
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 text-center space-y-5 group shadow-xl">
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
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
                  {data.groom.name}
                </h3>
                <p className="text-xs text-amber-300 font-medium">
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

            {/* Mempelai Wanita */}
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 text-center space-y-5 group shadow-xl">
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
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
                  {data.bride.name}
                </h3>
                <p className="text-xs text-amber-300 font-medium">
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
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. WEDDING EVENTS (AKAD & RESEPSI)                       */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden bg-stone-950">
        {/* Subtle photo background tint */}
        {data.gallery[1] && (
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <Image
              src={data.gallery[1]}
              alt="Events Backdrop"
              fill
              className="object-cover filter blur-xs"
            />
            <div className="absolute inset-0 bg-stone-950/85" />
          </div>
        )}

        <div className="max-w-4xl mx-auto space-y-14 relative z-10">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-serif tracking-[0.25em] text-amber-400 font-medium">
              WAKTU &amp; LOKASI ACARA
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Rangkaian Acara
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.events.map((event, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-stone-900/80 backdrop-blur-xl border border-stone-800 hover:border-amber-500/40 transition-all space-y-6 shadow-2xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase font-serif">
                    {event.title}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-stone-200 text-sm">
                      <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-medium">{formatDate(event.date)}</span>
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
                  <div className="pt-4 border-t border-stone-800">
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
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. PHOTO GALLERY (MASONRY MAGAZINE SHOWCASE)             */}
      {/* ======================================================== */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-24 px-4 sm:px-6 bg-stone-900/50">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase font-serif tracking-[0.25em] text-amber-400 font-medium">
                OUR MOMENTS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                Galeri Kenangan
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
                Setiap foto merangkum cerita, senyum, dan cinta dalam perjalanan menuju hari bahagia kami.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {data.gallery.map((imgUrl, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPhoto(imgUrl)}
                  className="relative aspect-4/5 rounded-2xl overflow-hidden cursor-pointer group bg-stone-950 border border-white/10"
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
      {/* 8. GIFT & DIGITAL ENVELOPE                               */}
      {/* ======================================================== */}
      {data.bank_accounts && data.bank_accounts.length > 0 && (
        <section className="py-20 px-4 sm:px-6 bg-stone-950 border-t border-stone-900">
          <div className="max-w-2xl mx-auto">
            <GiftSection bankAccounts={data.bank_accounts} giftAddress={data.gift_address} />
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 9. RSVP & WISHES GUESTBOOK                               */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 bg-stone-900/60 border-t border-stone-800">
        <div className="max-w-3xl mx-auto">
          <RsvpAndWishes
            invitationId={slug}
            defaultGuestName={guestName}
            wishes={wishes}
            onSendWish={onSendWish}
          />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. CLOSING FOOTER                                       */}
      {/* ======================================================== */}
      <footer className="py-16 px-4 text-center space-y-4 bg-black border-t border-stone-900 text-stone-500 text-xs">
        <p className="font-serif italic text-sm text-stone-300">
          Terima kasih atas doa &amp; restu Anda.
        </p>
        <p className="font-serif font-bold text-base text-amber-300">{coupleNames}</p>
        <p className="text-[11px] text-stone-600 pt-4">
          Powered by <span className="font-semibold text-stone-400">Ulemanesia</span> — Undangan Digital Eksklusif
        </p>
      </footer>
    </div>
  );
}

