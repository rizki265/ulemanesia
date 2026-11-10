/**
 * Business constants based on Ulemanesia BRD v1.0
 */

// BR-05, AB-01: Masa aktif dihitung 3 bulan sejak tanggal publish
export const INVITATION_ACTIVE_MONTHS = 3;

// BR-06, AB-04, FR-17: Biaya perpanjangan Rp50.000 per bulan
export const EXTENSION_FEE_PER_MONTH = 50000;

// AB-03: Dashboard warning when <= 14 days left
export const WARNING_DAYS_BEFORE_EXPIRY = 14;

// AB-05, Keputusan Pemilik 2: Masa tenggang 15 hari setelah kedaluwarsa sebelum penghapusan data
export const GRACE_PERIOD_DAYS = 15;

// Keputusan Pemilik 1, FR-13: Batas foto
export const MAX_COVER_PHOTOS = 1;
export const MAX_GALLERY_PHOTOS = 10;
export const TARGET_IMAGE_COMPRESSION_KB = 300;

// FR-14: Reserved slugs that cannot be used by invitations
export const RESERVED_SLUGS = [
  'admin',
  'api',
  'templates',
  'demo',
  'login',
  'auth',
  'privacy-policy',
  'terms-of-service',
  'sitemap',
  'robots',
  'public',
  'static',
  'assets',
  'image',
  'images',
  'dashboard',
  'checkout',
  'cart',
  'order',
  'pricing',
];

// Default contact and WhatsApp
export const DEFAULT_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890';
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Ulemanesia';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

