"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, ChevronsDown, ArrowUp } from "lucide-react";

interface FloatingControlsProps {
  audioUrl?: string | null;
  autoPlayTrigger?: boolean;
  enableAutoScroll?: boolean;
  defaultAutoScroll?: boolean;
  isPreview?: boolean;
  speed?: number; // pixels per second
  loop?: boolean; // loop back to top on reaching bottom
}

export function FloatingControls({
  audioUrl,
  autoPlayTrigger = false,
  enableAutoScroll = true,
  defaultAutoScroll,
  isPreview = false,
  speed,
  loop = true,
}: FloatingControlsProps) {
  // Speed calculation: Demo mode is slightly faster (82px/s) for dynamic preview, normal mode is 68px/s
  const effectiveSpeed = speed || (isPreview ? 82 : 68);
  const shouldAutoStart = defaultAutoScroll ?? isPreview;

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-scroll state
  const [isAutoScrolling, setIsAutoScrolling] = useState(shouldAutoStart);
  const [isPaused, setIsPaused] = useState(false);
  const [currentDirection, setCurrentDirection] = useState<"down" | "up">("down");

  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const isAutoScrollingRef = useRef(shouldAutoStart);
  const isPausedRef = useRef(false);
  const scrollDirectionRef = useRef<"down" | "up">("down");
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const loopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);

  // Keep refs synchronized with state
  useEffect(() => {
    isAutoScrollingRef.current = isAutoScrolling;
  }, [isAutoScrolling]);

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

  // 2. Intelligent Auto-Scroll Engine (Bidirectional + Touch Interrupt + Auto-Resume)
  const stopAutoScroll = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    if (loopTimerRef.current) {
      clearTimeout(loopTimerRef.current);
      loopTimerRef.current = null;
    }
    lastTimestampRef.current = null;
    isAutoScrollingRef.current = false;
    isPausedRef.current = false;
    setIsAutoScrolling(false);
    setIsPaused(false);
  };

  const startAutoScroll = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    if (loopTimerRef.current) {
      clearTimeout(loopTimerRef.current);
      loopTimerRef.current = null;
    }

    isAutoScrollingRef.current = true;
    isPausedRef.current = false;
    scrollDirectionRef.current = "down";
    setCurrentDirection("down");
    setIsAutoScrolling(true);
    setIsPaused(false);
    lastTimestampRef.current = null;

    const step = (timestamp: number) => {
      if (!isAutoScrollingRef.current) return;

      // When temporarily paused (by touch or at ends), keep loop alive without moving scroll
      if (isPausedRef.current) {
        lastTimestampRef.current = timestamp;
        animationFrameRef.current = requestAnimationFrame(step);
        return;
      }

      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }

      const elapsed = (timestamp - lastTimestampRef.current) / 1000; // in seconds
      lastTimestampRef.current = timestamp;

      // Clamp elapsed time to prevent massive jumps when switching tabs
      const clampedElapsed = Math.min(elapsed, 0.08);

      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

      if (scrollDirectionRef.current === "down") {
        if (currentScroll >= maxScroll - 6) {
          // Reached bottom
          if (loop) {
            isPausedRef.current = true;
            setIsPaused(true);
            if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
            loopTimerRef.current = setTimeout(() => {
              scrollDirectionRef.current = "up";
              setCurrentDirection("up");
              isPausedRef.current = false;
              setIsPaused(false);
              lastTimestampRef.current = null;
            }, 2200);
          } else {
            stopAutoScroll();
            return;
          }
        } else {
          const pixelsToScroll = effectiveSpeed * clampedElapsed;
          window.scrollBy({ top: pixelsToScroll, left: 0, behavior: "auto" });
        }
      } else {
        // Scrolling up back to top
        if (currentScroll <= 6) {
          // Reached top
          if (loop) {
            isPausedRef.current = true;
            setIsPaused(true);
            if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
            loopTimerRef.current = setTimeout(() => {
              scrollDirectionRef.current = "down";
              setCurrentDirection("down");
              isPausedRef.current = false;
              setIsPaused(false);
              lastTimestampRef.current = null;
            }, 2000);
          } else {
            scrollDirectionRef.current = "down";
            setCurrentDirection("down");
            stopAutoScroll();
            return;
          }
        } else {
          // Returning to top runs at a lively 1.35x speed so animations flow naturally
          const returnSpeed = effectiveSpeed * 1.35;
          const pixelsToScroll = returnSpeed * clampedElapsed;
          window.scrollBy({ top: -pixelsToScroll, left: 0, behavior: "auto" });
        }
      }

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

  // 3. User Touch / Scroll Interaction (Pause on Touch, Auto-Resume on Release)
  useEffect(() => {
    const handleUserTouchStart = (e: Event) => {
      // Don't intercept if clicking inside the floating controls itself
      if (controlsRef.current && controlsRef.current.contains(e.target as Node)) {
        return;
      }
      if (!isAutoScrollingRef.current) return;

      isPausedRef.current = true;
      setIsPaused(true);
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
    };

    const handleUserTouchEnd = (e: Event) => {
      if (controlsRef.current && controlsRef.current.contains(e.target as Node)) {
        return;
      }
      if (!isAutoScrollingRef.current) return;

      // Settle inertial scrolling before resuming smoothly (1.2 seconds)
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
      resumeTimerRef.current = setTimeout(() => {
        isPausedRef.current = false;
        setIsPaused(false);
        lastTimestampRef.current = null;
      }, 1200);
    };

    const handleWheel = (e: Event) => {
      if (controlsRef.current && controlsRef.current.contains(e.target as Node)) {
        return;
      }
      if (!isAutoScrollingRef.current) return;

      isPausedRef.current = true;
      setIsPaused(true);

      // Debounce wheel: resume 1.2s after user stops scrolling with mouse wheel
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
      resumeTimerRef.current = setTimeout(() => {
        isPausedRef.current = false;
        setIsPaused(false);
        lastTimestampRef.current = null;
      }, 1200);
    };

    window.addEventListener("touchstart", handleUserTouchStart, { passive: true });
    window.addEventListener("mousedown", handleUserTouchStart, { passive: true });
    window.addEventListener("touchend", handleUserTouchEnd, { passive: true });
    window.addEventListener("mouseup", handleUserTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleUserTouchEnd, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleUserTouchStart);
      window.removeEventListener("mousedown", handleUserTouchStart);
      window.removeEventListener("touchend", handleUserTouchEnd);
      window.removeEventListener("mouseup", handleUserTouchEnd);
      window.removeEventListener("touchcancel", handleUserTouchEnd);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Auto-start auto-scroll if shouldAutoStart is true (e.g. in demo preview)
  useEffect(() => {
    if (shouldAutoStart && enableAutoScroll) {
      // Small timeout to allow initial render & cover opening transition
      const timer = setTimeout(() => {
        startAutoScroll();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [shouldAutoStart, enableAutoScroll]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
      if (loopTimerRef.current) {
        clearTimeout(loopTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={controlsRef}
      className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2.5 select-none pointer-events-auto"
    >
      {/* Auto-Scroll Toggle Button */}
      {enableAutoScroll && (
        <button
          type="button"
          onClick={toggleAutoScroll}
          aria-label={isAutoScrolling ? "Hentikan gulir otomatis" : "Mulai gulir otomatis"}
          className={`group flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold shadow-xl backdrop-blur-md transition-all duration-300 cursor-pointer ${
            isAutoScrolling
              ? isPaused
                ? "bg-amber-600/90 text-white border border-amber-300/50 shadow-amber-900/40 ring-2 ring-amber-400/40"
                : "bg-emerald-600/90 text-white border border-emerald-400/50 shadow-emerald-900/40 ring-2 ring-emerald-400/40 scale-105"
              : "bg-black/75 hover:bg-black/90 text-stone-200 hover:text-white border border-white/20 hover:scale-105"
          }`}
          title={
            isAutoScrolling
              ? isPaused
                ? "Sentuh layar terdeteksi — gulir akan lanjut otomatis saat dilepas"
                : "Sedang menggulir otomatis (Sentuh layar untuk jeda)"
              : "Mulai gulir otomatis (Hands-free)"
          }
        >
          {isAutoScrolling ? (
            isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
                <span>Dijeda (Lepas HP)</span>
              </>
            ) : currentDirection === "up" ? (
              <>
                <ArrowUp className="w-3.5 h-3.5 text-emerald-200 animate-bounce" />
                <span>Ke Atas</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 text-emerald-200 fill-emerald-200 animate-pulse" />
                <span>Auto Scroll</span>
              </>
            )
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
