"use client";

import React from "react";
import Image from "next/image";
import { Heart, Sparkles, Calendar } from "lucide-react";
import { LoveStory } from "@/types/database";
import { RevealOnScroll } from "./RevealOnScroll";

interface LoveStorySectionProps {
  stories?: LoveStory[];
  theme?: "dark" | "light" | "gold" | "rose";
  title?: string;
  subtitle?: string;
}

export function LoveStorySection({
  stories,
  theme = "light",
  title = "Kisah Cinta Kami",
  subtitle = "PERJALANAN KASIH",
}: LoveStorySectionProps) {
  if (!stories || stories.length === 0) return null;

  const isDark = theme === "dark" || theme === "gold";

  return (
    <section className={`py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden ${
      isDark ? "text-white" : "text-stone-900"
    }`}>
      <div className="max-w-xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <RevealOnScroll animation="fade-up">
          <div className="text-center space-y-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest ${
              isDark
                ? "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                : "bg-rose-50 text-rose-700 border border-rose-200/80"
            }`}>
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{subtitle}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              {title}
            </h2>
            <p className={`text-xs sm:text-sm max-w-md mx-auto ${
              isDark ? "text-stone-300" : "text-stone-600"
            }`}>
              Setiap langkah, tawa, dan rasa yang mengiringi kami hingga menuju gerbang ikrar suci.
            </p>
          </div>
        </RevealOnScroll>

        {/* Timeline Stories */}
        <div className={`relative border-l-2 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10 sm:space-y-12 ${
          isDark ? "border-amber-500/30" : "border-rose-200"
        }`}>
          {stories.map((story, idx) => (
            <RevealOnScroll key={idx} animation="fade-left" delay={idx * 120}>
              <div className="relative group">
                {/* Timeline Dot */}
                <span className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full ring-4 transition-transform group-hover:scale-125 ${
                  isDark
                    ? "bg-amber-400 ring-stone-900 border-2 border-amber-300"
                    : "bg-rose-500 ring-[#faf8f5] border-2 border-rose-300"
                }`} />

                {/* Year / Tag */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase ${
                    isDark
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-rose-100/70 text-rose-800 border border-rose-200"
                  }`}>
                    <Calendar className="w-3 h-3" />
                    <span>{story.year}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-base sm:text-lg font-serif font-bold mb-2 ${
                  isDark ? "text-white" : "text-stone-900"
                }`}>
                  {story.title}
                </h3>

                {/* Optional Photo */}
                {story.image_url && (
                  <div className="relative aspect-video sm:aspect-16/10 rounded-2xl overflow-hidden mb-3 border border-stone-200/40 shadow-md">
                    <Image
                      src={story.image_url}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 500px"
                    />
                  </div>
                )}

                {/* Description */}
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? "text-stone-300 font-light" : "text-stone-600"
                }`}>
                  {story.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

