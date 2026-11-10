"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { compressImageToWebP } from "@/lib/image-compression";

interface ImageUploaderProps {
  label: string;
  bucket?: "covers" | "galleries";
  multiple?: boolean;
  maxFiles?: number;
  value: string | string[];
  onChange: (value: any) => void;
  helperText?: string;
}

export function ImageUploader({
  label,
  bucket = "galleries",
  multiple = false,
  maxFiles = 10,
  value,
  onChange,
  helperText,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);

  // Normalize current values to an array
  const currentUrls: string[] = Array.isArray(value)
    ? value
    : value
    ? [value]
    : [];

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const availableSlots = multiple ? maxFiles - currentUrls.length : 1;
    if (availableSlots <= 0) {
      alert(`Maksimal ${maxFiles} foto telah tercapai.`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, availableSlots);
    setUploading(true);

    const newUrls: string[] = [];

    try {
      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i];
        setUploadStatus(`Mengompresi foto ${i + 1}/${filesToUpload.length}...`);

        // Client-side WebP compression (Target ~300KB)
        const compressedFile = await compressImageToWebP(file, 300, 1600);

        setUploadStatus(`Mengunggah foto ${i + 1}/${filesToUpload.length}...`);

        const formData = new FormData();
        formData.append("file", compressedFile);
        formData.append("bucket", bucket);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          newUrls.push(data.url);
        } else {
          alert(`Gagal mengunggah foto "${file.name}": ${data.error || "Kesalahan server"}`);
        }
      }

      if (newUrls.length > 0) {
        if (multiple) {
          onChange([...currentUrls, ...newUrls]);
        } else {
          onChange(newUrls[0]);
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Terjadi kesalahan saat memproses gambar.");
    } finally {
      setUploading(false);
      setUploadStatus("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = (urlToRemove: string) => {
    if (multiple) {
      onChange(currentUrls.filter((u) => u !== urlToRemove));
    } else {
      onChange("");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
          {label}
        </label>
        {multiple && (
          <span className="text-xs text-stone-500 font-medium">
            {currentUrls.length} / {maxFiles} Foto
          </span>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {/* Upload Drop Zone / Button */}
      {(!multiple && currentUrls.length === 0) || (multiple && currentUrls.length < maxFiles) ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? "border-[#844307] bg-[#faf5ee] scale-[1.01]"
              : "border-stone-200 hover:border-[#c5965a] bg-stone-50/50 hover:bg-white"
          } ${uploading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {uploading ? (
            <div className="flex flex-col items-center justify-center py-2 space-y-2">
              <Loader2 className="w-7 h-7 text-[#844307] animate-spin" />
              <p className="text-xs font-medium text-stone-700">{uploadStatus}</p>
              <p className="text-[11px] text-stone-400">Kompresi WebP otomatis sedang berjalan...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#faf5ee] text-[#844307] flex items-center justify-center">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-stone-800">
                  <span className="text-[#844307] underline">Pilih File Foto</span> atau seret foto ke sini
                </p>
                <p className="text-[11px] text-stone-400">
                  {multiple
                    ? `Dapat memilih hingga ${maxFiles - currentUrls.length} foto sekaligus (JPG, PNG, WebP)`
                    : "Pilih 1 foto (JPG, PNG, WebP)"}
                </p>
              </div>
              <p className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                <span>Otomatis dikompresi ke WebP ~300KB</span>
              </p>
            </div>
          )}
        </div>
      ) : null}

      {/* Previews Grid */}
      {currentUrls.length > 0 && (
        <div className={multiple ? "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3" : "flex items-center gap-3"}>
          {currentUrls.map((url, idx) => (
            <div
              key={idx}
              className={`relative rounded-xl overflow-hidden border border-stone-200 bg-stone-100 group shadow-xs ${
                multiple ? "aspect-square" : "w-32 h-32 shrink-0"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Foto ${idx + 1}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute top-1.5 right-1.5 p-1 bg-red-600/90 hover:bg-red-700 text-white rounded-lg shadow-md transition-all hover:scale-110"
                title="Hapus foto ini"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {!multiple && !uploading && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-32 h-32 shrink-0 border-2 border-dashed border-stone-200 hover:border-[#c5965a] rounded-xl flex flex-col items-center justify-center p-3 text-center text-xs text-stone-500 hover:text-[#844307] bg-stone-50/50 hover:bg-white transition-all cursor-pointer"
            >
              <UploadCloud className="w-5 h-5 mb-1 text-stone-400 group-hover:text-[#844307]" />
              <span className="font-medium text-[11px]">Ganti Foto</span>
            </button>
          )}
        </div>
      )}

      {helperText && <p className="text-[11px] text-stone-400">{helperText}</p>}
    </div>
  );
}
