import React from "react";
import { getAllRegisteredTemplates } from "@/templates/registry";
import templatePresetsData from "@/data/template-presets.json";
import { TemplatesClient } from "./templates-client";

export const metadata = {
  title: "Katalog Template Undangan Digital Eksklusif | Ulemanesia",
  description:
    "Pilihan desain template undangan pernikahan digital modern, adat Jawa, dan minimalis. Cepat jadi, aktif 3 bulan, dan pesan praktis via WhatsApp.",
};

export default function TemplatesPage() {
  const registered = getAllRegisteredTemplates();
  const presets = templatePresetsData as Record<string, any>;

  // Merge any saved reference preset thumbnails and descriptions
  const templates = registered.map((tpl) => {
    const preset = presets[tpl.key];
    if (preset) {
      return {
        ...tpl,
        thumbnailUrl: preset.cover_image_url || tpl.thumbnailUrl,
      };
    }
    return tpl;
  });

  return <TemplatesClient templates={templates} />;
}
