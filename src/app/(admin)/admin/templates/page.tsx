import React from "react";
import { Metadata } from "next";
import { getAllRegisteredTemplates } from "@/templates/registry";
import { createAdminClient } from "@/lib/supabase/admin";
import templatePresetsData from "@/data/template-presets.json";
import { AdminTemplatesClient } from "./templates-client";

export const metadata: Metadata = {
  title: "Katalog Template | Admin Ulemanesia",
  description:
    "Katalog seluruh template undangan digital Ulemanesia. Sesuaikan tampilan untuk website customer, lihat live demo, atau buat undangan untuk klien.",
};

export const dynamic = "force-dynamic";

export default async function AdminTemplatesPage() {
  const registered = getAllRegisteredTemplates();
  const presets = templatePresetsData as Record<string, any>;

  // Check Supabase database for customized presets
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

  const templates = registered.map((tpl) => {
    const dbPreset = dbPresetsMap[tpl.key];
    const filePreset = presets[tpl.key];
    const effectiveCover = dbPreset?.cover_image_url || filePreset?.cover_image_url || tpl.thumbnailUrl;

    return {
      key: tpl.key,
      name: tpl.name,
      subtitle: tpl.subtitle || "",
      category: tpl.category || "Modern",
      description: tpl.description,
      thumbnailUrl: effectiveCover,
      tags: tpl.tags,
      customFieldsCount: tpl.customFields?.length || 0,
    };
  });

  return <AdminTemplatesClient templates={templates} />;
}
