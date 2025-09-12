-- Script para criar usuário administrador
-- Execute este script no SQL Editor do Supabase após configurar o Authentication

-- Este script cria um usuário admin padrão
-- IMPORTANTE: Altere a senha antes de usar em produção!

-- 1. Primeiro, você deve ir para Authentication > Users no dashboard do Supabase
-- e criar um usuário manualmente com:
-- Email: admin@paratysailfestival.com
-- Senha: (escolha uma senha forte)

-- 2. Ou, se preferir, você pode usar a API Auth do Supabase
-- para criar o usuário programaticamente via interface

-- 3. Verificar se o usuário foi criado
SELECT 
    id,
    email,
    created_at,
    email_confirmed_at,
    last_sign_in_at
FROM auth.users 
WHERE email = 'admin@paratysailfestival.com';

-- 4. Se necessário, você pode confirmar o email do usuário manualmente:
-- UPDATE auth.users 
-- SET email_confirmed_at = NOW()
-- WHERE email = 'admin@paratysailfestival.com' AND email_confirmed_at IS NULL;

-- INSTRUÇÕES:
-- 1. Vá para Supabase Dashboard > Authentication > Users
-- 2. Clique em "Add user"
-- 3. Digite o email: admin@paratysailfestival.com
-- 4. Digite uma senha forte
-- 5. Marque "Auto-confirm user" se disponível
-- 6. Clique em "Create user"

-- Após criar o usuário, execute a consulta de verificação acima para confirmar.