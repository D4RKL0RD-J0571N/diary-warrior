-- =================================================================================
-- LA MENTE DEL GUERRERO / THE WARRIOR'S MIND
-- SUPABASE SECURITY HARDENING & LINTER RESOLUTION SCRIPT
-- =================================================================================

-- 1. SOLUCIÓN A: function_search_path_mutable
-- Fijar 'search_path = public' explícitamente previene ataques de suplantación de esquema (schema spoofing/search_path hijack).

-- Función de verificación de Administrador
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

-- Función de creación automática de perfil al registrarse (Trigger Auth)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, role, preferred_language)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        'STUDENT',
        'es'
    )
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.user_progress (user_id, current_day, completed_days, completed_days_count, is_paid)
    VALUES (new.id, 1, '{}', 0, false)
    ON CONFLICT (user_id) DO NOTHING;

    RETURN new;
END;
$$;


-- =================================================================================
-- 2. SOLUCIÓN A: anon_security_definer_function_executable & authenticated_security_definer_function_executable
--
-- Explicación: Por defecto en PostgreSQL, cuando creas una función, se le otorga EXECUTE a 'PUBLIC' (lo cual incluye el rol 'anon').
-- Si la función tiene 'SECURITY DEFINER', usuarios anónimos o alumnos no autenticados podrían ejecutarla vía RPC REST.
--
-- Regla de privilegio mínimo:
-- a) REVOKE EXECUTE ON FUNCTION FROM PUBLIC, anon; (quitar ejecución abierta)
-- b) Otorgar EXECUTE únicamente al rol requerido (por ejemplo, 'authenticated' o solo trigger/admin).
-- =================================================================================

-- A. handle_new_user: Solo debe ser invocada internamente por el trigger de Supabase Auth, NUNCA por clientes REST vía RPC.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;

-- B. is_admin: Función auxiliar de RLS y permisos. Solo usuarios autenticados deben poder consultarla.
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- C. grant_paid_access(p_user_id uuid): Función crítica para otorgar acceso VIP / Pagado.
-- NUNCA debe ser ejecutable por usuarios anónimos ni estudiantes comunes. Solo el rol 'service_role' (backend/webhooks) o Postgres.
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_proc p 
        JOIN pg_namespace n ON p.pronamespace = n.oid 
        WHERE n.nspname = 'public' AND p.proname = 'grant_paid_access'
    ) THEN
        EXECUTE 'ALTER FUNCTION public.grant_paid_access(uuid) SET search_path = public;';
        EXECUTE 'REVOKE EXECUTE ON FUNCTION public.grant_paid_access(uuid) FROM PUBLIC;';
        EXECUTE 'REVOKE EXECUTE ON FUNCTION public.grant_paid_access(uuid) FROM anon;';
        EXECUTE 'REVOKE EXECUTE ON FUNCTION public.grant_paid_access(uuid) FROM authenticated;';
        EXECUTE 'GRANT EXECUTE ON FUNCTION public.grant_paid_access(uuid) TO service_role;';
    END IF;
END $$;

-- D. check_paid_status(): Solo debe ser consultada por usuarios autenticados.
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_proc p 
        JOIN pg_namespace n ON p.pronamespace = n.oid 
        WHERE n.nspname = 'public' AND p.proname = 'check_paid_status'
    ) THEN
        EXECUTE 'ALTER FUNCTION public.check_paid_status() SET search_path = public;';
        EXECUTE 'REVOKE EXECUTE ON FUNCTION public.check_paid_status() FROM PUBLIC;';
        EXECUTE 'REVOKE EXECUTE ON FUNCTION public.check_paid_status() FROM anon;';
        EXECUTE 'GRANT EXECUTE ON FUNCTION public.check_paid_status() TO authenticated;';
    END IF;
END $$;

-- E. check_user_access(p_day_number integer): Solo usuarios autenticados.
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_proc p 
        JOIN pg_namespace n ON p.pronamespace = n.oid 
        WHERE n.nspname = 'public' AND p.proname = 'check_user_access'
    ) THEN
        EXECUTE 'ALTER FUNCTION public.check_user_access(integer) SET search_path = public;';
        EXECUTE 'REVOKE EXECUTE ON FUNCTION public.check_user_access(integer) FROM PUBLIC;';
        EXECUTE 'REVOKE EXECUTE ON FUNCTION public.check_user_access(integer) FROM anon;';
        EXECUTE 'GRANT EXECUTE ON FUNCTION public.check_user_access(integer) TO authenticated;';
    END IF;
END $$;

-- F. mark_day_completed(p_day_number integer): Solo usuarios autenticados.
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_proc p 
        JOIN pg_namespace n ON p.pronamespace = n.oid 
        WHERE n.nspname = 'public' AND p.proname = 'mark_day_completed'
    ) THEN
        EXECUTE 'ALTER FUNCTION public.mark_day_completed(integer) SET search_path = public;';
        EXECUTE 'REVOKE EXECUTE ON FUNCTION public.mark_day_completed(integer) FROM PUBLIC;';
        EXECUTE 'REVOKE EXECUTE ON FUNCTION public.mark_day_completed(integer) FROM anon;';
        EXECUTE 'GRANT EXECUTE ON FUNCTION public.mark_day_completed(integer) TO authenticated;';
    END IF;
END $$;

-- G. set_current_day(p_day_number integer): Solo usuarios autenticados.
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_proc p 
        JOIN pg_namespace n ON p.pronamespace = n.oid 
        WHERE n.nspname = 'public' AND p.proname = 'set_current_day'
    ) THEN
        EXECUTE 'ALTER FUNCTION public.set_current_day(integer) SET search_path = public;';
        EXECUTE 'REVOKE EXECUTE ON FUNCTION public.set_current_day(integer) FROM PUBLIC;';
        EXECUTE 'REVOKE EXECUTE ON FUNCTION public.set_current_day(integer) FROM anon;';
        EXECUTE 'GRANT EXECUTE ON FUNCTION public.set_current_day(integer) TO authenticated;';
    END IF;
END $$;

-- H. sync_journal_entry(p_day_number integer, p_field_key text, p_content text): Solo usuarios autenticados.
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_proc p 
        JOIN pg_namespace n ON p.pronamespace = n.oid 
        WHERE n.nspname = 'public' AND p.proname = 'sync_journal_entry'
    ) THEN
        EXECUTE 'ALTER FUNCTION public.sync_journal_entry(integer, text, text) SET search_path = public;';
        EXECUTE 'REVOKE EXECUTE ON FUNCTION public.sync_journal_entry(integer, text, text) FROM PUBLIC;';
        EXECUTE 'REVOKE EXECUTE ON FUNCTION public.sync_journal_entry(integer, text, text) FROM anon;';
        EXECUTE 'GRANT EXECUTE ON FUNCTION public.sync_journal_entry(integer, text, text) TO authenticated;';
    END IF;
END $$;
