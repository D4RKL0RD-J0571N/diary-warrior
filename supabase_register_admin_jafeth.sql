-- =================================================================================
-- LA MENTE DEL GUERRERO — PROVISIONING JAFETH COMO ADMIN / MENTOR
-- Ejecuta este script en el SQL Editor de Supabase
-- =================================================================================

-- 1. Habilitar extensión pgcrypto para hashing de contraseñas de auth si se requiere
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Declarar correo y contraseña deseada para Jafeth
DO $$
DECLARE
    admin_email TEXT := 'jafeth.mentor@warriorsmind.com'; -- Puedes cambiar este correo por el de Jafeth
    admin_password TEXT := 'Guerrero2026!';               -- Contraseña inicial para Jafeth (cámbiala si gustas)
    admin_name TEXT := 'Jafeth López (Mentor)';
    admin_uid UUID;
BEGIN
    -- Verificar si el usuario ya existe en auth.users
    SELECT id INTO admin_uid FROM auth.users WHERE email = admin_email;

    -- Si no existe en auth.users, crearlo con contraseña encriptada
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

        -- Crear también la identidad de email en auth.identities para compatibilidad total con Supabase GoTrue
        INSERT INTO auth.identities (
            id,
            user_id,
            identity_data,
            provider,
            last_sign_in_at,
            created_at,
            updated_at
        ) VALUES (
            gen_random_uuid(),
            admin_uid,
            jsonb_build_object('sub', admin_uid, 'email', admin_email),
            'email',
            now(),
            now(),
            now()
        );
    ELSE
        -- Si ya existía, actualizar contraseña y metadata
        UPDATE auth.users
        SET encrypted_password = crypt(admin_password, gen_salt('bf')),
            raw_user_meta_data = jsonb_build_object('name', admin_name, 'role', 'ADMIN'),
            updated_at = now()
        WHERE id = admin_uid;
    END IF;

    -- 3. Asegurar que en public.profiles esté registrado con rol ADMIN
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

    -- También por si hay conflicto por email
    UPDATE public.profiles
    SET role = 'ADMIN',
        name = admin_name,
        updated_at = now()
    WHERE email = admin_email;

    RAISE NOTICE 'Mentor Admin % provisionado exitosamente con ID %', admin_email, admin_uid;
END $$;
