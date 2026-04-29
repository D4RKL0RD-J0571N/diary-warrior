-- =================================================================================
-- DIARIO DE REPROGRAMACIÓN MENTAL - SUPABASE SCHEMA
-- =================================================================================

-- 1. Enable UUID Extension (usually enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =================================================================================
-- TABLES
-- =================================================================================

-- Journal Entries Table
-- Stores individual field answers per user per day
CREATE TABLE public.journal_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    day_number INT NOT NULL CHECK (day_number BETWEEN 1 AND 21),
    field_key TEXT NOT NULL, -- e.g., 'q1', 'exercise', 'commitment', 'sig_name'
    content TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    -- Ensure only one entry per user/day/field combination exists
    UNIQUE(user_id, day_number, field_key)
);

-- User Progress Table
-- Tracks the current day and completed days for a user
CREATE TABLE public.user_progress (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    current_day INT NOT NULL DEFAULT 1 CHECK (current_day BETWEEN 1 AND 21),
    completed_days INT[] NOT NULL DEFAULT '{}',
    is_paid BOOLEAN NOT NULL DEFAULT false,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =================================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =================================================================================

-- Enable RLS
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Select Policies (Users can only read their own data)
CREATE POLICY "Users can view their own journal entries" 
    ON public.journal_entries FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own progress" 
    ON public.user_progress FOR SELECT 
    USING (auth.uid() = user_id);

-- Note: We intentionally do NOT create direct INSERT/UPDATE/DELETE policies.
-- Mutations will be handled exclusively through SECURITY DEFINER RPC functions.
-- This enforces our "Database-as-the-Backend" security model.

-- =================================================================================
-- RPC FUNCTIONS (MUTATIONS)
-- =================================================================================

-- 1. Sync Journal Entry
-- Idempotent upsert for saving a user's answer
CREATE OR REPLACE FUNCTION public.sync_journal_entry(
    p_day_number INT,
    p_field_key TEXT,
    p_content TEXT
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with privileges of the creator
SET search_path = public
AS $$
DECLARE
    v_user_id UUID := auth.uid();
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- Upsert the entry
    INSERT INTO public.journal_entries (user_id, day_number, field_key, content, updated_at)
    VALUES (v_user_id, p_day_number, p_field_key, p_content, now())
    ON CONFLICT (user_id, day_number, field_key) 
    DO UPDATE SET 
        content = EXCLUDED.content,
        updated_at = now();
END;
$$;

-- 2. Mark Day Completed
-- Adds the day to the completed_days array idempotently
CREATE OR REPLACE FUNCTION public.mark_day_completed(
    p_day_number INT
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID := auth.uid();
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- Upsert user progress
    INSERT INTO public.user_progress (user_id, current_day, completed_days, updated_at)
    VALUES (
        v_user_id, 
        CASE WHEN p_day_number < 21 THEN p_day_number + 1 ELSE 21 END, 
        ARRAY[p_day_number], 
        now()
    )
    ON CONFLICT (user_id) 
    DO UPDATE SET
        -- Only append if the day is not already in the array
        completed_days = 
            CASE 
                WHEN NOT (EXCLUDED.completed_days[1] = ANY(public.user_progress.completed_days)) 
                THEN public.user_progress.completed_days || EXCLUDED.completed_days[1]
                ELSE public.user_progress.completed_days 
            END,
        -- Update current day if the newly completed day is >= current day
        current_day = 
            CASE 
                WHEN EXCLUDED.completed_days[1] >= public.user_progress.current_day AND EXCLUDED.completed_days[1] < 21 
                THEN EXCLUDED.completed_days[1] + 1
                ELSE public.user_progress.current_day
            END,
        updated_at = now();
END;
$$;

-- 3. Update Current Day (For manual navigation if needed)
CREATE OR REPLACE FUNCTION public.set_current_day(
    p_day_number INT
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID := auth.uid();
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    INSERT INTO public.user_progress (user_id, current_day, updated_at)
    VALUES (v_user_id, p_day_number, now())
    ON CONFLICT (user_id) 
    DO UPDATE SET
        current_day = EXCLUDED.current_day,
        updated_at = now();
END;
$$;
