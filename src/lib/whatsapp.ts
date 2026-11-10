import { DEFAULT_WHATSAPP_NUMBER } from "./constants";

/**
 * Clean phone number to WhatsApp international format without leading '+' or '0'
 * e.g., '08123456789' -> '628123456789'
 */
export function formatWhatsAppPhone(phone: string): string {
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  } else if (!cleaned.startsWith("62") && cleaned.length > 8) {
    cleaned = "62" + cleaned;
  }
  return cleaned;
}

/**
 * FR-04: Tombol Pesan membuka wa.me/<nomor>?text=<pesan berisi nama template>
 */
export function getWhatsAppOrderUrl(templateName: string, phone: string = DEFAULT_WHATSAPP_NUMBER): string {
  const targetPhone = formatWhatsAppPhone(phone);
  const text = `Halo Admin Ulemanesia, saya tertarik memesan undangan digital dengan template *${templateName}*. Boleh info langkah pemesanan selanjutnya? Terima kasih.`;
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * FR-12: Tombol pengingat WhatsApp dari admin ke customer ketika masa aktif segera berakhir atau telah expired
 */
export function getWhatsAppExpiryReminderUrl(
  customerPhone: string,
  customerName: string,
  invitationTitle: string,
  daysLeftOrGrace: number,
  isExpired: boolean = false
): string {
  const targetPhone = formatWhatsAppPhone(customerPhone);
  let text = "";

  if (isExpired) {
    text = `Halo Kak ${customerName},\n\nKami menginfokan bahwa masa aktif undangan *${invitationTitle}* di Ulemanesia telah selesai. Saat ini undangan memasuki masa tenggang ${daysLeftOrGrace} hari sebelum data foto & pesan tamu dibersihkan dari server.\n\nJika ingin memperpanjang masa aktif (Rp50.000/bulan), silakan balas pesan ini ya Kak. Terima kasih! 🙏`;
  } else {
    text = `Halo Kak ${customerName},\n\nKami menginfokan bahwa masa aktif undangan *${invitationTitle}* di Ulemanesia tersisa ${daysLeftOrGrace} hari lagi.\n\nJika Kakak ingin memperpanjang masa aktif undangan (Rp50.000/bulan), silakan konfirmasi melalui chat ini ya. Terima kasih! 🙏`;
  }

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
}

