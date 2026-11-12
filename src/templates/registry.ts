import { RegisteredTemplate } from "./types";
import LuxuryPolaroidTemplate from "./designs/luxury-polaroid";

/**
 * Ulemanesia Master Template Registry
 * Active Template: Luxury Chocolate & Gold
 */
export const TEMPLATE_REGISTRY: Record<string, RegisteredTemplate> = {
  "luxury-polaroid": {
    key: "luxury-polaroid",
    name: "Luxury Chocolate & Gold",
    subtitle: "Desain Eksklusif Polaroid & Bottom Dock Navigation",
    category: "Modern",
    description:
      "Desain mewah bernuansa dark warm chocolate & gold dengan frame polaroid otentik, washi tape, bottom dock navigation, live countdown, kisah cinta, agenda acara, video prewedding, amplop digital QRIS, dan pemutar musik.",
    thumbnailUrl:
      "https://stmoqifvjwlpchfjbcog.supabase.co/storage/v1/object/public/covers/uploads/1794462967675-a7c3fv-prewed-2.webp",
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
};

/**
 * Returns all registered templates as an array.
 */
export function getAllRegisteredTemplates(): RegisteredTemplate[] {
  return Object.values(TEMPLATE_REGISTRY);
}

/**
 * Find a registered template by its unique slug/key.
 * Falls back to 'luxury-polaroid' if not found.
 */
export function getTemplateByKey(key: string): RegisteredTemplate {
  return TEMPLATE_REGISTRY[key] || TEMPLATE_REGISTRY["luxury-polaroid"];
}
