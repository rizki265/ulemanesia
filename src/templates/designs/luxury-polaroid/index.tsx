"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Volume2,
  VolumeX,
  MailOpen,
  Copy,
  Check,
  CreditCard,
  QrCode,
  Download,
  Eye,
  X,
  MessageCircle,
  Home,
  BookOpen,
  Camera,
  Gift,
  Send,
  Compass,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { TemplateProps } from "@/templates/types";
import { Wish } from "@/types/database";

/**
 * Reusable Polaroid Frame Component with Washi Tape & Gold Heart Badge
 */
function PolaroidCard({
  src,
  alt,
  caption,
  className = "",
  aspect = "aspect-4/5",
  onZoom,
  hasTape = true,
  hasHeart = true,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  aspect?: string;
  onZoom?: () => void;
  hasTape?: boolean;
  hasHeart?: boolean;
}) {
  return (
    <div
      className={`relative bg-white p-3 pb-7 sm:p-3.5 sm:pb-8 shadow-[0_15px_35px_rgba(0,0,0,0.55)] rounded-xs border border-stone-100/90 transition-transform duration-300 hover:scale-[1.02] ${className}`}
    >
      {/* Top Washi Tape */}
      {hasTape && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-4 bg-[#e8d5b5]/85 rounded-xs shadow-xs pointer-events-none z-20 rotate-[-1.5deg]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.03) 4px, rgba(0,0,0,0.03) 8px)",
          }}
        />
      )}

      {/* Photo Frame */}
      <div
        className={`relative w-full ${aspect} bg-stone-900 overflow-hidden cursor-pointer group`}
        onClick={onZoom}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 90vw, 450px"
        />
        {onZoom && (
          <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1.5 backdrop-blur-[1px]">
            <Eye className="w-4 h-4 text-amber-300" />
            <span className="font-medium">Perbesar Foto</span>
          </div>
        )}
      </div>

      {/* Caption if provided */}
      {caption && (
        <p className="mt-2 text-center font-serif text-[11px] text-stone-700 tracking-wider line-clamp-1">
          {caption}
        </p>
      )}

      {/* Bottom Right Golden Heart Seal */}
      {hasHeart && (
        <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-md flex items-center justify-center text-white ring-2 ring-white/95 z-20">
          <Heart className="w-3.5 h-3.5 fill-white text-white" />
        </div>
      )}
    </div>
  );
}

export default function LuxuryPolaroidTemplate({
  slug,
  guestName = "Tamu Undangan",
  title,
  coverImageUrl,
  audioUrl,
  data,
  wishes: initialWishes = [],
  isPreview = false,
  onSendWish,
}: TemplateProps) {
  // Envelope State: In preview mode without envelope flag, start opened
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(isPreview ? false : false);

  // Audio State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Active section for bottom navigation dock
  const [activeNav, setActiveNav] = useState("hero");

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Lightbox Zoom State
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Copy States
  const [copiedAccountIdx, setCopiedAccountIdx] = useState<number | null>(null);

  // Wishes Form State
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [senderName, setSenderName] = useState(guestName !== "Tamu Undangan" ? guestName : "");
  const [attendance, setAttendance] = useState<"attending" | "not_attending" | "maybe">("attending");
  const [wishMessage, setWishMessage] = useState("");
  const [isSendingWish, setIsSendingWish] = useState(false);
  const [wishSuccess, setWishSuccess] = useState(false);

  // Effective Music URL (uses uploaded music or custom or fallback)
  const effectiveAudioUrl =
    audioUrl ||
    data.custom_music_url ||
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-acoustic-guitar-112191.mp3";

  // Audio Initialization
  useEffect(() => {
    if (!effectiveAudioUrl) return;
    const audio = new Audio(effectiveAudioUrl);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [effectiveAudioUrl]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch(() => setIsPlayingAudio(false));
    }
  };

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch(() => console.log("Autoplay blocked"));
    }
  };

  // Real-time Countdown Timer
  useEffect(() => {
    const targetDate = new Date(data.countdown_target || data.events[0]?.date || "2029-12-13T08:00:00+07:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [data.countdown_target, data.events]);

  // Smooth scroll handler for Bottom Navigation
  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Copy Bank Account Number
  const copyAccountNumber = (accNumber: string, idx: number) => {
    navigator.clipboard.writeText(accNumber);
    setCopiedAccountIdx(idx);
    setTimeout(() => setCopiedAccountIdx(null), 2500);
  };

  // Handle Send Wish
  const handleSendWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !wishMessage.trim() || isSendingWish) return;

    setIsSendingWish(true);
    try {
      if (onSendWish) {
        await onSendWish({
          guest_name: senderName,
          attendance,
          pax: 1,
          message: wishMessage,
        });
      } else {
        // Direct API submit fallback
        await fetch("/api/rsvp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invitation_id: slug,
            guest_name: senderName,
            attendance,
            pax: 1,
            message: wishMessage,
          }),
        });
      }

      // Optimistic list update
      const newWish: Wish = {
        id: `temp-${Date.now()}`,
        invitation_id: slug,
        guest_name: senderName,
        attendance,
        pax: 1,
        message: wishMessage,
        is_hidden: false,
        created_at: new Date().toISOString(),
      };
      setWishes([newWish, ...wishes]);
      setWishMessage("");
      setWishSuccess(true);
      setTimeout(() => setWishSuccess(false), 4000);
    } catch {
      alert("Gagal mengirim doa & ucapan. Silakan coba lagi.");
    } finally {
      setIsSendingWish(false);
    }
  };

  // Format Event Date string
  const formattedEventDate = (() => {
    try {
      const dateObj = new Date(data.events[0]?.date || "2029-12-13");
      return dateObj.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).toUpperCase();
    } catch {
      return "KAMIS, 13 DESEMBER 2029";
    }
  })();

  const mainCoupleCover =
    coverImageUrl ||
    data.gallery[0] ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80";

  const groomPhoto =
    data.groom.photo_url ||
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80";

  const bridePhoto =
    data.bride.photo_url ||
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80";

  return (
    <div className="min-h-screen bg-[#120905] text-[#f7eee4] font-sans relative selection:bg-amber-600/30 selection:text-white overflow-x-hidden">
      {/* Ambient Warm Golden Bokeh Lights in Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-amber-700/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-20 left-1/3 w-[500px] h-[500px] bg-[#3a1d0d]/30 rounded-full blur-[150px]" />
      </div>

      {/* ======================================================== */}
      {/* 1. ENVELOPE COVER MODAL (Welcome Screen - Image 1)       */}
      {/* ======================================================== */}
      {!isEnvelopeOpen && (
        <div className="fixed inset-0 z-50 bg-[#120905] flex flex-col items-center justify-center p-4 sm:p-6 text-center select-none overflow-y-auto">
          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c0f08]/90 via-[#120905] to-black/95 pointer-events-none" />

          <div className="relative z-10 w-full max-w-sm mx-auto p-6 sm:p-7 rounded-[32px] bg-gradient-to-b from-[#1d1009]/90 to-[#150a06]/95 border border-amber-600/25 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col items-center space-y-5">
            {/* Polaroid Photo of Couple */}
            <div className="w-56 sm:w-60 transform hover:rotate-1 transition-transform">
              <PolaroidCard
                src={mainCoupleCover}
                alt={`${data.groom.nickname} & ${data.bride.nickname}`}
                aspect="aspect-4/5"
                hasTape={true}
                hasHeart={true}
              />
            </div>

            {/* Typography */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-200/80 font-medium">
                THE WEDDING <span className="font-serif italic lowercase text-xs">of</span>
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
                {data.groom.nickname} &amp; {data.bride.nickname}
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mx-auto my-1.5" />
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-stone-300 font-medium">
                {formattedEventDate}
              </p>
            </div>

            {/* Guest Welcome Card */}
            <div className="w-full py-2.5 px-4 rounded-2xl bg-black/50 border border-amber-500/20 text-center space-y-0.5">
              <p className="text-[9px] uppercase tracking-wider text-amber-400/90 font-medium">
                KEPADA YTH. BAPAK/IBU/SAUDARA/I:
              </p>
              <p className="text-sm font-serif font-bold text-white tracking-wide truncate">
                {guestName}
              </p>
            </div>

            {/* Open Invitation Button */}
            <button
              type="button"
              onClick={handleOpenEnvelope}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#b45309] via-[#d97706] to-[#b45309] hover:from-[#92400e] hover:to-[#d97706] text-white text-xs font-bold uppercase tracking-widest shadow-[0_4px_25px_rgba(217,119,6,0.35)] flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-98 ring-1 ring-amber-300/40"
            >
              <MailOpen className="w-4 h-4 text-white" />
              <span>BUKA UNDANGAN</span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. FLOATING AUDIO BUTTON (Bottom-Left)                   */}
      {/* ======================================================== */}
      {isEnvelopeOpen && (
        <button
          type="button"
          onClick={toggleAudio}
          className="fixed bottom-5 left-4 sm:left-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1e1008]/90 hover:bg-[#2b170c] border border-amber-500/40 text-amber-300 shadow-[0_8px_25px_rgba(0,0,0,0.6)] flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95"
          title={isPlayingAudio ? "Jeda Musik" : "Putar Musik"}
        >
          {isPlayingAudio ? (
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-amber-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
          ) : (
            <VolumeX className="w-5 h-5 text-stone-400" />
          )}
        </button>
      )}

      {/* ======================================================== */}
      {/* 3. FLOATING BOTTOM NAVIGATION DOCK (Bottom-Center)       */}
      {/* "button navigationnya jangan disamping tetapi di bawah"   */}
      {/* ======================================================== */}
      {isEnvelopeOpen && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]">
          <nav className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#1b0e08]/92 backdrop-blur-md border border-amber-500/35 shadow-[0_12px_35px_rgba(0,0,0,0.65)] flex items-center gap-2 sm:gap-3.5 text-stone-300">
            <button
              type="button"
              onClick={() => scrollToSection("hero")}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                activeNav === "hero" ? "bg-amber-600/30 text-amber-300 scale-110" : "hover:text-amber-200"
              }`}
              title="Beranda"
            >
              <Home className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("couple")}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                activeNav === "couple" ? "bg-amber-600/30 text-amber-300 scale-110" : "hover:text-amber-200"
              }`}
              title="Mempelai"
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("events")}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                activeNav === "events" ? "bg-amber-600/30 text-amber-300 scale-110" : "hover:text-amber-200"
              }`}
              title="Rangkaian Acara"
            >
              <Calendar className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("story")}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                activeNav === "story" ? "bg-amber-600/30 text-amber-300 scale-110" : "hover:text-amber-200"
              }`}
              title="Kisah Cinta"
            >
              <BookOpen className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("gallery")}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                activeNav === "gallery" ? "bg-amber-600/30 text-amber-300 scale-110" : "hover:text-amber-200"
              }`}
              title="Galeri Foto"
            >
              <Camera className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("gift")}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                activeNav === "gift" ? "bg-amber-600/30 text-amber-300 scale-110" : "hover:text-amber-200"
              }`}
              title="Amplop Digital"
            >
              <Gift className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("wishes")}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                activeNav === "wishes" ? "bg-amber-600/30 text-amber-300 scale-110" : "hover:text-amber-200"
              }`}
              title="Buku Tamu & Ucapan"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </nav>
        </div>
      )}

      {/* ======================================================== */}
      {/* MAIN INVITATION CONTENT                                  */}
      {/* ======================================================== */}
      <main className="relative z-10 max-w-lg mx-auto pb-28 pt-8 px-4 sm:px-6 space-y-16 sm:space-y-24">
        {/* ======================================================== */}
        {/* SECTION 1: HERO & SAVE THE DATE (Image 2)                */}
        {/* ======================================================== */}
        <section id="hero" className="text-center pt-6 space-y-6 flex flex-col items-center">
          {/* Main Couple Polaroid */}
          <div className="w-64 sm:w-72 mx-auto">
            <PolaroidCard
              src={mainCoupleCover}
              alt={`${data.groom.nickname} & ${data.bride.nickname}`}
              aspect="aspect-4/5"
              hasTape={true}
              hasHeart={true}
              onZoom={() => setZoomedImage(mainCoupleCover)}
            />
          </div>

          {/* Typography */}
          <div className="space-y-1.5 pt-2">
            <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-amber-300 font-medium">
              SAVE <span className="font-serif italic lowercase text-sm sm:text-base">the</span> DATE
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-md">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-300 font-medium">
              {formattedEventDate}
            </p>
          </div>

          {/* Realtime Countdown Timer Card */}
          <div className="w-full max-w-md p-4 sm:p-5 rounded-2xl bg-[#1c0f08]/90 border border-amber-600/30 text-center space-y-3 shadow-lg">
            <div className="flex items-center justify-center gap-1.5 text-amber-300 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>MENGHITUNG HARI BAHAGIA</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 border border-amber-500/20">
                <p className="font-serif text-xl sm:text-2xl font-bold text-amber-200">
                  {timeLeft.days}
                </p>
                <p className="text-[9px] uppercase tracking-wider text-stone-400">Hari</p>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 border border-amber-500/20">
                <p className="font-serif text-xl sm:text-2xl font-bold text-amber-200">
                  {timeLeft.hours}
                </p>
                <p className="text-[9px] uppercase tracking-wider text-stone-400">Jam</p>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 border border-amber-500/20">
                <p className="font-serif text-xl sm:text-2xl font-bold text-amber-200">
                  {timeLeft.minutes}
                </p>
                <p className="text-[9px] uppercase tracking-wider text-stone-400">Menit</p>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 border border-amber-500/20">
                <p className="font-serif text-xl sm:text-2xl font-bold text-amber-200">
                  {timeLeft.seconds}
                </p>
                <p className="text-[9px] uppercase tracking-wider text-stone-400">Detik</p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 2: SURAT AR-RUM 21 / AYAT SUCI (Image 3)         */}
        {/* ======================================================== */}
        <section className="py-6 px-4 text-center space-y-4">
          <div className="text-amber-400/80 font-serif text-4xl leading-none">❝</div>

          {data.quote?.arabic_text && (
            <p className="font-serif text-base sm:text-lg text-amber-200/90 leading-loose text-center dir-rtl">
              {data.quote.arabic_text}
            </p>
          )}

          <blockquote className="font-serif italic text-sm sm:text-base text-stone-200 leading-relaxed font-light max-w-md mx-auto">
            &ldquo;{data.quote?.text ||
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."}&rdquo;
          </blockquote>

          <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mx-auto pt-1" />

          <p className="text-[11px] font-semibold tracking-widest uppercase text-amber-400 font-serif">
            — {data.quote?.source || "QS. AR-RUM: 21"} —
          </p>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: KEDUA MEMPELAI (Images 4 & 5)                 */}
        {/* ======================================================== */}
        <section id="couple" className="space-y-12 sm:space-y-16 text-center">
          <div className="space-y-1">
            <p className="text-[10px] tracking-[0.25em] uppercase text-amber-400 font-medium">
              THE STORY <span className="font-serif italic lowercase text-xs">of</span> LOVE
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              KEDUA MEMPELAI
            </h2>
          </div>

          {/* 1. Mempelai Pria (The Groom) */}
          <div className="space-y-5 flex flex-col items-center">
            <div className="w-56 sm:w-64">
              <PolaroidCard
                src={groomPhoto}
                alt={data.groom.name}
                aspect="aspect-4/5"
                onZoom={() => setZoomedImage(groomPhoto)}
              />
            </div>

            <div className="space-y-1.5 max-w-sm">
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400/90 font-medium">
                THE GROOM
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                {data.groom.name}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Putra dari {data.groom.father_name} &amp; {data.groom.mother_name}
              </p>

              {data.groom.instagram && (
                <div className="pt-2">
                  <a
                    href={`https://instagram.com/${data.groom.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900/80 hover:bg-black border border-amber-500/30 text-amber-300 text-xs font-medium transition-colors"
                  >
                    <span>📷 @{data.groom.instagram.replace("@", "")}</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="font-serif italic text-2xl text-amber-400/60">&amp;</div>

          {/* 2. Mempelai Wanita (The Bride) */}
          <div className="space-y-5 flex flex-col items-center">
            <div className="w-56 sm:w-64">
              <PolaroidCard
                src={bridePhoto}
                alt={data.bride.name}
                aspect="aspect-4/5"
                onZoom={() => setZoomedImage(bridePhoto)}
              />
            </div>

            <div className="space-y-1.5 max-w-sm">
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400/90 font-medium">
                THE BRIDE
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                {data.bride.name}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Putri dari {data.bride.father_name} &amp; {data.bride.mother_name}
              </p>

              {data.bride.instagram && (
                <div className="pt-2">
                  <a
                    href={`https://instagram.com/${data.bride.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900/80 hover:bg-black border border-amber-500/30 text-amber-300 text-xs font-medium transition-colors"
                  >
                    <span>📷 @{data.bride.instagram.replace("@", "")}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 4: RANGKAIAN ACARA (Images 6 & 7)                */}
        {/* ======================================================== */}
        <section id="events" className="space-y-8">
          <div className="text-center space-y-1">
            <p className="text-[10px] tracking-[0.25em] uppercase text-amber-400 font-medium">
              AGENDA PERNIKAHAN
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              RANGKAIAN ACARA
            </h2>
            <p className="text-xs text-stone-400 max-w-xs mx-auto">
              Kehadiran dan doa restu Anda merupakan kehormatan bagi kami
            </p>
          </div>

          <div className="space-y-5">
            {data.events.map((evt, idx) => {
              const eventDateObj = new Date(evt.date);
              const dayNumber = eventDateObj.getDate();
              const monthShort = eventDateObj.toLocaleDateString("id-ID", { month: "short" }).toUpperCase();
              const eventTag = idx === 0 ? "SAKRAL" : idx === 1 ? "SELEBRASI" : "ADAT";

              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-[24px] bg-[#1a0f08]/90 border border-amber-600/30 shadow-lg space-y-4 hover:border-amber-500/50 transition-colors"
                >
                  {/* Top Bar with Date Badge & Title */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-black/60 border border-amber-500/30 flex flex-col items-center justify-center text-center shrink-0">
                      <span className="font-serif font-bold text-base text-amber-300 leading-none">
                        {dayNumber}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-stone-400 font-semibold mt-0.5">
                        {monthShort}
                      </span>
                    </div>

                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[9px] font-bold tracking-wider uppercase border border-amber-500/30 mb-0.5">
                        {eventTag}
                      </span>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                        {evt.title}
                      </h3>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-xs text-stone-300 pt-1 border-t border-amber-500/15">
                    <p className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{evt.start_time} - {evt.end_time} {evt.timezone || "WIB"}</span>
                    </p>

                    <p className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-medium">{evt.location_name}</strong>
                        <span className="text-stone-400 text-[11px] leading-relaxed block">{evt.address}</span>
                      </div>
                    </p>
                  </div>

                  {/* Google Maps Button */}
                  {evt.google_maps_url && (
                    <div className="pt-2">
                      <a
                        href={evt.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#b45309] to-[#d97706] hover:from-[#92400e] hover:to-[#b45309] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-amber-900/20 transition-transform active:scale-98"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>BUKA GOOGLE MAPS</span>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 5: KISAH PERJALANAN CINTA (Images 8, 9, 10)      */}
        {/* ======================================================== */}
        {data.stories && data.stories.length > 0 && (
          <section id="story" className="space-y-8">
            <div className="text-center space-y-1">
              <p className="text-[10px] tracking-[0.25em] uppercase text-amber-400 font-medium">
                KILAS BALIK
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                CERITA PERJALANAN CINTA
              </h2>
            </div>

            <div className="space-y-10">
              {data.stories.map((story, idx) => (
                <div key={idx} className="space-y-4 flex flex-col items-center text-center">
                  {/* Polaroid Photo if available */}
                  {story.image_url ? (
                    <div className="w-60 sm:w-64">
                      <PolaroidCard
                        src={story.image_url}
                        alt={story.title}
                        aspect="aspect-16/10"
                        onZoom={() => setZoomedImage(story.image_url || null)}
                      />
                    </div>
                  ) : (
                    <div className="w-60 sm:w-64">
                      <PolaroidCard
                        src={mainCoupleCover}
                        alt={story.title}
                        aspect="aspect-16/10"
                        onZoom={() => setZoomedImage(mainCoupleCover)}
                      />
                    </div>
                  )}

                  {/* Story Text */}
                  <div className="space-y-1.5 max-w-sm px-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-semibold">
                      {story.year}
                    </p>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                      {story.title}
                    </h3>
                    <p className="text-xs text-stone-300 leading-relaxed font-light">
                      {story.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* SECTION 6: GALERI KENANGAN & VIDEO (Image 11)            */}
        {/* ======================================================== */}
        <section id="gallery" className="space-y-8">
          <div className="text-center space-y-1">
            <p className="text-[10px] tracking-[0.25em] uppercase text-amber-400 font-medium">
              GALERI KENANGAN
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              MOMEN BAHAGIA
            </h2>
          </div>

          {/* Embedded YouTube Video (if provided) */}
          {data.video_url && (
            <div className="rounded-2xl overflow-hidden border border-amber-600/30 aspect-video shadow-2xl bg-black">
              <iframe
                src={
                  data.video_url.includes("youtube.com/watch?v=")
                    ? data.video_url.replace("watch?v=", "embed/")
                    : data.video_url.includes("youtu.be/")
                    ? data.video_url.replace("youtu.be/", "www.youtube.com/embed/")
                    : data.video_url
                }
                title="Video Prewedding"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          )}

          {/* Polaroid Photo Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
            {data.gallery.map((photoUrl, idx) => (
              <div
                key={idx}
                className={idx % 2 === 0 ? "rotate-[-1.5deg]" : "rotate-[1.5deg]"}
              >
                <PolaroidCard
                  src={photoUrl}
                  alt={`Momen Bahagia ${idx + 1}`}
                  aspect="aspect-square sm:aspect-4/5"
                  onZoom={() => setZoomedImage(photoUrl)}
                  hasTape={true}
                  hasHeart={idx === 0}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 7: AMPLOP DIGITAL & KADO (Image 12)              */}
        {/* ======================================================== */}
        <section id="gift" className="space-y-8">
          <div className="text-center space-y-1">
            <p className="text-[10px] tracking-[0.25em] uppercase text-amber-400 font-medium">
              TANDA KASIH
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              AMPLOP DIGITAL
            </h2>
            <p className="text-xs text-stone-400 max-w-xs mx-auto">
              Doa restu Anda merupakan karunia paling berharga. Namun jika berkenan memberikan tanda kasih, dapat melalui:
            </p>
          </div>

          <div className="space-y-4">
            {/* 1. Barcode QRIS Utama (if uploaded) */}
            {data.qris_image_url && (
              <div className="p-6 rounded-[24px] bg-[#1a0f08]/95 border border-amber-600/35 text-center space-y-4 shadow-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>QRIS PEMBAYARAN DIGITAL</span>
                </div>
                <p className="text-xs text-stone-300">
                  Scan melalui BCA Mobile, Livin, BRImo, GoPay, OVO, ShopeePay, DANA, dll:
                </p>

                <div
                  className="w-52 h-52 mx-auto bg-white p-2.5 rounded-2xl shadow-inner relative cursor-pointer group"
                  onClick={() => setZoomedImage(data.qris_image_url || null)}
                >
                  <Image
                    src={data.qris_image_url}
                    alt="QRIS Barcode"
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setZoomedImage(data.qris_image_url || null)}
                    className="px-3.5 py-2 bg-stone-900 hover:bg-black rounded-xl text-xs font-medium text-stone-200 transition-colors cursor-pointer"
                  >
                    Perbesar QR
                  </button>
                  <a
                    href={data.qris_image_url}
                    download="QRIS-Pernikahan.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-[#b45309] hover:bg-[#92400e] text-white rounded-xl text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Simpan QRIS</span>
                  </a>
                </div>
              </div>
            )}

            {/* 2. Bank Accounts */}
            {data.bank_accounts?.map((acc, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-[24px] bg-[#1a0f08]/90 border border-amber-600/30 space-y-3 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-black/60 border border-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider">
                    {acc.bank_name}
                  </span>
                  <Gift className="w-4 h-4 text-amber-400" />
                </div>

                <div>
                  <p className="font-mono text-xl sm:text-2xl font-bold text-white tracking-widest">
                    {acc.account_number}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">a.n. {acc.account_holder}</p>
                </div>

                {acc.qr_code_url && (
                  <div className="pt-1 flex flex-col items-center gap-1">
                    <div
                      className="w-32 h-32 bg-white p-2 rounded-xl relative cursor-pointer"
                      onClick={() => setZoomedImage(acc.qr_code_url || null)}
                    >
                      <Image
                        src={acc.qr_code_url}
                        alt={`QR ${acc.bank_name}`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => copyAccountNumber(acc.account_number, idx)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#b45309] to-[#d97706] hover:from-[#92400e] hover:to-[#b45309] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-98 cursor-pointer"
                >
                  {copiedAccountIdx === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>NO. REKENING BERHASIL DISALIN!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white" />
                      <span>SALIN NO. REKENING</span>
                    </>
                  )}
                </button>
              </div>
            ))}

            {/* 3. Physical Gift Address (if provided) */}
            {data.gift_address && (
              <div className="p-5 rounded-[24px] bg-[#1a0f08]/90 border border-amber-600/30 space-y-2.5 shadow-md">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>KIRIM KADO FISIK</span>
                </div>
                <p className="text-xs text-white font-medium">
                  Penerima: {data.gift_address.recipient_name} ({data.gift_address.phone})
                </p>
                <p className="text-xs text-stone-400 leading-relaxed bg-black/40 p-3 rounded-xl border border-amber-500/20">
                  {data.gift_address.address}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 8: BUKU TAMU & DOA RESTU (Images 13 & 14)        */}
        {/* ======================================================== */}
        <section id="wishes" className="space-y-8">
          <div className="text-center space-y-1">
            <p className="text-[10px] tracking-[0.25em] uppercase text-amber-400 font-medium">
              KONFIRMASI KEHADIRAN
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              BUKU TAMU &amp; DOA RESTU
            </h2>
          </div>

          {/* RSVP Form */}
          <form
            onSubmit={handleSendWishSubmit}
            className="p-5 sm:p-6 rounded-[24px] bg-[#1a0f08]/95 border border-amber-600/30 space-y-4 shadow-xl"
          >
            <div>
              <label className="block text-[11px] font-semibold text-amber-300 uppercase tracking-wider mb-1">
                NAMA ANDA
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Khusus Tamu Undangan"
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/25 bg-black/50 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-amber-300 uppercase tracking-wider mb-1">
                KONFIRMASI KEHADIRAN
              </label>
              <select
                value={attendance}
                onChange={(e) =>
                  setAttendance(e.target.value as "attending" | "not_attending" | "maybe")
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/25 bg-black/50 text-xs text-white focus:outline-hidden focus:border-amber-400"
              >
                <option value="attending" className="bg-stone-900 text-white">
                  Hadir
                </option>
                <option value="not_attending" className="bg-stone-900 text-white">
                  Tidak Hadir
                </option>
                <option value="maybe" className="bg-stone-900 text-white">
                  Masih Ragu / Belum Pasti
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-amber-300 uppercase tracking-wider mb-1">
                DOA &amp; PESAN HANGAT
              </label>
              <textarea
                rows={3}
                required
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                placeholder="Tuliskan ucapan dan doa terbaik Anda..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/25 bg-black/50 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSendingWish}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#b45309] to-[#d97706] hover:from-[#92400e] hover:to-[#b45309] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSendingWish ? "MENGIRIM DOA..." : "KIRIM DOA & UCAPAN"}</span>
            </button>

            {wishSuccess && (
              <p className="text-xs text-emerald-400 text-center font-medium pt-1">
                ✨ Terima kasih! Doa dan restu Anda berhasil disampaikan.
              </p>
            )}
          </form>

          {/* List of Wishes */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs text-amber-300/90 font-semibold uppercase tracking-wider px-1">
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>DOA RESTU SAHABAT &amp; KELUARGA</span>
              </span>
              <span className="text-[11px] text-stone-400 font-mono">
                {wishes.length} UCAPAN
              </span>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {wishes.map((w, idx) => (
                <div
                  key={w.id || idx}
                  className="p-4 rounded-2xl bg-[#1a0f08]/85 border border-amber-600/20 space-y-1.5 text-xs shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-white font-medium text-xs">
                      {w.guest_name}
                    </strong>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        w.attendance === "attending"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : w.attendance === "not_attending"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {w.attendance === "attending"
                        ? "Hadir"
                        : w.attendance === "not_attending"
                        ? "Tidak Hadir"
                        : "Belum Pasti"}
                    </span>
                  </div>

                  <p className="text-stone-300 leading-relaxed font-light">
                    {w.message}
                  </p>
                </div>
              ))}

              {wishes.length === 0 && (
                <p className="text-xs text-stone-500 text-center py-6">
                  Jadilah yang pertama memberikan doa dan restu hangat untuk kedua mempelai.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* CLOSING FOOTER (Image 14)                                */}
        {/* ======================================================== */}
        <footer className="text-center pt-8 space-y-3 pb-8 border-t border-amber-500/20">
          <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400">
            TERIMA KASIH ATAS DOA RESTU BAPAK/IBU/SAUDARA/I
          </p>
          <p className="font-serif italic text-2xl sm:text-3xl text-amber-400">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </p>
          <p className="text-[10px] text-stone-500 pt-3">
            Made with love by{" "}
            <span className="text-amber-400/90 font-medium">Ulemanesia</span>
          </p>
        </footer>
      </main>

      {/* ======================================================== */}
      {/* LIGHTBOX PHOTO MODAL                                     */}
      {/* ======================================================== */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="relative max-w-sm sm:max-w-md w-full bg-white p-3 pb-6 rounded-xs shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomedImage(null)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-stone-900 text-white hover:bg-black z-30"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative w-full aspect-4/5 bg-black">
              <Image
                src={zoomedImage}
                alt="Zoomed Photo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

