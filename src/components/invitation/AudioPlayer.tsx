"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface AudioPlayerProps {
  audioUrl?: string | null;
  autoPlayTrigger?: boolean;
}

export function AudioPlayer({ audioUrl, autoPlayTrigger }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // When autoPlayTrigger changes to true (e.g. envelope opened)
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay was blocked by browser policy until further interaction
          setIsPlaying(false);
        });
    }
  }, [autoPlayTrigger, isPlaying]);

  const togglePlay = () => {
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

  if (!audioUrl) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Mute audio" : "Play audio"}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
          isPlaying
            ? "bg-rose-600 text-white animate-spin-slow ring-4 ring-rose-200"
            : "bg-white text-gray-700 hover:bg-gray-100 ring-2 ring-gray-300"
        }`}
      >
        {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-gray-500" />}
      </button>
    </div>
  );
}

