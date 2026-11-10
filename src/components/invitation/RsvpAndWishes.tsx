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
        // Fallback demo submission
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
        return <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Hadir</span>;
      case "not_attending":
        return <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">Tidak Hadir</span>;
      case "maybe":
        return <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Masih Ragu</span>;
    }
  };

  return (
    <section className="py-12 px-4 max-w-2xl mx-auto space-y-10">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-[#844307] text-xs font-semibold uppercase tracking-wider border border-amber-200/70">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Konfirmasi &amp; Doa Restu</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-stone-900">Buku Tamu &amp; RSVP</h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          Kehadiran dan untaian doa restu Anda merupakan kehormatan &amp; kebahagiaan tak terhingga bagi kami.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {submittedSuccess ? (
          <div className="text-center py-6 space-y-3 animate-fade-in-up">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-xl font-serif font-bold text-stone-900">Terima Kasih Banyak!</h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
              Konfirmasi kehadiran dan ucapan doa restu Anda telah tersimpan dengan indah di buku tamu kami.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSubmittedSuccess(false)}
                className="text-xs text-[#844307] hover:text-[#6d3505] font-semibold underline cursor-pointer"
              >
                Kirim ucapan lainnya
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-[#844307] transition-all bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
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
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      attendance === opt.value
                        ? opt.value === "attending"
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20"
                          : opt.value === "maybe"
                          ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20"
                          : "bg-stone-700 text-white border-stone-700 shadow-md"
                        : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {attendance === "attending" && (
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Jumlah Tamu Hadir
                </label>
                <select
                  value={pax}
                  onChange={(e) => setPax(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-[#844307] transition-all bg-white"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} Orang
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Untaian Doa &amp; Harapan
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan doa restu untuk kedua mempelai..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-[#844307] transition-all resize-none bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isExpired}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#844307] hover:bg-[#6d3505] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-[#844307]/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Mengirim Doa...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Konfirmasi &amp; Doa Restu</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Wishes Stream Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-200">
          <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
            <span>Untaian Doa Tamu</span>
            <span className="text-xs font-sans font-semibold bg-amber-100 text-[#844307] px-2.5 py-0.5 rounded-full">
              {wishesList.length}
            </span>
          </h3>
        </div>

        <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
          {wishesList.length === 0 ? (
            <div className="text-center py-10 bg-stone-50 rounded-2xl border border-stone-200/70">
              <Sparkles className="w-7 h-7 text-amber-500 mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-stone-600">
                Belum ada ucapan. Jadilah yang pertama memberikan doa restu!
              </p>
            </div>
          ) : (
            wishesList.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white border border-stone-200/80 rounded-2xl shadow-xs transition-all hover:shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-sm text-stone-900">{item.guest_name}</h4>
                  {getAttendanceBadge(item.attendance)}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                  {item.message}
                </p>
                <p className="text-[10px] text-stone-400">
                  {new Date(item.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
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
