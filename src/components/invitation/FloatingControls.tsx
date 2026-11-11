"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, ChevronsDown } from "lucide-react";

interface FloatingControlsProps {
  audioUrl?: string | null;
  autoPlayTrigger?: boolean;
  enableAutoScroll?: boolean;
}

export function FloatingControls({
  audioUrl,
  autoPlayTrigger = false,
  enableAutoScroll = true,
}: FloatingControlsProps) {
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-scroll state
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);

  // 1. Audio Management
  useEffect(() => {
    if (!audioUrl) return;

    if (!audioRef.current) {
      const audio = new Audio(audioUrl);
      audio.loop = true;
      audioRef.current = audio;
    } else {
      audioRef.current.src = audioUrl;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [autoPlayTrigger, isPlaying]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Audio play error", e));
    }
  };

  // 2. Smooth Auto-Scroll Engine (38 pixels per second reading pace)
  const SCROLL_SPEED_PX_PER_SEC = 42;

  const stopAutoScroll = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    lastTimestampRef.current = null;
    setIsAutoScrolling(false);
  };

  const startAutoScroll = () => {
    setIsAutoScrolling(true);
    lastTimestampRef.current = null;

    const step = (timestamp: number) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }

      const elapsed = (timestamp - lastTimestampRef.current) / 1000; // in seconds
      lastTimestampRef.current = timestamp;

      // Check if user has reached bottom of document
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (currentScroll >= maxScroll - 5) {
        // Reached the end smoothly
        stopAutoScroll();
        return;
      }

      const pixelsToScroll = SCROLL_SPEED_PX_PER_SEC * elapsed;
      window.scrollBy({
        top: pixelsToScroll,
        left: 0,
        behavior: "auto",
      });

      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);
  };

  const toggleAutoScroll = () => {
    if (isAutoScrolling) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  };

  // Gracefully pause auto-scroll if user interacts manually (wheel, touch, arrow keys)
  useEffect(() => {
    if (!isAutoScrolling) return;

    const handleUserInterrupt = () => {
      stopAutoScroll();
    };

    window.addEventListener("wheel", handleUserInterrupt, { passive: true });
    window.addEventListener("touchstart", handleUserInterrupt, { passive: true });
    window.addEventListener("keydown", handleUserInterrupt);

    return () => {
      window.removeEventListener("wheel", handleUserInterrupt);
      window.removeEventListener("touchstart", handleUserInterrupt);
      window.removeEventListener("keydown", handleUserInterrupt);
    };
  }, [isAutoScrolling]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2.5 select-none pointer-events-auto">
      {/* Auto-Scroll Toggle Button */}
      {enableAutoScroll && (
        <button
          type="button"
          onClick={toggleAutoScroll}
          aria-label={isAutoScrolling ? "Hentikan gulir otomatis" : "Mulai gulir otomatis"}
          className={`group flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold shadow-xl backdrop-blur-md transition-all duration-300 cursor-pointer ${
            isAutoScrolling
              ? "bg-emerald-600/90 text-white border border-emerald-400/50 shadow-emerald-900/40 ring-2 ring-emerald-400/40 scale-105"
              : "bg-black/75 hover:bg-black/90 text-stone-200 hover:text-white border border-white/20 hover:scale-105"
          }`}
          title={isAutoScrolling ? "Sentuh untuk jeda gulir otomatis" : "Mulai gulir otomatis (Hands-free)"}
        >
          {isAutoScrolling ? (
            <>
              <Pause className="w-3.5 h-3.5 text-emerald-200 fill-emerald-200 animate-pulse" />
              <span>Jeda Gulir</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span className="hidden sm:inline">Auto Scroll</span>
              <ChevronsDown className="w-3.5 h-3.5 text-stone-400 group-hover:translate-y-0.5 transition-transform" />
            </>
          )}
        </button>
      )}

      {/* Music Audio Player Toggle Button */}
      {audioUrl && (
        <button
          type="button"
          onClick={toggleAudio}
          aria-label={isPlaying ? "Mute audio" : "Play audio"}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-300 cursor-pointer ${
            isPlaying
              ? "bg-[#844307] text-white border border-amber-400/40 shadow-amber-900/40 ring-2 ring-amber-400/40 animate-spin-slow"
              : "bg-black/75 hover:bg-black/90 text-stone-300 hover:text-white border border-white/20 hover:scale-105"
          }`}
          title={isPlaying ? "Klik untuk mematikan musik" : "Klik untuk memutar musik"}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
          ) : (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400" />
          )}
        </button>
      )}
    </div>
  );
}

