-- =================================================================================
-- LA MENTE DEL GUERRERO — SUPABASE RLS CLEANUP & PERFORMANCE HARDENING
-- Resuelve advertencias:
-- 1. 'multiple_permissive_policies' (0006): Políticas duplicadas/conflictivas
-- 2. 'auth_rls_initplan' (0003): Optimización envolviendo auth.uid() en (SELECT auth.uid())
-- =================================================================================

-- ---------------------------------------------------------------------------------
-- PASO 1: ELIMINAR TODAS LAS POLÍTICAS PREVIAS Y DUPLICADAS
-- ---------------------------------------------------------------------------------

-- PROFILES
DROP POLICY IF EXISTS "profiles_select" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile or admins can view all" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- USER PROGRESS
DROP POLICY IF EXISTS "progress_select" ON public.user_progress;
DROP POLICY IF EXISTS "progress_update" ON public.user_progress;
DROP POLICY IF EXISTS "Users can view own progress or admins can view all" ON public.user_progress;
DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.user_progress;

-- JOURNAL ENTRIES
DROP POLICY IF EXISTS "journal_select" ON public.journal_entries;
DROP POLICY IF EXISTS "journal_all" ON public.journal_entries;
DROP POLICY IF EXISTS "Users can read own entries or admins can inspect all" ON public.journal_entries;
DROP POLICY IF EXISTS "Users can insert/update own entries" ON public.journal_entries;
DROP POLICY IF EXISTS "Users can view their own journal entries" ON public.journal_entries;

-- MENTOR FEEDBACK
DROP POLICY IF EXISTS "feedback_admin_all" ON public.mentor_feedback;
DROP POLICY IF EXISTS "feedback_student_select" ON public.mentor_feedback;
DROP POLICY IF EXISTS "Students can view feedback sent to them" ON public.mentor_feedback;
DROP POLICY IF EXISTS "Admins can manage mentor feedback and private notes" ON public.mentor_feedback;

-- ORDERS
DROP POLICY IF EXISTS "orders_select" ON public.orders;
DROP POLICY IF EXISTS "Users can view own orders or admins can view all" ON public.orders;


-- ---------------------------------------------------------------------------------
-- PASO 2: FUNCIÓN IS_ADMIN CON SEARCH_PATH Y SUBSELECT EVALUADO UNA SOLA VEZ
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
-- PASO 3: POLÍTICAS RLS LIMPIAS, ÓPTIMAS Y SIN DUPLICADOS
-- Cada tabla tiene exactamente 1 política por acción para 'authenticated'.
-- Se usa (SELECT auth.uid()) para que PostgreSQL compile un InitPlan de 1 sola llamada en vez de evaluar fila por fila.
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

CREATE POLICY "user_progress_all_policy"
    ON public.user_progress FOR ALL
    TO authenticated
    USING ((user_id = (SELECT auth.uid())) OR public.is_admin())
    WITH CHECK ((user_id = (SELECT auth.uid())) OR public.is_admin());

-- 3. JOURNAL ENTRIES
CREATE POLICY "journal_entries_select_policy"
    ON public.journal_entries FOR SELECT
    TO authenticated
    USING ((user_id = (SELECT auth.uid())) OR public.is_admin());

CREATE POLICY "journal_entries_modify_policy"
    ON public.journal_entries FOR ALL
    TO authenticated
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

-- 4. MENTOR FEEDBACK
CREATE POLICY "mentor_feedback_student_select"
    ON public.mentor_feedback FOR SELECT
    TO authenticated
    USING (
        (user_id = (SELECT auth.uid()) AND mentor_feedback IS NOT NULL)
        OR public.is_admin()
    );

CREATE POLICY "mentor_feedback_admin_manage"
    ON public.mentor_feedback FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 5. ORDERS
CREATE POLICY "orders_select_policy"
    ON public.orders FOR SELECT
    TO authenticated
    USING ((user_id = (SELECT auth.uid())) OR public.is_admin());
