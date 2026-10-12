-- =================================================================================
-- LA MENTE DEL GUERRERO — COMPLETE REMEDIATION FOR:
-- 'authenticated_security_definer_function_executable' (0029)
--
-- Explicación técnica:
-- El linter de Supabase marca advertencia siempre que una función sea SECURITY DEFINER
-- y esté en el esquema público accesible por usuarios autenticados.
--
-- La recomendación oficial de Supabase para funciones de usuario final es cambiarlas
-- a 'SECURITY INVOKER' (que es el modo por defecto y más seguro en PostgreSQL).
-- Con SECURITY INVOKER, la función se ejecuta con los permisos del propio usuario
-- autenticado y respeta automáticamente las políticas de Row Level Security (RLS).
-- =================================================================================

-- 1. is_admin(): Cambiar a SECURITY INVOKER
-- Consulta la tabla profiles con el UID del usuario actual.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY INVOKER
STABLE
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'ADMIN'
    );
$$;

-- 2. check_paid_status(): Cambiar a SECURITY INVOKER
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'check_paid_status') THEN
        EXECUTE 'ALTER FUNCTION public.check_paid_status() SECURITY INVOKER;';
    END IF;
END $$;

-- 3. check_user_access(p_day_number integer): Cambiar a SECURITY INVOKER
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'check_user_access') THEN
        EXECUTE 'ALTER FUNCTION public.check_user_access(integer) SECURITY INVOKER;';
    END IF;
END $$;

-- 4. mark_day_completed(p_day_number integer): Cambiar a SECURITY INVOKER
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'mark_day_completed') THEN
        EXECUTE 'ALTER FUNCTION public.mark_day_completed(integer) SECURITY INVOKER;';
    END IF;
END $$;

-- 5. set_current_day(p_day_number integer): Cambiar a SECURITY INVOKER
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'set_current_day') THEN
        EXECUTE 'ALTER FUNCTION public.set_current_day(integer) SECURITY INVOKER;';
    END IF;
END $$;

-- 6. sync_journal_entry(p_day_number integer, p_field_key text, p_content text): Cambiar a SECURITY INVOKER
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'sync_journal_entry') THEN
        EXECUTE 'ALTER FUNCTION public.sync_journal_entry(integer, text, text) SECURITY INVOKER;';
    END IF;
END $$;
