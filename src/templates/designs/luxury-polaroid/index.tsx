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
  Search,
  ZoomIn,
} from "lucide-react";
import { TemplateProps } from "@/templates/types";
import { Wish } from "@/types/database";

/**
 * Reusable Polaroid Frame Component with Washi Tape, Center Zoom Badge, & Gold Heart Seal
 */
function PolaroidCard({
  src,
  alt,
  caption,
  className = "",
  aspect = "aspect-[4/5]",
  onZoom,
  hasTape = true,
  hasHeart = true,
  showCenterZoomIcon = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  aspect?: string;
  onZoom?: () => void;
  hasTape?: boolean;
  hasHeart?: boolean;
  showCenterZoomIcon?: boolean;
}) {
  const safeSrc =
    src && src.trim() !== ""
      ? src
      : "https://stmoqifvjwlpchfjbcog.supabase.co/storage/v1/object/public/covers/uploads/1794462967675-a7c3fv-prewed-2.webp";

  const numericAspect = aspect.includes("16/10")
    ? "16 / 10"
    : aspect.includes("4/5")
    ? "4 / 5"
    : aspect.includes("4/3")
    ? "4 / 3"
    : aspect.includes("square")
    ? "1 / 1"
    : aspect.includes("video")
    ? "16 / 9"
    : "4 / 5";

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
        className={`relative w-full ${aspect} bg-stone-900 overflow-hidden cursor-pointer group min-h-[160px]`}
        style={{ aspectRatio: numericAspect }}
        onClick={onZoom}
      >
        <Image
          src={safeSrc}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 90vw, 450px"
        />

        {/* Center Zoom Magnifying Badge (matches user's reference Image 8) */}
        {showCenterZoomIcon && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-xs border border-amber-500/50 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
              <Search className="w-4 h-4 text-amber-300" />
            </div>
          </div>
        )}

        {/* Standard Hover overlay if not showCenterZoomIcon */}
        {!showCenterZoomIcon && onZoom && (
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
    const targetDate = new Date(
      data.countdown_target || data.events?.[0]?.date || "2029-12-13T08:00:00+07:00"
    ).getTime();

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
      const dateObj = new Date(data.events?.[0]?.date || "2029-12-13");
      return dateObj
        .toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        .toUpperCase();
    } catch {
      return "KAMIS, 13 DESEMBER 2029";
    }
  })();

  const mainCoupleCover =
    coverImageUrl ||
    data.cover_image_url ||
    data.gallery?.[0] ||
    "https://stmoqifvjwlpchfjbcog.supabase.co/storage/v1/object/public/covers/uploads/1794462967675-a7c3fv-prewed-2.webp";

  const groomPhoto =
    data.groom?.photo_url ||
    "https://stmoqifvjwlpchfjbcog.supabase.co/storage/v1/object/public/covers/uploads/1794463015653-x0oxia-pengantin-pria.webp";

  const bridePhoto =
    data.bride?.photo_url ||
    "https://stmoqifvjwlpchfjbcog.supabase.co/storage/v1/object/public/covers/uploads/1794463075542-0f4o8f-pengantin-wanita.webp";

  const groomNickname = data.groom?.nickname || "Ozy";
  const brideNickname = data.bride?.nickname || "Zelda";
  const groomFullName = data.groom?.name || "Ozy Zulkarnain";
  const brideFullName = data.bride?.name || "Zelda Wulandari";

  const defaultPresetStories = [
    {
      year: "RABU, 12 FEBRUARI 2025",
      title: "Pertemuan Pertama",
      image_url:
        "https://stmoqifvjwlpchfjbcog.supabase.co/storage/v1/object/public/covers/uploads/1794463085574-cghjx0-prewed-3.webp",
      description:
        "Takdir mempertemukan kami untuk pertama kalinya. Dari sebuah pertemuan sederhana, tumbuh rasa nyaman yang tak terduga. Sejak hari itu, kami mulai saling mengenal dan berbagi cerita.",
    },
    {
      year: "SELASA, 25 MARET 2025",
      title: "Menjalin Hubungan",
      image_url:
        "https://stmoqifvjwlpchfjbcog.supabase.co/storage/v1/object/public/covers/uploads/1794463089206-awqzhj-prewed-2.webp",
      description:
        "Hari demi hari kami lewati bersama. Tawa, doa, dan dukungan menjadi bagian dari perjalanan kami. Di tanggal ini, kami resmi berkomitmen untuk berjalan beriringan.",
    },
    {
      year: "SELASA, 10 JUNI 2025",
      title: "Menguatkan Cinta",
      image_url:
        "https://stmoqifvjwlpchfjbcog.supabase.co/storage/v1/object/public/covers/uploads/1794463093599-0m6gtz-prewed-1.webp",
      description:
        "Berbagai tantangan kami hadapi bersama. Dari setiap perbedaan, kami belajar saling memahami. Cinta kami semakin kuat dan penuh makna.",
    },
    {
      year: "SABTU, 20 SEPTEMBER 2025",
      title: "Lamaran 💍",
      image_url:
        "https://stmoqifvjwlpchfjbcog.supabase.co/storage/v1/object/public/covers/uploads/1794463097018-uyxz4f-prewed.webp",
      description:
        "Dengan penuh keyakinan dan cinta, kami melangkah ke tahap yang lebih serius. Disaksikan keluarga tercinta, momen lamaran ini menjadi awal perjalanan menuju hidup bersama.",
    },
  ];

  const storiesList =
    data.stories && data.stories.length > 0 ? data.stories : defaultPresetStories;

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
                alt={`${groomNickname} & ${brideNickname}`}
                aspect="aspect-[4/5]"
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
                {groomNickname} &amp; {brideNickname}
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
              alt={`${groomNickname} & ${brideNickname}`}
              aspect="aspect-[4/5]"
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
              {groomNickname} &amp; {brideNickname}
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
                alt={groomFullName}
                aspect="aspect-[4/5]"
                onZoom={() => setZoomedImage(groomPhoto)}
              />
            </div>

            <div className="space-y-1.5 max-w-sm">
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400/90 font-medium">
                THE GROOM
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                {groomFullName}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Putra dari {data.groom?.father_name || "Bpk. Hendra Wibowo"} &amp; {data.groom?.mother_name || "Ibu Wirda Wahyuni"}
              </p>

              {data.groom?.instagram && (
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
                alt={brideFullName}
                aspect="aspect-[4/5]"
                onZoom={() => setZoomedImage(bridePhoto)}
              />
            </div>

            <div className="space-y-1.5 max-w-sm">
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400/90 font-medium">
                THE BRIDE
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                {brideFullName}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Putri dari {data.bride?.father_name || "Bpk. Daniswara Permadi"} &amp; {data.bride?.mother_name || "Ibu Yuliana Lestari"}
              </p>

              {data.bride?.instagram && (
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
            {(data.events && data.events.length > 0 ? data.events : []).map((evt, idx) => {
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
        {/* SECTION 5: KISAH PERJALANAN CINTA (Images 7, 8, 9, 10)   */}
        {/* ======================================================== */}
        <section id="story" className="space-y-8">
          <div className="text-center space-y-1">
            <p className="text-[10px] tracking-[0.25em] uppercase text-amber-400 font-medium">
              KILAS BALIK
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              CERITA PERJALANAN CINTA
            </h2>
            <div className="w-16 h-px bg-amber-600/40 mx-auto my-3" />
          </div>

          {/* Lead Photo: Couple Sitting Together (Image 7) */}
          <div className="w-64 sm:w-72 mx-auto">
            <PolaroidCard
              src={mainCoupleCover}
              alt="Kilas Balik Perjalanan Cinta"
              aspect="aspect-[4/3]"
              hasTape={true}
              hasHeart={false}
              showCenterZoomIcon={false}
              onZoom={() => setZoomedImage(mainCoupleCover)}
            />
          </div>

          {/* Stories List (Images 8, 9, 10) */}
          <div className="space-y-12 pt-4">
            {storiesList.map((story, idx) => (
              <div key={idx} className="space-y-4 flex flex-col items-center text-center">
                {/* Story Text: Date, Title, Description (Above the Photo, exactly like reference) */}
                <div className="space-y-1.5 max-w-sm px-2">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-amber-400 font-semibold">
                    {story.year}
                  </p>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                    {story.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-stone-300 leading-relaxed font-light">
                    {story.description}
                  </p>
                  <div className="w-12 h-0.5 bg-amber-700/50 my-3 mx-auto" />
                </div>

                {/* Polaroid Photo of Story with Center Zoom Badge (Image 8) */}
                <div className="w-64 sm:w-72">
                  <PolaroidCard
                    src={story.image_url || mainCoupleCover}
                    alt={story.title}
                    aspect="aspect-[16/10]"
                    hasTape={true}
                    hasHeart={false}
                    showCenterZoomIcon={true}
                    onZoom={() => setZoomedImage(story.image_url || mainCoupleCover)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

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
            {(data.gallery && data.gallery.length > 0 ? data.gallery : [mainCoupleCover]).map((photoUrl, idx) => (
              <div
                key={idx}
                className={idx % 2 === 0 ? "rotate-[-1.5deg]" : "rotate-[1.5deg]"}
              >
                <PolaroidCard
                  src={photoUrl}
                  alt={`Momen Bahagia ${idx + 1}`}
                  aspect="aspect-square sm:aspect-[4/5]"
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
            {groomNickname} &amp; {brideNickname}
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
            <div className="relative w-full aspect-[4/5] bg-black min-h-[250px]">
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

