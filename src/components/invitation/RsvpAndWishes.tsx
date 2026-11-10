"use client";

import React, { useState } from "react";
import { Send, CheckCircle, MessageSquare, Users, Sparkles } from "lucide-react";
import { Wish, RsvpAttendance } from "@/types/database";

interface RsvpAndWishesProps {
  invitationId?: string;
  defaultGuestName?: string;
  wishes: Wish[];
  isExpired?: boolean;
  onSendWish?: (wish: {
    guest_name: string;
    attendance: RsvpAttendance;
    pax: number;
    message: string;
  }) => Promise<{ success: boolean; message?: string }>;
}

export function RsvpAndWishes({
  invitationId,
  defaultGuestName = "",
  wishes: initialWishes,
  isExpired = false,
  onSendWish,
}: RsvpAndWishesProps) {
  const [wishesList, setWishesList] = useState<Wish[]>(initialWishes);
  const [guestName, setGuestName] = useState(defaultGuestName === "Tamu Undangan" ? "" : defaultGuestName);
  const [attendance, setAttendance] = useState<RsvpAttendance>("attending");
  const [pax, setPax] = useState<number>(1);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isExpired) {
      setErrorMessage("Undangan telah kedaluwarsa, tidak dapat mengirim ucapan/RSVP lagi.");
      return;
    }

    if (!guestName.trim()) {
      setErrorMessage("Mohon masukkan nama Anda.");
      return;
    }
    if (!message.trim()) {
      setErrorMessage("Mohon tuliskan pesan atau doa restu Anda.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (onSendWish) {
        const result = await onSendWish({
          guest_name: guestName.trim(),
          attendance,
          pax,
          message: message.trim(),
        });

        if (!result.success) {
          setErrorMessage(result.message || "Gagal mengirim ucapan.");
          setIsSubmitting(false);
          return;
        }
      } else {
        // Fallback or demo client submission
        const newWish: Wish = {
          id: `w-${Date.now()}`,
          invitation_id: invitationId || "demo",
          guest_name: guestName.trim(),
          attendance,
          pax,
          message: message.trim(),
          is_hidden: false,
          created_at: new Date().toISOString(),
        };
        setWishesList((prev) => [newWish, ...prev]);
      }

      // Trigger celebratory confetti dynamically without blocking initial page bundle
      try {
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
        });
      } catch {
        // graceful fallback if canvas-confetti fails to load
      }

      setSubmittedSuccess(true);
      setMessage("");
    } catch {
      setErrorMessage("Terjadi kesalahan sistem saat mengirim ucapan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAttendanceBadge = (status: RsvpAttendance) => {
    switch (status) {
      case "attending":
        return <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Hadir</span>;
      case "not_attending":
        return <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">Tidak Hadir</span>;
      case "maybe":
        return <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Masih Ragu</span>;
    }
  };

  return (
    <section className="py-12 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-800 text-xs font-medium mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Konfirmasi & Doa Restu</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">RSVP & Ucapan</h2>
        <p className="text-sm text-gray-600">
          Kehadiran dan doa restu Anda merupakan kehormatan & kebahagiaan bagi kami.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white/95 backdrop-blur-md border border-rose-100 rounded-3xl p-6 sm:p-8 shadow-xl mb-12">
        {submittedSuccess ? (
          <div className="text-center py-6 animate-fadeIn">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">Terima Kasih!</h3>
            <p className="text-sm text-gray-600 mb-4">
              Konfirmasi kehadiran dan ucapan doa restu Anda telah kami terima.
            </p>
            <button
              onClick={() => setSubmittedSuccess(false)}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium underline"
            >
              Kirim ucapan lainnya
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "attending", label: "Hadir" },
                  { value: "maybe", label: "Ragu-ragu" },
                  { value: "not_attending", label: "Tidak Hadir" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAttendance(opt.value as RsvpAttendance)}
                    className={`py-2 px-2 text-xs font-medium rounded-xl border transition-all ${
                      attendance === opt.value
                        ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {attendance === "attending" && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Jumlah Tamu Hadir
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={pax}
                    onChange={(e) => setPax(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all bg-white"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} Orang
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Pesan & Doa Restu
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan ucapan dan doa untuk kedua mempelai..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isExpired}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-rose-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Mengirim...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Konfirmasi & Doa Restu</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Wishes Feed */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-serif font-bold text-gray-900 flex items-center gap-2">
            <span>Untaian Doa & Ucapan</span>
            <span className="text-xs font-sans font-semibold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
              {wishesList.length}
            </span>
          </h3>
        </div>

        <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
          {wishesList.length === 0 ? (
            <div className="text-center py-10 bg-rose-50/40 rounded-2xl border border-rose-100">
              <Sparkles className="w-8 h-8 text-rose-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Belum ada ucapan. Jadilah yang pertama memberikan doa!</p>
            </div>
          ) : (
            wishesList.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white/90 backdrop-blur-sm border border-rose-50 rounded-2xl shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm text-gray-900">{item.guest_name}</h4>
                  <div className="flex items-center gap-2">
                    {getAttendanceBadge(item.attendance)}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {item.message}
                </p>
                <p className="text-[10px] text-gray-400 mt-2">
                  {new Date(item.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

