# BRD – Platform Undangan Digital (Portofolio)

Versi 1.0 (Draft) · 10 November 2026 · Penyusun: Pemilik Proyek

## 1. Ringkasan Eksekutif

Dokumen ini mendefinisikan kebutuhan bisnis untuk platform undangan digital berbasis web bernama Ulemanesia. Platform berfungsi ganda: (1) sebagai **portofolio** pemilik untuk menunjukkan kemampuan desain dan pengembangan web, dan (2) sebagai **etalase layanan** jasa pembuatan undangan digital. Customer memilih template di website, memesan lewat WhatsApp, lalu pemilik membuatkan undangan melalui panel admin. Undangan aktif selama **3 bulan** sejak dipublikasikan.

## 2. Latar Belakang dan Tujuan Bisnis

**Latar belakang.** Undangan digital makin banyak dipakai di Indonesia. Layanan sejenis (mis. linkundangan.com) umumnya berbentuk self-service dengan pembayaran otomatis. Pemilik ingin model yang lebih sederhana dan personal: pemesanan lewat WhatsApp dengan pengerjaan manual oleh pemilik.

**Tujuan bisnis**

| Kode | Tujuan | Indikator |
| --- | --- | --- |
| TB-01 | Menampilkan portofolio yang profesional dan dapat dicoba langsung | Minimal 2 template demo publik saat peluncuran |
| TB-02 | Menghasilkan pesanan dari calon customer | Pesanan masuk via WhatsApp dari website |
| TB-03 | Mempercepat pembuatan undangan | Satu undangan selesai kurang dari 30 menit setelah data lengkap |
| TB-04 | Menjaga biaya operasional tetap rendah | Berjalan di tier gratis Supabase dan Vercel pada tahap awal |

## 3. Ruang Lingkup

**Dalam lingkup**

- Website publik: landing page, katalog template, halaman demo template
- Template undangan yang datanya dinamis dari database
- Tombol pemesanan yang membuka WhatsApp dengan pesan otomatis
- Panel admin untuk membuat, mengedit, mempublikasikan, dan memperpanjang undangan
- Fitur tamu: nama tamu personal lewat tambahan /nama di akhir link, RSVP, ucapan, countdown, peta, galeri, musik
- Pengelolaan masa aktif undangan (3 bulan), perpanjangan berbayar, peringatan masa aktif di dashboard admin, penghapusan data oleh admin (manual) pada 15 hari setelah kedaluwarsa, serta halaman Kebijakan Privasi dan Syarat Layanan

**Di luar lingkup (versi 1.0)**

- Pembayaran online otomatis
- Registrasi dan dashboard mandiri untuk customer
- Editor template drag-and-drop
- Pengiriman pesan WhatsApp massal otomatis
- Aplikasi mobile native

## 4. Pemangku Kepentingan

| Peran | Deskripsi | Kepentingan |
| --- | --- | --- |
| Pemilik / Admin | Pengembang sekaligus pengelola layanan | Portofolio kuat, proses kerja efisien |
| Customer | Pemesan undangan (mempelai atau keluarga) | Undangan menarik, cepat jadi, mudah dibagikan |
| Tamu undangan | Penerima link undangan | Tampilan nyaman di HP, RSVP mudah |
| Calon klien / recruiter | Pengunjung yang menilai portofolio | Kualitas desain dan teknis |

## 5. Proses Bisnis

**Proses yang diusulkan (to-be)**

1. Customer membuka website dan melihat katalog serta demo template.
2. Customer menekan tombol **Pesan**; WhatsApp terbuka dengan pesan otomatis berisi nama template.
3. Customer mengirim data lewat chat: nama mempelai, tanggal dan lokasi acara, foto, musik, dan informasi lain.
4. Admin login, memilih template, mengisi data, mengunggah foto, dan menentukan slug link.
5. Admin meninjau pratinjau, lalu menekan **Publish**. Sistem mencatat tanggal terbit dan tanggal kedaluwarsa (3 bulan).
6. Admin mengirim satu link utama ke customer; customer menambahkan /nama tamu di akhir link lalu menyebarkannya ke tamu.
7. Tamu membuka link, melihat undangan, dan mengirim RSVP serta ucapan.
8. Admin dapat melihat rekap RSVP dan memperpanjang masa aktif (Rp50.000 per bulan) setelah customer konfirmasi lewat WhatsApp; admin cukup menekan tombol Tambah Masa Aktif.
9. Setelah 3 bulan, undangan otomatis nonaktif dan menampilkan pesan kedaluwarsa; admin mendapat peringatan di dashboard; jika tidak diperpanjang dalam masa tenggang 15 hari, admin menghapus seluruh data undangan sehingga hanya template yang tersisa.

## 6. Kebutuhan Bisnis

| ID | Kebutuhan bisnis | Prioritas |
| --- | --- | --- |
| BR-01 | Pengunjung dapat melihat seluruh template beserta demonya tanpa login | Wajib |
| BR-02 | Pengunjung dapat memesan template lewat WhatsApp dengan satu klik | Wajib |
| BR-03 | Admin dapat membuat undangan baru dari template tanpa menulis kode | Wajib |
| BR-04 | Setiap undangan memiliki link unik yang mudah dibagikan | Wajib |
| BR-05 | Undangan aktif selama 3 bulan sejak dipublikasikan, lalu nonaktif, dan admin mendapat peringatan sebelum dan sesudah masa aktif habis | Wajib |
| BR-06 | Admin dapat memperpanjang masa aktif undangan setelah customer konfirmasi lewat WhatsApp dengan biaya Rp50.000 per bulan | Wajib |
| BR-07 | Tamu dapat mengirim RSVP dan ucapan, dan admin dapat melihatnya | Wajib |
| BR-08 | Satu link untuk semua tamu; menambahkan /nama di belakang link menampilkan nama tamu di undangan | Penting |
| BR-09 | Preview link di WhatsApp menampilkan judul dan foto cover | Penting |
| BR-10 | Satu template dapat dipakai banyak customer dengan data berbeda | Wajib |
| BR-11 | Data pribadi customer dan tamu hanya dapat diakses pihak berwenang dan dihapus oleh admin secara manual 15 hari setelah undangan kedaluwarsa | Wajib |
| BR-12 | Admin dapat membuat link per tamu dengan mengetik nama, tanpa menyimpan daftar tamu | Opsional |

## 7. Kebutuhan Fungsional

### 7.1 Website publik

| ID | Kebutuhan |
| --- | --- |
| FR-01 | Landing page berisi pengantar layanan, katalog template, kontak, dan tautan ke halaman Kebijakan Privasi serta Syarat Layanan |
| FR-02 | Kartu template menampilkan thumbnail, nama, dan tombol Lihat Demo serta Pesan |
| FR-03 | Halaman demo memakai data contoh dan dapat diakses publik |
| FR-04 | Tombol Pesan membuka `wa.me/<nomor>?text=<pesan berisi nama template>` |

### 7.2 Halaman undangan (per customer)

| ID | Kebutuhan |
| --- | --- |
| FR-05 | Halaman diakses lewat `/{slug}` (tanpa nama tamu) atau /{slug}/{nama} (untuk tamu tertentu); data dibaca dari database |
| FR-06 | Mengambil nama tamu dari segmen /nama di akhir link (mis. /budi-santoso menjadi Budi Santoso), tidak memakai parameter `?to=`, ditampilkan dengan aman (tanpa HTML mentah); jika /nama kosong, tampil "Tamu Undangan" |
| FR-07 | Menampilkan cover, mempelai, jadwal acara, countdown, lokasi (peta), galeri, dan musik latar |
| FR-08 | Form RSVP dan ucapan; ucapan terbaru tampil di halaman |
| FR-09 | Jika undangan kedaluwarsa atau belum dipublikasikan, tampil halaman informasi dan kontak admin; setelah data dihapus oleh admin (15 hari setelah kedaluwarsa), tampil halaman tidak ditemukan |
| FR-10 | Metadata Open Graph (judul, deskripsi, foto cover) dibuat per undangan |

### 7.3 Panel admin

| ID | Kebutuhan |
| --- | --- |
| FR-11 | Login admin dengan autentikasi; semua halaman `/admin` terlindungi |
| FR-12 | Daftar undangan dengan status (draft, published, expired), sisa hari, penanda peringatan (segera berakhir, kedaluwarsa, mendekati batas hapus), tombol pengingat WhatsApp ke customer, dan pencarian |
| FR-13 | Form pembuatan undangan: pilih template, isi data acara, unggah foto (maksimal 1 foto cover dan 10 foto galeri, dikompres otomatis), pilih musik dari pustaka, atur slug |
| FR-14 | Validasi slug: unik, huruf kecil, dan tidak memakai kata terlarang (admin, api, templates, dll) |
| FR-15 | Pratinjau undangan sebelum dipublikasikan |
| FR-16 | Tombol Publish mengisi tanggal terbit dan kedaluwarsa otomatis |
| FR-17 | Tombol Tambah Masa Aktif: setelah customer konfirmasi lewat WhatsApp, admin menekan tombol ini untuk menambah masa aktif per bulan sesuai pilihan admin (biaya Rp50.000 per bulan, dibayar di luar sistem) |
| FR-18 | Rekap RSVP per undangan (hadir, tidak hadir, ragu) dan daftar ucapan |
| FR-19 | Admin dapat menghapus ucapan yang tidak pantas, dan menghapus undangan beserta data dan fotonya secara manual lewat tombol Hapus Undangan (disertai konfirmasi) |
| FR-20 | Pembuat link per tamu (opsional): admin mengetik nama tamu dan sistem menyusun link /{slug}/{nama}; daftar nama tidak disimpan |

## 8. Aturan Bisnis

| ID | Aturan |
| --- | --- |
| AB-01 | Masa aktif dihitung **3 bulan sejak tanggal publish**, bukan sejak dibuat. |
| AB-02 | Undangan berstatus draft tidak dapat diakses publik. |
| AB-03 | Setelah lewat tanggal kedaluwarsa, undangan tidak dapat dibuka dan RSVP baru ditolak. Admin mendapat peringatan di dashboard saat sisa masa aktif 14 hari atau kurang, saat undangan kedaluwarsa, dan saat masa tenggang 15 hari hampir habis. |
| AB-04 | Perpanjangan dihitung dari tanggal kedaluwarsa yang berlaku; jika sudah lewat, dihitung dari tanggal perpanjangan. Biaya Rp50.000 per bulan. Perpanjangan hanya bisa dilakukan sebelum data dihapus oleh admin. Perpanjangan diproses admin setelah customer konfirmasi lewat WhatsApp, lalu admin menekan tombol Tambah Masa Aktif. |
| AB-05 | Undangan yang kedaluwarsa disimpan selama masa tenggang 15 hari. Setelah itu seluruh data undangan (isi, foto, RSVP, dan ucapan) dihapus permanen oleh admin secara manual, dan hanya template yang tersisa; data undangan tersimpan terpisah dari template sehingga template tidak ikut terhapus. |
| AB-06 | Slug bersifat unik dan tidak dapat digunakan ulang oleh undangan lain selama undangan lama masih tersimpan; setelah data dihapus, slug dapat dipakai lagi. |
| AB-07 | Harga pembuatan dan pembayaran diatur manual antara admin dan customer di luar sistem. Biaya perpanjangan ditetapkan Rp50.000 per bulan. |

## 9. Kebutuhan Non-Fungsional

| Kategori | Kebutuhan |
| --- | --- |
| Kinerja | Halaman undangan termuat kurang dari 3 detik di jaringan seluler 4G; foto dikompresi otomatis (sekitar 300 KB per foto, format WebP) dan memakai lazy loading |
| Responsif | Prioritas tampilan mobile, karena mayoritas tamu membuka dari WhatsApp |
| Keamanan | Row Level Security aktif di semua tabel; hanya data undangan aktif yang dapat dibaca publik; input tamu disanitasi; akses admin dengan autentikasi |
| Privasi | Data customer (nama, nomor WhatsApp) tidak tampil publik; seluruh data undangan dihapus oleh admin secara manual 15 hari setelah kedaluwarsa |
| Ketersediaan | Target 99% pada tier gratis; project Supabase dijaga agar tidak dijeda karena tidak aktif |
| Skalabilitas | Mampu menangani ratusan undangan aktif dan lonjakan kunjungan saat undangan disebar |
| Kemudahan perawatan | Template baru dapat ditambahkan lewat registry tanpa mengubah logika inti |
| SEO dan berbagi | Metadata Open Graph dan preview WhatsApp yang rapi |
| Aksesibilitas | Kontras warna dan ukuran teks yang memadai; musik tidak berputar otomatis tanpa interaksi pengguna |

## 10. Gambaran Arsitektur

| Komponen | Teknologi |
| --- | --- |
| Frontend dan routing | Next.js (App Router) |
| Database, autentikasi, penyimpanan file | Supabase (PostgreSQL, Auth, Storage) |
| Hosting | Vercel |
| Penjadwalan masa aktif | pg\_cron di Supabase |
| Pemesanan | Tautan WhatsApp (wa.me) |

**Entitas data utama:** `templates`, `invitations` (dengan kolom `status`, `published_at`, `expires_at`, dan `data` berformat JSON), `music_library`, `wishes`.

Template disimpan sebagai komponen kode dan baris di tabel `templates`. Setiap undangan customer disimpan terpisah di tabel `invitations` dan hanya merujuk ke template lewat `template_key`, sehingga menambah atau menghapus undangan tidak mengubah template.

## 11. Asumsi, Batasan, dan Risiko

**Asumsi**

- Admin hanya satu orang.
- Customer bersedia mengirim data dan foto lewat WhatsApp.
- Volume awal masih kecil (puluhan undangan aktif).

**Batasan**

- Kuota gratis Supabase dan Vercel membatasi penyimpanan dan transfer data.
- Pengerjaan manual oleh satu orang membatasi jumlah pesanan per hari.

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Penyimpanan foto cepat penuh | Layanan terhenti atau berbayar | Kompres foto saat unggah, batasi jumlah foto, peringatan di dashboard agar admin tidak lupa menghapus, hapus oleh admin setelah masa tenggang 15 hari |
| Project Supabase dijeda karena tidak aktif | Undangan tidak bisa dibuka | Ping berkala atau upgrade bila sudah berbayar |
| Spam pada ucapan dan RSVP | Tampilan tercemar | Rate limiting, validasi, dan fitur hapus oleh admin |
| Link undangan disalahgunakan untuk penipuan | Reputasi layanan terganggu | Domain sendiri yang konsisten dan imbauan kepada customer |
| Kebocoran data pribadi | Pelanggaran privasi | RLS ketat, tidak menampilkan data customer, kebijakan retensi |
| Kesalahan data dari customer | Revisi berulang | Checklist data wajib sebelum pengerjaan dimulai |

## 12. Kriteria Keberhasilan

| Indikator | Target awal |
| --- | --- |
| Jumlah template demo yang dapat dicoba | Minimal 2 |
| Waktu pembuatan satu undangan oleh admin | Kurang dari 30 menit |
| Skor Lighthouse mobile (performa) | Minimal 80 |
| Undangan kedaluwarsa tertangani otomatis | 100% |
| Pesanan masuk via tombol WhatsApp | Terlacak dan dievaluasi bulanan |

## 13. Tahapan Pengembangan

| Fase | Cakupan |
| --- | --- |
| 1. Fondasi | Setup Next.js, Supabase, skema database, RLS |
| 2. Template pertama | Template pertama dengan halaman demo dan data dummy |
| 3. Halaman undangan | Rute `/{slug}` membaca dari database, termasuk nama tamu dan metadata |
| 4. Admin | Login, form data, unggah foto, pratinjau, publish |
| 5. Interaksi tamu | RSVP, ucapan, rekap di admin |
| 6. Masa aktif | Cron kedaluwarsa (hanya mengubah status), penanda peringatan di dashboard, masa tenggang 15 hari, tombol Tambah Masa Aktif dan Hapus Undangan, halaman kedaluwarsa |
| 7. Finalisasi | Template kedua, landing page, halaman Kebijakan Privasi dan Syarat Layanan, optimasi performa, domain Ulemanesia |

## 14. Keputusan Pemilik

1. Batas media: maksimal 1 foto cover dan 10 foto galeri per undangan, tiap foto dikompres otomatis hingga sekitar 300 KB. Musik dipilih dari pustaka yang disediakan admin, tanpa unggah mp3 dari customer.
2. Masa tenggang: 15 hari setelah undangan kedaluwarsa. Jika tidak diperpanjang dalam 15 hari, seluruh data undangan dihapus manual oleh admin lewat tombol Hapus Undangan. Data undangan tersimpan terpisah dari template, sehingga template tidak terpengaruh.
3. Perpanjangan: tersedia dengan biaya Rp50.000 per bulan, dibayar manual di luar sistem. Customer cukup konfirmasi lewat WhatsApp, lalu admin menekan tombol Tambah Masa Aktif; admin mendapat peringatan di dashboard sebelum dan sesudah masa aktif habis.
4. Link tamu: satu link utama untuk semua tamu; menambahkan /nama di belakang link menampilkan nama tamu di undangan. Daftar tamu tidak disimpan di database.
5. Halaman Kebijakan Privasi dan Syarat Layanan: dibuat sebelum peluncuran.
6. Merek dan domain: Ulemanesia. Ketersediaan domain (mis. ulemanesia.com atau ulemanesia.id) perlu dicek dan diamankan sebelum peluncuran.
