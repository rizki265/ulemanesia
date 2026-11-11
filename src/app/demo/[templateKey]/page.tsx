import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTemplateByKey, getAllRegisteredTemplates } from "@/templates/registry";
import {
  MOCK_INVITATION_FLORAL,
  MOCK_INVITATION_MODERN,
  MOCK_INVITATION_JAVANESE,
  MOCK_INVITATION_EDITORIAL,
  MOCK_INVITATION_ISLAMIC,
  MOCK_INVITATION_BALI,
  MOCK_INVITATION_BOHO,
  MOCK_INVITATION_CHINESE,
  MOCK_WISHES,
} from "@/lib/mock-data";
import { getWhatsAppOrderUrl } from "@/lib/whatsapp";
import templatePresetsData from "@/data/template-presets.json";
import { DemoClient } from "./demo-client";

interface DemoPageProps {
  params: Promise<{
    templateKey: string;
  }>;
  searchParams: Promise<{
    view?: string;
  }>;
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { templateKey } = await params;
  const template = getTemplateByKey(templateKey);

  return {
    title: `Demo: ${template.name} | Ulemanesia`,
    description: template.description,
  };
}

export default async function DemoPage({ params, searchParams }: DemoPageProps) {
  const { templateKey } = await params;
  const { view } = await searchParams;
  const template = getTemplateByKey(templateKey);

  if (!template) {
    return notFound();
  }

  // Choose appropriate mock data for each template design
  const mockData =
    templateKey === "editorial-photo"
      ? MOCK_INVITATION_EDITORIAL
      : templateKey === "javanese-royal"
      ? MOCK_INVITATION_JAVANESE
      : templateKey === "islamic-elegance"
      ? MOCK_INVITATION_ISLAMIC
      : templateKey === "bali-breeze"
      ? MOCK_INVITATION_BALI
      : templateKey === "rustic-boho"
      ? MOCK_INVITATION_BOHO
      : templateKey === "chinese-modern"
      ? MOCK_INVITATION_CHINESE
      : templateKey === "modern-elegance"
      ? MOCK_INVITATION_MODERN
      : MOCK_INVITATION_FLORAL;

  const TemplateComponent = template.component;

  // Check if an admin has saved a custom reference preset for this template
  const preset = (templatePresetsData as Record<string, any>)[templateKey];
  const effectiveData: typeof mockData = preset
    ? {
        ...mockData,
        groom: { ...mockData.groom, ...(preset.groom || {}) },
        bride: { ...mockData.bride, ...(preset.bride || {}) },
        quote: preset.quote || mockData.quote,
        stories: preset.stories || mockData.stories,
        bank_accounts: preset.bank_accounts || mockData.bank_accounts,
        qris_image_url: preset.qris_image_url || (mockData as any).qris_image_url,
        theme_config: { ...mockData.theme_config, ...(preset.theme_config || {}) },
        theme_options: { ...mockData.theme_options, ...(preset.theme_config || {}) },
      }
    : mockData;

  const effectiveCover = preset?.cover_image_url || effectiveData.gallery[0] || mockData.gallery[0];
  const effectiveTitle =
    preset?.title ||
    `The Wedding of ${effectiveData.groom.nickname} & ${effectiveData.bride.nickname}`;

  // Jika dipanggil dari dalam iframe frame smartphone, render template secara langsung
  if (view === "raw") {
    return (
      <TemplateComponent
        slug="demo"
        guestName="Bapak Budi Santoso"
        title={effectiveTitle}
        coverImageUrl={effectiveCover}
        audioUrl={effectiveData.custom_music_url}
        data={effectiveData}
        wishes={MOCK_WISHES}
        isPreview={true}
      />
    );
  }

  const whatsappUrl = getWhatsAppOrderUrl(template.name);
  const allTemplates = getAllRegisteredTemplates().map((t) => ({
    key: t.key,
    name: t.name,
    tags: t.tags,
  }));

  // Tampilan Utama: Split Showcase Hero Layout dengan Smartphone Mockup Live Interaktif
  return (
    <DemoClient
      templateKey={templateKey}
      templateName={template.name}
      templateDescription={template.description}
      templateTags={template.tags}
      whatsappUrl={whatsappUrl}
      allTemplates={allTemplates}
    />
  );
}

