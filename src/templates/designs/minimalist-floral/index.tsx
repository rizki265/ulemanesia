"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, ExternalLink, Instagram, Heart, Clock } from "lucide-react";
import { TemplateProps } from "../../types";
import { EnvelopeModal } from "@/components/invitation/EnvelopeModal";
import { FloatingControls } from "@/components/invitation/FloatingControls";
import { RevealOnScroll } from "@/components/invitation/RevealOnScroll";
import { CountdownTimer } from "@/components/invitation/CountdownTimer";
import { RsvpAndWishes } from "@/components/invitation/RsvpAndWishes";
import { GiftSection } from "@/components/invitation/GiftSection";
import { formatDate } from "@/lib/utils";

export default function MinimalistFloralTemplate({
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
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 font-sans selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden">
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
      <header className="relative min-h-[92vh] flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-[#f5ede3] via-[#faf8f5] to-[#faf8f5]">
        <div className="max-w-md mx-auto space-y-4 animate-fade-in-up">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 border border-rose-200/60 flex items-center justify-center text-rose-800 shadow-sm animate-pulse-glow">
            <Heart className="w-7 h-7 fill-rose-500/20 text-rose-600" />
          </div>

          <p className="text-xs uppercase tracking-[0.3em] text-stone-500 font-medium">
            Undangan Pernikahan
          </p>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            {coupleNames}
          </h1>

          {data.events[0]?.date && (
            <p className="text-stone-600 font-medium text-sm sm:text-base tracking-wide">
              {formatDate(data.events[0].date)}
            </p>
          )}

          <div className="pt-2">
            <CountdownTimer targetDate={data.countdown_target} />
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-stone-400 text-xs flex flex-col items-center gap-1 animate-bounce">
          <span>Gulir ke bawah</span>
          <span className="w-1 h-3 rounded-full bg-stone-300"></span>
        </div>
      </header>

      {/* 4. Quote / Ayat Suci */}
      {data.quote && (
        <section className="py-14 px-6 max-w-xl mx-auto text-center">
          <RevealOnScroll animation="fade-up">
            <div className="p-8 rounded-3xl bg-white/70 border border-stone-200/80 shadow-xs relative">
              <p className="font-serif italic text-stone-700 text-sm sm:text-base leading-relaxed mb-4">
                &ldquo;{data.quote.text}&rdquo;
              </p>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                — {data.quote.source}
              </p>
            </div>
          </RevealOnScroll>
        </section>
      )}

      {/* 5. Profil Mempelai (Bride & Groom) */}
      <section className="py-16 px-6 max-w-2xl mx-auto">
        <RevealOnScroll animation="fade-up">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1">
              Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan
            </p>
            <h2 className="text-3xl font-serif font-bold text-stone-900">Kedua Mempelai</h2>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-8 text-center">
          {/* Mempelai Pria */}
          <RevealOnScroll animation="fade-right" delay={100}>
            <div className="bg-white/80 border border-stone-200/80 rounded-3xl p-6 shadow-xs flex flex-col items-center h-full">
              {data.groom.photo_url && (
                <div className="relative w-36 h-36 rounded-full overflow-hidden mb-4 ring-4 ring-rose-100 shadow-md">
                  <Image
                    src={data.groom.photo_url}
                    alt={data.groom.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-1">
                {data.groom.name}
              </h3>
              <p className="text-xs text-stone-500 mb-2">
                {data.groom.child_order} {data.groom.father_name} &amp; {data.groom.mother_name}
              </p>
              {data.groom.instagram && (
                <a
                  href={`https://instagram.com/${data.groom.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-800 font-medium mt-auto"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{data.groom.instagram}</span>
                </a>
              )}
            </div>
          </RevealOnScroll>

          {/* Mempelai Wanita */}
          <RevealOnScroll animation="fade-left" delay={200}>
            <div className="bg-white/80 border border-stone-200/80 rounded-3xl p-6 shadow-xs flex flex-col items-center h-full">
              {data.bride.photo_url && (
                <div className="relative w-36 h-36 rounded-full overflow-hidden mb-4 ring-4 ring-rose-100 shadow-md">
                  <Image
                    src={data.bride.photo_url}
                    alt={data.bride.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-1">
                {data.bride.name}
              </h3>
              <p className="text-xs text-stone-500 mb-2">
                {data.bride.child_order} {data.bride.father_name} &amp; {data.bride.mother_name}
              </p>
              {data.bride.instagram && (
                <a
                  href={`https://instagram.com/${data.bride.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-800 font-medium mt-auto"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{data.bride.instagram}</span>
                </a>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 6. Agenda & Jadwal Acara */}
      <section className="py-16 px-6 max-w-2xl mx-auto">
        <RevealOnScroll animation="fade-up">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1">
              Waktu &amp; Tempat
            </p>
            <h2 className="text-3xl font-serif font-bold text-stone-900">Rangkaian Acara</h2>
          </div>
        </RevealOnScroll>

        <div className="space-y-6">
          {data.events.map((evt, idx) => (
            <RevealOnScroll key={idx} animation="fade-up" delay={idx * 150}>
              <div
                className="p-6 sm:p-8 bg-white/90 border border-stone-200/80 rounded-3xl shadow-xs"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
                  <h3 className="text-xl font-serif font-bold text-stone-900">{evt.title}</h3>
                  <span className="text-xs font-semibold px-3 py-1 bg-rose-50 text-rose-800 rounded-full">
                    Acara #{idx + 1}
                  </span>
                </div>

                <div className="space-y-3 text-sm text-stone-700 mb-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                    <span>{formatDate(evt.date)}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                    <span>
                      Pukul {evt.start_time} - {evt.end_time} {evt.timezone || "WIB"}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-stone-900">{evt.location_name}</p>
                      <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{evt.address}</p>
                    </div>
                  </div>
                </div>

                {evt.google_maps_url && (
                  <a
                    href={evt.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-xl transition-all shadow-xs"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Buka Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  </a>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 7. Galeri Foto (Maksimal 10 Foto - FR-13) */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-16 px-6 max-w-3xl mx-auto">
          <RevealOnScroll animation="fade-up">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1">
                Potret Kebahagiaan
              </p>
              <h2 className="text-3xl font-serif font-bold text-stone-900">Galeri Prewedding</h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {data.gallery.slice(0, 10).map((url, idx) => (
              <RevealOnScroll key={idx} animation="scale-up" delay={idx * 80}>
                <div
                  onClick={() => setSelectedPhoto(url)}
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-xs group"
                >
                  <Image
                    src={url}
                    alt={`Foto Galeri ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedPhoto && (
            <div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <div className="relative max-w-3xl max-h-[85vh] w-full h-[70vh]">
                <Image
                  src={selectedPhoto}
                  alt="Tampilan Foto Penuh"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </section>
      )}

      {/* 8. Cerita Cinta / Stories */}
      {data.stories && data.stories.length > 0 && (
        <section className="py-16 px-6 max-w-xl mx-auto">
          <RevealOnScroll animation="fade-up">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1">
                Kisah Kasih
              </p>
              <h2 className="text-3xl font-serif font-bold text-stone-900">Perjalanan Kami</h2>
            </div>
          </RevealOnScroll>

          <div className="relative border-l-2 border-rose-200 ml-4 sm:ml-6 pl-6 space-y-8">
            {data.stories.map((story, idx) => (
              <RevealOnScroll key={idx} animation="fade-left" delay={idx * 150}>
                <div className="relative">
                  <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-rose-500 border-4 border-[#faf8f5]" />
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md">
                    {story.year}
                  </span>
                  <h4 className="text-base font-serif font-bold text-stone-900 mt-1 mb-1">
                    {story.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {story.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      )}

      {/* 9. Tanda Kasih / Wedding Gift */}
      <RevealOnScroll animation="fade-up">
        <GiftSection bankAccounts={data.bank_accounts} giftAddress={data.gift_address} />
      </RevealOnScroll>

      {/* 10. RSVP & Ucapan */}
      <RevealOnScroll animation="fade-up">
        <RsvpAndWishes
          invitationId={slug}
          defaultGuestName={guestName}
          wishes={wishes}
          onSendWish={onSendWish}
        />
      </RevealOnScroll>

      {/* 11. Footer */}
      <footer className="py-10 px-6 text-center border-t border-stone-200/80 bg-white/50 text-xs text-stone-500">
        <RevealOnScroll animation="fade-up">
          <div>
            <p className="font-serif font-bold text-stone-800 text-sm mb-1">{coupleNames}</p>
            <p className="mb-4">Terima kasih atas segala doa restu dan perhatian Anda.</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-[11px]">
              <span>Dibuat dengan</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>oleh</span>
              <a href="/" className="font-semibold text-rose-700 hover:underline">
                Ulemanesia
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </footer>
    </div>
  );
}

