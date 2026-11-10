-- Ulemanesia Platform Schema Migration
-- Migration 02: Row Level Security (RLS) Policies and Storage Configuration

-- 1. Enable RLS on all tables
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.music_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

-- 2. TEMPLATES Policies
-- Public can read active templates
CREATE POLICY "Public can view active templates"
ON public.templates FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- Authenticated admins can manage templates
CREATE POLICY "Admins have full access to templates"
ON public.templates FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 3. MUSIC LIBRARY Policies
-- Public can read active music
CREATE POLICY "Public can view active music tracks"
ON public.music_library FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- Authenticated admins can manage music library
CREATE POLICY "Admins have full access to music library"
ON public.music_library FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 4. INVITATIONS Policies
-- Public can only view invitations that are published and not expired
CREATE POLICY "Public can view published active invitations"
ON public.invitations FOR SELECT
TO anon, authenticated
USING (
    status = 'published' 
    AND expires_at IS NOT NULL 
    AND expires_at > NOW()
);

-- Authenticated admins have full CRUD access to all invitations (draft, published, expired)
CREATE POLICY "Admins have full access to all invitations"
ON public.invitations FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. WISHES / RSVP Policies
-- Public can view visible wishes on active published invitations
CREATE POLICY "Public can view visible wishes"
ON public.wishes FOR SELECT
TO anon, authenticated
USING (
    is_hidden = false 
    AND EXISTS (
        SELECT 1 FROM public.invitations
        WHERE public.invitations.id = public.wishes.invitation_id
          AND public.invitations.status = 'published'
          AND public.invitations.expires_at > NOW()
    )
);

-- Public can submit RSVP & wishes ONLY if the invitation is active and published (AB-03)
CREATE POLICY "Public can insert wishes to active invitations"
ON public.wishes FOR INSERT
TO anon, authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.invitations
        WHERE public.invitations.id = invitation_id
          AND public.invitations.status = 'published'
          AND public.invitations.expires_at > NOW()
    )
);

-- Authenticated admins can manage all wishes (e.g. hide spam, delete)
CREATE POLICY "Admins have full access to wishes"
ON public.wishes FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 6. Storage Bucket Setup (Storage schemas)
-- Buckets: 'covers', 'galleries', 'music'
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('covers', 'covers', true),
    ('galleries', 'galleries', true),
    ('music', 'music', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public can view images and audio
CREATE POLICY "Public can read storage objects"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id IN ('covers', 'galleries', 'music'));

-- Storage RLS: Admins can upload, update, delete
CREATE POLICY "Admins can upload to storage"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id IN ('covers', 'galleries', 'music'));

CREATE POLICY "Admins can update storage"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id IN ('covers', 'galleries', 'music'));

CREATE POLICY "Admins can delete from storage"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id IN ('covers', 'galleries', 'music'));

