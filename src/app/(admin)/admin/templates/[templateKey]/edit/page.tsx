import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTemplateByKey } from "@/templates/registry";
import { createAdminClient } from "@/lib/supabase/admin";
import templatePresetsData from "@/data/template-presets.json";
import { EditTemplateClient } from "./edit-template-client";

interface PageProps {
  params: Promise<{
    templateKey: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { templateKey } = await params;
  const template = getTemplateByKey(templateKey);

  return {
    title: `Edit Template: ${template.name} | Admin Ulemanesia`,
    description: `Sesuaikan data dan tampilan template ${template.name} untuk website customer.`,
  };
}

export const dynamic = "force-dynamic";

export default async function EditTemplatePage({ params }: PageProps) {
  const { templateKey } = await params;
  const template = getTemplateByKey(templateKey);

  if (!template) {
    return notFound();
  }

  // 1. Check Supabase database first for existing saved preset
  let initialPreset = (templatePresetsData as Record<string, any>)[templateKey] || {};
  try {
    const adminSupabase = createAdminClient();
    const { data: dbPreset } = await adminSupabase
      .from("invitations")
      .select("data, cover_image_url, title")
      .eq("slug", `preset-${templateKey}`)
      .maybeSingle();

    if (dbPreset?.data && Object.keys(dbPreset.data).length > 0) {
      initialPreset = {
        ...initialPreset,
        ...dbPreset.data,
        cover_image_url: dbPreset.cover_image_url || dbPreset.data.cover_image_url,
        title: dbPreset.title || dbPreset.data.title,
      };
    }
  } catch (err) {
    console.warn("DB preset fetch fallback to file preset:", err);
  }

  return <EditTemplateClient template={template} initialPreset={initialPreset} />;
}

