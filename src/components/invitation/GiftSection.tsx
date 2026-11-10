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
    <section className="py-12 px-4 max-w-xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-800 text-xs font-medium mb-3">
          <Gift className="w-3.5 h-3.5" />
          <span>Tanda Kasih</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Wedding Gift</h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Doa restu Anda adalah karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih berupa kado atau amplop digital, dapat melalui:
        </p>
      </div>

      <div className="space-y-4">
        {bankAccounts?.map((account, idx) => (
          <div
            key={idx}
            className="p-5 bg-gradient-to-br from-white to-rose-50/50 border border-rose-100 rounded-2xl shadow-sm relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2.5 py-1 bg-rose-100/80 text-rose-800 rounded-lg">
                {account.bank_name}
              </span>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>

            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Nomor Rekening</p>
            <p className="text-lg font-mono font-bold text-gray-900 tracking-wider mb-1">
              {account.account_number}
            </p>
            <p className="text-xs text-gray-600 mb-4 font-medium">a.n {account.account_holder}</p>

            <button
              onClick={() => copyToClipboard(account.account_number, idx)}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 text-xs font-medium rounded-xl shadow-xs transition-all"
            >
              {copiedIndex === idx ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-500" />
                  <span>Salin Nomor Rekening</span>
                </>
              )}
            </button>
          </div>
        ))}

        {giftAddress && (
          <div className="p-5 bg-white border border-rose-100 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-rose-800">
              <MapPin className="w-4 h-4" />
              <h3 className="text-sm font-semibold">Kirim Kado Fisik</h3>
            </div>
            <p className="text-xs font-medium text-gray-800">Penerima: {giftAddress.recipient_name} ({giftAddress.phone})</p>
            <p className="text-xs text-gray-600 mt-1 mb-3 leading-relaxed">{giftAddress.address}</p>

            <button
              onClick={() => copyAddressToClipboard(`${giftAddress.recipient_name} (${giftAddress.phone})\n${giftAddress.address}`)}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 text-xs font-medium rounded-xl transition-all"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Alamat Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-500" />
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

