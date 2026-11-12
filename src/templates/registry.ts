import { RegisteredTemplate } from "./types";
import LuxuryPolaroidTemplate from "./designs/luxury-polaroid";
import MinimalistFloralTemplate from "./designs/minimalist-floral";
import ModernEleganceTemplate from "./designs/modern-elegance";
import JavaneseRoyalTemplate from "./designs/javanese-royal";
import EditorialPhotoTemplate from "./designs/editorial-photo";
import IslamicEleganceTemplate from "./designs/islamic-elegance";
import BaliBreezeTemplate from "./designs/bali-breeze";
import RusticBohoTemplate from "./designs/rustic-boho";
import ChineseModernTemplate from "./designs/chinese-modern";

/**
 * Ulemanesia Master Template Registry
 * Maps each template key to its React component, meta information, and previews.
 */
export const TEMPLATE_REGISTRY: Record<string, RegisteredTemplate> = {
  "luxury-polaroid": {
    key: "luxury-polaroid",
    name: "Luxury Chocolate & Gold Polaroid",
    subtitle: "Desain Eksklusif Polaroid & Bottom Dock Navigation",
    category: "Modern",
    description:
      "Desain mewah bernuansa dark warm chocolate & gold dengan frame polaroid otentik, washi tape, bottom dock navigation, live countdown, kisah cinta, agenda acara, video prewedding, amplop digital QRIS, dan pemutar musik.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    tags: ["Luxury", "Polaroid", "Warm Chocolate", "Bottom Dock", "Video", "QRIS"],
    component: LuxuryPolaroidTemplate,
    defaultThemeConfig: {
      background_style: "warm_chocolate",
      washi_tape_color: "kraft_cream",
      accent_color: "#d4af37",
    },
    customFields: [
      {
        key: "background_style",
        label: "Nuansa Latar Belakang",
        type: "select",
        defaultValue: "warm_chocolate",
        options: [
          { value: "warm_chocolate", label: "Warm Chocolate Espresso (Default)" },
          { value: "deep_obsidian", label: "Deep Obsidian Black Gold" },
          { value: "midnight_maroon", label: "Midnight Velvet Maroon" },
        ],
      },
      {
        key: "washi_tape_color",
        label: "Warna Pita Washi Tape Polaroid",
        type: "select",
        defaultValue: "kraft_cream",
        options: [
          { value: "kraft_cream", label: "Vintage Kraft Cream (Klasik)" },
          { value: "soft_rose", label: "Soft Pastel Rose" },
          { value: "golden_foil", label: "Golden Foil Shimmer" },
        ],
      },
    ],
  },
  "editorial-photo": {
    key: "editorial-photo",
    name: "Cinematic Editorial Romance",
    subtitle: "Tren Majalah Editorial Foto Pengantin",
    category: "Editorial Photo",
    description:
      "Desain tren modern bergaya majalah editorial dengan foto pengantin layar penuh, tipografi mewah di atas background, dan transisi sinematik.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    tags: ["Editorial", "Full Photo", "Cinematic", "Modern", "Trending"],
    component: EditorialPhotoTemplate,
    defaultThemeConfig: {
      cover_tagline: "WE ARE GETTING MARRIED",
      overlay_style: "cinematic_dark",
    },
  },
  "javanese-royal": {
    key: "javanese-royal",
    name: "Javanese Royal Heritage",
    subtitle: "Sakral & Agung Adat Jawa Keraton",
    category: "Adat Jawa",
    description:
      "Desain sakral adat Jawa berlatar hitam obsidian megah, berhiaskan Gunungan Wayang emas, kaligrafi anggun, dan nuansa keraton yang agung.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    tags: ["Adat Jawa", "Gunungan", "Royal Gold", "Tradisional", "Keraton"],
    component: JavaneseRoyalTemplate,
    defaultThemeConfig: {
      salam_type: "bismillah_serat",
    },
  },
  "islamic-elegance": {
    key: "islamic-elegance",
    name: "Islamic Madinah Grace",
    subtitle: "Nuansa Islami Kaligrafi & Arabesque Emas",
    category: "Islami",
    description:
      "Desain syar'i bernuansa hijau zamrud (emerald) dan emas kemuliaan, kaligrafi Bismillah, ayat QS Ar-Rum 21, dan ornamen Arabesque Islami.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    tags: ["Islami", "Kaligrafi", "Emerald Gold", "Arabesque", "Syar'i"],
    component: IslamicEleganceTemplate,
    defaultThemeConfig: {
      cover_tagline: "WALIMATUL 'URSY",
    },
  },
  "bali-breeze": {
    key: "bali-breeze",
    name: "Bali Tropical Sunset",
    subtitle: "Kehangatan Senja & Eksotisme Pura Bali",
    category: "Bali & Tropis",
    description:
      "Nuansa eksotis pantai senja Bali, terracotta hangat, ornamen bunga Kamboja & gerbang Candi Bentar, hangat dan sinematik khas Pulau Dewata.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
    tags: ["Bali", "Tropical", "Sunset", "Exotic", "Beach Wedding"],
    component: BaliBreezeTemplate,
    defaultThemeConfig: {
      cover_tagline: "PAWIWAHAN AGUNG",
    },
  },
  "rustic-boho": {
    key: "rustic-boho",
    name: "Rustic Pampas & Kraft",
    subtitle: "Bohemian Earthy & Sentuhan Alami",
    category: "Rustic Boho",
    description:
      "Nuansa estetik daun pampas kering, tekstur kertas kraft hangat, karangan bunga bohemian, dan kerlip lampu temaram yang romantis dan intim.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80",
    tags: ["Rustic", "Bohemian", "Pampas", "Earthy", "Botanical"],
    component: RusticBohoTemplate,
    defaultThemeConfig: {
      cover_tagline: "RUSTIC BOTANICAL CELEBRATION",
    },
  },
  "chinese-modern": {
    key: "chinese-modern",
    name: "Oriental Double Happiness",
    subtitle: "Kemewahan Tradisi Sangjit & Modern Oriental",
    category: "Oriental",
    description:
      "Kemegahan ornamen Shuang Xi (囍) berbalut merah crimson dan emas kekaisaran, ritual Tea Ceremony (Teapai), dan perayaan ikatan abadi dua keluarga.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    tags: ["Oriental", "Chinese", "Sangjit", "Double Happiness", "Teapai"],
    component: ChineseModernTemplate,
    defaultThemeConfig: {
      cover_tagline: "DOUBLE HAPPINESS • 囍",
    },
  },
  "minimalist-floral": {
    key: "minimalist-floral",
    name: "Floral Botanical Minimalist",
    subtitle: "Dedaunan Botanical Pastel Lembut",
    category: "Floral",
    description:
      "Desain elegan bertema dedaunan botanical dengan nuansa pastel lembut, tipografi anggun, dan nuansa hangat.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    tags: ["Floral", "Botanical", "Minimalist", "Soft Pastel"],
    component: MinimalistFloralTemplate,
    defaultThemeConfig: {
      floral_tone: "pastel_blush",
    },
  },
  "modern-elegance": {
    key: "modern-elegance",
    name: "Modern Monochrome Elegance",
    subtitle: "Kemewahan Monokrom Berkarakter",
    category: "Modern",
    description:
      "Desain kontemporer monokrom mewah bernuansa emas temaram, kontras tajam, sangat memukau di layar smartphone.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    tags: ["Monochrome", "Luxury", "Contemporary", "Dark Theme"],
    component: ModernEleganceTemplate,
    defaultThemeConfig: {
      accent_foil: "gold_champagne",
    },
  },
};

export function getTemplateByKey(key: string): RegisteredTemplate {
  return TEMPLATE_REGISTRY[key] || TEMPLATE_REGISTRY["luxury-polaroid"];
}

export function getAllRegisteredTemplates(): RegisteredTemplate[] {
  return Object.values(TEMPLATE_REGISTRY);
}
