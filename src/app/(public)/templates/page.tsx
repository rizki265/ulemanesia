import React from "react";
import { getAllRegisteredTemplates } from "@/templates/registry";
import templatePresetsData from "@/data/template-presets.json";
import { createAdminClient } from "@/lib/supabase/admin";
import { TemplatesClient } from "./templates-client";

export const metadata = {
  title: "Katalog Template Undangan Digital Eksklusif | Ulemanesia",
  description:
    "Pilihan desain template undangan pernikahan digital modern, adat Jawa, dan minimalis. Cepat jadi, aktif 3 bulan, dan pesan praktis via WhatsApp.",
};

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  const registered = getAllRegisteredTemplates();
  const presets = templatePresetsData as Record<string, any>;

  // Fetch updated thumbnails & presets from Supabase database
  let dbPresetsMap: Record<string, any> = {};
  try {
    const adminSupabase = createAdminClient();
    const { data: dbPresets } = await adminSupabase
      .from("invitations")
      .select("template_key, cover_image_url, title")
      .like("slug", "preset-%");

    if (dbPresets && dbPresets.length > 0) {
      dbPresets.forEach((p) => {
        if (p.template_key) {
          dbPresetsMap[p.template_key] = p;
        }
      });
    }
  } catch (e) {
    // Non-critical fallback
  }

  // Merge database presets & JSON file presets
  const templates = registered.map((tpl) => {
    const dbPreset = dbPresetsMap[tpl.key];
    const filePreset = presets[tpl.key];
    const effectiveCover = dbPreset?.cover_image_url || filePreset?.cover_image_url || tpl.thumbnailUrl;

    return {
      ...tpl,
      thumbnailUrl: effectiveCover,
    };
  });

  return <TemplatesClient templates={templates} />;
}
