-- =================================================================================
-- LA MENTE DEL GUERRERO — REGISTRAR A JAFETH CON SUS CREDENCIALES EXACTAS
-- Email: jafeth.empresarial@gmail.com
-- Password: jafethjls5
-- =================================================================================

-- 1. Asegurar que las columnas existan en public.user_progress
ALTER TABLE public.user_progress 
    ADD COLUMN IF NOT EXISTS completed_days_count INT NOT NULL DEFAULT 0;

ALTER TABLE public.user_progress 
    ADD COLUMN IF NOT EXISTS is_completed BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE public.user_progress 
    ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMPTZ NOT NULL DEFAULT now();

ALTER TABLE public.user_progress 
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();


-- 2. Asegurar el trigger function handle_new_user
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
        COALESCE((new.raw_user_meta_data->>'role')::public.user_role, 'STUDENT'::public.user_role),
        'es'
    )
    ON CONFLICT (id) DO UPDATE SET
        role = EXCLUDED.role,
        name = EXCLUDED.name;

    INSERT INTO public.user_progress (user_id, current_day, completed_days, completed_days_count, is_paid)
    VALUES (new.id, 1, '{}', 0, (new.raw_user_meta_data->>'role' = 'ADMIN'))
    ON CONFLICT (user_id) DO NOTHING;

    RETURN new;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;


-- 3. Crear o actualizar a Jafeth con su contraseña elegida
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$
DECLARE
    admin_email TEXT := 'jafeth.empresarial@gmail.com';
    admin_password TEXT := 'jafethjls5';
    admin_name TEXT := 'Jafeth López (Mentor)';
    admin_uid UUID;
BEGIN
    SELECT id INTO admin_uid FROM auth.users WHERE email = admin_email;

    IF admin_uid IS NULL THEN
        admin_uid := gen_random_uuid();

        INSERT INTO auth.users (
            id,
            instance_id,
            email,
            encrypted_password,
            email_confirmed_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            role,
            aud
        ) VALUES (
            admin_uid,
            '00000000-0000-0000-0000-000000000000',
            admin_email,
            crypt(admin_password, gen_salt('bf')),
            now(),
            '{"provider": "email", "providers": ["email"]}'::jsonb,
            jsonb_build_object('name', admin_name, 'role', 'ADMIN'),
            now(),
            now(),
            'authenticated',
            'authenticated'
        );

        INSERT INTO auth.identities (
            id,
            user_id,
            identity_data,
            provider,
            provider_id,
            last_sign_in_at,
            created_at,
            updated_at
        ) VALUES (
            gen_random_uuid(),
            admin_uid,
            jsonb_build_object('sub', admin_uid, 'email', admin_email),
            'email',
            admin_uid::text,
            now(),
            now(),
            now()
        );
    ELSE
        -- Si ya existía, actualizarle la contraseña inmediatamente y asignarle el rol
        UPDATE auth.users
        SET encrypted_password = crypt(admin_password, gen_salt('bf')),
            raw_user_meta_data = jsonb_build_object('name', admin_name, 'role', 'ADMIN'),
            updated_at = now()
        WHERE id = admin_uid;
    END IF;

    -- Asegurar registro en public.profiles con rol ADMIN
    INSERT INTO public.profiles (
        id,
        email,
        name,
        role,
        preferred_language,
        created_at,
        updated_at
    ) VALUES (
        admin_uid,
        admin_email,
        admin_name,
        'ADMIN',
        'es',
        now(),
        now()
    )
    ON CONFLICT (id) DO UPDATE SET
        role = 'ADMIN',
        name = admin_name,
        updated_at = now();

    UPDATE public.profiles
    SET role = 'ADMIN',
        name = admin_name,
        updated_at = now()
    WHERE email = admin_email;

    -- Asegurar acceso completo y estatus pagado en user_progress
    INSERT INTO public.user_progress (user_id, current_day, completed_days, completed_days_count, is_paid)
    VALUES (admin_uid, 1, '{}', 0, true)
    ON CONFLICT (user_id) DO UPDATE SET is_paid = true;

    RAISE NOTICE '¡Mentor Admin % creado/actualizado con éxito!', admin_email;
END $$;
