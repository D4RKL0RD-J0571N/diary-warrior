-- =================================================================================
-- LA MENTE DEL GUERRERO — SUPABASE RLS & INDEXES FINAL PERFECTION
-- Soluciona:
-- 1. 'multiple_permissive_policies': En PostgreSQL, 'FOR ALL' incluye 'SELECT'.
--    Al separar explícitamente SELECT, INSERT, UPDATE, DELETE nunca habrá colisión en SELECT.
-- 2. 'unindexed_foreign_keys': Agrega índices cubrientes en foreign keys para joins instantáneos.
-- =================================================================================

-- ---------------------------------------------------------------------------------
-- PASO 1: ELIMINAR TODAS LAS POLÍTICAS ANTERIORES
-- ---------------------------------------------------------------------------------

-- PROFILES
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile or admins can view all" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- USER PROGRESS
DROP POLICY IF EXISTS "user_progress_select_policy" ON public.user_progress;
DROP POLICY IF EXISTS "user_progress_all_policy" ON public.user_progress;
DROP POLICY IF EXISTS "user_progress_insert_policy" ON public.user_progress;
DROP POLICY IF EXISTS "user_progress_update_policy" ON public.user_progress;
DROP POLICY IF EXISTS "progress_select" ON public.user_progress;
DROP POLICY IF EXISTS "progress_update" ON public.user_progress;
DROP POLICY IF EXISTS "Users can view own progress or admins can view all" ON public.user_progress;
DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.user_progress;

-- JOURNAL ENTRIES
DROP POLICY IF EXISTS "journal_entries_select_policy" ON public.journal_entries;
DROP POLICY IF EXISTS "journal_entries_modify_policy" ON public.journal_entries;
DROP POLICY IF EXISTS "journal_entries_insert_policy" ON public.journal_entries;
DROP POLICY IF EXISTS "journal_entries_update_policy" ON public.journal_entries;
DROP POLICY IF EXISTS "journal_select" ON public.journal_entries;
DROP POLICY IF EXISTS "journal_all" ON public.journal_entries;
DROP POLICY IF EXISTS "Users can read own entries or admins can inspect all" ON public.journal_entries;
DROP POLICY IF EXISTS "Users can insert/update own entries" ON public.journal_entries;
DROP POLICY IF EXISTS "Users can view their own journal entries" ON public.journal_entries;

-- MENTOR FEEDBACK
DROP POLICY IF EXISTS "mentor_feedback_student_select" ON public.mentor_feedback;
DROP POLICY IF EXISTS "mentor_feedback_admin_manage" ON public.mentor_feedback;
DROP POLICY IF EXISTS "mentor_feedback_select_policy" ON public.mentor_feedback;
DROP POLICY IF EXISTS "mentor_feedback_admin_write_policy" ON public.mentor_feedback;
DROP POLICY IF EXISTS "feedback_admin_all" ON public.mentor_feedback;
DROP POLICY IF EXISTS "feedback_student_select" ON public.mentor_feedback;
DROP POLICY IF EXISTS "Students can view feedback sent to them" ON public.mentor_feedback;
DROP POLICY IF EXISTS "Admins can manage mentor feedback and private notes" ON public.mentor_feedback;

-- ORDERS
DROP POLICY IF EXISTS "orders_select_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_select" ON public.orders;
DROP POLICY IF EXISTS "Users can view own orders or admins can view all" ON public.orders;


-- ---------------------------------------------------------------------------------
-- PASO 2: FUNCIÓN IS_ADMIN (ÓPTIMA Y SEGURA)
-- ---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY INVOKER
STABLE
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = (SELECT auth.uid()) AND role = 'ADMIN'
    );
$$;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;


-- ---------------------------------------------------------------------------------
-- PASO 3: POLÍTICAS RLS PRECISAS (1 SOLA POLÍTICA POR ACCIÓN)
-- ---------------------------------------------------------------------------------

-- 1. PROFILES
CREATE POLICY "profiles_select_policy"
    ON public.profiles FOR SELECT
    TO authenticated
    USING ((id = (SELECT auth.uid())) OR public.is_admin());

CREATE POLICY "profiles_update_policy"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (id = (SELECT auth.uid()))
    WITH CHECK (id = (SELECT auth.uid()));

-- 2. USER PROGRESS
CREATE POLICY "user_progress_select_policy"
    ON public.user_progress FOR SELECT
    TO authenticated
    USING ((user_id = (SELECT auth.uid())) OR public.is_admin());

CREATE POLICY "user_progress_insert_policy"
    ON public.user_progress FOR INSERT
    TO authenticated
    WITH CHECK ((user_id = (SELECT auth.uid())) OR public.is_admin());

CREATE POLICY "user_progress_update_policy"
    ON public.user_progress FOR UPDATE
    TO authenticated
    USING ((user_id = (SELECT auth.uid())) OR public.is_admin())
    WITH CHECK ((user_id = (SELECT auth.uid())) OR public.is_admin());

-- 3. JOURNAL ENTRIES
CREATE POLICY "journal_entries_select_policy"
    ON public.journal_entries FOR SELECT
    TO authenticated
    USING ((user_id = (SELECT auth.uid())) OR public.is_admin());

CREATE POLICY "journal_entries_insert_policy"
    ON public.journal_entries FOR INSERT
    TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "journal_entries_update_policy"
    ON public.journal_entries FOR UPDATE
    TO authenticated
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

-- 4. MENTOR FEEDBACK
-- Una sola política de SELECT compartida (los estudiantes leen su propio feedback público, los admins leen todo)
CREATE POLICY "mentor_feedback_select_policy"
    ON public.mentor_feedback FOR SELECT
    TO authenticated
    USING (
        (user_id = (SELECT auth.uid()) AND mentor_feedback IS NOT NULL)
        OR public.is_admin()
    );

CREATE POLICY "mentor_feedback_insert_policy"
    ON public.mentor_feedback FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "mentor_feedback_update_policy"
    ON public.mentor_feedback FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "mentor_feedback_delete_policy"
    ON public.mentor_feedback FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- 5. ORDERS
CREATE POLICY "orders_select_policy"
    ON public.orders FOR SELECT
    TO authenticated
    USING ((user_id = (SELECT auth.uid())) OR public.is_admin());


-- ---------------------------------------------------------------------------------
-- PASO 4: ÍNDICES CUBRIENTES PARA FOREIGN KEYS (Cero avisos unindexed_foreign_keys)
-- ---------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_mentor_feedback_mentor_id ON public.mentor_feedback (mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentor_feedback_user_id ON public.mentor_feedback (user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders (user_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_day ON public.journal_entries (user_id, day_number);
