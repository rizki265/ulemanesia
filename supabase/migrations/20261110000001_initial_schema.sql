-- Ulemanesia Platform Schema Migration
-- Migration 01: Initial Tables, Types, and Indexes

-- 1. Create enum types
CREATE TYPE invitation_status AS ENUM ('draft', 'published', 'expired');
CREATE TYPE rsvp_attendance AS ENUM ('attending', 'not_attending', 'maybe');

-- 2. Templates Table (Decoupled templates catalog)
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

-- 3. Music Library Table (Admin curated audio tracks)
CREATE TABLE IF NOT EXISTS public.music_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150) NOT NULL,
    artist VARCHAR(150),
    audio_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Invitations Table (Per-customer dynamic invitations)
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

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_invitations_slug ON public.invitations(slug);
CREATE INDEX IF NOT EXISTS idx_invitations_status_expires ON public.invitations(status, expires_at);
CREATE INDEX IF NOT EXISTS idx_invitations_template_key ON public.invitations(template_key);

-- 5. Wishes Table (RSVP responses and guest greetings)
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

-- 6. Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_templates_updated_at
BEFORE UPDATE ON public.templates
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

CREATE TRIGGER trg_invitations_updated_at
BEFORE UPDATE ON public.invitations
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- 7. Trigger to automatically calculate expires_at (3 months) when status transitions to 'published'
CREATE OR REPLACE FUNCTION set_invitation_publish_and_expiry()
RETURNS TRIGGER AS $$
BEGIN
    -- If status changes to published and published_at is not set
    IF NEW.status = 'published' AND (OLD.status IS DISTINCT FROM 'published' OR NEW.published_at IS NULL) THEN
        NEW.published_at = COALESCE(NEW.published_at, NOW());
        -- 3 months validity rule (AB-01)
        IF NEW.expires_at IS NULL OR NEW.expires_at <= NEW.published_at THEN
            NEW.expires_at = NEW.published_at + INTERVAL '3 months';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_invitations_expiry
BEFORE INSERT OR UPDATE ON public.invitations
FOR EACH ROW EXECUTE FUNCTION set_invitation_publish_and_expiry();

-- 8. Function to check and update expired invitations (For pg_cron or API route)
CREATE OR REPLACE FUNCTION check_expired_invitations()
RETURNS INT AS $$
DECLARE
    affected_rows INT;
BEGIN
    UPDATE public.invitations
    SET status = 'expired'
    WHERE status = 'published'
      AND expires_at IS NOT NULL
      AND expires_at < NOW();
    
    GET DIAGNOSTICS affected_rows = ROW_COUNT;
    RETURN affected_rows;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

