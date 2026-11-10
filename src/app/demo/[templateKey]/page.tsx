import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTemplateByKey, getAllRegisteredTemplates } from "@/templates/registry";
import { MOCK_INVITATION_FLORAL, MOCK_INVITATION_MODERN, MOCK_WISHES } from "@/lib/mock-data";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { getWhatsAppOrderUrl } from "@/lib/whatsapp";
import Link from "next/link";

interface DemoPageProps {
  params: Promise<{
    templateKey: string;
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

export default async function DemoPage({ params }: DemoPageProps) {
  const { templateKey } = await params;
  const template = getTemplateByKey(templateKey);

  if (!template) {
    return notFound();
  }

  // Choose appropriate mock data for each template design
  const mockData =
    templateKey === "modern-elegance" ? MOCK_INVITATION_MODERN : MOCK_INVITATION_FLORAL;

  const TemplateComponent = template.component;
  const whatsappUrl = getWhatsAppOrderUrl(template.name);

  return (
    <div className="relative">
      {/* Top Banner indicating this is a Demo */}
      <div className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-md text-white py-2.5 px-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kembali ke Katalog</span>
          </Link>
          <span className="hidden sm:inline text-stone-600">|</span>
          <span className="text-xs font-medium text-amber-300">
            Preview Mode: <strong className="text-white">{template.name}</strong>
          </span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-full shadow-sm transition-all hover:scale-105"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Pesan Template Ini</span>
        </a>
      </div>

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
    </div>
  );
}

