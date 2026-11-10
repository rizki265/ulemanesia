import { RegisteredTemplate } from "./types";
import MinimalistFloralTemplate from "./designs/minimalist-floral";
import ModernEleganceTemplate from "./designs/modern-elegance";

/**
 * Ulemanesia Template Registry
 * Maps each template key to its React component, meta information, and previews.
 * Adding a new template only requires adding a component and registering it here!
 */
export const TEMPLATE_REGISTRY: Record<string, RegisteredTemplate> = {
  "minimalist-floral": {
    key: "minimalist-floral",
    name: "Floral Botanical Minimalist",
    description: "Desain elegan bertema dedaunan botanical dengan nuansa pastel lembut, tipografi anggun, dan nuansa hangat.",
    thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    tags: ["Floral", "Botanical", "Minimalist", "Soft Pastel"],
    component: MinimalistFloralTemplate,
  },
  "modern-elegance": {
    key: "modern-elegance",
    name: "Modern Monochrome Elegance",
    description: "Desain kontemporer monokrom mewah bernuansa emas temaram, kontras tajam, sangat memukau di layar smartphone.",
    thumbnailUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    tags: ["Monochrome", "Luxury", "Contemporary", "Dark Theme"],
    component: ModernEleganceTemplate,
  },
};

export function getTemplateByKey(key: string): RegisteredTemplate {
  return TEMPLATE_REGISTRY[key] || TEMPLATE_REGISTRY["minimalist-floral"];
}

export function getAllRegisteredTemplates(): RegisteredTemplate[] {
  return Object.values(TEMPLATE_REGISTRY);
}

