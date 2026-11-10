import React from "react";
import { getAllRegisteredTemplates } from "@/templates/registry";
import { TemplatesClient } from "./templates-client";

export const metadata = {
  title: "Katalog Template Undangan Digital Eksklusif | Ulemanesia",
  description:
    "Pilihan desain template undangan pernikahan digital modern, adat Jawa, dan minimalis. Cepat jadi, aktif 3 bulan, dan pesan praktis via WhatsApp.",
};

export default function TemplatesPage() {
  const templates = getAllRegisteredTemplates();

  return <TemplatesClient templates={templates} />;
}
