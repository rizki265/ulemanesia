"use client";

import React, { useRef, useState, useEffect } from "react";
import { Music, UploadCloud, Play, Pause, Trash2, CheckCircle, Volume2, Sparkles } from "lucide-react";

interface AudioUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
}

const PRESET_MUSIC = [
  {
    name: "Romantic Acoustic Guitar",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-acoustic-guitar-112191.mp3",
    desc: "Petikan gitar akustik syahdu & romantis",
  },
  {
    name: "Soft Cinematic Piano",
    url: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f77c30.mp3?filename=warm-piano-123436.mp3",
    desc: "Alunan piano hangat & mendalam",
  },
  {
    name: "Wedding Serenade Strings",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73561.mp3?filename=wedding-violin-and-piano-10878.mp3",
    desc: "Perpaduan biola & piano klasik agung",
  },
];

export function AudioUploader({
  label,
  value,
  onChange,
  helperText = "Unggah file musik (MP3 / WAV / M4A) dari komputer/HP atau pilih musik preset.",
}: AudioUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [uploading, setUploading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Sync audio src when value changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (value) {
        audioRef.current.src = value;
      }
    }
  }, [value]);

  const togglePlay = () => {
    if (!audioRef.current || !value) return;
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

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      alert("Ukuran file audio maksimal 15MB.");
      return;
    }

    setUploading(true);
    setUploadError("");
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "music");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        // Fallback: Read as base64 Data URL if server upload fails
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            onChange(reader.result);
            setUploadSuccess(true);
          }
        };
        reader.readAsDataURL(file);
      } else {
        onChange(data.url);
        setUploadSuccess(true);
      }
    } catch {
      // Fallback: Read as base64 Data URL
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onChange(reader.result);
          setUploadSuccess(true);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-3">
      {/* Hidden Audio Element for Preview */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        preload="none"
      />

      <label className="block text-xs font-semibold text-stone-800">
        {label}
      </label>

      {/* Main Upload Box */}
      <div className="p-4 sm:p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
        {/* File Picker Button & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#844307] hover:bg-[#6d3505] text-white text-xs font-semibold rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{uploading ? "Mengunggah Musik..." : "Pilih File Musik (MP3 / WAV)"}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/mp3,audio/mpeg,audio/wav,audio/m4a,audio/ogg"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </div>

          {value && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-900 hover:bg-black text-white text-xs font-medium rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-400" />
                    <span>Jeda</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-amber-400" />
                    <span>Putar Preview</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  onChange("");
                  if (audioRef.current) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  }
                }}
                className="p-2 text-stone-400 hover:text-red-600 rounded-xl hover:bg-stone-200/60 transition-colors"
                title="Hapus Musik"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {uploadSuccess && (
          <p className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>File musik berhasil diunggah!</span>
          </p>
        )}

        {/* Audio URL Input */}
        <div>
          <label className="block text-[11px] font-medium text-stone-600 mb-1">
            Atau Tempel Tautan / URL Musik (Opsional):
          </label>
          <input
            type="text"
            placeholder="https://.../musik-pernikahan.mp3"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs text-stone-800 focus:border-[#844307]"
          />
        </div>

        {/* Curated Presets */}
        <div className="pt-2 border-t border-stone-200/70">
          <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Pilihan Musik Romantis Siap Pakai:</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {PRESET_MUSIC.map((preset, i) => {
              const isSelected = value === preset.url;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onChange(preset.url)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    isSelected
                      ? "border-amber-600 bg-amber-50 text-[#844307] font-semibold ring-1 ring-amber-500/30"
                      : "border-stone-200 bg-white hover:bg-stone-100 text-stone-700"
                  }`}
                >
                  <p className="truncate font-medium">{preset.name}</p>
                  <p className="text-[10px] text-stone-500 line-clamp-1">{preset.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-[11px] text-stone-500 leading-relaxed">{helperText}</p>
      </div>
    </div>
  );
}

