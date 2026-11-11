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
  Sparkles,
  Plus,
  BookOpen,
  QrCode,
  Gift,
  Heart,
} from "lucide-react";
import { Invitation, BankAccount, LoveStory } from "@/types/database";
import { getAllRegisteredTemplates, getTemplateByKey } from "@/templates/registry";
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
  const [themeConfig, setThemeConfig] = useState<Record<string, any>>(
    initialInvitation.data.theme_config || initialInvitation.data.theme_options || {}
  );

  const handleTemplateSelect = (key: string) => {
    setTemplateKey(key);
    const tpl = getTemplateByKey(key);
    if (tpl.defaultThemeConfig) {
      setThemeConfig((prev) => ({ ...tpl.defaultThemeConfig, ...prev }));
    }
  };

  const handleThemeConfigChange = (key: string, value: any) => {
    setThemeConfig((prev) => ({ ...prev, [key]: value }));
  };
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

  // Quote / Surat Ar-Rum
  const [quoteArabic, setQuoteArabic] = useState<string>(
    initialInvitation.data.quote?.arabic_text || ""
  );
  const [quoteText, setQuoteText] = useState<string>(
    initialInvitation.data.quote?.text || ""
  );
  const [quoteSource, setQuoteSource] = useState<string>(
    initialInvitation.data.quote?.source || "QS. Ar-Rum: 21"
  );

  // Stories
  const [stories, setStories] = useState<LoveStory[]>(
    initialInvitation.data.stories || []
  );

  // Bank Accounts & QRIS
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(
    initialInvitation.data.bank_accounts && initialInvitation.data.bank_accounts.length > 0
      ? initialInvitation.data.bank_accounts
      : [
          {
            bank_name: "BCA",
            account_number: "",
            account_holder: "",
            qr_code_url: "",
          },
        ]
  );
  const [qrisImageUrl, setQrisImageUrl] = useState<string>(
    initialInvitation.data.qris_image_url || ""
  );

  // Gallery
  const [galleryUrls, setGalleryUrls] = useState<string[]>(initialInvitation.data.gallery || []);

  const addStory = () => {
    setStories([
      ...stories,
      {
        year: new Date().getFullYear().toString(),
        title: "",
        description: "",
        image_url: "",
      },
    ]);
  };

  const updateStory = (index: number, field: keyof LoveStory, value: string) => {
    setStories(
      stories.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  const removeStory = (index: number) => {
    setStories(stories.filter((_, i) => i !== index));
  };

  const addBankAccount = () => {
    setBankAccounts([
      ...bankAccounts,
      {
        bank_name: "BCA",
        account_number: "",
        account_holder: "",
        qr_code_url: "",
      },
    ]);
  };

  const updateBankAccount = (index: number, field: keyof BankAccount, value: string) => {
    setBankAccounts(
      bankAccounts.map((b, i) => (i === index ? { ...b, [field]: value } : b))
    );
  };

  const removeBankAccount = (index: number) => {
    if (bankAccounts.length <= 1) {
      alert("Minimal satu rekening bank.");
      return;
    }
    setBankAccounts(bankAccounts.filter((_, i) => i !== index));
  };

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

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
          quote: quoteText
            ? { text: quoteText, source: quoteSource || "QS. Ar-Rum: 21", arabic_text: quoteArabic }
            : undefined,
          stories: stories.filter((s) => s.title.trim() || s.description.trim()),
          bank_accounts: bankAccounts.filter((b) => b.account_number.trim()),
          qris_image_url: qrisImageUrl || null,
          theme_config: themeConfig,
          theme_options: themeConfig,
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
              onChange={(e) => handleTemplateSelect(e.target.value)}
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

        {/* Dynamic Template-Specific Customizer for Edit */}
        {(() => {
          const currentTpl = getTemplateByKey(templateKey);
          if (!currentTpl?.customFields || currentTpl.customFields.length === 0) return null;

          return (
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#844307]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#844307]">
                    Kustomisasi Dinamis: {currentTpl.name}
                  </h4>
                </div>
                <span className="text-[10px] font-semibold text-stone-500 bg-white px-2 py-0.5 rounded-full border border-stone-200">
                  Dinamis per Template
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {currentTpl.customFields.map((field) => (
                  <div key={field.key} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      {field.label}
                    </label>

                    {field.type === "select" ? (
                      <select
                        value={themeConfig[field.key] ?? field.defaultValue ?? ""}
                        onChange={(e) => handleThemeConfigChange(field.key, e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 focus:outline-hidden focus:border-[#844307]"
                      >
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        rows={2}
                        value={themeConfig[field.key] ?? field.defaultValue ?? ""}
                        onChange={(e) => handleThemeConfigChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 focus:outline-hidden focus:border-[#844307]"
                      />
                    ) : (
                      <input
                        type={field.type === "color" ? "color" : "text"}
                        value={themeConfig[field.key] ?? field.defaultValue ?? ""}
                        onChange={(e) => handleThemeConfigChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className={`w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 focus:outline-hidden focus:border-[#844307] ${
                          field.type === "color" ? "h-9 p-1 cursor-pointer" : ""
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

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

        {/* 5. Ayat Suci & Kutipan (Surat Ar-Rum) */}
        <div className="space-y-4 pt-6 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#844307]" />
            <h3 className="font-serif font-bold text-sm text-stone-900">
              Ayat Suci &amp; Doa Pernikahan (Surat Ar-Rum / Kutipan)
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Lafadz Arab (Opsional)
            </label>
            <textarea
              rows={2}
              value={quoteArabic}
              onChange={(e) => setQuoteArabic(e.target.value)}
              placeholder="وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا..."
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs text-right font-serif"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Terjemahan / Isi Kutipan
            </label>
            <textarea
              rows={3}
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              placeholder="Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu..."
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Sumber Kutipan (Contoh: QS. Ar-Rum: 21)
            </label>
            <input
              type="text"
              value={quoteSource}
              onChange={(e) => setQuoteSource(e.target.value)}
              placeholder="QS. Ar-Rum: 21"
              className="w-full sm:w-64 px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
          </div>
        </div>

        {/* 6. Kisah Perjalanan Cinta */}
        <div className="space-y-4 pt-6 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <h3 className="font-serif font-bold text-sm text-stone-900">
                Kisah Perjalanan Cinta (Love Story)
              </h3>
            </div>
            <button
              type="button"
              onClick={addStory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-black"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Momen</span>
            </button>
          </div>

          <div className="space-y-4">
            {stories.map((story, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#844307]">Momen #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeStory(idx)}
                    className="text-stone-400 hover:text-red-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Tahun / Waktu"
                    value={story.year}
                    onChange={(e) => updateStory(idx, "year", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Judul Momen"
                    value={story.title}
                    onChange={(e) => updateStory(idx, "title", e.target.value)}
                    className="sm:col-span-2 w-full px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Deskripsi cerita momen..."
                  value={story.description}
                  onChange={(e) => updateStory(idx, "description", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs"
                />

                <ImageUploader
                  label="Foto Momen (Choose File)"
                  bucket="galleries"
                  value={story.image_url || ""}
                  onChange={(val) =>
                    updateStory(idx, "image_url", typeof val === "string" ? val : val[0] || "")
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* 7. Amplop Digital: Rekening Bank & QRIS */}
        <div className="space-y-4 pt-6 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#844307]" />
              <h3 className="font-serif font-bold text-sm text-stone-900">
                Amplop Digital: Rekening &amp; QRIS
              </h3>
            </div>
            <button
              type="button"
              onClick={addBankAccount}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-black"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Rekening</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-[#844307]" />
              <span className="text-xs font-bold text-[#844307]">Barcode QRIS Utama</span>
            </div>
            <ImageUploader
              label="Pilih File Gambar QRIS Utama (Choose File)"
              bucket="covers"
              value={qrisImageUrl}
              onChange={(val) => setQrisImageUrl(typeof val === "string" ? val : val[0] || "")}
            />
          </div>

          <div className="space-y-3">
            {bankAccounts.map((acc, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">Rekening #{idx + 1}</span>
                  {bankAccounts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBankAccount(idx)}
                      className="text-stone-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Nama Bank (BCA / Mandiri / BRI / DANA)"
                    value={acc.bank_name}
                    onChange={(e) => updateBankAccount(idx, "bank_name", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Nomor Rekening / No. HP"
                    value={acc.account_number}
                    onChange={(e) => updateBankAccount(idx, "account_number", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Atas Nama"
                    value={acc.account_holder}
                    onChange={(e) => updateBankAccount(idx, "account_holder", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs"
                  />
                </div>

                <ImageUploader
                  label={`Upload QRIS Rekening Ini (Opsional - ${acc.bank_name || "Bank"})`}
                  bucket="covers"
                  value={acc.qr_code_url || ""}
                  onChange={(val) =>
                    updateBankAccount(idx, "qr_code_url", typeof val === "string" ? val : val[0] || "")
                  }
                />
              </div>
            ))}
          </div>
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

