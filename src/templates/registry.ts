import { RegisteredTemplate } from "./types";
import LuxuryPolaroidTemplate from "./designs/luxury-polaroid";

/**
 * Ulemanesia Master Template Registry
 * Flagship single luxury template: Dark Warm Chocolate & Gold Polaroid
 * Features: Bottom Dock Navigation, Authentic Polaroid Frames, Surat Ar-Rum,
 * Real-time Countdown, Agenda Acara, Love Story Timeline, Video Gallery,
 * Digital Envelope with Multi-Bank & QRIS, RSVP Guestbook & Custom Audio Upload.
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
      {
        key: "cover_bg_url",
        label: "Foto Background Kustom (Opsional)",
        type: "image",
        placeholder: "Pilih file gambar background...",
      },
    ],
  },
};

/**
 * getTemplateByKey returns the master template.
 * If any previous key is passed (e.g. editorial-photo, javanese-royal, etc.),
 * it safely returns the luxury-polaroid master template to ensure all invitations render seamlessly.
 */
export function getTemplateByKey(key: string): RegisteredTemplate {
  return TEMPLATE_REGISTRY["luxury-polaroid"];
}

/**
 * getAllRegisteredTemplates returns the unified flagship template.
 */
export function getAllRegisteredTemplates(): RegisteredTemplate[] {
  return [TEMPLATE_REGISTRY["luxury-polaroid"]];
}
