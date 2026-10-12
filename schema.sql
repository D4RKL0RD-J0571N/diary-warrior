-- =================================================================================
-- LA MENTE DEL GUERRERO / THE WARRIOR'S MIND — FULL-STACK SUPABASE DDL
-- Multi-Role, Bilingual Mental Reprogramming Platform & Mentor CRM
-- =================================================================================

-- 1. Enable required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Custom Role Enum & Locale Types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('STUDENT', 'ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('PENDING', 'COMPLETED', 'REFUNDED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =================================================================================
-- 3. PROFILES / USERS TABLE
-- =================================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'STUDENT',
    preferred_language TEXT NOT NULL DEFAULT 'es' CHECK (preferred_language IN ('es', 'en')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =================================================================================
-- 4. ORDERS & SALES BILLING MANAGEMENT
-- =================================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_email TEXT NOT NULL,
    customer_name TEXT,
    stripe_session_id TEXT UNIQUE,
    provider TEXT NOT NULL DEFAULT 'stripe',
    amount INT NOT NULL, -- in cents (e.g. 4700 = $47.00 USD)
    currency TEXT NOT NULL DEFAULT 'usd',
    status order_status NOT NULL DEFAULT 'COMPLETED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =================================================================================
-- 5. USER PROGRESS (OVERALL COURSE TRACKING)
-- =================================================================================
CREATE TABLE IF NOT EXISTS public.user_progress (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    current_day INT NOT NULL DEFAULT 1 CHECK (current_day BETWEEN 1 AND 21),
    completed_days INT[] NOT NULL DEFAULT '{}',
    completed_days_count INT NOT NULL DEFAULT 0,
    is_paid BOOLEAN NOT NULL DEFAULT false,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    last_active_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =================================================================================
-- 6. JOURNAL ENTRIES (DAILY REFLECTIONS & DRILL RESPONSES)
-- =================================================================================
CREATE TABLE IF NOT EXISTS public.journal_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    day_number INT NOT NULL CHECK (day_number BETWEEN 1 AND 21),
    language_used TEXT NOT NULL DEFAULT 'es' CHECK (language_used IN ('es', 'en')),
    responses JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(user_id, day_number)
);

-- =================================================================================
-- 7. MENTOR FEEDBACK & PRIVATE CRM NOTES
-- =================================================================================
CREATE TABLE IF NOT EXISTS public.mentor_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    mentor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    day_number INT CHECK (day_number BETWEEN 1 AND 21),
    private_note TEXT, -- Internal only, visible to mentor
    mentor_feedback TEXT, -- Direct guidance dispatched to the student
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =================================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- =================================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_feedback ENABLE ROW LEVEL SECURITY;

-- Helper check if user is ADMIN
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'ADMIN'
    );
$$;

-- Secure function permissions (Privilegio Mínimo)
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- PROFILES Policies
CREATE POLICY "Users can view their own profile or admins can view all"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- USER PROGRESS Policies
CREATE POLICY "Users can view own progress or admins can view all"
    ON public.user_progress FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

-- JOURNAL ENTRIES Policies
CREATE POLICY "Users can read own entries or admins can inspect all"
    ON public.journal_entries FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert/update own entries"
    ON public.journal_entries FOR ALL
    USING (auth.uid() = user_id);

-- MENTOR FEEDBACK Policies
CREATE POLICY "Students can view feedback sent to them"
    ON public.mentor_feedback FOR SELECT
    USING (
        auth.uid() = user_id AND mentor_feedback IS NOT NULL
        OR public.is_admin()
    );

CREATE POLICY "Admins can manage mentor feedback and private notes"
    ON public.mentor_feedback FOR ALL
    USING (public.is_admin());

-- =================================================================================
-- 9. ADMIN SEED SCRIPT (INITIAL MENTOR PROVISIONING)
-- =================================================================================
-- Replace with your brother's email:
-- INSERT INTO auth.users (id, email, raw_user_meta_data)
-- VALUES ('00000000-0000-0000-0000-000000000001', 'jafeth.mentor@warriorsmind.com', '{"name": "Jafeth López"}');

-- INSERT INTO public.profiles (id, email, name, role, preferred_language)
-- VALUES (
--     '00000000-0000-0000-0000-000000000001',
--     'jafeth.mentor@warriorsmind.com',
--     'Jafeth López (Mentor)',
--     'ADMIN',
--     'es'
-- ) ON CONFLICT (email) DO UPDATE SET role = 'ADMIN';
