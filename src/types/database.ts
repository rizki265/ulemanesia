export type InvitationStatus = 'draft' | 'published' | 'expired';
export type RsvpAttendance = 'attending' | 'not_attending' | 'maybe';

export interface Template {
  id: string;
  key: string;
  name: string;
  description: string | null;
  thumbnail_url: string;
  preview_url?: string | null;
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string | null;
  audio_url: string;
  is_active: boolean;
  created_at: string;
}

export interface EventDetail {
  title: string; // e.g. "Akad Nikah", "Pemberkatan", "Resepsi"
  date: string; // ISO date or "2026-12-25"
  start_time: string; // "09:00"
  end_time: string; // "11:00" or "Selesai"
  timezone?: string; // "WIB", "WITA", "WIT"
  location_name: string; // "Gedung Sasana Kriya"
  address: string;
  google_maps_url?: string;
  maps_embed_url?: string;
}

export interface CoupleProfile {
  name: string;
  nickname: string;
  father_name: string;
  mother_name: string;
  photo_url?: string;
  instagram?: string;
  child_order?: string; // e.g. "Putra pertama dari"
}

export interface BankAccount {
  bank_name: string; // "BCA", "Mandiri", "BRI", "BSI"
  account_number: string;
  account_holder: string;
  qr_code_url?: string;
}

export interface LoveStory {
  year: string;
  title: string;
  description: string;
  image_url?: string;
}

export interface InvitationDataPayload {
  bride: CoupleProfile;
  groom: CoupleProfile;
  quote?: {
    text: string;
    source: string;
    arabic_text?: string;
  };
  events: EventDetail[];
  countdown_target: string; // ISO format e.g. "2026-12-25T09:00:00+07:00"
  gallery: string[]; // max 10 photos
  stories?: LoveStory[];
  bank_accounts?: BankAccount[];
  qris_image_url?: string;
  gift_address?: {
    recipient_name: string;
    phone: string;
    address: string;
  };
  custom_music_url?: string;
  theme_config?: Record<string, any>;
  theme_options?: Record<string, any>;
}

export interface Invitation {
  id: string;
  slug: string;
  template_key: string;
  customer_name: string;
  customer_phone: string;
  status: InvitationStatus;
  title: string;
  event_date: string;
  cover_image_url: string | null;
  music_id?: string | null;
  music?: MusicTrack | null;
  data: InvitationDataPayload;
  published_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Wish {
  id: string;
  invitation_id: string;
  guest_name: string;
  attendance: RsvpAttendance;
  pax: number;
  message: string;
  is_hidden: boolean;
  created_at: string;
}

