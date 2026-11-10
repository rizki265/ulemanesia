"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  CheckCircle,
  AlertCircle,
  Trash2,
  ExternalLink,
  Eye,
} from "lucide-react";
import { Invitation } from "@/types/database";
import { getAllRegisteredTemplates } from "@/templates/registry";
import { isValidSlug } from "@/lib/utils";
import { MAX_GALLERY_PHOTOS } from "@/lib/constants";
import { ImageUploader } from "@/components/admin/ImageUploader";

interface Props {
  initialInvitation: Invitation;
}

export function EditInvitationClient({ initialInvitation }: Props) {
  const router = useRouter();
  const templates = getAllRegisteredTemplates();

  const [templateKey, setTemplateKey] = useState(initialInvitation.template_key);
  const [slug, setSlug] = useState(initialInvitation.slug);
  const [customerName, setCustomerName] = useState(initialInvitation.customer_name);
  const [customerPhone, setCustomerPhone] = useState(initialInvitation.customer_phone);
  const [title, setTitle] = useState(initialInvitation.title);
  const [status, setStatus] = useState<"draft" | "published" | "expired">(initialInvitation.status);
  const [coverImageUrl, setCoverImageUrl] = useState(initialInvitation.cover_image_url || "");
  const [eventDate, setEventDate] = useState(
    initialInvitation.event_date ? initialInvitation.event_date.split("T")[0] : ""
  );

  // Groom
  const [groomName, setGroomName] = useState(initialInvitation.data.groom?.name || "");
  const [groomNickname, setGroomNickname] = useState(initialInvitation.data.groom?.nickname || "");
  const [groomFather, setGroomFather] = useState(initialInvitation.data.groom?.father_name || "");
  const [groomMother, setGroomMother] = useState(initialInvitation.data.groom?.mother_name || "");
  const [groomInstagram, setGroomInstagram] = useState(initialInvitation.data.groom?.instagram || "");
  const [groomPhotoUrl, setGroomPhotoUrl] = useState(initialInvitation.data.groom?.photo_url || "");

  // Bride
  const [brideName, setBrideName] = useState(initialInvitation.data.bride?.name || "");
  const [brideNickname, setBrideNickname] = useState(initialInvitation.data.bride?.nickname || "");
  const [brideFather, setBrideFather] = useState(initialInvitation.data.bride?.father_name || "");
  const [brideMother, setBrideMother] = useState(initialInvitation.data.bride?.mother_name || "");
  const [brideInstagram, setBrideInstagram] = useState(initialInvitation.data.bride?.instagram || "");
  const [bridePhotoUrl, setBridePhotoUrl] = useState(initialInvitation.data.bride?.photo_url || "");

  // Events (Akad & Resepsi)
  const akad = initialInvitation.data.events?.[0];
  const resepsi = initialInvitation.data.events?.[1];

  const [akadLocation, setAkadLocation] = useState(akad?.location_name || "");
  const [akadAddress, setAkadAddress] = useState(akad?.address || "");
  const [akadTime, setAkadTime] = useState(akad ? `${akad.start_time} - ${akad.end_time}` : "08:00 - 10:00");
  const [akadMaps, setAkadMaps] = useState(akad?.google_maps_url || "");

  const [resepsiLocation, setResepsiLocation] = useState(resepsi?.location_name || "");
  const [resepsiAddress, setResepsiAddress] = useState(resepsi?.address || "");
  const [resepsiTime, setResepsiTime] = useState(resepsi ? `${resepsi.start_time} - ${resepsi.end_time}` : "11:00 - 14:00");
  const [resepsiMaps, setResepsiMaps] = useState(resepsi?.google_maps_url || "");

  // Bank
  const bank = initialInvitation.data.bank_accounts?.[0];
  const [bankName, setBankName] = useState(bank?.bank_name || "BCA");
  const [accountNumber, setAccountNumber] = useState(bank?.account_number || "");
  const [accountHolder, setAccountHolder] = useState(bank?.account_holder || "");

  // Gallery
  const [galleryUrls, setGalleryUrls] = useState<string[]>(initialInvitation.data.gallery || []);
  const [newGalleryInput, setNewGalleryInput] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const addGalleryUrl = () => {
    if (!newGalleryInput.trim()) return;
    if (galleryUrls.length >= MAX_GALLERY_PHOTOS) {
      alert(`Maksimal ${MAX_GALLERY_PHOTOS} foto galeri.`);
      return;
    }
    setGalleryUrls([...galleryUrls, newGalleryInput.trim()]);
    setNewGalleryInput("");
  };

  const removeGalleryUrl = (idx: number) => {
    setGalleryUrls(galleryUrls.filter((_, i) => i !== idx));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const slugCheck = isValidSlug(slug);
    if (!slugCheck.valid) {
      setMessage({ text: slugCheck.error || "Slug tidak valid.", isError: true });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const payload = {
        slug,
        template_key: templateKey,
        customer_name: customerName,
        customer_phone: customerPhone,
        status,
        title,
        event_date: new Date(eventDate).toISOString(),
        cover_image_url: coverImageUrl || galleryUrls[0] || initialInvitation.cover_image_url,
        data: {
          ...initialInvitation.data,
          groom: {
            name: groomName,
            nickname: groomNickname,
            father_name: groomFather,
            mother_name: groomMother,
            instagram: groomInstagram,
            photo_url: groomPhotoUrl,
            child_order: "Putra dari",
          },
          bride: {
            name: brideName,
            nickname: brideNickname,
            father_name: brideFather,
            mother_name: brideMother,
            instagram: brideInstagram,
            photo_url: bridePhotoUrl,
            child_order: "Putri dari",
          },
          countdown_target: new Date(eventDate).toISOString(),
          events: [
            {
              title: "Akad Nikah",
              date: new Date(eventDate).toISOString(),
              start_time: akadTime.split("-")[0]?.trim() || "08:00",
              end_time: akadTime.split("-")[1]?.trim() || "10:00",
              location_name: akadLocation,
              address: akadAddress,
              google_maps_url: akadMaps,
            },
            {
              title: "Resepsi",
              date: new Date(eventDate).toISOString(),
              start_time: resepsiTime.split("-")[0]?.trim() || "11:00",
              end_time: resepsiTime.split("-")[1]?.trim() || "14:00",
              location_name: resepsiLocation,
              address: resepsiAddress,
              google_maps_url: resepsiMaps,
            },
          ],
          gallery: galleryUrls,
          bank_accounts: accountNumber
            ? [{ bank_name: bankName, account_number: accountNumber, account_holder: accountHolder }]
            : [],
        },
      };

      const res = await fetch(`/api/invitations/${initialInvitation.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ text: data.error || "Gagal memperbarui undangan.", isError: true });
      } else {
        setMessage({ text: "Perubahan berhasil disimpan!", isError: false });
        router.refresh();
      }
    } catch {
      setMessage({ text: "Terjadi kesalahan koneksi.", isError: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/admin/invitations/${initialInvitation.id}/preview`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Pratinjau (FR-15)</span>
          </Link>
          <Link
            href={`/admin/invitations/${initialInvitation.id}/rsvp`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-semibold rounded-lg transition-colors"
          >
            <span>Rekap RSVP (FR-18)</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Edit Data Undangan</h1>
          <p className="text-xs text-stone-500 mt-1">ID: {initialInvitation.id}</p>
        </div>

        {message && (
          <div
            className={`p-4 text-xs rounded-2xl border flex items-start gap-2 ${message.isError
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-emerald-50 text-emerald-800 border-emerald-200"
              }`}
          >
            {message.isError ? (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* 1. Template & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Template Terpilih
            </label>
            <select
              value={templateKey}
              onChange={(e) => setTemplateKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm bg-white"
            >
              {templates.map((tpl) => (
                <option key={tpl.key} value={tpl.key}>
                  {tpl.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Status Publikasi
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm bg-white"
            >
              <option value="draft">Draft (Belum Publik)</option>
              <option value="published">Published (Aktif Tayang)</option>
              <option value="expired">Expired (Kedaluwarsa)</option>
            </select>
          </div>
        </div>

        {/* 2. Customer & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Nama Customer
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Nomor WhatsApp
            </label>
            <input
              type="text"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Slug Link (/{slug})
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Judul Undangan
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"
            />
          </div>
        </div>

        {/* 3. Mempelai */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-stone-100">
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sm text-stone-900">Mempelai Pria</h3>
            <input
              type="text"
              value={groomName}
              onChange={(e) => setGroomName(e.target.value)}
              placeholder="Nama Lengkap Pria"
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
            <input
              type="text"
              value={groomNickname}
              onChange={(e) => setGroomNickname(e.target.value)}
              placeholder="Nama Panggilan"
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
            <input
              type="text"
              value={groomFather}
              onChange={(e) => setGroomFather(e.target.value)}
              placeholder="Nama Ayah"
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
            <input
              type="text"
              value={groomMother}
              onChange={(e) => setGroomMother(e.target.value)}
              placeholder="Nama Ibu"
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
            <ImageUploader
              label="Foto Profil Pria (Pilih File)"
              bucket="covers"
              value={groomPhotoUrl}
              onChange={setGroomPhotoUrl}
            />
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sm text-stone-900">Mempelai Wanita</h3>
            <input
              type="text"
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
              placeholder="Nama Lengkap Wanita"
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
            <input
              type="text"
              value={brideNickname}
              onChange={(e) => setBrideNickname(e.target.value)}
              placeholder="Nama Panggilan"
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
            <input
              type="text"
              value={brideFather}
              onChange={(e) => setBrideFather(e.target.value)}
              placeholder="Nama Ayah"
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
            <input
              type="text"
              value={brideMother}
              onChange={(e) => setBrideMother(e.target.value)}
              placeholder="Nama Ibu"
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
            <ImageUploader
              label="Foto Profil Wanita (Pilih File)"
              bucket="covers"
              value={bridePhotoUrl}
              onChange={setBridePhotoUrl}
            />
          </div>
        </div>

        {/* 4. Cover & Galeri Foto */}
        <div className="space-y-6 pt-6 border-t border-stone-100">
          <ImageUploader
            label="Foto Cover Utama (FR-13)"
            bucket="covers"
            value={coverImageUrl}
            onChange={setCoverImageUrl}
            helperText="Foto cover utama yang tampil pertama kali saat membuka undangan atau preview tautan WhatsApp."
          />

          <ImageUploader
            label={`Foto Galeri Prewedding (Maksimal ${MAX_GALLERY_PHOTOS} Foto)`}
            bucket="galleries"
            multiple={true}
            maxFiles={MAX_GALLERY_PHOTOS}
            value={galleryUrls}
            onChange={setGalleryUrls}
            helperText="Klik 'Pilih File Foto' untuk mengunggah dari komputer/HP. Foto otomatis dikompresi ke WebP ~300KB."
          />
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-stone-200 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? "Menyimpan..." : "Simpan Perubahan"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}

