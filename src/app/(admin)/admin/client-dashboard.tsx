"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  MessageCircle,
  CalendarPlus,
  Share2,
  Trash2,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertTriangle,
  Copy,
  Check,
  Send,
  X,
} from "lucide-react";
import { Invitation } from "@/types/database";
import { getInvitationLifecycle, formatDate, formatRupiah } from "@/lib/utils";
import { getWhatsAppExpiryReminderUrl } from "@/lib/whatsapp";
import { EXTENSION_FEE_PER_MONTH } from "@/lib/constants";

interface Props {
  initialInvitations: Invitation[];
  onExtend: (id: string) => Promise<{ success: boolean; message?: string }>;
  onPublish: (id: string) => Promise<{ success: boolean; message?: string }>;
  onDelete: (id: string) => Promise<{ success: boolean; message?: string }>;
}

export function AdminDashboardClient({
  initialInvitations,
  onExtend,
  onPublish,
  onDelete,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState<string>("all");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Guest Link Generator Modal State (FR-20)
  const [selectedInvForGuestLink, setSelectedInvForGuestLink] = useState<Invitation | null>(null);
  const [guestInputName, setGuestInputName] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Compute Metrics
  let totalActive = 0;
  let totalExpiringSoon = 0;
  let totalGracePeriod = 0;
  let totalReadyDelete = 0;

  initialInvitations.forEach((inv) => {
    const lifecycle = getInvitationLifecycle(inv.status, inv.expires_at);
    if (lifecycle.state === "active") totalActive++;
    if (lifecycle.state === "expiring_soon") totalExpiringSoon++;
    if (lifecycle.state === "grace_period") totalGracePeriod++;
    if (lifecycle.state === "ready_for_deletion") totalReadyDelete++;
  });

  const filteredInvitations = initialInvitations.filter((inv) => {
    const matchesSearch =
      inv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.slug.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterState === "all") return true;
    const lifecycle = getInvitationLifecycle(inv.status, inv.expires_at);
    if (filterState === "active") return lifecycle.state === "active";
    if (filterState === "warning") return lifecycle.state === "expiring_soon";
    if (filterState === "grace") return lifecycle.state === "grace_period" || lifecycle.state === "ready_for_deletion";
    if (filterState === "draft") return inv.status === "draft";

    return true;
  });

  const handleExtend = async (inv: Invitation) => {
    if (!confirm(`Tambah masa aktif 1 bulan untuk "${inv.title}"? Biaya Rp50.000 telah dikonfirmasi via WhatsApp.`)) {
      return;
    }
    setLoadingId(inv.id);
    await onExtend(inv.id);
    setLoadingId(null);
  };

  const handlePublish = async (inv: Invitation) => {
    if (!confirm(`Publikasikan undangan "${inv.title}"? Masa aktif 3 bulan akan mulai dihitung.`)) {
      return;
    }
    setLoadingId(inv.id);
    await onPublish(inv.id);
    setLoadingId(null);
  };

  const handleDelete = async (inv: Invitation) => {
    if (
      !confirm(
        `PERINGATAN: Apakah Anda yakin ingin menghapus permanen undangan "${inv.title}" beserta seluruh foto galeri dan ucapannya? Tindakan ini tidak dapat dibatalkan.`
      )
    ) {
      return;
    }
    setLoadingId(inv.id);
    await onDelete(inv.id);
    setLoadingId(null);
  };

  // Generate Guest URL (FR-20)
  const getGeneratedGuestUrl = () => {
    if (!selectedInvForGuestLink) return "";
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://ulemanesia.com";
    if (!guestInputName.trim()) {
      return `${baseUrl}/${selectedInvForGuestLink.slug}`;
    }
    const cleanGuestSlug = guestInputName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");
    return `${baseUrl}/${selectedInvForGuestLink.slug}/${cleanGuestSlug}`;
  };

  const copyGuestUrl = () => {
    const url = getGeneratedGuestUrl();
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Aktif Normal
            </span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-stone-900">{totalActive}</p>
          <p className="text-[11px] text-stone-400 mt-0.5">&gt; 14 hari tersisa</p>
        </div>

        <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Segera Berakhir
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-900">{totalExpiringSoon}</p>
          <p className="text-[11px] text-amber-600 mt-0.5">&le; 14 hari tersisa (Kirim WA)</p>
        </div>

        <div className="p-5 bg-orange-50/60 rounded-2xl border border-orange-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-700">
              Masa Tenggang
            </span>
            <Clock className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-900">{totalGracePeriod}</p>
          <p className="text-[11px] text-orange-600 mt-0.5">&le; 15 hari pasca expired</p>
        </div>

        <div className="p-5 bg-red-50/60 rounded-2xl border border-red-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-700">
              Batas Hapus
            </span>
            <Trash2 className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-900">{totalReadyDelete}</p>
          <p className="text-[11px] text-red-600 mt-0.5">&gt; 15 hari (Siap Hapus Data)</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari customer, judul, atau slug..."
            className="w-full pl-10 pr-4 py-2 bg-stone-50 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: "all", label: "Semua" },
            { id: "active", label: "Aktif" },
            { id: "warning", label: "Segera Berakhir" },
            { id: "grace", label: "Kedaluwarsa/Tenggang" },
            { id: "draft", label: "Draft" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterState(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterState === tab.id
                  ? "bg-stone-900 text-white shadow-xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table / List */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden">
        {filteredInvitations.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Clock className="w-10 h-10 text-stone-300 mx-auto" />
            <p className="text-sm font-medium text-stone-700">Tidak ada undangan yang cocok.</p>
            <p className="text-xs text-stone-400">
              Gunakan tombol &quot;Buat Undangan Baru&quot; di atas untuk menambahkan pesanan pertama.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200/80 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                  <th className="py-3.5 px-4">Customer &amp; Acara</th>
                  <th className="py-3.5 px-4">Template &amp; Slug</th>
                  <th className="py-3.5 px-4">Status &amp; Masa Aktif</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredInvitations.map((inv) => {
                  const lifecycle = getInvitationLifecycle(inv.status, inv.expires_at);
                  const isActionLoading = loadingId === inv.id;

                  // WhatsApp reminder url (FR-12)
                  const waReminderUrl = getWhatsAppExpiryReminderUrl(
                    inv.customer_phone,
                    inv.customer_name,
                    inv.title,
                    lifecycle.state === "grace_period" || lifecycle.state === "ready_for_deletion"
                      ? lifecycle.graceDaysRemaining
                      : lifecycle.daysRemaining,
                    lifecycle.state === "grace_period" || lifecycle.state === "ready_for_deletion"
                  );

                  return (
                    <tr key={inv.id} className="hover:bg-stone-50/50 transition-colors">
                      {/* Customer & Event Info */}
                      <td className="py-4 px-4 align-top">
                        <div className="font-semibold text-stone-900 text-sm">{inv.title}</div>
                        <div className="text-stone-600 text-xs mt-0.5">
                          {inv.customer_name} ({inv.customer_phone})
                        </div>
                        <div className="text-stone-400 text-[11px] mt-0.5">
                          Acara: {formatDate(inv.event_date, false)}
                        </div>
                      </td>

                      {/* Template & Slug */}
                      <td className="py-4 px-4 align-top">
                        <span className="inline-block px-2 py-0.5 bg-stone-100 rounded text-[11px] font-medium text-stone-700 mb-1">
                          {inv.template_key}
                        </span>
                        <div>
                          <a
                            href={`/${inv.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-mono hover:underline"
                          >
                            <span>/{inv.slug}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </td>

                      {/* Status & Expiry Lifecycle */}
                      <td className="py-4 px-4 align-top">
                        <div className="space-y-1">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full border font-medium ${lifecycle.badgeColor}`}
                          >
                            {lifecycle.label}
                          </span>

                          {inv.expires_at && (
                            <div className="text-[11px] text-stone-400">
                              Batas: {formatDate(inv.expires_at, false)}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 align-top text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          {/* FR-20: Pembuat Link per Tamu */}
                          <button
                            onClick={() => {
                              setSelectedInvForGuestLink(inv);
                              setGuestInputName("");
                              setCopiedLink(false);
                            }}
                            title="Buat Link Tamu Personal"
                            className="p-1.5 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>

                          {/* FR-12: WhatsApp Pengingat */}
                          {(lifecycle.state === "expiring_soon" ||
                            lifecycle.state === "grace_period" ||
                            lifecycle.state === "ready_for_deletion") && (
                            <a
                              href={waReminderUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Kirim Pengingat WhatsApp ke Customer"
                              className="p-1.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          )}

                          {/* FR-16: Publish button if draft */}
                          {inv.status === "draft" && (
                            <button
                              disabled={isActionLoading}
                              onClick={() => handlePublish(inv)}
                              className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-xs"
                            >
                              Publish (3 Bln)
                            </button>
                          )}

                          {/* FR-17: Tambah Masa Aktif (+1 month) */}
                          {inv.status !== "draft" && (
                            <button
                              disabled={isActionLoading}
                              onClick={() => handleExtend(inv)}
                              title={`Perpanjang 1 Bulan (${formatRupiah(EXTENSION_FEE_PER_MONTH)})`}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors shadow-xs"
                            >
                              <CalendarPlus className="w-3.5 h-3.5" />
                              <span>+1 Bln</span>
                            </button>
                          )}

                          {/* FR-19: Hapus Undangan */}
                          <button
                            disabled={isActionLoading}
                            onClick={() => handleDelete(inv)}
                            title="Hapus Undangan Permanen"
                            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Guest Link Modal (FR-20) */}
      {selectedInvForGuestLink && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Pembuat Link Tamu Personal (FR-20)
                </h3>
                <p className="text-xs text-stone-500">
                  {selectedInvForGuestLink.title}
                </p>
              </div>
              <button
                onClick={() => setSelectedInvForGuestLink(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Nama Tamu Undangan
                </label>
                <input
                  type="text"
                  value={guestInputName}
                  onChange={(e) => setGuestInputName(e.target.value)}
                  placeholder="Contoh: Budi Santoso atau Bpk. Hendro & Keluarga"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  *Sesuai BRD FR-20: Daftar nama tamu tidak disimpan ke database.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Link Siap Dibagikan
                </label>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs font-mono text-stone-800 break-all">
                  {getGeneratedGuestUrl()}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={copyGuestUrl}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs rounded-xl shadow-xs transition-all"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Link Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Link Tamu</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Kepada Yth. ${guestInputName || "Tamu Undangan"},\n\nTanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.\n\nDetail undangan dapat dibuka melalui tautan berikut:\n${getGeneratedGuestUrl()}\n\nTerima kasih.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-xl shadow-xs transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim WA</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

