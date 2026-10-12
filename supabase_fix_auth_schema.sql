-- =================================================================================
-- LA MENTE DEL GUERRERO — SOLUCIÓN DEFINITIVA ERROR 500 "Database error querying schema"
-- =================================================================================

-- 1. Limpiar el usuario insertado manualmente en auth.users para evitar tokens corruptos o NULLs en GoTrue
DELETE FROM auth.users WHERE email = 'jafeth.empresarial@gmail.com';

-- 2. Asegurar que las columnas de public.user_progress y public.profiles estén en orden
ALTER TABLE public.user_progress 
    ADD COLUMN IF NOT EXISTS completed_days_count INT NOT NULL DEFAULT 0;

ALTER TABLE public.user_progress 
    ADD COLUMN IF NOT EXISTS is_completed BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE public.user_progress 
    ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMPTZ NOT NULL DEFAULT now();

ALTER TABLE public.user_progress 
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- 3. Crear el trigger para que cuando se cree un usuario (por dashboard o registro), se asigne ADMIN si es el email de Jafeth
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
        COALESCE(new.raw_user_meta_data->>'name', 'Jafeth López (Mentor)'),
        CASE 
            WHEN new.email = 'jafeth.empresarial@gmail.com' THEN 'ADMIN'::public.user_role
            ELSE 'STUDENT'::public.user_role
        END,
        'es'
    )
    ON CONFLICT (id) DO UPDATE SET
        role = EXCLUDED.role,
        name = EXCLUDED.name;

    INSERT INTO public.user_progress (user_id, current_day, completed_days, completed_days_count, is_paid)
    VALUES (
        new.id, 
        1, 
        '{}', 
        0, 
        (new.email = 'jafeth.empresarial@gmail.com')
    )
    ON CONFLICT (user_id) DO UPDATE SET 
        is_paid = (new.email = 'jafeth.empresarial@gmail.com');

    RETURN new;
END;
$$;

-- 4. Asegurar el trigger en auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Dar permisos adecuados
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;
