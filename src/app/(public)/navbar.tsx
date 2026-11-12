"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X, Sparkles, ChevronRight } from "lucide-react";
import { formatWhatsAppPhone } from "@/lib/whatsapp";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const adminWhatsApp = formatWhatsAppPhone(DEFAULT_WHATSAPP_NUMBER);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/templates", label: "Katalog Desain" },
    { href: "/#cara-pesan", label: "Cara Pesan" },
    { href: "/#fitur", label: "Fitur Lengkap" },
    { href: "/#faq", label: "Tanya Jawab" },
  ];

  return (
    <>

      {/* Main Glassmorphic Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center group py-2 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl"
            title="Ulemanesia - Beranda"
          >
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Ulemanesia"
                width={260}
                height={155}
                className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <span className="sr-only">Ulemanesia</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-full transition-all duration-200 ${isActive
                      ? "text-[#844307] font-semibold bg-amber-50/80 shadow-xs"
                      : "text-stone-600 hover:text-[#844307] hover:bg-stone-50"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action: WhatsApp CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(
                "Halo Admin Ulemanesia, saya ingin konsultasi pembuatan undangan digital."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md shadow-emerald-700/20 transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              {/* Pulse notification dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-200"></span>
              </span>
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200/80 bg-white/98 backdrop-blur-xl px-4 py-6 space-y-3 shadow-xl animate-fade-in-up">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all ${isActive
                        ? "bg-amber-50 text-[#844307] font-semibold"
                        : "text-stone-700 hover:bg-stone-50"
                      }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-stone-100">
              <a
                href={`https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(
                  "Halo Admin Ulemanesia, saya ingin tanya template undangan digital."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl text-sm shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi Cepat via WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

