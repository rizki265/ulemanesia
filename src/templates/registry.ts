import { RegisteredTemplate } from "./types";
import MinimalistFloralTemplate from "./designs/minimalist-floral";
import ModernEleganceTemplate from "./designs/modern-elegance";
import JavaneseRoyalTemplate from "./designs/javanese-royal";
import EditorialPhotoTemplate from "./designs/editorial-photo";
import IslamicEleganceTemplate from "./designs/islamic-elegance";
import BaliBreezeTemplate from "./designs/bali-breeze";
import RusticBohoTemplate from "./designs/rustic-boho";
import ChineseModernTemplate from "./designs/chinese-modern";

/**
 * Ulemanesia Template Registry
 * Maps each template key to its React component, meta information, custom fields schema, and previews.
 */
export const TEMPLATE_REGISTRY: Record<string, RegisteredTemplate> = {
  "editorial-photo": {
    key: "editorial-photo",
    name: "Cinematic Editorial Romance",
    subtitle: "Tren Majalah Editorial Foto Pengantin",
    category: "Editorial Photo",
    description: "Desain tren modern bergaya majalah editorial dengan foto pengantin layar penuh, tipografi mewah di atas background, dan transisi sinematik.",
    thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    tags: ["Editorial", "Full Photo", "Cinematic", "Modern", "Trending"],
    component: EditorialPhotoTemplate,
    defaultThemeConfig: {
      cover_tagline: "WE ARE GETTING MARRIED",
      overlay_style: "cinematic_dark",
      hero_subtitle: "SAVE OUR DATE",
    },
    customFields: [
      {
        key: "cover_tagline",
        label: "Tagline di Atas Foto Cover",
        type: "text",
        defaultValue: "WE ARE GETTING MARRIED",
        placeholder: "Contoh: WE ARE GETTING MARRIED",
      },
      {
        key: "overlay_style",
        label: "Gaya Vignette & Gelap Foto",
        type: "select",
        defaultValue: "cinematic_dark",
        options: [
          { value: "cinematic_dark", label: "Cinematic Vignette (Teks Lebih Jelas)" },
          { value: "soft_golden", label: "Warm Golden Sunset" },
          { value: "monochrome_moody", label: "Monochrome Moody" },
        ],
      },
      {
        key: "cover_bg_url",
        label: "Foto Background Khusus Cover (Opsional)",
        type: "image",
        placeholder: "URL Foto Pengantin Vertikal HD...",
      },
    ],
  },
  "javanese-royal": {
    key: "javanese-royal",
    name: "Javanese Royal Heritage",
    subtitle: "Sakral & Agung Adat Jawa Keraton",
    category: "Adat Jawa",
    description: "Desain sakral adat Jawa berlatar hitam obsidian megah, berhiaskan Gunungan Wayang emas, kaligrafi anggun, dan nuansa keraton yang agung.",
    thumbnailUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    tags: ["Adat Jawa", "Gunungan", "Royal Gold", "Tradisional", "Keraton"],
    component: JavaneseRoyalTemplate,
    defaultThemeConfig: {
      salam_type: "bismillah_serat",
      gunungan_color: "#d4af37",
    },
    customFields: [
      {
        key: "salam_type",
        label: "Format Salam Adat Jawa",
        type: "select",
        defaultValue: "bismillah_serat",
        options: [
          { value: "bismillah_serat", label: "Islami + Serat Kinanthi (Rekomendasi)" },
          { value: "serat_murni", label: "Serat Riyanta Murni Keraton" },
          { value: "salam_rahayu", label: "Salam Rahayu Nusantara" },
        ],
      },
      {
        key: "cover_bg_url",
        label: "Foto Pengantin Adat Jawa (Opsional)",
        type: "image",
        placeholder: "URL Foto Mempelai Busana Jawa...",
      },
    ],
  },
  "islamic-elegance": {
    key: "islamic-elegance",
    name: "Islamic Madinah Grace",
    subtitle: "Nuansa Islami Kaligrafi & Arabesque Emas",
    category: "Islami",
    description: "Desain syar'i bernuansa hijau zamrud (emerald) dan emas kemuliaan, kaligrafi Bismillah, ayat QS Ar-Rum 21, dan ornamen Arabesque Islami.",
    thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    tags: ["Islami", "Kaligrafi", "Emerald Gold", "Arabesque", "Syar'i"],
    component: IslamicEleganceTemplate,
    defaultThemeConfig: {
      cover_tagline: "WALIMATUL 'URSY",
      greeting_title: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    },
    customFields: [
      {
        key: "cover_tagline",
        label: "Tagline Pembuka",
        type: "text",
        defaultValue: "WALIMATUL 'URSY",
        placeholder: "Contoh: WALIMATUL 'URSY",
      },
      {
        key: "greeting_title",
        label: "Salam Pembuka",
        type: "text",
        defaultValue: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
        placeholder: "Salam pembuka islami...",
      },
      {
        key: "cover_bg_url",
        label: "Foto Pengantin Busana Muslim (Opsional)",
        type: "image",
        placeholder: "URL Foto Pengantin Muslim...",
      },
    ],
  },
  "bali-breeze": {
    key: "bali-breeze",
    name: "Bali Tropical Sunset",
    subtitle: "Keindahan Dewata & Pantai Tropis",
    category: "Bali & Tropis",
    description: "Nuansa eksotis pantai senja Bali, terracotta hangat, ornamen bunga Kamboja & gerbang Candi Bentar, hangat dan sinematik khas Pulau Dewata.",
    thumbnailUrl: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
    tags: ["Bali", "Tropical", "Sunset", "Exotic", "Beach Wedding"],
    component: BaliBreezeTemplate,
    defaultThemeConfig: {
      cover_tagline: "SENJA KEEMASAN BALI DI TEPI LAUT",
      greeting_title: "OM SWASTYASTU / SALAM HANGAT",
    },
    customFields: [
      {
        key: "cover_tagline",
        label: "Tagline Tema Senja",
        type: "text",
        defaultValue: "SENJA KEEMASAN BALI DI TEPI LAUT",
        placeholder: "Contoh: SENJA KEEMASAN BALI DI TEPI LAUT",
      },
      {
        key: "greeting_title",
        label: "Salam Pembuka",
        type: "text",
        defaultValue: "OM SWASTYASTU / SALAM HANGAT",
        placeholder: "Contoh: OM SWASTYASTU",
      },
      {
        key: "cover_bg_url",
        label: "Foto Latar Belakang Sunset / Pantai Bali",
        type: "image",
        placeholder: "URL Foto Sunset Pantai Bali...",
      },
    ],
  },
  "rustic-boho": {
    key: "rustic-boho",
    name: "Rustic Pampas & Kraft",
    subtitle: "Bohemian Earthy & Sentuhan Alami",
    category: "Rustic Boho",
    description: "Nuansa estetik daun pampas kering, tekstur kertas kraft hangat, karangan bunga bohemian, dan kerlip lampu temaram yang romantis dan intim.",
    thumbnailUrl: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80",
    tags: ["Rustic", "Bohemian", "Pampas", "Earthy", "Botanical"],
    component: RusticBohoTemplate,
    defaultThemeConfig: {
      cover_tagline: "RUSTIC BOTANICAL CELEBRATION",
      greeting_title: "THE PROMISE OF LOVE",
    },
    customFields: [
      {
        key: "cover_tagline",
        label: "Tagline Pembuka",
        type: "text",
        defaultValue: "RUSTIC BOTANICAL CELEBRATION",
        placeholder: "Contoh: RUSTIC BOTANICAL CELEBRATION",
      },
      {
        key: "greeting_title",
        label: "Judul Salam / Ayat Kasih",
        type: "text",
        defaultValue: "THE PROMISE OF LOVE",
        placeholder: "Contoh: THE PROMISE OF LOVE",
      },
      {
        key: "cover_bg_url",
        label: "Foto Latar Belakang Rustic / Hutan Pinus",
        type: "image",
        placeholder: "URL Foto Prewedding Rustic...",
      },
    ],
  },
  "chinese-modern": {
    key: "chinese-modern",
    name: "Oriental Double Happiness",
    subtitle: "Kemewahan Tradisi Sangjit & Modern Oriental",
    category: "Oriental",
    description: "Kemegahan ornamen Shuang Xi (囍) berbalut merah crimson dan emas kekaisaran, ritual Tea Ceremony (Teapai), dan perayaan ikatan abadi dua keluarga.",
    thumbnailUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    tags: ["Oriental", "Chinese", "Sangjit", "Double Happiness", "Teapai"],
    component: ChineseModernTemplate,
    defaultThemeConfig: {
      cover_tagline: "DOUBLE HAPPINESS • 囍",
      greeting_title: "BLESSINGS OF DOUBLE HAPPINESS",
    },
    customFields: [
      {
        key: "cover_tagline",
        label: "Tagline Shuang Xi",
        type: "text",
        defaultValue: "DOUBLE HAPPINESS • 囍",
        placeholder: "Contoh: DOUBLE HAPPINESS • 囍",
      },
      {
        key: "greeting_title",
        label: "Judul Doa / Berkah Pernikahan",
        type: "text",
        defaultValue: "BLESSINGS OF DOUBLE HAPPINESS",
        placeholder: "Contoh: BLESSINGS OF DOUBLE HAPPINESS",
      },
      {
        key: "cover_bg_url",
        label: "Foto Gaun Cheongsam / Busana Sangjit",
        type: "image",
        placeholder: "URL Foto Busana Oriental...",
      },
    ],
  },
  "minimalist-floral": {
    key: "minimalist-floral",
    name: "Floral Botanical Minimalist",
    subtitle: "Dedaunan Botanical Pastel Lembut",
    category: "Floral",
    description: "Desain elegan bertema dedaunan botanical dengan nuansa pastel lembut, tipografi anggun, dan nuansa hangat.",
    thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    tags: ["Floral", "Botanical", "Minimalist", "Soft Pastel"],
    component: MinimalistFloralTemplate,
    defaultThemeConfig: {
      floral_tone: "pastel_blush",
    },
    customFields: [
      {
        key: "floral_tone",
        label: "Nuansa Warna Bunga",
        type: "select",
        defaultValue: "pastel_blush",
        options: [
          { value: "pastel_blush", label: "Pastel Blush & Rose" },
          { value: "sage_eucalyptus", label: "Sage Green & Eucalyptus" },
          { value: "champagne_warm", label: "Champagne Warm Cream" },
        ],
      },
    ],
  },
  "modern-elegance": {
    key: "modern-elegance",
    name: "Modern Monochrome Elegance",
    subtitle: "Kemewahan Monokrom Berkarakter",
    category: "Modern",
    description: "Desain kontemporer monokrom mewah bernuansa emas temaram, kontras tajam, sangat memukau di layar smartphone.",
    thumbnailUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    tags: ["Monochrome", "Luxury", "Contemporary", "Dark Theme"],
    component: ModernEleganceTemplate,
    defaultThemeConfig: {
      accent_foil: "gold_champagne",
    },
    customFields: [
      {
        key: "accent_foil",
        label: "Aksen Foil Warna",
        type: "select",
        defaultValue: "gold_champagne",
        options: [
          { value: "gold_champagne", label: "Gold Champagne Luxury" },
          { value: "silver_chrome", label: "Silver Chrome Minimal" },
          { value: "rose_gold", label: "Rose Gold Glamour" },
        ],
      },
    ],
  },
};

export function getTemplateByKey(key: string): RegisteredTemplate {
  return TEMPLATE_REGISTRY[key] || TEMPLATE_REGISTRY["editorial-photo"];
}

export function getAllRegisteredTemplates(): RegisteredTemplate[] {
  return Object.values(TEMPLATE_REGISTRY);
}
