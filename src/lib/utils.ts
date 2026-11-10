import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RESERVED_SLUGS, WARNING_DAYS_BEFORE_EXPIRY, GRACE_PERIOD_DAYS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency to Rupiah (IDR)
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date in Indonesian locale (e.g. "Sabtu, 24 Oktober 2026")
 */
export function formatDate(dateInput: string | Date, includeDay = true): string {
  if (!dateInput) return "";
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(includeDay ? { weekday: "long" } : {}),
  };

  return new Intl.DateTimeFormat("id-ID", options).format(date);
}

/**
 * FR-06: Mengambil nama tamu dari segmen /nama di akhir link
 * (mis. /budi-santoso menjadi Budi Santoso), tidak memakai parameter ?to=,
 * ditampilkan dengan aman (tanpa HTML mentah); jika /nama kosong, tampil "Tamu Undangan"
 */
export function sanitizeGuestName(rawGuestName?: string | string[]): string {
  if (!rawGuestName) return "Tamu Undangan";

  let guestStr = Array.isArray(rawGuestName) ? rawGuestName.join(" ") : rawGuestName;
  try {
    guestStr = decodeURIComponent(guestStr);
  } catch {
    // keep raw if decode fails
  }

  // Replace hyphens and underscores with spaces
  guestStr = guestStr.replace(/[-_+]/g, " ").trim();

  // Strip HTML tags and special dangerous script characters (XSS mitigation)
  guestStr = guestStr.replace(/<[^>]*>?/gm, "").replace(/[<>"'&`]/g, "").trim();

  if (!guestStr || guestStr.length === 0) {
    return "Tamu Undangan";
  }

  // Capitalize each word (e.g. "budi santoso" -> "Budi Santoso")
  return guestStr
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Convert string to safe slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-word chars
    .replace(/[\s_-]+/g, "-") // replace spaces and underscores with a single dash
    .replace(/^-+|-+$/g, ""); // trim leading and trailing dashes
}

/**
 * FR-14: Validasi slug: unik, huruf kecil, dan tidak memakai kata terlarang
 */
export function isValidSlug(slug: string): { valid: boolean; error?: string } {
  if (!slug) {
    return { valid: false, error: "Slug tidak boleh kosong." };
  }

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(slug)) {
    return {
      valid: false,
      error: "Slug hanya boleh berisi huruf kecil (a-z), angka (0-9), dan tanda hubung (-).",
    };
  }

  if (RESERVED_SLUGS.includes(slug.toLowerCase())) {
    return {
      valid: false,
      error: `Kata '${slug}' adalah kata sistem terlarang dan tidak dapat digunakan sebagai slug.`,
    };
  }

  return { valid: true };
}

export type ExpiryLifecycleState =
  | "draft"
  | "active"
  | "expiring_soon"
  | "grace_period"
  | "ready_for_deletion";

/**
 * Calculates detailed lifecycle status for admin dashboard warnings (AB-03, AB-05, FR-12)
 */
export function getInvitationLifecycle(
  status: "draft" | "published" | "expired",
  expiresAt: string | null | undefined
): {
  state: ExpiryLifecycleState;
  daysRemaining: number;
  graceDaysRemaining: number;
  label: string;
  badgeColor: string;
} {
  if (status === "draft" || !expiresAt) {
    return {
      state: "draft",
      daysRemaining: 0,
      graceDaysRemaining: GRACE_PERIOD_DAYS,
      label: "Draft",
      badgeColor: "bg-gray-100 text-gray-700 border-gray-200",
    };
  }

  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffMs = expiry.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (daysRemaining > WARNING_DAYS_BEFORE_EXPIRY) {
    return {
      state: "active",
      daysRemaining,
      graceDaysRemaining: GRACE_PERIOD_DAYS,
      label: `Aktif (${daysRemaining} hari)`,
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
  }

  if (daysRemaining > 0 && daysRemaining <= WARNING_DAYS_BEFORE_EXPIRY) {
    return {
      state: "expiring_soon",
      daysRemaining,
      graceDaysRemaining: GRACE_PERIOD_DAYS,
      label: `Segera Berakhir (${daysRemaining} hari)`,
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    };
  }

  // Invitation has expired
  const daysSinceExpiry = Math.abs(daysRemaining);
  const graceDaysRemaining = Math.max(0, GRACE_PERIOD_DAYS - daysSinceExpiry);

  if (graceDaysRemaining > 0) {
    return {
      state: "grace_period",
      daysRemaining: 0,
      graceDaysRemaining,
      label: `Masa Tenggang (${graceDaysRemaining} hari tersisa)`,
      badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    };
  }

  return {
    state: "ready_for_deletion",
    daysRemaining: 0,
    graceDaysRemaining: 0,
    label: "Batas Hapus Tercapai (Hapus Data)",
    badgeColor: "bg-red-50 text-red-700 border-red-200",
  };
}

