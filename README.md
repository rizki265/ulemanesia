# Ulemanesia — Platform Undangan Digital (Portofolio)

Platform undangan digital pernikahan berbasis web yang berfungsi sebagai **portofolio profesional** sekaligus **etalase layanan jasa** undangan digital.

---

## 🚀 Fitur Utama Sesuai BRD v1.0

1. **Website Publik & Showcase:**
   - Landing page modern, responsif, dan ringan.
   - Katalog template dengan fitur **Lihat Demo** publik (`/demo/[templateKey]`).
   - Tombol **Pesan via WhatsApp** (`wa.me`) dengan pesan otomatis memuat nama template.
   - Halaman **Kebijakan Privasi** (`/privacy-policy`) dan **Syarat & Ketentuan Layanan** (`/terms-of-service`).

2. **Halaman Undangan Per Customer:**
   - Link dinamis unik: `/{slug}` (tamu umum) dan `/{slug}/{nama-tamu}` (tamu personal tanpa parameter `?to=`).
   - Fitur lengkap: cover hero, profil mempelai, hitung mundur (countdown), agenda acara & Google Maps direct link, galeri foto, kisah cinta, alunan musik latar dengan kontrol interaktif, amplop digital / rekening bank, serta form RSVP dan ucapan real-time.
   - Penanganan otomatis status kedaluwarsa setelah 3 bulan dan masa tenggang 15 hari.
   - Metadata Open Graph dinamis untuk WhatsApp link preview.

3. **Panel Admin (`/admin`):**
   - Autentikasi aman melalui Supabase Auth.
   - Dashboard pengelolaan undangan dengan badge siklus hidup: Aktif, Segera Berakhir (≤ 14 hari), Masa Tenggang (≤ 15 hari), dan Batas Hapus.
   - Tombol **Pengingat WhatsApp** otomatis ke customer ketika masa aktif akan/telah habis.
   - Tombol **Tambah Masa Aktif** (+1 bulan per Rp50.000).
   - Wizard pembuatan undangan baru dengan validasi kata terlarang (slug blacklist) dan kompresi foto WebP otomatis.
   - Tool **Pembuat Link Tamu Personal** cepat tanpa menyimpan daftar tamu di database.
   - Tombol **Hapus Undangan Permanen** setelah lewat masa tenggang 15 hari untuk menjaga kuota gratis Supabase.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, Server Actions, Dynamic Routes)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React
- **Database & Auth & Storage:** Supabase (PostgreSQL, Supabase Auth, Storage)
- **Effects:** Canvas Confetti

---

## 📂 Struktur Direktori

```
ulemanesia/
├── BRD – Platform Undangan Digital (Portofolio).md
├── supabase/
│   ├── migrations/
│   │   ├── 20261110000001_initial_schema.sql
│   │   └── 20261110000002_rls_policies.sql
│   └── seed.sql
├── src/
│   ├── app/
│   │   ├── (public)/         # Beranda, Katalog, Kebijakan Privasi, Syarat Layanan
│   │   ├── (admin)/          # Dashboard Admin, Login, Pembuatan Undangan Baru
│   │   ├── [slug]/           # Dynamic Invitation Router: /{slug}/{nama-tamu}
│   │   ├── demo/             # Interactive Demo Preview
│   │   └── api/              # API RSVPs, Invitations, & Cron Expiry Handler
│   ├── components/
│   │   ├── invitation/       # AudioPlayer, Countdown, EnvelopeModal, RsvpAndWishes, GiftSection
│   │   └── admin/            # Dashboard Client & Wizards
│   ├── templates/            # Template Registry Architecture
│   │   ├── registry.ts
│   │   └── designs/          # Desain Template (Minimalist Floral & Modern Elegance)
│   ├── lib/                  # Supabase clients, utils, whatsapp helper, image-compression
│   └── types/                # TypeScript Interfaces & Database Types
└── .env.example
```

---

## ⚙️ Panduan Menjalankan Proyek

### 1. Salin Environment Variables
```bash
cp .env.example .env.local
```
Sesuaikan `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, dan `NEXT_PUBLIC_WHATSAPP_NUMBER`.

### 2. Setup Basis Data di Supabase
Jalankan file migrasi SQL di dashboard SQL Editor Supabase secara berurutan:
1. `supabase/migrations/20261110000001_initial_schema.sql` (Tabel, Enum, Trigger auto-expiry 3 bulan)
2. `supabase/migrations/20261110000002_rls_policies.sql` (Row Level Security & Storage Bucket)
3. `supabase/seed.sql` (Data awal template & pustaka musik)

### 3. Jalankan Development Server
```bash
pnpm dev
# atau
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser.

### 4. Build untuk Production
```bash
pnpm build
```
Proyek siap dideploy langsung ke **Vercel** dengan zero-configuration.

