"use client";

import React, { useState } from "react";
import { Gift, Copy, Check, CreditCard, MapPin } from "lucide-react";
import { BankAccount } from "@/types/database";

interface GiftSectionProps {
  bankAccounts?: BankAccount[];
  giftAddress?: {
    recipient_name: string;
    phone: string;
    address: string;
  };
}

export function GiftSection({ bankAccounts, giftAddress }: GiftSectionProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

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

  if ((!bankAccounts || bankAccounts.length === 0) && !giftAddress) {
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

      <div className="space-y-4">
        {bankAccounts?.map((account, idx) => (
          <div
            key={idx}
            className="p-6 bg-white border border-stone-200/90 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-[#844307] border border-amber-200/60 rounded-lg uppercase tracking-wide">
                {account.bank_name}
              </span>
              <CreditCard className="w-5 h-5 text-stone-400" />
            </div>

            <p className="text-[11px] text-stone-500 uppercase tracking-widest font-medium mb-1">
              Nomor Rekening
            </p>
            <p className="text-xl sm:text-2xl font-mono font-bold text-stone-900 tracking-wider mb-1">
              {account.account_number}
            </p>
            <p className="text-xs text-stone-600 mb-5 font-medium">a.n {account.account_holder}</p>

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
    </section>
  );
}
