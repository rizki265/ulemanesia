import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTemplateByKey, getAllRegisteredTemplates } from "@/templates/registry";
import {
  MOCK_INVITATION_FLORAL,
  MOCK_INVITATION_MODERN,
  MOCK_INVITATION_JAVANESE,
  MOCK_INVITATION_EDITORIAL,
  MOCK_WISHES,
} from "@/lib/mock-data";
import { getWhatsAppOrderUrl } from "@/lib/whatsapp";
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
      : templateKey === "modern-elegance"
      ? MOCK_INVITATION_MODERN
      : MOCK_INVITATION_FLORAL;

  const TemplateComponent = template.component;

  // Jika dipanggil dari dalam iframe frame smartphone, render template secara langsung
  if (view === "raw") {
    return (
      <TemplateComponent
        slug="demo"
        guestName="Bapak Budi Santoso"
        title={`The Wedding of ${mockData.groom.nickname} & ${mockData.bride.nickname}`}
        coverImageUrl={mockData.gallery[0]}
        audioUrl={mockData.custom_music_url}
        data={mockData}
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

