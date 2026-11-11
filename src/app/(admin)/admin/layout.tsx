import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, PlusCircle, Music, LogOut, ExternalLink } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row text-stone-900">
      {/* Sidebar for Desktop */}
      <aside className="w-full md:w-64 bg-stone-900 text-stone-300 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Logo & Brand */}
          <div className="flex flex-col gap-1.5 pb-2">
            <div className="p-2.5 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <Image
                src="/logo.png"
                alt="Logo Ulemanesia"
                width={220}
                height={130}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>
            <span className="text-[10px] tracking-widest uppercase text-amber-400 font-semibold text-center">
              Admin Panel
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-sm font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span>Dashboard Undangan</span>
            </Link>

            <Link
              href="/admin/templates"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <Music className="w-4 h-4 text-amber-300" />
              <span>Katalog &amp; Master Template</span>
            </Link>

            <Link
              href="/admin/invitations/new"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Buat / Sesuaikan Undangan</span>
            </Link>

            <Link
              href="/templates"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4 text-stone-400" />
                <span>Web Publik Customer</span>
              </span>
            </Link>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-stone-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-stone-400 hover:text-white transition-colors px-2 py-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Website Publik</span>
          </Link>

          <Link
            href="/admin/login"
            className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 transition-colors px-2 py-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar / Sign In</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}

