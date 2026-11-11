import React from "react";
import { Metadata } from "next";
import { getAllRegisteredTemplates } from "@/templates/registry";
import { AdminTemplatesClient } from "./templates-client";

export const metadata: Metadata = {
  title: "Katalog & Master Template | Admin Ulemanesia",
  description: "Kelola dan sesuaikan 8 template desain eksklusif Ulemanesia untuk referensi web customer atau pembuatan undangan klien.",
};

export const dynamic = "force-dynamic";

export default function AdminTemplatesPage() {
  const templates = getAllRegisteredTemplates().map((tpl) => ({
    key: tpl.key,
    name: tpl.name,
    subtitle: tpl.subtitle || "",
    category: tpl.category || "Modern",
    description: tpl.description,
    thumbnailUrl: tpl.thumbnailUrl,
    tags: tpl.tags,
    customFieldsCount: tpl.customFields?.length || 0,
  }));

  return <AdminTemplatesClient templates={templates} />;
}

