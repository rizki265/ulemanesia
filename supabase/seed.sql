-- Ulemanesia Seed Data
-- Initial Templates, Music Library, and Sample Data

-- 1. Insert Initial Templates (TB-01: Minimal 2 template demo publik saat peluncuran)
INSERT INTO public.templates (key, name, description, thumbnail_url, tags, is_active)
VALUES 
    (
        'javanese-royal',
        'Javanese Royal Heritage',
        'Desain sakral adat Jawa berlatar hitam megah, berhiaskan Gunungan Wayang emas, kaligrafi anggun, dan nuansa keraton yang agung.',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
        ARRAY['Adat Jawa', 'Gunungan', 'Royal Gold', 'Tradisional', 'Keraton'],
        true
    ),
    (
        'minimalist-floral',
        'Floral Botanical Minimalist',
        'Desain elegan bertema dedaunan botanical dengan sentuhan nuansa emas dan tipografi modern yang bersih.',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        ARRAY['Floral', 'Botanical', 'Minimalist', 'Modern'],
        true
    ),
    (
        'modern-elegance',
        'Modern Monochrome Elegance',
        'Desain kontemporer bertema monokrom mewah, kontras tinggi, sangat memukau di layar smartphone.',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        ARRAY['Monochrome', 'Luxury', 'Contemporary', 'Dark Mode'],
        true
    )
ON CONFLICT (key) DO NOTHING;

-- 2. Insert Curated Music Library (FR-13 & Keputusan Pemilik 1: Musik dipilih dari pustaka yang disediakan admin)
INSERT INTO public.music_library (title, artist, audio_url, is_active)
VALUES 
    (
        'A Thousand Years (Acoustic Instrumental)',
        'Acoustic Wedding Ensemble',
        'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-acoustic-guitar-112191.mp3',
        true
    ),
    (
        'Canon in D (Piano & Cello)',
        'Classic Strings',
        'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=canon-in-d-piano-version-10927.mp3',
        true
    ),
    (
        'Beautiful in White (Violin & Piano)',
        'Wedding Melodies',
        'https://cdn.pixabay.com/download/audio/2021/08/04/audio_32c96c4a86.mp3?filename=acoustic-guitars-ambient-uplifting-11286.mp3',
        true
    );

