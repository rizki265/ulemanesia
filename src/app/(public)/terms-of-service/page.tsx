import React from "react";
import { FileText, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { EXTENSION_FEE_PER_MONTH } from "@/lib/constants";
import { formatRupiah } from "@/lib/utils";

export const metadata = {
  title: "Syarat & Ketentuan Layanan | Ulemanesia",
  description: "Syarat dan ketentuan pembuatan serta pengelolaan undangan digital di platform Ulemanesia.",
};

export default function TermsOfServicePage() {
  return (
    <div className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-800 rounded-full text-xs font-semibold mb-3 border border-stone-200">
          <FileText className="w-3.5 h-3.5" />
          <span>Aturan Layanan Ulemanesia</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-3">
          Syarat &amp; Ketentuan Layanan
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Versi 1.0 · Berlaku per 10 November 2026
        </p>
      </div>

      <div className="prose prose-stone max-w-none text-stone-700 text-sm leading-relaxed space-y-6">
        <section className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-stone-900 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>1. Pemesanan dan Pengerjaan</span>
          </h2>
          <p>
            Pemesanan dilakukan via WhatsApp dengan memilih salah satu template yang tersedia di katalog. Pengerjaan dimulai setelah data acara dan foto dikirim lengkap oleh customer. Estimasi penyelesaian pembuatan undangan adalah kurang dari 30 menit.
          </p>
        </section>

        <section className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-stone-900 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-rose-600" />
            <span>2. Masa Aktif Undangan (3 Bulan)</span>
          </h2>
          <p>
            Masa aktif undangan dihitung <strong>3 bulan sejak tanggal dipublikasikan (publish)</strong>, bukan dari tanggal pembuatan draf. Selama masa aktif 3 bulan tersebut, link undangan dapat diakses publik tanpa batas kuota kunjungan.
          </p>
        </section>

        <section className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-stone-900 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>3. Kedaluwarsa &amp; Masa Tenggang (15 Hari)</span>
          </h2>
          <p>
            Setelah masa aktif 3 bulan habis, status undangan otomatis berubah menjadi kedaluwarsa (expired), halaman publik menampilkan pemberitahuan masa aktif selesai, dan form RSVP tidak lagi menerima masukan baru.
          </p>
          <p className="mt-2">
            Customer diberikan masa tenggang selama <strong>15 hari</strong> setelah kedaluwarsa. Apabila tidak ada permintaan perpanjangan dalam 15 hari tersebut, seluruh data dan foto undangan akan dihapus secara permanen dari server.
          </p>
        </section>

        <section className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-stone-900 mb-2">
            4. Perpanjangan Masa Aktif
          </h2>
          <p>
            Perpanjangan masa aktif tersedia dengan biaya sebesar{" "}
            <strong>{formatRupiah(EXTENSION_FEE_PER_MONTH)} per bulan</strong>. Customer cukup menghubungi admin melalui WhatsApp sebelum data dihapus permanen.
          </p>
        </section>

        <section className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-stone-900 mb-2">
            5. Ketentuan Konten &amp; Media
          </h2>
          <p>
            Maksimal unggahan media adalah 1 foto cover dan 10 foto galeri. Sistem kami secara otomatis mengompresi setiap foto ke format WebP untuk memastikan kenyamanan loading tamu di jaringan seluler. Musik latar dipilih dari pustaka audio resmi yang kami sediakan untuk menjamin kepatuhan hak cipta dan kenyamanan peramban.
          </p>
        </section>
      </div>
    </div>
  );
}

