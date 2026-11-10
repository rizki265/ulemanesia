import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, MessageCircle } from "lucide-react";
import { getAllRegisteredTemplates } from "@/templates/registry";
import { getWhatsAppOrderUrl } from "@/lib/whatsapp";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";

export const metadata = {
  title: "Katalog Template Undangan Digital | Ulemanesia",
  description: "Pilihan desain template undangan pernikahan digital modern, minimalis, dan elegan.",
};

export default function TemplatesPage() {
  const templates = getAllRegisteredTemplates();

  return (
    <div className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-rose-600">
          Galeri Desain
        </span>
        <h1 className="text-4xl font-serif font-bold text-stone-900">
          Katalog Template Undangan
        </h1>
        <p className="text-sm text-stone-600">
          Semua template siap pakai, responsif di semua perangkat, dan dapat dikustomisasi dengan data acara serta foto Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {templates.map((tpl) => {
          const whatsappUrl = getWhatsAppOrderUrl(tpl.name, DEFAULT_WHATSAPP_NUMBER);

          return (
            <div
              key={tpl.key}
              className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 group">
                <Image
                  src={tpl.thumbnailUrl}
                  alt={tpl.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                  {tpl.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-white/95 text-stone-800 rounded-full shadow-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                    {tpl.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href={`/demo/${tpl.key}`}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-semibold rounded-xl transition-all"
                  >
                    <ExternalLink className="w-4 h-4 text-stone-500" />
                    <span>Buka Demo</span>
                  </Link>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md shadow-emerald-600/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Pesan Desain Ini</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

