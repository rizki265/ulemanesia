"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TemplateProps } from "@/templates/types";
import { GununganOrnament } from "@/components/invitation/GununganOrnament";
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

export default function JavaneseRoyalTemplate({
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

  const coupleNames = `${data.groom.nickname} & ${data.bride.nickname}`;
  const firstEventDate = data.events[0]?.date ? new Date(data.events[0].date) : new Date();
  const dayStr = String(firstEventDate.getDate()).padStart(2, "0");
  const monthStr = String(firstEventDate.getMonth() + 1).padStart(2, "0");
  const yearStr = String(firstEventDate.getFullYear());
  const dateFormattedDots = `${dayStr} · ${monthStr} · ${yearStr}`;

  // Kunci scroll halaman sebelum cover dibuka
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
    <div className="min-h-screen bg-[#0d0d0f] text-stone-100 font-sans selection:bg-amber-500/20 selection:text-amber-300 relative overflow-x-hidden">
      {/* ======================================================== */}
      {/* 1. COVER SCREEN KHAS ADAT JAWA (Sesuai Contoh Gambar)    */}
      {/* ======================================================== */}
      {!isOpened && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-between px-6 py-10 sm:py-14 bg-[#0d0d0f] transition-all duration-700 ease-in-out select-none overflow-hidden ${
            isClosingCover
              ? "-translate-y-full opacity-0 pointer-events-none"
              : "translate-y-0 opacity-100"
          }`}
        >
          {/* Ornamen Gunungan Sayap Kiri & Kanan (Siluet Wayang) */}
          <div className="absolute -left-12 sm:-left-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none scale-125">
            <GununganOrnament size={130} />
          </div>
          <div className="absolute -right-12 sm:-right-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none scale-125 scale-x-[-1]">
            <GununganOrnament size={130} />
          </div>

          {/* Ambient Gold Glow di latar belakang */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Bagian Atas: Gunungan Wayang Emas Utama */}
          <div className="w-full flex flex-col items-center pt-2 sm:pt-4 z-10 animate-fade-in">
            <div className="relative mb-5 transition-transform hover:scale-105 duration-500">
              <GununganOrnament size={110} />
            </div>

            {/* Sub-judul Emas */}
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-amber-500 font-serif font-medium mb-4">
              Wedding Invitation
            </p>

            {/* Nama Mempelai Kaligrafi Script Putih */}
            <h1 className="font-script text-5xl sm:text-6xl text-white tracking-wide mb-2 drop-shadow-[0_2px_12px_rgba(217,119,6,0.3)]">
              {coupleNames}
            </h1>

            {/* Teks Undangan Elegan */}
            <p className="text-xs sm:text-sm font-serif text-stone-300 font-light tracking-wide text-center max-w-xs">
              We invite you to celebrate our wedding.
            </p>
          </div>

          {/* Bagian Tengah/Bawah: Kotak Tamu, Tanggal, & Tombol Buka Undangan */}
          <div className="w-full max-w-sm flex flex-col items-center space-y-6 z-10 pb-4">
            {/* Kotak Tamu Undangan Pill Gelap Berborder Emas */}
            <div className="w-full px-5 py-3 rounded-full bg-stone-900/90 border border-amber-600/40 text-center shadow-inner">
              <p className="text-[10px] text-amber-400/80 uppercase tracking-widest font-serif mb-0.5">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </p>
              <p className="text-base sm:text-lg font-serif font-bold text-amber-200 truncate">
                {guestName || "Tamu Undangan"}
              </p>
            </div>

            {/* Tanggal dengan Middle Dot Elegan */}
            <div className="text-center">
              <p className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-[0.25em]">
                {dateFormattedDots}
              </p>
            </div>

            {/* Tombol Buka Undangan Khas Adat Jawa */}
            <button
              type="button"
              onClick={handleOpen}
              className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-stone-900 via-amber-950/60 to-stone-900 hover:from-amber-900/80 hover:to-amber-950 text-amber-300 border border-amber-500/50 hover:border-amber-400 rounded-full text-xs sm:text-sm uppercase tracking-[0.2em] font-serif font-semibold shadow-lg shadow-black/80 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MailOpen className="w-4 h-4 text-amber-400" />
              <span>Open Invitation</span>
            </button>

            <p className="text-[10px] text-stone-500 tracking-wider">
              Sentuh tombol untuk membuka undangan &amp; memutar gending
            </p>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. KONTEN UTAMA UNDANGAN ADAT JAWA                       */}
      {/* ======================================================== */}

      {/* Floating Controls: Musik Latar & Auto-Scroll Otomatis */}
      <FloatingControls
        audioUrl={audioUrl || data.custom_music_url}
        autoPlayTrigger={isOpened}
        enableAutoScroll={true}
        isPreview={isPreview}
      />

      {/* Hero Cover Header */}
      <header className="relative min-h-[90vh] flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-[#131317] via-[#0d0d0f] to-[#0d0d0f] border-b border-amber-900/30">
        <div className="max-w-md mx-auto space-y-5 animate-fade-in-up">
          <div className="flex justify-center">
            <GununganOrnament size={80} />
          </div>

          <p className="text-[11px] uppercase tracking-[0.25em] text-amber-500 font-serif">
            Daup Palakrama Adat Jawi
          </p>

          <h1 className="font-script text-5xl sm:text-6xl text-amber-100 drop-shadow-md">
            {coupleNames}
          </h1>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />

          {data.events[0]?.date && (
            <p className="text-sm font-serif text-amber-200/90 tracking-widest uppercase">
              {formatDate(data.events[0].date)}
            </p>
          )}

          <div className="pt-6">
            <ChevronDown className="w-5 h-5 mx-auto text-amber-500/60 animate-bounce" />
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* Doa / Ayat / Falsafah Jawa (Pupuh Kinanthi) */}
        {data.quote && (
          <section className="text-center space-y-4 p-6 sm:p-8 rounded-3xl bg-stone-900/60 border border-amber-600/30 shadow-xl relative overflow-hidden">
            <div className="absolute top-2 left-2 opacity-15">
              <GununganOrnament size={45} />
            </div>
            <div className="absolute top-2 right-2 opacity-15 scale-x-[-1]">
              <GununganOrnament size={45} />
            </div>

            <p className="text-xs uppercase tracking-widest text-amber-400 font-serif">
              Serat Kinanthi
            </p>
            <p className="font-serif italic text-sm sm:text-base text-amber-100/90 leading-relaxed max-w-md mx-auto">
              &ldquo;{data.quote.text}&rdquo;
            </p>
            {data.quote.source && (
              <span className="inline-block text-xs text-amber-400 font-medium">
                — {data.quote.source} —
              </span>
            )}
          </section>
        )}

        {/* Profil Mempelai (Temanten Kakung & Putri) */}
        <section className="space-y-10 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-serif tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Temanten Kekalih</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">
              Kedua Mempelai
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm mx-auto leading-relaxed">
              Kanthi nyenyuwun berkahing Gusti Ingkang Murbeng Dumadi, lumunturing sih wilasa mugi tinampi:
            </p>
          </div>

          <div className="space-y-12">
            {/* Penganten Kakung (Groom) */}
            <div className="p-6 rounded-3xl bg-stone-900/50 border border-amber-600/25 space-y-4">
              {data.groom.photo_url && (
                <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden border-2 border-amber-500 p-1 shadow-lg shadow-amber-950/40">
                  <Image
                    src={data.groom.photo_url}
                    alt={data.groom.name}
                    fill
                    sizes="144px"
                    loading="lazy"
                    className="object-cover rounded-full"
                  />
                </div>
              )}
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-200">
                {data.groom.name}
              </h3>
              <p className="text-xs text-stone-300">
                {data.groom.child_order && `${data.groom.child_order} `}
                <strong className="text-amber-100">{data.groom.father_name}</strong> &amp;{" "}
                <strong className="text-amber-100">{data.groom.mother_name}</strong>
              </p>
              {data.groom.instagram && (
                <a
                  href={`https://instagram.com/${data.groom.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{data.groom.instagram}</span>
                </a>
              )}
            </div>

            {/* Simbol Dan (&) Kaligrafi Emas */}
            <div className="flex items-center justify-center">
              <span className="font-script text-5xl text-amber-400">&amp;</span>
            </div>

            {/* Penganten Putri (Bride) */}
            <div className="p-6 rounded-3xl bg-stone-900/50 border border-amber-600/25 space-y-4">
              {data.bride.photo_url && (
                <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden border-2 border-amber-500 p-1 shadow-lg shadow-amber-950/40">
                  <Image
                    src={data.bride.photo_url}
                    alt={data.bride.name}
                    fill
                    sizes="144px"
                    loading="lazy"
                    className="object-cover rounded-full"
                  />
                </div>
              )}
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-200">
                {data.bride.name}
              </h3>
              <p className="text-xs text-stone-300">
                {data.bride.child_order && `${data.bride.child_order} `}
                <strong className="text-amber-100">{data.bride.father_name}</strong> &amp;{" "}
                <strong className="text-amber-100">{data.bride.mother_name}</strong>
              </p>
              {data.bride.instagram && (
                <a
                  href={`https://instagram.com/${data.bride.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{data.bride.instagram}</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Hitung Mundur Hari Bahagia */}
        {data.countdown_target && (
          <section className="text-center space-y-4 p-8 rounded-3xl bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-600/30">
            <h3 className="text-lg font-serif font-bold text-amber-200">
              Menghitung Hari Bahagia
            </h3>
            <CountdownTimer targetDate={data.countdown_target} />
          </section>
        )}

        {/* Reroncening Adicara (Agenda Acara Pernikahan) */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <p className="text-xs uppercase tracking-widest text-amber-500 font-serif">
              Reroncening Adicara
            </p>
            <h2 className="text-3xl font-serif font-bold text-white">
              Waktu &amp; Tempat Acara
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {data.events.map((evt, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-stone-900/70 border border-amber-600/30 shadow-lg space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-amber-900/30">
                  <h3 className="font-serif font-bold text-xl text-amber-200">
                    {evt.title}
                  </h3>
                  <span className="text-xs text-amber-500 font-mono">
                    {evt.timezone}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-stone-300">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{formatDate(evt.date)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      Pukul {evt.start_time} - {evt.end_time} {evt.timezone}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-amber-100">{evt.location_name}</p>
                      <p className="text-stone-400 text-xs mt-0.5">{evt.address}</p>
                    </div>
                  </div>
                </div>

                {evt.google_maps_url && (
                  <div className="pt-3">
                    <a
                      href={evt.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Petunjuk Lokasi (Google Maps)</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Galeri Prewedding */}
        {data.gallery && data.gallery.length > 0 && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-xs uppercase tracking-widest text-amber-500 font-serif">
                Kintaka Swara
              </p>
              <h2 className="text-3xl font-serif font-bold text-white">
                Galeri Foto
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {data.gallery.map((photo, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPhoto(photo)}
                  className="relative aspect-square rounded-2xl overflow-hidden border border-amber-600/30 cursor-pointer group shadow-md"
                >
                  <Image
                    src={photo}
                    alt={`Galeri ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lightbox Modal Foto */}
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div className="relative max-w-3xl max-h-[90vh] w-full h-[70vh] rounded-2xl overflow-hidden">
              <Image
                src={selectedPhoto}
                alt="Enlarged photo"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain"
              />
            </div>
          </div>
        )}

        {/* Kisah Cinta (Lelakon Katresnan) */}
        {data.stories && data.stories.length > 0 && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-xs uppercase tracking-widest text-amber-500 font-serif">
                Lelakon Katresnan
              </p>
              <h2 className="text-3xl font-serif font-bold text-white">
                Kisah Kami
              </h2>
            </div>

            <div className="space-y-4">
              {data.stories.map((story, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-stone-900/60 border border-amber-600/25 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-amber-600/20 text-amber-300 font-serif text-xs rounded-full border border-amber-500/30">
                      {story.year}
                    </span>
                    <h3 className="font-serif font-bold text-amber-200 text-sm sm:text-base">
                      {story.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {story.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tanda Kasih / Kado Digital */}
        {((data.bank_accounts && data.bank_accounts.length > 0) || data.gift_address) && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-xs uppercase tracking-widest text-amber-500 font-serif">
                Tali Asih
              </p>
              <h2 className="text-3xl font-serif font-bold text-white">
                Tanda Kasih
              </h2>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Doa restu panjenengan sedaya sampun dados kado ingkang paling aji tumrap kula sakanca.
              </p>
            </div>

            <GiftSection bankAccounts={data.bank_accounts} giftAddress={data.gift_address} />
          </section>
        )}

        {/* RSVP & Buku Tamu Ucapan (Donga Pamuji) */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs uppercase tracking-widest text-amber-500 font-serif">
              Donga Pamuji
            </p>
            <h2 className="text-3xl font-serif font-bold text-white">
              Buku Tamu &amp; Ucapan
            </h2>
          </div>

          <RsvpAndWishes
            invitationId={slug}
            defaultGuestName={guestName}
            wishes={wishes}
            onSendWish={onSendWish}
          />
        </section>

        {/* Penutup Adat Jawa */}
        <footer className="pt-12 text-center space-y-4 border-t border-amber-900/30">
          <div className="flex justify-center">
            <GununganOrnament size={65} />
          </div>

          <p className="text-xs sm:text-sm font-serif italic text-amber-100 max-w-sm mx-auto leading-relaxed">
            &ldquo;Matur nuwun sanget awit saking rawuh saha donga pangestunipun panjenengan sedaya.&rdquo;
          </p>

          <p className="text-xs text-stone-500 uppercase tracking-widest">
            Keluarga Besar {data.groom.nickname} &amp; {data.bride.nickname}
          </p>
        </footer>
      </div>
    </div>
  );
}
