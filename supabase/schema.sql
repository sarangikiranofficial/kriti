-- ==============================================================================
-- KALA KATHA — SUPABASE DATABASE SCHEMA & POLICIES
-- Problem Statement: "From Craft to Click – Artist Visibility" (ART//CODE Hackathon)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ARTISTS TABLE
-- Stores profile information for traditional artists.
-- Primary key directly references Supabase Auth users.
CREATE TABLE IF NOT EXISTS public.artists (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    name_regional TEXT, -- e.g. In Malayalam, Devanagari, or Tamil script
    art_form TEXT NOT NULL, -- e.g. "Kerala Mural", "Warli", "Madhubani", "Pattachitra"
    location_state TEXT NOT NULL, -- e.g. "Kerala", "Maharashtra", "Bihar", "Odisha"
    location_district TEXT,
    bio TEXT NOT NULL,
    languages_spoken TEXT[] DEFAULT '{}',
    portrait_url TEXT,
    whatsapp_number TEXT,
    phone TEXT,
    instagram TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Comments on Artists columns
COMMENT ON TABLE public.artists IS 'Profiles of traditional Indian folk, tribal, and classical artists.';
COMMENT ON COLUMN public.artists.slug IS 'Unique, URL-safe handle for the artist public portfolio (/a/:slug).';
COMMENT ON COLUMN public.artists.name_regional IS 'Artist name in their mother tongue script for cultural authenticity.';

-- 3. ARTWORKS TABLE
-- Stores uploaded artworks, their technical specifications, and the essential cultural story.
CREATE TABLE IF NOT EXISTS public.artworks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artist_id UUID NOT NULL REFERENCES public.artists(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    title_regional TEXT,
    image_url TEXT NOT NULL,
    image_alt TEXT NOT NULL,
    medium TEXT NOT NULL, -- e.g. "Natural vegetable dyes on handmade canvas"
    year TEXT, -- Optional year of creation
    dimensions TEXT, -- Optional e.g. "24 x 36 inches"
    price NUMERIC, -- Optional numeric price in INR
    is_price_on_request BOOLEAN NOT NULL DEFAULT false,
    availability TEXT NOT NULL DEFAULT 'available' CHECK (availability IN ('available', 'reserved', 'sold', 'archived')),
    cultural_context TEXT NOT NULL, -- The cultural story, symbolism, and technique behind the art
    ownership_declared BOOLEAN NOT NULL DEFAULT true CHECK (ownership_declared = true), -- Mandatory ethical declaration
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.artworks IS 'Artworks created and uploaded by traditional artists.';
COMMENT ON COLUMN public.artworks.cultural_context IS 'First-class cultural story, tradition, and lineage of the piece.';
COMMENT ON COLUMN public.artworks.ownership_declared IS 'Confirmation that the uploader is the artist or authorized custodian.';

-- 4. ENQUIRIES TABLE
-- Connects buyers, curators, and workshop hosts directly with traditional artists.
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artist_id UUID NOT NULL REFERENCES public.artists(id) ON DELETE CASCADE,
    artwork_id UUID REFERENCES public.artworks(id) ON DELETE SET NULL,
    sender_name TEXT NOT NULL,
    sender_contact TEXT NOT NULL, -- Email address or mobile phone number
    enquiry_type TEXT NOT NULL CHECK (enquiry_type IN ('Buy', 'Commission', 'Collaboration', 'Workshop')),
    budget TEXT, -- Optional budget range
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.enquiries IS 'Commission and purchase enquiries sent by public admirers to artists.';

-- 5. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_artists_slug ON public.artists(slug);
CREATE INDEX IF NOT EXISTS idx_artists_art_form ON public.artists(art_form);
CREATE INDEX IF NOT EXISTS idx_artists_location_state ON public.artists(location_state);
CREATE INDEX IF NOT EXISTS idx_artworks_artist_id ON public.artworks(artist_id);
CREATE INDEX IF NOT EXISTS idx_artworks_created_at ON public.artworks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_artist_id ON public.enquiries(artist_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);

-- 6. ROW LEVEL SECURITY (RLS)

-- Enable RLS on all tables
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- ARTISTS POLICIES
-- Anyone can view artist profiles
CREATE POLICY "Artists are publicly viewable"
    ON public.artists FOR SELECT
    USING (true);

-- Authenticated users can insert their own profile
CREATE POLICY "Artists can insert own profile"
    ON public.artists FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Artists can update their own profile
CREATE POLICY "Artists can update own profile"
    ON public.artists FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Artists can delete their own profile
CREATE POLICY "Artists can delete own profile"
    ON public.artists FOR DELETE
    USING (auth.uid() = id);

-- ARTWORKS POLICIES
-- Anyone can view artworks
CREATE POLICY "Artworks are publicly viewable"
    ON public.artworks FOR SELECT
    USING (true);

-- Artists can insert artworks under their own ID
CREATE POLICY "Artists can insert own artworks"
    ON public.artworks FOR INSERT
    WITH CHECK (auth.uid() = artist_id);

-- Artists can update their own artworks
CREATE POLICY "Artists can update own artworks"
    ON public.artworks FOR UPDATE
    USING (auth.uid() = artist_id)
    WITH CHECK (auth.uid() = artist_id);

-- Artists can delete their own artworks
CREATE POLICY "Artists can delete own artworks"
    ON public.artworks FOR DELETE
    USING (auth.uid() = artist_id);

-- ENQUIRIES POLICIES
-- Any public visitor can send an enquiry (insert only)
CREATE POLICY "Public can submit enquiries"
    ON public.enquiries FOR INSERT
    WITH CHECK (true);

-- Only the artist who received the enquiry can read them
CREATE POLICY "Artists can read own received enquiries"
    ON public.enquiries FOR SELECT
    USING (auth.uid() = artist_id);

-- Only the receiving artist can update status (e.g. mark read/replied)
CREATE POLICY "Artists can update own received enquiries"
    ON public.enquiries FOR UPDATE
    USING (auth.uid() = artist_id)
    WITH CHECK (auth.uid() = artist_id);

-- Only the receiving artist can delete enquiries
CREATE POLICY "Artists can delete own received enquiries"
    ON public.enquiries FOR DELETE
    USING (auth.uid() = artist_id);

-- 7. SUPABASE STORAGE SETUP ('artworks' BUCKET)
-- Insert public storage bucket for artworks and portraits
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'artworks',
    'artworks',
    true,
    5242880, -- 5 MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- Storage RLS: Public read access
CREATE POLICY "Public can view artwork images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'artworks');

-- Storage RLS: Authenticated artists can upload into their folder (userId/*)
CREATE POLICY "Authenticated users can upload artwork images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'artworks'
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- Storage RLS: Artists can update their own uploaded files
CREATE POLICY "Artists can update own uploaded images"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'artworks'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- Storage RLS: Artists can delete their own uploaded files
CREATE POLICY "Artists can delete own uploaded images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'artworks'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );
