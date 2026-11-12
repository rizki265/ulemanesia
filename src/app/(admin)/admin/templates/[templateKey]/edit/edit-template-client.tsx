"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  CheckCircle,
  AlertCircle,
  Trash2,
  Plus,
  Sparkles,
  ExternalLink,
  Paintbrush,
  Sliders,
  Eye,
  BookOpen,
  QrCode,
  Gift,
  Music,
  Video,
  Heart,
  Calendar,
} from "lucide-react";
import { RegisteredTemplate } from "@/templates/types";
import { BankAccount, LoveStory } from "@/types/database";
import { MAX_GALLERY_PHOTOS } from "@/lib/constants";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { AudioUploader } from "@/components/admin/AudioUploader";

interface Props {
  template: RegisteredTemplate;
  initialPreset: Record<string, any>;
}

export function EditTemplateClient({ template, initialPreset }: Props) {
  const router = useRouter();
  // Preset Form States
  const [title, setTitle] = useState(
    initialPreset.title ||
      `The Wedding of ${initialPreset.groom?.nickname || "Groom"} & ${initialPreset.bride?.nickname || "Bride"}`
  );
  const [coverImageUrl, setCoverImageUrl] = useState(
    initialPreset.cover_image_url || template.thumbnailUrl
  );
  const [themeConfig, setThemeConfig] = useState<Record<string, any>>(
    initialPreset.theme_config || template.defaultThemeConfig || {}
  );

  // Groom
  const [groomName, setGroomName] = useState(initialPreset.groom?.name || "");
  const [groomNickname, setGroomNickname] = useState(initialPreset.groom?.nickname || "");
  const [groomFather, setGroomFather] = useState(initialPreset.groom?.father_name || "");
  const [groomMother, setGroomMother] = useState(initialPreset.groom?.mother_name || "");
  const [groomInstagram, setGroomInstagram] = useState(initialPreset.groom?.instagram || "");
  const [groomPhotoUrl, setGroomPhotoUrl] = useState(initialPreset.groom?.photo_url || "");

  // Bride
  const [brideName, setBrideName] = useState(initialPreset.bride?.name || "");
  const [brideNickname, setBrideNickname] = useState(initialPreset.bride?.nickname || "");
  const [brideFather, setBrideFather] = useState(initialPreset.bride?.father_name || "");
  const [brideMother, setBrideMother] = useState(initialPreset.bride?.mother_name || "");
  const [brideInstagram, setBrideInstagram] = useState(initialPreset.bride?.instagram || "");
  const [bridePhotoUrl, setBridePhotoUrl] = useState(initialPreset.bride?.photo_url || "");

  // Quote / Surat Ar-Rum
  const [quoteArabic, setQuoteArabic] = useState(
    initialPreset.quote?.arabic_text ||
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ"
  );
  const [quoteText, setQuoteText] = useState(
    initialPreset.quote?.text ||
      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
  );
  const [quoteSource, setQuoteSource] = useState(
    initialPreset.quote?.source || "QS. Ar-Rum: 21"
  );

  // Stories
  const [stories, setStories] = useState<LoveStory[]>(
    initialPreset.stories && initialPreset.stories.length > 0
      ? initialPreset.stories
      : [
          {
            year: "2021",
            title: "Pertama Kali Bertemu",
            description: "Awal perjumpaan kami di bangku perkuliahan yang menumbuhkan rasa ketertarikan satu sama lain.",
            image_url: "",
          },
          {
            year: "2023",
            title: "Menjalin Komitmen",
            description: "Kami sepakat melangkah bersama dalam jalinan komitmen yang serius menuju masa depan.",
            image_url: "",
          },
          {
            year: "2026",
            title: "Lamaran & Menuju Hari Bahagia",
            description: "Dengan memohon doa restu kedua orang tua, kami mengikat janji suci mengarungi bahtera rumah tangga.",
            image_url: "",
          },
        ]
  );

  // Bank Accounts & QRIS
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(
    initialPreset.bank_accounts && initialPreset.bank_accounts.length > 0
      ? initialPreset.bank_accounts
      : [
          {
            bank_name: "BCA",
            account_number: "8830192810",
            account_holder: "Kayla Anandita",
            qr_code_url: "",
          },
        ]
  );
  const [qrisImageUrl, setQrisImageUrl] = useState(initialPreset.qris_image_url || "");

  // Gallery & Video
  const [galleryUrls, setGalleryUrls] = useState<string[]>(
    initialPreset.gallery && initialPreset.gallery.length > 0
      ? initialPreset.gallery
      : [
          initialPreset.cover_image_url || template.thumbnailUrl,
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
        ]
  );
  const [videoUrl, setVideoUrl] = useState(initialPreset.video_url || "");

  // Audio Background
  const [customMusicUrl, setCustomMusicUrl] = useState(initialPreset.custom_music_url || "");

  // Feedback States
  const [submitting, setSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addStory = () => {
    setStories([
      ...stories,
      { year: new Date().getFullYear().toString(), title: "", description: "", image_url: "" },
    ]);
  };

  const updateStory = (index: number, field: keyof LoveStory, value: string) => {
    setStories(stories.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const removeStory = (index: number) => {
    setStories(stories.filter((_, i) => i !== index));
  };

  const addBankAccount = () => {
    setBankAccounts([
      ...bankAccounts,
      { bank_name: "BCA", account_number: "", account_holder: "", qr_code_url: "" },
    ]);
  };

  const updateBankAccount = (index: number, field: keyof BankAccount, value: string) => {
    setBankAccounts(bankAccounts.map((b, i) => (i === index ? { ...b, [field]: value } : b)));
  };

  const removeBankAccount = (index: number) => {
    if (bankAccounts.length <= 1) {
      alert("Minimal satu rekening bank.");
      return;
    }
    setBankAccounts(bankAccounts.filter((_, i) => i !== index));
  };

  const removeGalleryUrl = (idx: number) => {
    setGalleryUrls(galleryUrls.filter((_, i) => i !== idx));
  };

  const handleSavePreset = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");
    setSuccessToast("");

    try {
      const presetPayload = {
        template_key: template.key,
        preset_data: {
          title,
          cover_image_url: coverImageUrl || galleryUrls[0] || null,
          theme_config: themeConfig,
          groom: {
            name: groomName,
            nickname: groomNickname,
            father_name: groomFather,
            mother_name: groomMother,
            instagram: groomInstagram,
            photo_url: groomPhotoUrl,
          },
          bride: {
            name: brideName,
            nickname: brideNickname,
            father_name: brideFather,
            mother_name: brideMother,
            instagram: brideInstagram,
            photo_url: bridePhotoUrl,
          },
          quote: {
            text: quoteText,
            source: quoteSource,
            arabic_text: quoteArabic,
          },
          stories: stories.filter((s) => s.title.trim() || s.description.trim()),
          gallery: galleryUrls,
          video_url: videoUrl || null,
          custom_music_url: customMusicUrl || null,
          bank_accounts: bankAccounts.filter((b) => b.account_number.trim()),
          qris_image_url: qrisImageUrl || null,
        },
      };

      const res = await fetch("/api/templates/preset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(presetPayload),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Gagal menyimpan preset template.");
      } else {
        setSuccessToast(
          `✨ Berhasil! Perubahan template "${template.name}" telah tersimpan di Database Supabase dan langsung aktif pada website customer & demo.`
        );
        router.refresh();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setErrorMessage("Terjadi gangguan koneksi saat menyimpan ke database.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div className="space-y-1">
          <Link
            href="/admin/templates"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors font-medium mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Katalog Template</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-[#844307] text-[10px] font-bold uppercase tracking-wider">
              {template.category}
            </span>
            <span className="text-xs text-stone-400">• Mode Penyesuaian Website Customer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Edit Template: {template.name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Sesuaikan foto, kutipan, cerita, agenda, dan alunan musik yang akan tampil di katalog publik dan pratinjau demo untuk calon pengantin.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/demo/${template.key}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700 shadow-2xs transition-all hover:scale-105"
          >
            <Eye className="w-3.5 h-3.5 text-stone-500" />
            <span>Lihat Demo Live</span>
          </Link>

          <Link
            href={`/admin/invitations/new?template=${template.key}`}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold shadow-xs transition-all hover:scale-105"
          >
            <Plus className="w-3.5 h-3.5 text-amber-300" />
            <span>Buat Undangan Klien</span>
          </Link>
        </div>
      </div>

      {/* Toast Feedback */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <p className="font-semibold">{successToast}</p>
            <div className="flex items-center gap-3">
              <Link
                href={`/demo/${template.key}`}
                target="_blank"
                className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-900 underline"
              >
                <span>Buka Demo Hasil Perubahan</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link
                href="/admin/templates"
                className="font-bold text-stone-600 hover:text-stone-900 underline"
              >
                Kembali ke Katalog
              </Link>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <p className="font-semibold">{errorMessage}</p>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSavePreset} className="space-y-8">
        {/* SECTION 1: IDENTITAS TEMPLATE */}
        <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Sparkles className="w-4 h-4 text-[#844307]" />
            <h3 className="font-serif font-bold text-base text-stone-900">
              1. Identitas &amp; Foto Sampul Template
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Judul Utama Undangan Demo
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="The Wedding of Ozy & Zelda"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:border-[#844307]"
              />
            </div>
          </div>

          <ImageUploader
            label="Foto Sampul Utama / Thumbnail Template (Choose File)"
            bucket="covers"
            value={coverImageUrl}
            onChange={setCoverImageUrl}
            helperText="Foto ini tampil sebagai kartu cover di katalog website customer dan sampul utama demo."
          />
        </div>

        {/* SECTION 2: PROFIL MEMPELAI */}
        <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Heart className="w-4 h-4 text-rose-500" />
            <h3 className="font-serif font-bold text-base text-stone-900">
              2. Profil Kedua Mempelai
            </h3>
          </div>

          {/* Mempelai Pria */}
          <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-4">
            <h4 className="text-xs font-bold text-[#844307] uppercase">Mempelai Pria (The Groom)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-stone-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  placeholder="Ozy Zulkarnain, S.Kom."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-700 mb-1">Nama Panggilan</label>
                <input
                  type="text"
                  value={groomNickname}
                  onChange={(e) => setGroomNickname(e.target.value)}
                  placeholder="Ozy"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-700 mb-1">Nama Ayah</label>
                <input
                  type="text"
                  value={groomFather}
                  onChange={(e) => setGroomFather(e.target.value)}
                  placeholder="Bpk. Hendra Wibowo"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-700 mb-1">Nama Ibu</label>
                <input
                  type="text"
                  value={groomMother}
                  onChange={(e) => setGroomMother(e.target.value)}
                  placeholder="Ibu Wirda Wahyuni"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-stone-700 mb-1">Akun Instagram (Opsional)</label>
                <input
                  type="text"
                  value={groomInstagram}
                  onChange={(e) => setGroomInstagram(e.target.value)}
                  placeholder="@ozyzulkarnain"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                />
              </div>
            </div>
            <ImageUploader
              label="Foto Mempelai Pria (Choose File)"
              bucket="covers"
              value={groomPhotoUrl}
              onChange={setGroomPhotoUrl}
            />
          </div>

          {/* Mempelai Wanita */}
          <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200/60 space-y-4">
            <h4 className="text-xs font-bold text-rose-700 uppercase">Mempelai Wanita (The Bride)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-stone-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  placeholder="Zelda Wulandari, S.Ked."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-700 mb-1">Nama Panggilan</label>
                <input
                  type="text"
                  value={brideNickname}
                  onChange={(e) => setBrideNickname(e.target.value)}
                  placeholder="Zelda"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-700 mb-1">Nama Ayah</label>
                <input
                  type="text"
                  value={brideFather}
                  onChange={(e) => setBrideFather(e.target.value)}
                  placeholder="Bpk. Daniswara Permadi"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-700 mb-1">Nama Ibu</label>
                <input
                  type="text"
                  value={brideMother}
                  onChange={(e) => setBrideMother(e.target.value)}
                  placeholder="Ibu Yuliana Lestari"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-stone-700 mb-1">Akun Instagram (Opsional)</label>
                <input
                  type="text"
                  value={brideInstagram}
                  onChange={(e) => setBrideInstagram(e.target.value)}
                  placeholder="@zeldawulandari"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                />
              </div>
            </div>
            <ImageUploader
              label="Foto Mempelai Wanita (Choose File)"
              bucket="covers"
              value={bridePhotoUrl}
              onChange={setBridePhotoUrl}
            />
          </div>
        </div>

        {/* SECTION 3: KUTIPAN & AYAT SUCI */}
        <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <BookOpen className="w-4 h-4 text-[#844307]" />
            <h3 className="font-serif font-bold text-base text-stone-900">
              3. Ayat Suci &amp; Doa Pernikahan (Surat Ar-Rum / Kutipan)
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Lafadz Arab (Opsional)</label>
            <textarea
              rows={2}
              value={quoteArabic}
              onChange={(e) => setQuoteArabic(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-right font-serif"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Terjemahan Ayat / Kalimat Mutiara</label>
            <textarea
              rows={3}
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Sumber Kutipan</label>
            <input
              type="text"
              value={quoteSource}
              onChange={(e) => setQuoteSource(e.target.value)}
              placeholder="QS. Ar-Rum: 21"
              className="w-full sm:w-64 px-3 py-2 rounded-xl border border-stone-300 text-xs"
            />
          </div>
        </div>

        {/* SECTION 4: KISAH PERJALANAN CINTA */}
        <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#844307]" />
              <h3 className="font-serif font-bold text-base text-stone-900">
                4. Kisah Perjalanan Cinta (Love Story Timeline)
              </h3>
            </div>
            <button
              type="button"
              onClick={addStory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-black cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Momen</span>
            </button>
          </div>

          <div className="space-y-4">
            {stories.map((story, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 relative">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <span className="text-xs font-bold text-stone-800">Momen #{idx + 1}</span>
                  {stories.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStory(idx)}
                      className="text-stone-400 hover:text-red-600 transition-colors"
                      title="Hapus momen ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">Tahun / Waktu</label>
                    <input
                      type="text"
                      placeholder="2021 / 14 Februari"
                      value={story.year}
                      onChange={(e) => updateStory(idx, "year", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">Judul Momen</label>
                    <input
                      type="text"
                      placeholder="Pertama Kali Bertemu"
                      value={story.title}
                      onChange={(e) => updateStory(idx, "title", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-700 mb-1">Kisah Cerita</label>
                  <textarea
                    rows={2}
                    placeholder="Ceritakan momen indah perjalanan cinta..."
                    value={story.description}
                    onChange={(e) => updateStory(idx, "description", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                  />
                </div>

                <ImageUploader
                  label="Foto Kenangan Momen Ini (Choose File - Opsional)"
                  bucket="covers"
                  value={story.image_url || ""}
                  onChange={(val) =>
                    updateStory(idx, "image_url", typeof val === "string" ? val : val[0] || "")
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: GALERI FOTO & VIDEO PREWEDDING */}
        <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Video className="w-4 h-4 text-[#844307]" />
            <h3 className="font-serif font-bold text-base text-stone-900">
              5. Galeri Foto &amp; Video Prewedding
            </h3>
          </div>

          <ImageUploader
            label={`Foto Galeri Prewedding (Maksimal ${MAX_GALLERY_PHOTOS} Foto)`}
            bucket="galleries"
            multiple={true}
            maxFiles={MAX_GALLERY_PHOTOS}
            value={galleryUrls}
            onChange={setGalleryUrls}
            helperText="Pilih foto dari komputer/HP. Foto otomatis dikompresi ke format WebP berkualitas tinggi."
          />

          {galleryUrls.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
              {galleryUrls.map((url, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-stone-200 group">
                  <Image src={url} alt={`Galeri ${i + 1}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryUrl(i)}
                    className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="pt-3 border-t border-stone-100 space-y-1.5">
            <label className="block text-xs font-semibold text-stone-800 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-red-600" />
              <span>Tautan Video Prewedding (YouTube - Opsional)</span>
            </label>
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=... atau https://youtu.be/..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs bg-stone-50/50"
            />
          </div>
        </div>

        {/* SECTION 6: MUSIK LATAR UNDANGAN */}
        <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Music className="w-4 h-4 text-[#844307]" />
            <h3 className="font-serif font-bold text-base text-stone-900">
              6. Musik Latar Undangan (Upload MP3 / Audio File)
            </h3>
          </div>
          <AudioUploader
            value={customMusicUrl}
            onChange={setCustomMusicUrl}
            label="File Audio Musik Template (Pilih File MP3 / Audio)"
          />
        </div>

        {/* SECTION 7: AMPLOP DIGITAL (REKENING & QRIS) */}
        <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#844307]" />
              <h3 className="font-serif font-bold text-base text-stone-900">
                7. Amplop Digital: Rekening Bank &amp; Barcode QRIS
              </h3>
            </div>
            <button
              type="button"
              onClick={addBankAccount}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-black cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Rekening</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#844307]" />
              <span className="text-xs font-bold text-[#844307] uppercase">Barcode QRIS Utama</span>
            </div>
            <ImageUploader
              label="Pilih File Gambar Barcode QRIS (Choose File)"
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
                      className="text-stone-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Nama Bank (BCA / Mandiri / GoPay)"
                    value={acc.bank_name}
                    onChange={(e) => updateBankAccount(idx, "bank_name", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Nomor Rekening / No. HP"
                    value={acc.account_number}
                    onChange={(e) => updateBankAccount(idx, "account_number", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Atas Nama Pemilik"
                    value={acc.account_holder}
                    onChange={(e) => updateBankAccount(idx, "account_holder", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT BUTTON BAR */}
        <div className="sticky bottom-6 z-30 p-4 rounded-2xl bg-stone-900/95 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 border border-stone-700">
          <div className="text-white text-xs">
            <p className="font-semibold text-amber-300">Menyesuaikan Tampilan Katalog Website Customer</p>
            <p className="text-stone-400 text-[11px]">
              Tersimpan langsung ke database Supabase dan aktif di pratinjau live demo.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/admin/templates"
              className="px-4 py-2.5 rounded-xl border border-stone-700 text-stone-300 hover:text-white text-xs font-semibold text-center w-full sm:w-auto"
            >
              Batal
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white text-xs font-bold shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer w-full sm:w-auto"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? "Menyimpan ke Database..." : "Simpan Template Website Customer"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

