"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Calendar,
  Image as ImageIcon,
  MapPin,
  Save,
  CheckCircle,
  AlertCircle,
  Trash2,
  Plus,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Paintbrush,
  Sliders,
  Send,
  Globe,
  Layers,
  Search,
  Check,
  BookOpen,
  QrCode,
  Gift,
  Music,
  Video,
} from "lucide-react";
import { getAllRegisteredTemplates, getTemplateByKey } from "@/templates/registry";
import { isValidSlug, slugify } from "@/lib/utils";
import { MAX_GALLERY_PHOTOS } from "@/lib/constants";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { AudioUploader } from "@/components/admin/AudioUploader";
import templatePresetsData from "@/data/template-presets.json";
import { BankAccount, LoveStory } from "@/types/database";

function NewInvitationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryTemplate = searchParams.get("template");

  const allTemplates = getAllRegisteredTemplates();

  // State: Selected template key (if null, show the visual catalog selector)
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string | null>(
    queryTemplate && getTemplateByKey(queryTemplate) ? queryTemplate : null
  );

  // Catalog search & filter states
  const [catalogCategory, setCatalogCategory] = useState<string>("all");
  const [catalogSearch, setCatalogSearch] = useState<string>("");

  // Form states
  const [slug, setSlug] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");

  // Dynamic template theme config
  const [themeConfig, setThemeConfig] = useState<Record<string, any>>({});

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

  // Quote / Surat Ar-Rum / Ayat Suci
  const [quoteArabic, setQuoteArabic] = useState(
    "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ"
  );
  const [quoteText, setQuoteText] = useState(
    "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
  );
  const [quoteSource, setQuoteSource] = useState("QS. Ar-Rum: 21");

  // Kisah Perjalanan Cinta (Love Story Timeline)
  const [stories, setStories] = useState<LoveStory[]>([
    {
      year: "2021",
      title: "Pertama Kali Bertemu",
      description: "Awal perjumpaan kami di bangku perkuliahan, berawal dari tatapan ramah dan obrolan hangat yang menumbuhkan rasa ketertarikan satu sama lain.",
      image_url: "",
    },
    {
      year: "2023",
      title: "Menjalin Komitmen",
      description: "Setelah saling memahami karakter dan saling mendukung impian masing-masing, kami sepakat melangkah bersama dalam jalinan komitmen yang serius.",
      image_url: "",
    },
    {
      year: "2026",
      title: "Lamaran & Menuju Hari Bahagia",
      description: "Dengan memohon doa restu kedua orang tua dan keluarga besar, kami mengikat janji suci untuk melangkah bersama mengarungi bahtera rumah tangga.",
      image_url: "",
    },
  ]);

  // Events
  const [akadLocation, setAkadLocation] = useState("");
  const [akadAddress, setAkadAddress] = useState("");
  const [akadTime, setAkadTime] = useState("08:00 - 10:00 WIB");
  const [akadMaps, setAkadMaps] = useState("");

  const [resepsiLocation, setResepsiLocation] = useState("");
  const [resepsiAddress, setResepsiAddress] = useState("");
  const [resepsiTime, setResepsiTime] = useState("11:00 - 14:00 WIB");
  const [resepsiMaps, setResepsiMaps] = useState("");

  // Bank Accounts (Bisa lebih dari satu)
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      bank_name: "BCA",
      account_number: "8830192810",
      account_holder: "Kayla Anandita",
      qr_code_url: "",
    },
    {
      bank_name: "Bank Mandiri",
      account_number: "1370019283912",
      account_holder: "Arka Dananjaya",
      qr_code_url: "",
    },
  ]);

  // QRIS Pembayaran Digital Utama
  const [qrisImageUrl, setQrisImageUrl] = useState("");

  // Video Prewedding (YouTube / Video URL)
  const [videoUrl, setVideoUrl] = useState("");

  // Custom Audio / Background Music
  const [customMusicUrl, setCustomMusicUrl] = useState("");

  // Gallery URLs (up to 10)
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);

  // Feedback states
  const [submittingAction, setSubmittingAction] = useState<"template_preset" | "draft" | "published" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successToast, setSuccessToast] = useState("");
  const [slugError, setSlugError] = useState("");

  // When a template is selected, auto-fill with its preset data
  const applyTemplatePreset = (key: string) => {
    setSelectedTemplateKey(key);
    const tpl = getTemplateByKey(key);
    const presets = templatePresetsData as Record<string, any>;
    const preset = presets[key];

    if (preset) {
      setTitle(preset.title || `The Wedding of ${preset.groom?.nickname || "Groom"} & ${preset.bride?.nickname || "Bride"}`);
      setCustomerName(preset.customer_name || "Referensi Katalog");
      setCustomerPhone(preset.customer_phone || "08123456789");
      setCoverImageUrl(preset.cover_image_url || tpl.thumbnailUrl);
      setThemeConfig(preset.theme_config || tpl.defaultThemeConfig || {});

      if (preset.groom) {
        setGroomName(preset.groom.name || "");
        setGroomNickname(preset.groom.nickname || "");
        setGroomFather(preset.groom.father_name || "");
        setGroomMother(preset.groom.mother_name || "");
        setGroomInstagram(preset.groom.instagram || "");
        setGroomPhotoUrl(preset.groom.photo_url || "");
      }

      if (preset.bride) {
        setBrideName(preset.bride.name || "");
        setBrideNickname(preset.bride.nickname || "");
        setBrideFather(preset.bride.father_name || "");
        setBrideMother(preset.bride.mother_name || "");
        setBrideInstagram(preset.bride.instagram || "");
        setBridePhotoUrl(preset.bride.photo_url || "");
      }

      if (preset.quote) {
        setQuoteText(preset.quote.text || "");
        setQuoteSource(preset.quote.source || "");
        setQuoteArabic(preset.quote.arabic_text || "");
      }

      if (preset.stories && Array.isArray(preset.stories) && preset.stories.length > 0) {
        setStories(preset.stories);
      }

      if (preset.bank_accounts && Array.isArray(preset.bank_accounts) && preset.bank_accounts.length > 0) {
        setBankAccounts(preset.bank_accounts);
      }

      if (preset.qris_image_url) {
        setQrisImageUrl(preset.qris_image_url);
      }

      if (preset.video_url) {
        setVideoUrl(preset.video_url);
      } else {
        setVideoUrl("");
      }

      if (preset.custom_music_url) {
        setCustomMusicUrl(preset.custom_music_url);
      } else {
        setCustomMusicUrl("");
      }

      // Default sample date 30 days ahead
      const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().split("T")[0];
      setEventDate(futureDate);

      // Default slug from nicknames
      if (preset.groom?.nickname && preset.bride?.nickname) {
        setSlug(slugify(`${preset.groom.nickname}-dan-${preset.bride.nickname}`));
      }

      // Default sample locations
      setAkadLocation("Masjid Agung At-Tin / Tempat Ibadah");
      setAkadAddress("Jl. Taman Mini I No.3, Jakarta Timur");
      setResepsiLocation("Grand Ballroom Hotel Kempinski");
      setResepsiAddress("Jl. M.H. Thamrin No.1, Menteng, Jakarta Pusat");

      // Default sample gallery photos
      setGalleryUrls([
        preset.cover_image_url || tpl.thumbnailUrl,
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      ]);
    } else {
      setThemeConfig(tpl.defaultThemeConfig || {});
      setCoverImageUrl(tpl.thumbnailUrl);
    }
  };

  useEffect(() => {
    if (queryTemplate && getTemplateByKey(queryTemplate)) {
      applyTemplatePreset(queryTemplate);
    }
  }, [queryTemplate]);

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

  const removeGalleryUrl = (idx: number) => {
    setGalleryUrls(galleryUrls.filter((_, i) => i !== idx));
  };

  // Story management
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

  // Bank accounts management
  const addBankAccount = () => {
    setBankAccounts([
      ...bankAccounts,
      {
        bank_name: "BCA",
        account_number: "",
        account_holder: brideName || "Mempelai",
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
      alert("Minimal satu akun bank/e-wallet.");
      return;
    }
    setBankAccounts(bankAccounts.filter((_, i) => i !== index));
  };

  // Quote preset helpers
  const setArRumPreset = () => {
    setQuoteArabic(
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ"
    );
    setQuoteText(
      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
    );
    setQuoteSource("QS. Ar-Rum: 21");
  };

  const setBiblicalPreset = () => {
    setQuoteArabic("");
    setQuoteText(
      "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong. Demikianlah tinggal ketiga hal ini, yaitu iman, pengharapan dan kasih, dan yang paling besar di antaranya ialah kasih."
    );
    setQuoteSource("1 Korintus 13:4, 13");
  };

  const setJavanesePreset = () => {
    setQuoteArabic("");
    setQuoteText(
      "Ngluruk tanpa bala, menang tanpa ngasorake, sekti tanpa aji-aji, sugih tanpa bandha. Memayu hayuning bawana, tresna asih ing salaminya."
    );
    setQuoteSource("Serat Kalatidha & Pitutur Luhur");
  };

  const handleThemeConfigChange = (key: string, value: any) => {
    setThemeConfig((prev) => ({ ...prev, [key]: value }));
  };

  // ========================================================
  // ACTION 1: SIMPAN SEBAGAI TEMPLATE / REFERENSI KATALOG
  // ========================================================
  const handleSaveAsTemplatePreset = async () => {
    if (!selectedTemplateKey) return;
    setSubmittingAction("template_preset");
    setErrorMessage("");
    setSuccessToast("");

    try {
      const presetPayload = {
        template_key: selectedTemplateKey,
        preset_data: {
          title,
          customer_name: customerName || "Referensi Katalog Ulemanesia",
          customer_phone: customerPhone || "08123456789",
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
          stories: stories,
          bank_accounts: bankAccounts,
          qris_image_url: qrisImageUrl || null,
          video_url: videoUrl || null,
          custom_music_url: customMusicUrl || null,
        },
      };

      const res = await fetch("/api/templates/preset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(presetPayload),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Gagal menyimpan referensi template.");
      } else {
        setSuccessToast(
          `✨ Sukses! Konfigurasi ini telah disimpan sebagai MASTER TEMPLATE & referensi katalog web customer untuk "${getTemplateByKey(selectedTemplateKey).name}". Tidak ada undangan klien yang diterbitkan.`
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setErrorMessage("Terjadi kesalahan jaringan saat menyimpan referensi template.");
    } finally {
      setSubmittingAction(null);
    }
  };

  // ========================================================
  // ACTION 2 & 3: SIMPAN SEBAGAI UNDANGAN KLIEN (DRAFT / PUBLISH)
  // (TIDAK MENGUBAH MASTER TEMPLATE!)
  // ========================================================
  const handleSaveClientInvitation = async (status: "draft" | "published") => {
    if (!selectedTemplateKey) return;

    // Validate client specifics
    const slugCheck = isValidSlug(slug);
    if (!slugCheck.valid) {
      setErrorMessage(slugCheck.error || "Slug URL undangan klien tidak valid.");
      return;
    }

    if (!title || !customerName || !customerPhone || !eventDate) {
      setErrorMessage("Mohon lengkapi judul, nama customer, nomor WhatsApp customer, dan tanggal acara.");
      return;
    }

    setSubmittingAction(status);
    setErrorMessage("");
    setSuccessToast("");

    try {
      const payload = {
        slug,
        template_key: selectedTemplateKey,
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
          quote: quoteText
            ? { text: quoteText, source: quoteSource || "QS. Ar-Rum: 21", arabic_text: quoteArabic }
            : undefined,
          countdown_target: new Date(eventDate).toISOString(),
          events: [
            {
              title: "Akad Nikah / Pemberkatan",
              date: new Date(eventDate).toISOString(),
              start_time: akadTime.split("-")[0]?.trim() || "08:00",
              end_time: akadTime.split("-")[1]?.trim() || "10:00",
              location_name: akadLocation,
              address: akadAddress,
              google_maps_url: akadMaps,
            },
            {
              title: "Resepsi Pernikahan",
              date: new Date(eventDate).toISOString(),
              start_time: resepsiTime.split("-")[0]?.trim() || "11:00",
              end_time: resepsiTime.split("-")[1]?.trim() || "14:00",
              location_name: resepsiLocation,
              address: resepsiAddress,
              google_maps_url: resepsiMaps,
            },
          ],
          gallery: galleryUrls,
          video_url: videoUrl || null,
          custom_music_url: customMusicUrl || null,
          stories: stories.filter((s) => s.title.trim() || s.description.trim()),
          bank_accounts: bankAccounts.filter((b) => b.account_number.trim()),
          qris_image_url: qrisImageUrl || null,
          theme_config: themeConfig,
          theme_options: themeConfig,
        },
      };

      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Gagal menyimpan undangan klien.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setErrorMessage("Terjadi kesalahan jaringan saat menyimpan undangan klien.");
    } finally {
      setSubmittingAction(null);
    }
  };

  // Filter templates in catalog selector
  const catalogCategories = [
    { key: "all", label: "Semua Desain" },
    { key: "Editorial Photo", label: "Editorial Photo" },
    { key: "Adat Jawa", label: "Adat Jawa" },
    { key: "Islami", label: "Islami" },
    { key: "Bali & Tropis", label: "Bali & Tropis" },
    { key: "Rustic Boho", label: "Rustic Boho" },
    { key: "Oriental", label: "Oriental" },
    { key: "Modern", label: "Modern Luxury" },
    { key: "Floral", label: "Botanical Floral" },
  ];

  const filteredCatalogTemplates = allTemplates.filter((tpl) => {
    const matchesCategory =
      catalogCategory === "all" ||
      (tpl.category && tpl.category.toLowerCase().includes(catalogCategory.toLowerCase()));

    const matchesSearch =
      tpl.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      tpl.description.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      tpl.tags.some((tag) => tag.toLowerCase().includes(catalogSearch.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // =========================================================================
  // STEP 1: VISUAL TEMPLATE CATALOG SELECTOR
  // =========================================================================
  if (!selectedTemplateKey) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto pb-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </Link>
          <span className="text-xs font-semibold text-stone-500">
            Langkah 1: Pilih Desain dari Katalog
          </span>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-[#844307] text-xs font-bold uppercase tracking-wider border border-amber-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pilih Template Undangan</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">
            Katalog Desain Template
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-2xl leading-relaxed">
            Pilih salah satu template di bawah untuk disesuaikan. Anda dapat menyimpannya sebagai{" "}
            <strong className="text-stone-700">referensi tampilan katalog web customer</strong>, atau langsung mempublikasikan{" "}
            <strong className="text-stone-700">undangan pernikahan klien resmi</strong>.
          </p>
        </div>

        {/* Filter Pills & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {catalogCategories.map((cat) => {
              const count =
                cat.key === "all"
                  ? allTemplates.length
                  : allTemplates.filter((t) =>
                      t.category?.toLowerCase().includes(cat.key.toLowerCase())
                    ).length;
              if (count === 0 && cat.key !== "all") return null;

              const isActive = catalogCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setCatalogCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#844307] text-white shadow-xs font-semibold"
                      : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari tema, adat, atau kata kunci..."
              value={catalogSearch}
              onChange={(e) => setCatalogSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-[#844307] shadow-2xs"
            />
          </div>
        </div>

        {/* Catalog Grid with Smartphone Mockups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredCatalogTemplates.map((tpl) => (
            <div
              key={tpl.key}
              className="bg-white rounded-3xl border border-stone-200 hover:border-amber-500/50 shadow-xs hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between group"
            >
              {/* Smartphone Mockup Frame */}
              <div className="flex flex-col items-center">
                <div className="w-[200px] h-[330px] rounded-[36px] border-[6px] border-[#18181b] shadow-lg relative overflow-hidden bg-stone-900 group-hover:scale-[1.02] transition-transform duration-500">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-[#18181b] rounded-b-xl z-20 flex items-center justify-center gap-1.5 pointer-events-none">
                    <div className="w-6 h-0.5 bg-stone-700 rounded-full" />
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-800" />
                  </div>

                  {/* Thumbnail Image */}
                  <div className="w-full h-full relative overflow-hidden bg-stone-950">
                    <Image
                      src={tpl.thumbnailUrl}
                      alt={tpl.name}
                      fill
                      sizes="200px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

                    {/* Badge */}
                    <div className="absolute top-5 left-3 right-3 flex items-center justify-between z-10">
                      <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[9px] font-bold uppercase tracking-wider border border-white/20">
                        {tpl.category}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-center text-white space-y-1 z-10">
                      <p className="text-[10px] font-medium text-amber-200 tracking-wider uppercase font-serif line-clamp-1">
                        {tpl.subtitle}
                      </p>
                      <p className="font-serif font-bold text-sm text-white line-clamp-1">
                        {tpl.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info & Button */}
              <div className="pt-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#844307] transition-colors">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => applyTemplatePreset(tpl.key)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#844307] to-[#9e5108] hover:from-[#6d3505] hover:to-[#844307] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <Paintbrush className="w-3.5 h-3.5" />
                    <span>Sesuaikan Template</span>
                  </button>

                  <Link
                    href={`/demo/${tpl.key}`}
                    target="_blank"
                    className="p-2.5 rounded-xl border border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium transition-all shadow-2xs hover:scale-105"
                    title="Buka Demo Live di Tab Baru"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // STEP 2: TEMPLATE CUSTOMIZER STUDIO
  // =========================================================================
  const currentTpl = getTemplateByKey(selectedTemplateKey);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24">
      {/* Top Banner & Template Swapper */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-3xl border border-stone-200/90 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-amber-600/30 shrink-0 bg-stone-900">
            <Image
              src={coverImageUrl || currentTpl.thumbnailUrl}
              alt={currentTpl.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-[#844307] text-[10px] font-bold uppercase tracking-wider border border-amber-200">
                {currentTpl.category}
              </span>
              <span className="text-[11px] text-stone-400">Template Terpilih</span>
            </div>
            <h2 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
              {currentTpl.name}
            </h2>
            <p className="text-xs text-stone-500">{currentTpl.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setSelectedTemplateKey(null)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 hover:border-stone-400 bg-white text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ganti Template Lain</span>
          </button>

          <Link
            href={`/demo/${currentTpl.key}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold transition-all shadow-xs"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </Link>
        </div>
      </div>

      {/* Notifications */}
      {errorMessage && (
        <div className="p-4 bg-red-50 text-red-700 text-xs rounded-2xl border border-red-200 flex items-start gap-2 shadow-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successToast && (
        <div className="p-4 bg-emerald-50 text-emerald-800 text-xs rounded-2xl border border-emerald-300 flex items-start gap-2 shadow-xs animate-fade-in-up">
          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
          <span className="leading-relaxed">{successToast}</span>
        </div>
      )}

      {/* Main Customizer Form Cards */}
      <div className="space-y-8">
        {/* ======================================================== */}
        {/* SECTION 1: KUSTOMISASI VISUAL DINAMIS KHUSUS TEMPLATE   */}
        {/* ======================================================== */}
        {currentTpl.customFields && currentTpl.customFields.length > 0 && (
          <div className="p-6 sm:p-8 bg-amber-50/70 rounded-3xl border border-amber-200/90 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#844307]" />
                <h3 className="font-serif font-bold text-base text-[#844307]">
                  1. Kustomisasi Visual Dinamis: {currentTpl.name}
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-[#844307] bg-white px-2.5 py-0.5 rounded-full border border-amber-200">
                Fitur Spesifik Template
              </span>
            </div>

            <p className="text-xs text-stone-600">
              Ubah latar belakang, gaya ornamen, format salam, dan tulisan tagline khusus template ini:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentTpl.customFields.map((field) => (
                <div key={field.key} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    {field.label}
                  </label>

                  {field.type === "select" ? (
                    <select
                      value={themeConfig[field.key] ?? field.defaultValue ?? ""}
                      onChange={(e) => handleThemeConfigChange(field.key, e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-800 focus:outline-hidden focus:border-[#844307]"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-800 focus:outline-hidden focus:border-[#844307]"
                    />
                  ) : field.type === "image" ? (
                    <ImageUploader
                      label={field.label}
                      bucket="covers"
                      value={themeConfig[field.key] ?? ""}
                      onChange={(val) =>
                        handleThemeConfigChange(
                          field.key,
                          typeof val === "string" ? val : val[0] || ""
                        )
                      }
                      helperText="Pilih file gambar dari laptop/HP Anda. Otomatis dikompresi ke WebP."
                    />
                  ) : (
                    <input
                      type="text"
                      value={themeConfig[field.key] ?? field.defaultValue ?? ""}
                      onChange={(e) => handleThemeConfigChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-800 focus:outline-hidden focus:border-[#844307]"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION 2: FOTO COVER & JUDUL UNDANGAN                  */}
        {/* ======================================================== */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-stone-200/90 shadow-xs space-y-6">
          <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#844307]" />
            <span>2. Foto Cover Utama &amp; Judul Undangan</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Judul Undangan
              </label>
              <input
                type="text"
                placeholder="Contoh: The Wedding of Arka & Kayla"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-[#844307]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Foto Cover Vertikal (HD)
              </label>
              <ImageUploader
                label="Unggah Foto Cover (Otomatis Kompres WebP)"
                bucket="covers"
                value={coverImageUrl}
                onChange={(val) => setCoverImageUrl(typeof val === "string" ? val : val[0] || "")}
                helperText="Foto cover vertikal beresolusi tinggi, otomatis dikompres ke WebP."
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 3: DATA KEDUA MEMPELAI                          */}
        {/* ======================================================== */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-stone-200/90 shadow-xs space-y-6">
          <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>3. Profil Kedua Mempelai</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mempelai Pria */}
            <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200/80 space-y-4">
              <h4 className="font-serif font-bold text-sm text-stone-900 border-b border-stone-200 pb-2">
                Mempelai Pria
              </h4>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Nama Lengkap &amp; Gelar
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Arka Dananjaya, S.T"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs focus:border-[#844307]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Nama Panggilan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Arka"
                  value={groomNickname}
                  onChange={(e) => setGroomNickname(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs focus:border-[#844307]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Nama Ayah</label>
                  <input
                    type="text"
                    placeholder="Bpk. Bambang"
                    value={groomFather}
                    onChange={(e) => setGroomFather(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs focus:border-[#844307]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Nama Ibu</label>
                  <input
                    type="text"
                    placeholder="Ibu Sri"
                    value={groomMother}
                    onChange={(e) => setGroomMother(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs focus:border-[#844307]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Instagram</label>
                <input
                  type="text"
                  placeholder="@arkadananjaya"
                  value={groomInstagram}
                  onChange={(e) => setGroomInstagram(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs focus:border-[#844307]"
                />
              </div>

              <ImageUploader
                label="Foto Mempelai Pria"
                bucket="covers"
                value={groomPhotoUrl}
                onChange={(val) => setGroomPhotoUrl(typeof val === "string" ? val : val[0] || "")}
              />
            </div>

            {/* Mempelai Wanita */}
            <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200/80 space-y-4">
              <h4 className="font-serif font-bold text-sm text-stone-900 border-b border-stone-200 pb-2">
                Mempelai Wanita
              </h4>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Nama Lengkap &amp; Gelar
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Kayla Anandita, S.Ds"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs focus:border-[#844307]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Nama Panggilan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Kayla"
                  value={brideNickname}
                  onChange={(e) => setBrideNickname(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs focus:border-[#844307]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Nama Ayah</label>
                  <input
                    type="text"
                    placeholder="Bpk. Hendro"
                    value={brideFather}
                    onChange={(e) => setBrideFather(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs focus:border-[#844307]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Nama Ibu</label>
                  <input
                    type="text"
                    placeholder="Ibu Ratna"
                    value={brideMother}
                    onChange={(e) => setBrideMother(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs focus:border-[#844307]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Instagram</label>
                <input
                  type="text"
                  placeholder="@kaylaanandita"
                  value={brideInstagram}
                  onChange={(e) => setBrideInstagram(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs focus:border-[#844307]"
                />
              </div>

              <ImageUploader
                label="Foto Mempelai Wanita"
                bucket="covers"
                value={bridePhotoUrl}
                onChange={(val) => setBridePhotoUrl(typeof val === "string" ? val : val[0] || "")}
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 4: AYAT SUCI & KUTIPAN UNDANGAN (SURAT AR-RUM)   */}
        {/* ======================================================== */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-stone-200/90 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-3 gap-2">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#844307]" />
              <span>4. Ayat Suci &amp; Kutipan Undangan (Surat Ar-Rum / Doa)</span>
            </h3>
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-stone-500 font-medium mr-1">Pilih Preset:</span>
              <button
                type="button"
                onClick={setArRumPreset}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-semibold hover:bg-emerald-100 border border-emerald-200 cursor-pointer"
              >
                QS. Ar-Rum: 21 (Islami)
              </button>
              <button
                type="button"
                onClick={setBiblicalPreset}
                className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 text-[11px] font-semibold hover:bg-rose-100 border border-rose-200 cursor-pointer"
              >
                1 Korintus 13 (Nasrani)
              </button>
              <button
                type="button"
                onClick={setJavanesePreset}
                className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-[11px] font-semibold hover:bg-amber-100 border border-amber-200 cursor-pointer"
              >
                Pitutur Luhur (Jawa)
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Lafadz / Teks Arab (Opsional)
              </label>
              <textarea
                rows={2}
                placeholder="وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا..."
                value={quoteArabic}
                onChange={(e) => setQuoteArabic(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-right font-serif focus:border-[#844307]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Terjemahan / Teks Kutipan Pernikahan
              </label>
              <textarea
                rows={3}
                placeholder="Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu..."
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:border-[#844307]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Sumber / Nama Surat (Contoh: QS. Ar-Rum: 21)
              </label>
              <input
                type="text"
                placeholder="QS. Ar-Rum: 21"
                value={quoteSource}
                onChange={(e) => setQuoteSource(e.target.value)}
                className="w-full sm:w-80 px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:border-[#844307]"
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 5: RANGKAIAN ACARA                              */}
        {/* ======================================================== */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-stone-200/90 shadow-xs space-y-6">
          <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#844307]" />
            <span>5. Rangkaian Acara (Waktu &amp; Lokasi)</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tanggal Utama Pernikahan
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:border-[#844307]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Akad */}
              <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-3">
                <span className="text-xs font-bold text-[#844307] uppercase">Acara 1: Akad / Ibadah</span>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Waktu</label>
                  <input
                    type="text"
                    value={akadTime}
                    onChange={(e) => setAkadTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Nama Tempat / Gedung</label>
                  <input
                    type="text"
                    value={akadLocation}
                    onChange={(e) => setAkadLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Alamat Lengkap</label>
                  <input
                    type="text"
                    value={akadAddress}
                    onChange={(e) => setAkadAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">URL Google Maps</label>
                  <input
                    type="text"
                    value={akadMaps}
                    onChange={(e) => setAkadMaps(e.target.value)}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs"
                  />
                </div>
              </div>

              {/* Resepsi */}
              <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-3">
                <span className="text-xs font-bold text-[#844307] uppercase">Acara 2: Resepsi / Syukuran</span>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Waktu</label>
                  <input
                    type="text"
                    value={resepsiTime}
                    onChange={(e) => setResepsiTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Nama Tempat / Gedung</label>
                  <input
                    type="text"
                    value={resepsiLocation}
                    onChange={(e) => setResepsiLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Alamat Lengkap</label>
                  <input
                    type="text"
                    value={resepsiAddress}
                    onChange={(e) => setResepsiAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">URL Google Maps</label>
                  <input
                    type="text"
                    value={resepsiMaps}
                    onChange={(e) => setResepsiMaps(e.target.value)}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 6: KISAH PERJALANAN CINTA (LOVE STORY TIMELINE)  */}
        {/* ======================================================== */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-stone-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>6. Kisah Perjalanan Cinta (Love Story Timeline)</span>
            </h3>
            <button
              type="button"
              onClick={addStory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Momen Cinta</span>
            </button>
          </div>

          <p className="text-xs text-stone-600">
            Ceritakan perjalanan cinta kedua mempelai (misal: Pertama Bertemu, Menjalin Komitmen, hingga Lamaran). Foto momen menggunakan fitur Choose File.
          </p>

          <div className="space-y-6">
            {stories.map((story, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-4 relative"
              >
                <div className="flex items-center justify-between border-b border-stone-200/70 pb-2">
                  <span className="text-xs font-bold text-[#844307]">
                    Momen Cinta #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeStory(idx)}
                    className="text-stone-400 hover:text-red-600 transition-colors p-1"
                    title="Hapus Momen Ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Tahun / Waktu
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 2021 / 14 Feb 2021"
                      value={story.year}
                      onChange={(e) => updateStory(idx, "year", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs focus:border-[#844307]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Judul Momen
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Pertama Kali Bertemu"
                      value={story.title}
                      onChange={(e) => updateStory(idx, "title", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs focus:border-[#844307]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-700 mb-1">
                    Cerita / Narasi Singkat
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tuliskan cerita singkat momen berkesan ini..."
                    value={story.description}
                    onChange={(e) => updateStory(idx, "description", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs focus:border-[#844307]"
                  />
                </div>

                <div>
                  <ImageUploader
                    label="Foto Momen Ini (Choose File / Unggah)"
                    bucket="galleries"
                    value={story.image_url || ""}
                    onChange={(val) =>
                      updateStory(idx, "image_url", typeof val === "string" ? val : val[0] || "")
                    }
                    helperText="Pilih foto kenangan untuk momen ini (otomatis kompresi WebP)."
                  />
                </div>
              </div>
            ))}

            {stories.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-stone-200 rounded-2xl">
                <p className="text-xs text-stone-500 mb-2">Belum ada kisah cinta yang ditambahkan.</p>
                <button
                  type="button"
                  onClick={addStory}
                  className="px-4 py-2 bg-[#844307] text-white text-xs font-semibold rounded-xl hover:bg-[#6d3505]"
                >
                  + Tambah Momen Sekarang
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 7: GALERI FOTO PREWEDDING (CHOOSE FILE)          */}
        {/* ======================================================== */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-stone-200/90 shadow-xs space-y-6">
          <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#844307]" />
            <span>7. Galeri Foto Prewedding (Pilih File / Choose File)</span>
          </h3>

          <div className="space-y-4">
            <ImageUploader
              label={`Unggah Foto Galeri Prewedding (Maksimal ${MAX_GALLERY_PHOTOS} Foto)`}
              bucket="galleries"
              multiple={true}
              maxFiles={MAX_GALLERY_PHOTOS}
              value={galleryUrls}
              onChange={setGalleryUrls}
              helperText="Klik tombol di atas untuk memilih foto galeri dari laptop atau HP Anda (bisa pilih banyak foto sekaligus). Foto otomatis dikompresi ke format WebP berkualitas tinggi."
            />

            {galleryUrls.length > 0 && (
              <div className="pt-2">
                <p className="text-xs font-semibold text-stone-700 mb-2">
                  Foto yang Terunggah ({galleryUrls.length}/{MAX_GALLERY_PHOTOS}):
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {galleryUrls.map((url, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-xl overflow-hidden border border-stone-200 group shadow-xs"
                    >
                      <Image src={url} alt={`Galeri ${i + 1}`} fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryUrl(i)}
                        className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                        title="Hapus foto ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Prewedding (YouTube / Direct Video Link) */}
            <div className="pt-4 border-t border-stone-100 space-y-2">
              <label className="block text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-red-600" />
                <span>Tautan Video Prewedding (YouTube / MP4 - Opsional)</span>
              </label>
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=... atau https://youtu.be/..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:border-[#844307] bg-stone-50/50"
              />
              <p className="text-[11px] text-stone-500">
                Tempel tautan video YouTube momen prewedding Anda. Video akan disematkan elegan di galeri kenangan.
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 8: MUSIK LATAR & AUDIO BACKGROUND               */}
        {/* ======================================================== */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Music className="w-4 h-4 text-[#844307]" />
            <h3 className="font-serif font-bold text-base text-stone-900">
              8. Musik Latar Undangan (Upload File Musik / Preset Romantis)
            </h3>
          </div>
          <p className="text-xs text-stone-600">
            Pilih file musik mp3/wav dari perangkat Anda, atau pilih lagu dari daftar melodi romantis pilihan Ulemanesia.
          </p>
          <AudioUploader
            value={customMusicUrl}
            onChange={setCustomMusicUrl}
            label="File Audio Musik Undangan (Choose File / Upload MP3)"
          />
        </div>

        {/* ======================================================== */}
        {/* SECTION 9: REKENING TANDA KASIH & BARCODE QRIS          */}
        {/* ======================================================== */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-stone-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#844307]" />
              <span>9. Amplop Digital: Rekening Bank &amp; Gambar QRIS</span>
            </h3>
            <button
              type="button"
              onClick={addBankAccount}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Rekening</span>
            </button>
          </div>

          <p className="text-xs text-stone-600">
            Dukung lebih dari satu nomor rekening bank/e-wallet untuk memudahkan para tamu, serta upload gambar barcode QRIS.
          </p>

          {/* 1. Barcode QRIS Utama */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#844307]" />
              <h4 className="text-xs font-bold text-[#844307] uppercase">
                Barcode QRIS Pembayaran Digital Utama (All Bank &amp; E-Wallet)
              </h4>
            </div>
            <ImageUploader
              label="Pilih File Gambar Barcode QRIS (Choose File)"
              bucket="covers"
              value={qrisImageUrl}
              onChange={(val) => setQrisImageUrl(typeof val === "string" ? val : val[0] || "")}
              helperText="Unggah gambar screenshot atau file QRIS (BCA, Mandiri, GoPay, OVO, ShopeePay, DANA). Tamu dapat scan langsung dari HP."
            />
          </div>

          {/* 2. Daftar Nomor Rekening Bank */}
          <div className="space-y-4">
            <label className="block text-xs font-semibold text-stone-800">
              Daftar Rekening Bank &amp; Dompet Digital ({bankAccounts.length})
            </label>

            {bankAccounts.map((acc, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-3 relative"
              >
                <div className="flex items-center justify-between border-b border-stone-200/70 pb-2">
                  <span className="text-xs font-bold text-stone-800">
                    Rekening #{idx + 1}
                  </span>
                  {bankAccounts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBankAccount(idx)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-1"
                      title="Hapus Rekening Ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Nama Bank / E-Wallet
                    </label>
                    <input
                      type="text"
                      list="bank-options"
                      placeholder="Pilih atau ketik (BCA / Mandiri / BRI / DANA)"
                      value={acc.bank_name}
                      onChange={(e) => updateBankAccount(idx, "bank_name", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs focus:border-[#844307]"
                    />
                    <datalist id="bank-options">
                      <option value="BCA" />
                      <option value="Bank Mandiri" />
                      <option value="BRI" />
                      <option value="BNI" />
                      <option value="BSI (Bank Syariah Indonesia)" />
                      <option value="CIMB Niaga" />
                      <option value="Bank Permata" />
                      <option value="Bank Danamon" />
                      <option value="Bank BPD Bali" />
                      <option value="GoPay" />
                      <option value="OVO" />
                      <option value="DANA" />
                      <option value="ShopeePay" />
                    </datalist>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Nomor Rekening / No. HP
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 8830192810"
                      value={acc.account_number}
                      onChange={(e) => updateBankAccount(idx, "account_number", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs font-mono focus:border-[#844307]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Atas Nama (Pemilik Rekening)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Arka Dananjaya"
                      value={acc.account_holder}
                      onChange={(e) => updateBankAccount(idx, "account_holder", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs focus:border-[#844307]"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <ImageUploader
                    label={`Upload QRIS Rekening Ini (Opsional - ${acc.bank_name || "Bank"})`}
                    bucket="covers"
                    value={acc.qr_code_url || ""}
                    onChange={(val) =>
                      updateBankAccount(
                        idx,
                        "qr_code_url",
                        typeof val === "string" ? val : val[0] || ""
                      )
                    }
                    helperText="Jika ada QRIS khusus untuk rekening bank ini, silakan unggah gambarnya (Choose File)."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 10: DATA KLIEN & SLUG (KHUSUS UNDANGAN KLIEN)   */}
        {/* ======================================================== */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-stone-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600" />
              <h3 className="font-serif font-bold text-base text-stone-900">
                10. Data Klien &amp; Tautan Undangan (Khusus Penerbitan Klien)
              </h3>
            </div>
            <span className="text-[10px] bg-stone-100 text-stone-500 px-2.5 py-0.5 rounded-full">
              Wajib jika menerbitkan undangan klien
            </span>
          </div>

          <p className="text-xs text-stone-500">
            Jika Anda ingin menerbitkan undangan untuk klien/pemesan tertentu, lengkapi data kontak di bawah. Tautan undangan akan langsung aktif setelah dipublikasikan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Nama Customer / Pemesan
              </label>
              <input
                type="text"
                placeholder="Contoh: Bpk. Budi Santoso"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:border-[#844307]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                No. WhatsApp Customer (Format: 08xxx atau 628xxx)
              </label>
              <input
                type="tel"
                placeholder="08123456789"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:border-[#844307]"
              />
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-stone-700">
                  Slug URL Undangan (ulemanesia.com/...)
                </label>
                <button
                  type="button"
                  onClick={handleAutoSlug}
                  className="text-[11px] font-semibold text-[#844307] hover:underline cursor-pointer"
                >
                  Generate dari Nama Panggilan
                </button>
              </div>
              <div className="flex items-center rounded-xl border border-stone-300 overflow-hidden focus-within:border-[#844307]">
                <span className="px-3.5 py-2.5 bg-stone-100 text-stone-500 text-xs font-mono border-r border-stone-300 select-none">
                  ulemanesia.com/
                </span>
                <input
                  type="text"
                  placeholder="arka-dan-kayla"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs font-mono text-stone-900 focus:outline-hidden"
                />
              </div>
              {slugError && <p className="text-[11px] text-red-600 mt-1">{slugError}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 7. STICKY BOTTOM ACTION BAR (3 JALUR PENYIMPANAN)        */}
      {/* ======================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-4 sm:px-8 py-3.5 shadow-2xl">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <p className="text-xs font-bold text-stone-900">
              Pilih Tindakan Penyimpanan:
            </p>
            <p className="text-[11px] text-stone-500">
              Template: <span className="font-semibold text-[#844307]">{currentTpl.name}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {/* OPSI A: SIMPAN SEBAGAI TEMPLATE / REFERENSI KATALOG */}
            <button
              type="button"
              disabled={submittingAction !== null}
              onClick={handleSaveAsTemplatePreset}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-amber-900/20 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer disabled:opacity-50"
              title="Simpan konfigurasi ini sebagai master template dan referensi katalog web customer tanpa membuat undangan klien."
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>
                {submittingAction === "template_preset"
                  ? "Menyimpan Template..."
                  : "Simpan sebagai Template"}
              </span>
            </button>

            {/* OPSI B: SIMPAN DRAFT KLIEN */}
            <button
              type="button"
              disabled={submittingAction !== null}
              onClick={() => handleSaveClientInvitation("draft")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-98 cursor-pointer disabled:opacity-50"
              title="Simpan undangan klien sebagai draft (tidak mengubah master template)."
            >
              <Save className="w-3.5 h-3.5 text-stone-500" />
              <span>
                {submittingAction === "draft" ? "Menyimpan Draft..." : "Simpan Draft Klien"}
              </span>
            </button>

            {/* OPSI C: PUBLIKASIKAN UNDANGAN KLIEN */}
            <button
              type="button"
              disabled={submittingAction !== null}
              onClick={() => handleSaveClientInvitation("published")}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold shadow-md shadow-emerald-900/20 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer disabled:opacity-50"
              title="Publikasikan undangan aktif 3 bulan untuk customer. Tidak mengubah master template."
            >
              <Send className="w-3.5 h-3.5 text-emerald-200" />
              <span>
                {submittingAction === "published"
                  ? "Mempublikasikan..."
                  : "Publikasikan Undangan Klien"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewInvitationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh] text-stone-500 text-sm">
          Memuat studio pembuatan undangan...
        </div>
      }
    >
      <NewInvitationContent />
    </Suspense>
  );
}
