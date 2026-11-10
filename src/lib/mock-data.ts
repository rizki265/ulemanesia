import { InvitationDataPayload, Wish } from "@/types/database";

export const MOCK_INVITATION_FLORAL: InvitationDataPayload = {
  bride: {
    name: "Shinta Putri Lestari, S.Ked",
    nickname: "Shinta",
    father_name: "Bpk. Bambang Soetopo",
    mother_name: "Ibu Sri Wahyuningsih",
    child_order: "Putri kedua dari",
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    instagram: "shintaputri",
  },
  groom: {
    name: "Rama Wijaya, S.T",
    nickname: "Rama",
    father_name: "Bpk. Hendro Wijaya",
    mother_name: "Ibu Ratna Dewi",
    child_order: "Putra pertama dari",
    photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    instagram: "ramawijaya",
  },
  quote: {
    text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },
  countdown_target: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days from now
  events: [
    {
      title: "Akad Nikah",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      start_time: "08:00",
      end_time: "10:00",
      timezone: "WIB",
      location_name: "Masjid Agung At-Tin",
      address: "Jl. Taman Mini I No.3, Pinang Ranti, Kec. Makasar, Jakarta Timur",
      google_maps_url: "https://maps.google.com/?q=Masjid+Agung+At-Tin",
    },
    {
      title: "Resepsi Pernikahan",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      start_time: "11:00",
      end_time: "14:00",
      timezone: "WIB",
      location_name: "Grand Ballroom Hotel Indonesia",
      address: "Jl. M.H. Thamrin No.1, Menteng, Kec. Menteng, Jakarta Pusat",
      google_maps_url: "https://maps.google.com/?q=Hotel+Indonesia+Kempinski",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80",
  ],
  stories: [
    {
      year: "2019",
      title: "Pertemuan Pertama",
      description: "Kami pertama kali dipertemukan di bangku kuliah Universitas Indonesia saat kegiatan orientasi kampus.",
    },
    {
      year: "2023",
      title: "Komitmen Bersama",
      description: "Setelah 4 tahun saling mendukung dalam menyelesaikan studi dan karier, kami memutuskan untuk melangkah ke jenjang yang lebih serius.",
    },
    {
      year: "2026",
      title: "Lamaran & Menuju Bahtera",
      description: "Dengan restu kedua orang tua, Rama resmi melamar Shinta untuk membangun rumah tangga sakinah mawaddah warahmah.",
    },
  ],
  bank_accounts: [
    {
      bank_name: "BCA",
      account_number: "8830192810",
      account_holder: "Shinta Putri Lestari",
    },
    {
      bank_name: "Mandiri",
      account_number: "1370019283741",
      account_holder: "Rama Wijaya",
    },
  ],
  gift_address: {
    recipient_name: "Rama & Shinta",
    phone: "081234567890",
    address: "Jl. Dahlia No. 18, Kebayoran Baru, Jakarta Selatan, 12160",
  },
  custom_music_url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-acoustic-guitar-112191.mp3",
};

export const MOCK_INVITATION_MODERN: InvitationDataPayload = {
  bride: {
    name: "Adelia Amanda, B.Des",
    nickname: "Adel",
    father_name: "Bpk. Dr. Ir. Gunawan",
    mother_name: "Ibu dr. Maya Suryani",
    child_order: "Putri bungsu dari",
    photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    instagram: "adeliamanda",
  },
  groom: {
    name: "Dimas Pratama, M.Sc",
    nickname: "Dimas",
    father_name: "Bpk. H. Rahmat Hidayat",
    mother_name: "Ibu Hj. Farida Hanum",
    child_order: "Putra sulung dari",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    instagram: "dimaspratama",
  },
  quote: {
    text: "Cinta sejati bukanlah menemukan orang yang sempurna, melainkan melihat ketidaksempurnaan seseorang dengan cara yang sempurna.",
    source: "Sam Keen",
  },
  countdown_target: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
  events: [
    {
      title: "Holy Matrimony & Akad",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
      start_time: "09:00",
      end_time: "11:00",
      timezone: "WIB",
      location_name: "The Glass House Jakarta",
      address: "Jl. Wijaya Timur Raya No. 12, Kebayoran Baru, Jakarta Selatan",
      google_maps_url: "https://maps.google.com/?q=The+Glass+House+Jakarta",
    },
    {
      title: "Evening Gala Dinner & Reception",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
      start_time: "18:30",
      end_time: "21:30",
      timezone: "WIB",
      location_name: "Sky Pavilion Rooftop Lounge",
      address: "Level 42 Menara Mandiri, Senayan, Jakarta",
      google_maps_url: "https://maps.google.com/?q=Menara+Mandiri+Jakarta",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
  ],
  bank_accounts: [
    {
      bank_name: "BCA",
      account_number: "7120394812",
      account_holder: "Adelia Amanda",
    },
    {
      bank_name: "BSI",
      account_number: "7192837492",
      account_holder: "Dimas Pratama",
    },
  ],
  custom_music_url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=canon-in-d-piano-version-10927.mp3",
};

export const MOCK_WISHES: Wish[] = [
  {
    id: "w-1",
    invitation_id: "demo-invitation-id",
    guest_name: "Budi Santoso & Keluarga",
    attendance: "attending",
    pax: 2,
    message: "Selamat Rama & Shinta! Semoga menjadi keluarga yang sakinah, mawaddah, dan warahmah. Bahagia selalu selamanya!",
    is_hidden: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: "w-2",
    invitation_id: "demo-invitation-id",
    guest_name: "Citra Lestari",
    attendance: "attending",
    pax: 1,
    message: "Aaaaa cantiknya calon pengantin! Lancar sampai hari H yaa sayang, can't wait to see both of you on stage! ✨🤍",
    is_hidden: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "w-3",
    invitation_id: "demo-invitation-id",
    guest_name: "Dedi Prasetyo",
    attendance: "maybe",
    pax: 1,
    message: "Barakallahu lakum wa baraka alaikum wa jama'a bainakuma fii khoir. Selamat menempuh hidup baru sahabatku!",
    is_hidden: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

export const MOCK_INVITATION_JAVANESE: InvitationDataPayload = {
  bride: {
    name: "R.Aj. Kayla Paramitha, S.Pd.",
    nickname: "Kayla",
    father_name: "Bpk. R.M. Bambang Soetopo",
    mother_name: "Ibu R.Ay. Sri Wahyuningsih",
    child_order: "Putri wuragil saking",
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    instagram: "kaylaparamitha",
  },
  groom: {
    name: "R.M. Arka Daniswara, S.T.",
    nickname: "Arka",
    father_name: "Bpk. K.R.T. Haryo Daniswara",
    mother_name: "Ibu Nyi M.A. Endang Rahayu",
    child_order: "Putra pambarep saking",
    photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    instagram: "arkadaniswara",
  },
  quote: {
    text: "Ngesti wara nirmala, ambabar katresnan suci. Mugi Gusti Ingkang Murbeng Dumadi tansah paring berkah, karaharjan, lan katentreman lahir tumusing batin.",
    source: "Serat Kinanthi — Falsafah Krama Jawa",
  },
  countdown_target: new Date(Date.now() + 1000 * 60 * 60 * 24 * 32).toISOString(),
  events: [
    {
      title: "Upacara Ijab Qabul (Akad)",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 32).toISOString(),
      start_time: "08:00",
      end_time: "10:00",
      timezone: "WIB",
      location_name: "Pendopo Ageng Ndalem Mangkubumen",
      address: "Jl. Kadipaten Kulon No. 12, Kraton, Yogyakarta",
      google_maps_url: "https://maps.google.com/?q=Kraton+Yogyakarta",
    },
    {
      title: "Pahargyan Temanten (Resepsi Adat)",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 32).toISOString(),
      start_time: "11:00",
      end_time: "14:00",
      timezone: "WIB",
      location_name: "Sasana Hinggil Dwi Abad",
      address: "Alun-Alun Selatan, Kraton, Kota Yogyakarta, D.I. Yogyakarta",
      google_maps_url: "https://maps.google.com/?q=Sasana+Hinggil+Dwi+Abad",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80",
  ],
  stories: [
    {
      year: "2020",
      title: "Pitepangan (Awal Perjumpaan)",
      description: "Kanthi kersaning Gusti, kawitan pepanggihan wonten ing kitha Ngayogyakarta Hadiningrat nalika sami ngudi ngelmu.",
    },
    {
      year: "2024",
      title: "Nglambang Katresnan (Lamaran)",
      description: "Kulawarga ageng kakung sowan marak ing dalemipun putri saperlu ngaturaken tali asih tuwin nyuwun pangestu palakrama.",
    },
    {
      year: "2026",
      title: "Daup Palakrama (Hari Bahagia)",
      description: "Nyawijining katresnan ing sangandhaping pangauban Gusti Ingkang Maha Agung tumuju bale wisma ingkang tentrem rahayu.",
    },
  ],
  bank_accounts: [
    {
      bank_name: "BCA",
      account_number: "8839012931",
      account_holder: "Kayla Paramitha",
    },
    {
      bank_name: "Mandiri",
      account_number: "1370098234120",
      account_holder: "Arka Daniswara",
    },
  ],
  gift_address: {
    recipient_name: "Arka & Kayla",
    phone: "085601878097",
    address: "Ndalem Daniswaran, Jl. Suryodiningratan No. 45, Mantrijeron, Yogyakarta 55141",
  },
  custom_music_url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-acoustic-guitar-112191.mp3",
};

export const MOCK_INVITATION_EDITORIAL: InvitationDataPayload = {
  bride: {
    name: "Clarissa Aurelia, B.A.",
    nickname: "Clarissa",
    father_name: "Bpk. Ir. Rian Handoko",
    mother_name: "Ibu Dian Anggraini",
    child_order: "Putri pertama dari",
    photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    instagram: "clarissaaurelia",
  },
  groom: {
    name: "Dimas Pratama, M.Sc.",
    nickname: "Dimas",
    father_name: "Bpk. H. Tri Wibowo",
    mother_name: "Ibu Hj. Siti Nurjanah",
    child_order: "Putra kedua dari",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    instagram: "dimaspratama",
  },
  quote: {
    text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },
  countdown_target: new Date(Date.now() + 1000 * 60 * 60 * 24 * 40).toISOString(),
  events: [
    {
      title: "Akad Nikah",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 40).toISOString(),
      start_time: "08:30",
      end_time: "10:30",
      timezone: "WIB",
      location_name: "Glasshouse Plataran Dharmawangsa",
      address: "Jl. Dharmawangsa Raya No. 6, Kebayoran Baru, Jakarta Selatan",
      google_maps_url: "https://maps.google.com/?q=Plataran+Dharmawangsa",
    },
    {
      title: "Resepsi Pernikahan",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 40).toISOString(),
      start_time: "18:30",
      end_time: "21:30",
      timezone: "WIB",
      location_name: "The Glass House Ballroom",
      address: "Jl. Dharmawangsa Raya No. 6, Kebayoran Baru, Jakarta Selatan",
      google_maps_url: "https://maps.google.com/?q=Plataran+Dharmawangsa",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
  ],
  stories: [
    {
      year: "2021",
      title: "First Encounter",
      description: "Takdir mempertemukan kami di sebuah galeri seni di Jakarta Selatan.",
    },
    {
      year: "2024",
      title: "A Promise Made",
      description: "Di bawah langit senja pantai Bali, Dimas meminta Clarissa untuk menjadi teman hidupnya selamanya.",
    },
    {
      year: "2026",
      title: "The Beginning of Forever",
      description: "Mengikat janji suci di hadapan keluarga besar dan para sahabat terkasih.",
    },
  ],
  bank_accounts: [
    {
      bank_name: "BCA",
      account_number: "8839019201",
      account_holder: "Clarissa Aurelia",
    },
    {
      bank_name: "Bank Mandiri",
      account_number: "1370019283742",
      account_holder: "Dimas Pratama",
    },
  ],
  gift_address: {
    recipient_name: "Dimas & Clarissa",
    phone: "081298765432",
    address: "Jl. Brawijaya Raya No. 22, Kebayoran Baru, Jakarta Selatan 12160",
  },
  custom_music_url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-acoustic-guitar-112191.mp3",
};



