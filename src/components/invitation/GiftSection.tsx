"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Gift,
  Copy,
  Check,
  CreditCard,
  MapPin,
  QrCode,
  Download,
  Eye,
  X,
  Smartphone,
} from "lucide-react";
import { BankAccount } from "@/types/database";

interface GiftSectionProps {
  bankAccounts?: BankAccount[];
  qrisImageUrl?: string;
  giftAddress?: {
    recipient_name: string;
    phone: string;
    address: string;
  };
}

export function GiftSection({ bankAccounts, qrisImageUrl, giftAddress }: GiftSectionProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [previewQrisUrl, setPreviewQrisUrl] = useState<string | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const copyAddressToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const hasAnyData =
    (bankAccounts && bankAccounts.length > 0) ||
    Boolean(qrisImageUrl) ||
    Boolean(giftAddress);

  if (!hasAnyData) {
    return null;
  }

  return (
    <section className="py-12 px-4 max-w-xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-[#844307] text-xs font-semibold uppercase tracking-wider border border-amber-200/70">
          <Gift className="w-3.5 h-3.5" />
          <span>Tanda Kasih</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-stone-900">Amplop Digital &amp; Kado</h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          Doa restu Anda adalah karunia paling berharga bagi kami. Namun jika berkenan memberikan tanda kasih, dapat melalui:
        </p>
      </div>

      <div className="space-y-5">
        {/* 1. Dedicated QRIS Card (if provided) */}
        {qrisImageUrl && (
          <div className="p-6 bg-gradient-to-b from-stone-900 to-stone-950 text-white rounded-3xl shadow-xl border border-stone-800 text-center space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                <QrCode className="w-3.5 h-3.5" />
                <span>QRIS Pembayaran Digital</span>
              </span>
              <Smartphone className="w-4 h-4 text-stone-400" />
            </div>

            <p className="text-xs text-stone-300">
              Scan QRIS melalui BCA Mobile, Livin, BRImo, GoPay, OVO, ShopeePay, DANA, atau aplikasi m-Banking apapun:
            </p>

            <div className="relative w-52 sm:w-60 h-52 sm:h-60 mx-auto bg-white p-3 rounded-2xl shadow-lg border border-stone-200 cursor-pointer group"
              onClick={() => setPreviewQrisUrl(qrisImageUrl)}
            >
              <Image
                src={qrisImageUrl}
                alt="QRIS Pembayaran Digital"
                fill
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center text-white text-xs font-medium gap-1.5">
                <Eye className="w-4 h-4" />
                <span>Perbesar QR</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setPreviewQrisUrl(qrisImageUrl)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-medium text-white transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Lihat Layar Penuh</span>
              </button>
              <a
                href={qrisImageUrl}
                download="QRIS-Undangan.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#844307] hover:bg-[#6d3505] rounded-xl text-xs font-medium text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Simpan QRIS</span>
              </a>
            </div>
          </div>
        )}

        {/* 2. Bank Accounts (Supports Multiple Accounts) */}
        {bankAccounts?.map((account, idx) => (
          <div
            key={idx}
            className="p-6 bg-white border border-stone-200/90 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all relative overflow-hidden space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-[#844307] border border-amber-200/60 rounded-lg uppercase tracking-wide">
                {account.bank_name}
              </span>
              <CreditCard className="w-5 h-5 text-stone-400" />
            </div>

            <div>
              <p className="text-[11px] text-stone-500 uppercase tracking-widest font-medium mb-1">
                Nomor Rekening
              </p>
              <p className="text-xl sm:text-2xl font-mono font-bold text-stone-900 tracking-wider mb-1">
                {account.account_number}
              </p>
              <p className="text-xs text-stone-600 font-medium">a.n {account.account_holder}</p>
            </div>

            {/* Individual Account QRIS (if available) */}
            {account.qr_code_url && (
              <div className="pt-2 border-t border-stone-100 flex flex-col items-center gap-2">
                <div
                  className="relative w-36 h-36 bg-stone-50 p-2 rounded-xl border border-stone-200 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setPreviewQrisUrl(account.qr_code_url || null)}
                >
                  <Image
                    src={account.qr_code_url}
                    alt={`QRIS ${account.bank_name}`}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewQrisUrl(account.qr_code_url || null)}
                  className="text-[11px] text-[#844307] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Perbesar QR {account.bank_name}</span>
                </button>
              </div>
            )}

            <button
              onClick={() => copyToClipboard(account.account_number, idx)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 text-xs font-semibold rounded-2xl transition-all cursor-pointer active:scale-98"
            >
              {copiedIndex === idx ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Nomor Rekening Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-500" />
                  <span>Salin Nomor Rekening</span>
                </>
              )}
            </button>
          </div>
        ))}

        {/* 3. Physical Gift Delivery Address */}
        {giftAddress && (
          <div className="p-6 bg-white border border-stone-200/90 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-3 text-[#844307]">
              <MapPin className="w-4 h-4" />
              <h3 className="text-sm font-serif font-bold">Kirim Kado Fisik</h3>
            </div>
            <p className="text-xs font-medium text-stone-800 mb-1">
              Penerima: {giftAddress.recipient_name} ({giftAddress.phone})
            </p>
            <p className="text-xs text-stone-600 mb-5 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-100">
              {giftAddress.address}
            </p>

            <button
              onClick={() =>
                copyAddressToClipboard(
                  `${giftAddress.recipient_name} (${giftAddress.phone})\n${giftAddress.address}`
                )
              }
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 text-xs font-semibold rounded-2xl transition-all cursor-pointer active:scale-98"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Alamat Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-500" />
                  <span>Salin Alamat Lengkap</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* QRIS Fullscreen Lightbox Modal */}
      {previewQrisUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewQrisUrl(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewQrisUrl(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="pt-2">
              <span className="px-3 py-1 rounded-full bg-amber-50 text-[#844307] text-xs font-bold border border-amber-200">
                Pindai QRIS
              </span>
              <h3 className="font-serif font-bold text-lg text-stone-900 mt-2">
                Amplop Digital QRIS
              </h3>
              <p className="text-xs text-stone-500">
                Arahkan kamera e-wallet / m-Banking Anda ke kode QR di bawah:
              </p>
            </div>

            <div className="relative w-64 h-64 mx-auto bg-stone-50 rounded-2xl border border-stone-200 p-2 overflow-hidden shadow-inner">
              <Image
                src={previewQrisUrl}
                alt="QRIS Barcode"
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="flex gap-2">
              <a
                href={previewQrisUrl}
                download="QRIS-Undangan.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-[#844307] hover:bg-[#6d3505] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Simpan Gambar</span>
              </a>
              <button
                type="button"
                onClick={() => setPreviewQrisUrl(null)}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
