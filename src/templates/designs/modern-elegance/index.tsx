"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, ExternalLink, Instagram, Sparkles, Clock } from "lucide-react";
import { TemplateProps } from "../../types";
import { EnvelopeModal } from "@/components/invitation/EnvelopeModal";
import { FloatingControls } from "@/components/invitation/FloatingControls";
import { RevealOnScroll } from "@/components/invitation/RevealOnScroll";
import { CountdownTimer } from "@/components/invitation/CountdownTimer";
import { RsvpAndWishes } from "@/components/invitation/RsvpAndWishes";
import { GiftSection } from "@/components/invitation/GiftSection";
import { formatDate } from "@/lib/utils";

export default function ModernEleganceTemplate({
  slug,
  guestName,
  title,
  coverImageUrl,
  audioUrl,
  data,
  wishes,
  isPreview = false,
  onSendWish,
}: TemplateProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const coupleNames = `${data.groom.nickname} & ${data.bride.nickname}`;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500/20 selection:text-amber-300 overflow-x-hidden">
      {/* 1. Envelope Gate / Modal */}
      <EnvelopeModal
        title={title}
        coupleNames={coupleNames}
        guestName={guestName}
        eventDate={data.events[0]?.date ? formatDate(data.events[0].date) : undefined}
        coverImageUrl={coverImageUrl || data.gallery[0]}
        onOpen={() => setIsOpened(true)}
      />

      {/* 2. Floating Controls: Audio & Auto-Scroll */}
      <FloatingControls
        audioUrl={audioUrl || data.custom_music_url}
        autoPlayTrigger={isOpened}
        isPreview={isPreview}
      />

      {/* 3. Hero Header Section */}
      <header className="relative min-h-[92vh] flex flex-col items-center justify-center text-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-900 via-stone-950 to-stone-950">
        <div className="max-w-md mx-auto space-y-4 animate-fade-in-up">
          <div className="w-16 h-16 mx-auto rounded-full bg-stone-900 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10 animate-pulse-glow">
            <Sparkles className="w-6 h-6" />
          </div>

          <p className="text-xs uppercase tracking-[0.35em] text-amber-400/80 font-medium">
            The Wedding Celebration of
          </p>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            {coupleNames}
          </h1>

          {data.events[0]?.date && (
            <p className="text-stone-300 font-light text-sm sm:text-base tracking-widest uppercase">
              {formatDate(data.events[0].date)}
            </p>
          )}

          <div className="pt-2 text-stone-900">
            <CountdownTimer targetDate={data.countdown_target} />
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-stone-500 text-xs flex flex-col items-center gap-1 animate-bounce">
          <span>Scroll down</span>
          <span className="w-1 h-3 rounded-full bg-stone-700"></span>
        </div>
      </header>

      {/* 4. Quote Section */}
      {data.quote && (
        <section className="py-14 px-6 max-w-xl mx-auto text-center">
          <RevealOnScroll animation="fade-up">
            <div className="p-8 rounded-3xl bg-stone-900/60 border border-stone-800 backdrop-blur-sm relative">
              <p className="font-serif italic text-stone-200 text-sm sm:text-base leading-relaxed mb-4">
                &ldquo;{data.quote.text}&rdquo;
              </p>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400/80">
                — {data.quote.source}
              </p>
            </div>
          </RevealOnScroll>
        </section>
      )}

      {/* 5. Profil Mempelai */}
      <section className="py-16 px-6 max-w-2xl mx-auto">
        <RevealOnScroll animation="fade-up">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-amber-400/80 font-semibold mb-1">
              With Joy in Our Hearts
            </p>
            <h2 className="text-3xl font-serif font-bold text-white">The Happy Couple</h2>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-8 text-center">
          {/* Groom */}
          <RevealOnScroll animation="fade-right" delay={100}>
            <div className="bg-stone-900/50 border border-stone-800 rounded-3xl p-6 flex flex-col items-center h-full">
              {data.groom.photo_url && (
                <div className="relative w-36 h-36 rounded-full overflow-hidden mb-4 ring-2 ring-amber-500/40">
                  <Image
                    src={data.groom.photo_url}
                    alt={data.groom.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl font-serif font-bold text-white mb-1">
                {data.groom.name}
              </h3>
              <p className="text-xs text-stone-400 mb-2">
                {data.groom.child_order} {data.groom.father_name} &amp; {data.groom.mother_name}
              </p>
              {data.groom.instagram && (
                <a
                  href={`https://instagram.com/${data.groom.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium mt-auto"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{data.groom.instagram}</span>
                </a>
              )}
            </div>
          </RevealOnScroll>

          {/* Bride */}
          <RevealOnScroll animation="fade-left" delay={200}>
            <div className="bg-stone-900/50 border border-stone-800 rounded-3xl p-6 flex flex-col items-center h-full">
              {data.bride.photo_url && (
                <div className="relative w-36 h-36 rounded-full overflow-hidden mb-4 ring-2 ring-amber-500/40">
                  <Image
                    src={data.bride.photo_url}
                    alt={data.bride.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl font-serif font-bold text-white mb-1">
                {data.bride.name}
              </h3>
              <p className="text-xs text-stone-400 mb-2">
                {data.bride.child_order} {data.bride.father_name} &amp; {data.bride.mother_name}
              </p>
              {data.bride.instagram && (
                <a
                  href={`https://instagram.com/${data.bride.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium mt-auto"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{data.bride.instagram}</span>
                </a>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 6. Event Details */}
      <section className="py-16 px-6 max-w-2xl mx-auto">
        <RevealOnScroll animation="fade-up">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-amber-400/80 font-semibold mb-1">
              Where &amp; When
            </p>
            <h2 className="text-3xl font-serif font-bold text-white">Event Schedule</h2>
          </div>
        </RevealOnScroll>

        <div className="space-y-6">
          {data.events.map((evt, idx) => (
            <RevealOnScroll key={idx} animation="fade-up" delay={idx * 150}>
              <div
                className="p-6 sm:p-8 bg-stone-900/70 border border-stone-800 rounded-3xl"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-800">
                  <h3 className="text-xl font-serif font-bold text-white">{evt.title}</h3>
                  <span className="text-xs font-semibold px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
                    Phase {idx + 1}
                  </span>
                </div>

                <div className="space-y-3 text-sm text-stone-300 mb-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>{formatDate(evt.date)}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>
                      {evt.start_time} - {evt.end_time} {evt.timezone || "WIB"}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">{evt.location_name}</p>
                      <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">{evt.address}</p>
                    </div>
                  </div>
                </div>

                {evt.google_maps_url && (
                  <a
                    href={evt.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold rounded-xl transition-all shadow-md"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 7. Gallery (Max 10) */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-16 px-6 max-w-3xl mx-auto">
          <RevealOnScroll animation="fade-up">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest text-amber-400/80 font-semibold mb-1">
                Visual Moments
              </p>
              <h2 className="text-3xl font-serif font-bold text-white">Moments of Love</h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {data.gallery.slice(0, 10).map((url, idx) => (
              <RevealOnScroll key={idx} animation="scale-up" delay={idx * 80}>
                <div
                  onClick={() => setSelectedPhoto(url)}
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group border border-stone-800"
                >
                  <Image
                    src={url}
                    alt={`Gallery photo ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {selectedPhoto && (
            <div
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <div className="relative max-w-3xl max-h-[85vh] w-full h-[70vh]">
                <Image
                  src={selectedPhoto}
                  alt="Full photo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </section>
      )}

      {/* 8. Gifts */}
      <RevealOnScroll animation="fade-up">
        <div className="text-stone-900">
          <GiftSection bankAccounts={data.bank_accounts} giftAddress={data.gift_address} />
        </div>
      </RevealOnScroll>

      {/* 9. RSVP & Wishes */}
      <RevealOnScroll animation="fade-up">
        <div className="text-stone-900">
          <RsvpAndWishes
            invitationId={slug}
            defaultGuestName={guestName}
            wishes={wishes}
            onSendWish={onSendWish}
          />
        </div>
      </RevealOnScroll>

      {/* 10. Footer */}
      <footer className="py-10 px-6 text-center border-t border-stone-800/80 bg-stone-950 text-xs text-stone-500">
        <RevealOnScroll animation="fade-up">
          <div>
            <p className="font-serif font-bold text-stone-200 text-sm mb-1">{coupleNames}</p>
            <p className="mb-4">Thank you for being part of our story.</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-400 text-[11px]">
              <span>Powered by</span>
              <a href="/" className="font-semibold text-amber-400 hover:underline">
                Ulemanesia
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </footer>
    </div>
  );
}

