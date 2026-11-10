"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Calendar,
  Image as ImageIcon,
  Music,
  MapPin,
  Save,
  CheckCircle,
  AlertCircle,
  Trash2,
  Plus,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { getAllRegisteredTemplates } from "@/templates/registry";
import { isValidSlug, slugify } from "@/lib/utils";
import { compressImageToWebP } from "@/lib/image-compression";
import { MAX_GALLERY_PHOTOS, MAX_COVER_PHOTOS } from "@/lib/constants";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function NewInvitationPage() {
  const router = useRouter();
  const templates = getAllRegisteredTemplates();

  // Form states
  const [templateKey, setTemplateKey] = useState(templates[0]?.key || "minimalist-floral");
  const [slug, setSlug] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");

  // Groom
  const [groomName, setGroomName] = useState("");
  const [groomNickname, setGroomNickname] = useState("");
  const [groomFather, setGroomFather] = useState("");
  const [groomMother, setGroomMother] = useState("");
  const [groomInstagram, setGroomInstagram] = useState("");
  const [groomPhotoUrl, setGroomPhotoUrl] = useState("");

  // Bride
  const [brideName, setBrideName] = useState("");
  const [brideNickname, setBrideNickname] = useState("");
  const [brideFather, setBrideFather] = useState("");
  const [brideMother, setBrideMother] = useState("");
  const [brideInstagram, setBrideInstagram] = useState("");
  const [bridePhotoUrl, setBridePhotoUrl] = useState("");

  // Events
  const [akadLocation, setAkadLocation] = useState("");
  const [akadAddress, setAkadAddress] = useState("");
  const [akadTime, setAkadTime] = useState("08:00 - 10:00 WIB");
  const [akadMaps, setAkadMaps] = useState("");

  const [resepsiLocation, setResepsiLocation] = useState("");
  const [resepsiAddress, setResepsiAddress] = useState("");
  const [resepsiTime, setResepsiTime] = useState("11:00 - 14:00 WIB");
  const [resepsiMaps, setResepsiMaps] = useState("");

  // Bank Account
  const [bankName, setBankName] = useState("BCA");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  // Gallery URLs (up to 10)
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [newGalleryInput, setNewGalleryInput] = useState("");

  // Feedback states
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [slugError, setSlugError] = useState("");

  const handleSlugChange = (val: string) => {
    const clean = val.toLowerCase().replace(/\s+/g, "-");
    setSlug(clean);
    const check = isValidSlug(clean);
    if (!check.valid) {
      setSlugError(check.error || "");
    } else {
      setSlugError("");
    }
  };

  const handleAutoSlug = () => {
    if (groomNickname && brideNickname) {
      const generated = slugify(`${groomNickname}-dan-${brideNickname}`);
      handleSlugChange(generated);
    }
  };

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

  const handleSave = async (status: "draft" | "published") => {
    // Validate
    const slugCheck = isValidSlug(slug);
    if (!slugCheck.valid) {
      setErrorMessage(slugCheck.error || "Slug tidak valid.");
      return;
    }

    if (!title || !customerName || !customerPhone || !eventDate) {
      setErrorMessage("Mohon lengkapi judul, nama customer, nomor WA, dan tanggal acara.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const payload = {
        slug,
        template_key: templateKey,
        customer_name: customerName,
        customer_phone: customerPhone,
        status,
        title,
        event_date: new Date(eventDate).toISOString(),
        cover_image_url: coverImageUrl || galleryUrls[0] || null,
        data: {
          groom: {
            name: groomName,
            nickname: groomNickname || "Mempelai Pria",
            father_name: groomFather,
            mother_name: groomMother,
            instagram: groomInstagram,
            photo_url: groomPhotoUrl,
            child_order: "Putra dari",
          },
          bride: {
            name: brideName,
            nickname: brideNickname || "Mempelai Wanita",
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

      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Gagal menyimpan undangan.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setErrorMessage("Terjadi kesalahan jaringan.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard</span>
        </Link>
        <span className="text-xs text-stone-400">Pengerjaan Undangan Baru (&lt; 30 Menit)</span>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">
            Form Pembuatan Undangan Digital
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Isi data customer dan acara. Foto akan otomatis dioptimasi untuk kuota hemat Supabase.
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 bg-red-50 text-red-700 text-xs rounded-2xl border border-red-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 1. Pilih Template */}
        <section className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
            1. Pilih Template Desain
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {templates.map((tpl) => (
              <div
                key={tpl.key}
                onClick={() => setTemplateKey(tpl.key)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  templateKey === tpl.key
                    ? "border-rose-600 bg-rose-50/50 ring-2 ring-rose-500/20"
                    : "border-stone-200 hover:border-stone-300 bg-stone-50/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-serif font-bold text-sm text-stone-900">{tpl.name}</h3>
                  {templateKey === tpl.key && (
                    <CheckCircle className="w-4 h-4 text-rose-600" />
                  )}
                </div>
                <p className="text-xs text-stone-500 line-clamp-2">{tpl.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Customer & Slug Info */}
        <section className="space-y-4 pt-6 border-t border-stone-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
            2. Informasi Customer &amp; Slug Unik
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-stone-600 mb-1 font-medium">
                Nama Customer (Pemesan)
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Contoh: Kak Shinta"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs text-stone-600 mb-1 font-medium">
                Nomor WhatsApp Customer
              </label>
              <input
                type="text"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Contoh: 081234567890"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs text-stone-600 font-medium">
                Slug Link Undangan (/{slug || "slug-unik"})
              </label>
              <button
                type="button"
                onClick={handleAutoSlug}
                className="text-xs text-rose-600 hover:underline"
              >
                Generate dari nama mempelai
              </button>
            </div>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="Contoh: rama-dan-shinta"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono focus:outline-none ${
                slugError ? "border-red-400 bg-red-50/20" : "border-stone-200 focus:border-rose-500"
              }`}
            />
            {slugError && <p className="text-xs text-red-600 mt-1">{slugError}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-stone-600 mb-1 font-medium">
                Judul Undangan
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="The Wedding of Rama & Shinta"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-600 mb-1 font-medium">
                Tanggal Acara Utama
              </label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>
        </section>

        {/* 3. Data Mempelai */}
        <section className="space-y-4 pt-6 border-t border-stone-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
            3. Profil Kedua Mempelai
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Groom */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-3">
              <h4 className="font-serif font-bold text-sm text-stone-900">Mempelai Pria</h4>
              <input
                type="text"
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
                placeholder="Nama Lengkap & Gelar Pria"
                className="w-full px-3 py-2 bg-white rounded-lg border border-stone-200 text-xs"
              />
              <input
                type="text"
                value={groomNickname}
                onChange={(e) => setGroomNickname(e.target.value)}
                placeholder="Nama Panggilan (e.g. Rama)"
                className="w-full px-3 py-2 bg-white rounded-lg border border-stone-200 text-xs"
              />
              <input
                type="text"
                value={groomFather}
                onChange={(e) => setGroomFather(e.target.value)}
                placeholder="Nama Ayah Pria"
                className="w-full px-3 py-2 bg-white rounded-lg border border-stone-200 text-xs"
              />
              <input
                type="text"
                value={groomMother}
                onChange={(e) => setGroomMother(e.target.value)}
                placeholder="Nama Ibu Pria"
                className="w-full px-3 py-2 bg-white rounded-lg border border-stone-200 text-xs"
              />
              <input
                type="text"
                value={groomInstagram}
                onChange={(e) => setGroomInstagram(e.target.value)}
                placeholder="Username Instagram (tanpa @)"
                className="w-full px-3 py-2 bg-white rounded-lg border border-stone-200 text-xs"
              />
              <ImageUploader
                label="Foto Profil Pria (Pilih File)"
                bucket="covers"
                value={groomPhotoUrl}
                onChange={setGroomPhotoUrl}
              />
            </div>

            {/* Bride */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-3">
              <h4 className="font-serif font-bold text-sm text-stone-900">Mempelai Wanita</h4>
              <input
                type="text"
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
                placeholder="Nama Lengkap & Gelar Wanita"
                className="w-full px-3 py-2 bg-white rounded-lg border border-stone-200 text-xs"
              />
              <input
                type="text"
                value={brideNickname}
                onChange={(e) => setBrideNickname(e.target.value)}
                placeholder="Nama Panggilan (e.g. Shinta)"
                className="w-full px-3 py-2 bg-white rounded-lg border border-stone-200 text-xs"
              />
              <input
                type="text"
                value={brideFather}
                onChange={(e) => setBrideFather(e.target.value)}
                placeholder="Nama Ayah Wanita"
                className="w-full px-3 py-2 bg-white rounded-lg border border-stone-200 text-xs"
              />
              <input
                type="text"
                value={brideMother}
                onChange={(e) => setBrideMother(e.target.value)}
                placeholder="Nama Ibu Wanita"
                className="w-full px-3 py-2 bg-white rounded-lg border border-stone-200 text-xs"
              />
              <input
                type="text"
                value={brideInstagram}
                onChange={(e) => setBrideInstagram(e.target.value)}
                placeholder="Username Instagram (tanpa @)"
                className="w-full px-3 py-2 bg-white rounded-lg border border-stone-200 text-xs"
              />
              <ImageUploader
                label="Foto Profil Wanita (Pilih File)"
                bucket="covers"
                value={bridePhotoUrl}
                onChange={setBridePhotoUrl}
              />
            </div>
          </div>
        </section>

        {/* 4. Foto Cover & Galeri Prewedding */}
        <section className="space-y-6 pt-6 border-t border-stone-100">
          <ImageUploader
            label="Foto Cover Utama (FR-13)"
            bucket="covers"
            value={coverImageUrl}
            onChange={setCoverImageUrl}
            helperText="Foto utama yang tampil di kartu pembuka atau preview tautan WhatsApp (Maksimal 1 Foto)."
          />

          <ImageUploader
            label={`Foto Galeri Prewedding (Maksimal ${MAX_GALLERY_PHOTOS} Foto)`}
            bucket="galleries"
            multiple={true}
            maxFiles={MAX_GALLERY_PHOTOS}
            value={galleryUrls}
            onChange={setGalleryUrls}
            helperText="Klik 'Pilih File Foto' untuk memilih beberapa foto sekaligus dari komputer/HP. Foto otomatis dikompresi ke WebP ~300KB."
          />
        </section>

        {/* 5. Tanda Kasih (Rekening Bank) */}
        <section className="space-y-4 pt-6 border-t border-stone-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
            5. Tanda Kasih / Rekening Bank (Opsional)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Nama Bank (e.g. BCA, Mandiri)"
              className="px-3.5 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-rose-500"
            />
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Nomor Rekening"
              className="px-3.5 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-rose-500"
            />
            <input
              type="text"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="Atas Nama (Pemilik)"
              className="px-3.5 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-rose-500"
            />
          </div>
        </section>

        {/* Buttons: Save as Draft or Publish */}
        <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSave("draft")}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-stone-300 text-stone-700 text-xs sm:text-sm font-semibold hover:bg-stone-50 transition-colors disabled:opacity-50"
          >
            Simpan Sebagai Draft
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSave("published")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-rose-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Publish Langsung (Aktif 3 Bulan)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

