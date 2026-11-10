"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  CheckCircle,
  HelpCircle,
  XCircle,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  Check,
  Search,
} from "lucide-react";
import { Invitation, Wish } from "@/types/database";
import { formatDate } from "@/lib/utils";

interface Props {
  invitation: Invitation;
  initialWishes: Wish[];
}

export function RsvpManagementClient({ invitation, initialWishes }: Props) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Calculate RSVP Statistics (FR-18)
  let countAttending = 0;
  let totalPaxAttending = 0;
  let countMaybe = 0;
  let totalPaxMaybe = 0;
  let countNotAttending = 0;

  wishes.forEach((w) => {
    if (w.attendance === "attending") {
      countAttending++;
      totalPaxAttending += w.pax || 1;
    } else if (w.attendance === "maybe") {
      countMaybe++;
      totalPaxMaybe += w.pax || 1;
    } else {
      countNotAttending++;
    }
  });

  const totalResponses = wishes.length;

  // Toggle Hide / Unhide Wish
  const handleToggleHide = async (wish: Wish) => {
    try {
      const res = await fetch(`/api/wishes/${wish.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_hidden: !wish.is_hidden }),
      });

      if (res.ok) {
        setWishes((prev) =>
          prev.map((w) => (w.id === wish.id ? { ...w, is_hidden: !w.is_hidden } : w))
        );
      }
    } catch {
      alert("Gagal mengubah status ucapan.");
    }
  };

  // Delete Inappropriate Wish (FR-19)
  const handleDelete = async (wishId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus ucapan ini?")) return;

    try {
      const res = await fetch(`/api/wishes/${wishId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setWishes((prev) => prev.filter((w) => w.id !== wishId));
      } else {
        alert("Gagal menghapus ucapan.");
      }
    } catch {
      alert("Terjadi kesalahan koneksi.");
    }
  };

  // Copy Summary text for WhatsApp report to customer
  const copyRekapToWhatsApp = () => {
    const text = `*REKAP KEHADIRAN & RSVP: ${invitation.title}*\n` +
      `📅 Tanggal: ${formatDate(invitation.event_date, false)}\n\n` +
      `📊 *Statistik Kehadiran:*\n` +
      `• Total Respon: ${totalResponses} tamu\n` +
      `• Hadir: ${countAttending} respon (${totalPaxAttending} orang)\n` +
      `• Masih Ragu: ${countMaybe} respon (${totalPaxMaybe} orang)\n` +
      `• Tidak Hadir: ${countNotAttending} respon\n\n` +
      `_Rekap di-generate otomatis dari sistem Ulemanesia_`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const filteredWishes = wishes.filter((w) => {
    const matchesSearch =
      w.guest_name.toLowerCase().includes(search.toLowerCase()) ||
      w.message.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === "attending") return w.attendance === "attending";
    if (filter === "maybe") return w.attendance === "maybe";
    if (filter === "not_attending") return w.attendance === "not_attending";
    if (filter === "hidden") return w.is_hidden;

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard</span>
        </Link>

        <button
          onClick={copyRekapToWhatsApp}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all self-start sm:self-auto"
        >
          {copiedSummary ? (
            <>
              <Check className="w-4 h-4" />
              <span>Rekap Disalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Salin Rekap untuk WA Customer</span>
            </>
          )}
        </button>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Rekap RSVP &amp; Ucapan (FR-18)
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          {invitation.title} (/{invitation.slug}) · Customer: {invitation.customer_name}
        </p>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Total Respon
            </span>
            <Users className="w-4 h-4 text-stone-500" />
          </div>
          <p className="text-2xl font-bold text-stone-900">{totalResponses}</p>
          <p className="text-[11px] text-stone-400 mt-0.5">Tamu mengirim RSVP</p>
        </div>

        <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Pasti Hadir
            </span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-900">{totalPaxAttending} Orang</p>
          <p className="text-[11px] text-emerald-700 mt-0.5">{countAttending} respon tamu</p>
        </div>

        <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Masih Ragu
            </span>
            <HelpCircle className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-900">{totalPaxMaybe} Orang</p>
          <p className="text-[11px] text-amber-700 mt-0.5">{countMaybe} respon tamu</p>
        </div>

        <div className="p-5 bg-rose-50/60 rounded-2xl border border-rose-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-700">
              Tidak Hadir
            </span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-bold text-rose-900">{countNotAttending}</p>
          <p className="text-[11px] text-rose-700 mt-0.5">Tamu berhalangan</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau pesan..."
            className="w-full pl-10 pr-4 py-2 bg-stone-50 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: "all", label: "Semua" },
            { id: "attending", label: "Hadir" },
            { id: "maybe", label: "Ragu" },
            { id: "not_attending", label: "Tidak Hadir" },
            { id: "hidden", label: "Disembunyikan" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === tab.id
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Wishes Feed List (FR-19 Moderation) */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs divide-y divide-stone-100 overflow-hidden">
        {filteredWishes.length === 0 ? (
          <div className="p-10 text-center text-stone-500 text-sm">
            Tidak ada ucapan yang cocok dengan filter.
          </div>
        ) : (
          filteredWishes.map((w) => (
            <div
              key={w.id}
              className={`p-5 flex flex-col sm:flex-row items-start justify-between gap-4 transition-colors ${
                w.is_hidden ? "bg-stone-50/70 opacity-60" : "hover:bg-stone-50/30"
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-stone-900 text-sm">{w.guest_name}</h4>

                  {w.attendance === "attending" && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                      Hadir ({w.pax} orang)
                    </span>
                  )}
                  {w.attendance === "maybe" && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                      Masih Ragu ({w.pax} orang)
                    </span>
                  )}
                  {w.attendance === "not_attending" && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-medium">
                      Tidak Hadir
                    </span>
                  )}

                  {w.is_hidden && (
                    <span className="text-[10px] px-2 py-0.5 bg-stone-200 text-stone-700 rounded-md font-medium">
                      Disembunyikan dari Publik
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                  {w.message}
                </p>

                <p className="text-[11px] text-stone-400">
                  {new Date(w.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Moderation actions (FR-19) */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => handleToggleHide(w)}
                  title={w.is_hidden ? "Tampilkan kembali di website" : "Sembunyikan dari website"}
                  className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
                >
                  {w.is_hidden ? <Eye className="w-4 h-4 text-stone-900" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleDelete(w.id)}
                  title="Hapus Ucapan Tidak Pantas (FR-19)"
                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

