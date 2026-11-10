-- ================================================================
-- ULEMANESIA: COMPLETE DATABASE SETUP
-- Jalankan skrip ini sekali di Supabase Dashboard -> SQL Editor
-- ================================================================

-- 1. ENUM TYPES
DO $$ BEGIN
    CREATE TYPE invitation_status AS ENUM ('draft', 'published', 'expired');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE rsvp_attendance AS ENUM ('attending', 'not_attending', 'maybe');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. TABEL TEMPLATES
CREATE TABLE IF NOT EXISTS public.templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    thumbnail_url TEXT NOT NULL,
    preview_url TEXT,
    tags TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL MUSIC LIBRARY
CREATE TABLE IF NOT EXISTS public.music_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150) NOT NULL,
    artist VARCHAR(150),
    audio_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL INVITATIONS
CREATE TABLE IF NOT EXISTS public.invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    template_key VARCHAR(50) NOT NULL REFERENCES public.templates(key) ON UPDATE CASCADE,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    status invitation_status NOT NULL DEFAULT 'draft',
    title VARCHAR(200) NOT NULL,
    event_date TIMESTAMPTZ NOT NULL,
    cover_image_url TEXT,
    music_id UUID REFERENCES public.music_library(id) ON DELETE SET NULL,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    published_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_invitations_slug ON public.invitations(slug);
CREATE INDEX IF NOT EXISTS idx_invitations_status_expires ON public.invitations(status, expires_at);
CREATE INDEX IF NOT EXISTS idx_invitations_template_key ON public.invitations(template_key);

-- 5. TABEL WISHES (RSVP & UCAPAN)
CREATE TABLE IF NOT EXISTS public.wishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
    guest_name VARCHAR(120) NOT NULL,
    attendance rsvp_attendance NOT NULL DEFAULT 'attending',
    pax INT NOT NULL DEFAULT 1 CHECK (pax >= 1 AND pax <= 10),
    message TEXT NOT NULL,
    is_hidden BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wishes_invitation_created ON public.wishes(invitation_id, created_at DESC);

-- 6. TRIGGERS AUTO-UPDATE & AUTO-EXPIRY 3 BULAN
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_templates_updated_at ON public.templates;
CREATE TRIGGER trg_templates_updated_at
BEFORE UPDATE ON public.templates
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trg_invitations_updated_at ON public.invitations;
CREATE TRIGGER trg_invitations_updated_at
BEFORE UPDATE ON public.invitations
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

CREATE OR REPLACE FUNCTION set_invitation_publish_and_expiry()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'published' AND (OLD.status IS DISTINCT FROM 'published' OR NEW.published_at IS NULL) THEN
        NEW.published_at = COALESCE(NEW.published_at, NOW());
        IF NEW.expires_at IS NULL OR NEW.expires_at <= NEW.published_at THEN
            NEW.expires_at = NEW.published_at + INTERVAL '3 months';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_invitations_expiry ON public.invitations;
CREATE TRIGGER trg_invitations_expiry
BEFORE INSERT OR UPDATE ON public.invitations
FOR EACH ROW EXECUTE FUNCTION set_invitation_publish_and_expiry();

-- 7. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.music_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

-- 8. POLICIES
DROP POLICY IF EXISTS "Public can view active templates" ON public.templates;
CREATE POLICY "Public can view active templates"
ON public.templates FOR SELECT TO anon, authenticated
USING (is_active = true);

DROP POLICY IF EXISTS "Admins have full access to templates" ON public.templates;
CREATE POLICY "Admins have full access to templates"
ON public.templates FOR ALL TO authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view active music tracks" ON public.music_library;
CREATE POLICY "Public can view active music tracks"
ON public.music_library FOR SELECT TO anon, authenticated
USING (is_active = true);

DROP POLICY IF EXISTS "Admins have full access to music library" ON public.music_library;
CREATE POLICY "Admins have full access to music library"
ON public.music_library FOR ALL TO authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view published active invitations" ON public.invitations;
CREATE POLICY "Public can view published active invitations"
ON public.invitations FOR SELECT TO anon, authenticated
USING (status = 'published' AND expires_at IS NOT NULL AND expires_at > NOW());

DROP POLICY IF EXISTS "Admins have full access to all invitations" ON public.invitations;
CREATE POLICY "Admins have full access to all invitations"
ON public.invitations FOR ALL TO authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view visible wishes" ON public.wishes;
CREATE POLICY "Public can view visible wishes"
ON public.wishes FOR SELECT TO anon, authenticated
USING (
    is_hidden = false 
    AND EXISTS (
        SELECT 1 FROM public.invitations
        WHERE public.invitations.id = public.wishes.invitation_id
          AND public.invitations.status = 'published'
          AND public.invitations.expires_at > NOW()
    )
);

DROP POLICY IF EXISTS "Public can insert wishes to active invitations" ON public.wishes;
CREATE POLICY "Public can insert wishes to active invitations"
ON public.wishes FOR INSERT TO anon, authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.invitations
        WHERE public.invitations.id = invitation_id
          AND public.invitations.status = 'published'
          AND public.invitations.expires_at > NOW()
    )
);

DROP POLICY IF EXISTS "Admins have full access to wishes" ON public.wishes;
CREATE POLICY "Admins have full access to wishes"
ON public.wishes FOR ALL TO authenticated
USING (true) WITH CHECK (true);

-- 9. STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('covers', 'covers', true),
    ('galleries', 'galleries', true),
    ('music', 'music', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
DROP POLICY IF EXISTS "Public can read storage objects" ON storage.objects;
CREATE POLICY "Public can read storage objects"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id IN ('covers', 'galleries', 'music'));

DROP POLICY IF EXISTS "Admins can upload to storage" ON storage.objects;
CREATE POLICY "Admins can upload to storage"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id IN ('covers', 'galleries', 'music'));

DROP POLICY IF EXISTS "Admins can update storage" ON storage.objects;
CREATE POLICY "Admins can update storage"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id IN ('covers', 'galleries', 'music'));

DROP POLICY IF EXISTS "Admins can delete from storage" ON storage.objects;
CREATE POLICY "Admins can delete from storage"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id IN ('covers', 'galleries', 'music'));

-- 10. SEED INITIAL TEMPLATES & MUSIC
INSERT INTO public.templates (key, name, description, thumbnail_url, tags, is_active)
VALUES 
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
    )
ON CONFLICT DO NOTHING;

