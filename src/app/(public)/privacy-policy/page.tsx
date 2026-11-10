import React from "react";
import { ShieldCheck, Lock, Clock, Trash2 } from "lucide-react";

export const metadata = {
  title: "Kebijakan Privasi | Ulemanesia",
  description: "Kebijakan privasi dan pengelolaan data pribadi customer serta tamu di platform Ulemanesia.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold mb-3 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privasi &amp; Keamanan Data</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-3">
          Kebijakan Privasi
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Terakhir diperbarui: 10 November 2026
        </p>
      </div>

      <div className="prose prose-stone max-w-none text-stone-700 text-sm leading-relaxed space-y-6">
        <section className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-stone-900 mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-rose-600" />
            <span>1. Pengumpulan dan Penggunaan Data</span>
          </h2>
          <p>
            Ulemanesia mengumpulkan informasi yang diberikan secara sukarela oleh customer (pemesan undangan) melalui WhatsApp, seperti nama lengkap mempelai, nama orang tua, jadwal acara, lokasi, foto prewedding, serta rekening bank untuk tanda kasih. Data ini semata-mata digunakan untuk menampilkan undangan digital atas persetujuan customer.
          </p>
          <p className="mt-2">
            Nomor kontak pribadi customer (nomor WhatsApp) disimpan secara privat di sistem dan tidak akan pernah dipublikasikan di halaman undangan publik.
          </p>
        </section>

        <section className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-stone-900 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>2. Data Tamu Undangan &amp; RSVP</span>
          </h2>
          <p>
            Nama tamu yang dimasukkan melalui tautan <code>/nama</code> tidak disimpan sebagai basis data tersendiri di server kami, melainkan hanya dirender di sisi peramban. Pesan ucapan dan konfirmasi kehadiran (RSVP) yang dikirimkan oleh tamu akan tersimpan dan dapat dimoderasi oleh admin atau customer.
          </p>
        </section>

        <section className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-stone-900 mb-2 flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-red-600" />
            <span>3. Retensi dan Penghapusan Data (Masa Tenggang 15 Hari)</span>
          </h2>
          <p>
            Sesuai aturan operasional Ulemanesia:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5">
            <li>Undangan aktif selama <strong>3 bulan</strong> sejak tanggal publikasi.</li>
            <li>Setelah melewati tanggal kedaluwarsa, undangan memasuki masa tenggang <strong>15 hari</strong>.</li>
            <li>
              Jika dalam masa tenggang customer tidak melakukan perpanjangan masa aktif, seluruh data undangan (isi teks, foto galeri, serta rekap RSVP dan ucapan tamu) akan <strong>dihapus secara permanen</strong> oleh pengelola sistem demi menjaga privasi dan kebersihan data.
            </li>
          </ul>
        </section>

        <section className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-stone-900 mb-2">
            4. Keamanan Sistem
          </h2>
          <p>
            Kami menerapkan Row Level Security (RLS) pada basis data serta sanitasi ketat pada setiap masukan dari tamu guna mencegah serangan skrip berbahaya (XSS).
          </p>
        </section>
      </div>
    </div>
  );
}

