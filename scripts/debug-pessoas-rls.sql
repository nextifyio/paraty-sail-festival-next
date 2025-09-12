-- Script para diagnosticar problema específico da tabela pessoas_festival
-- Execute no SQL Editor do Supabase

-- 1. Verificar se RLS está habilitado em pessoas_festival
SELECT 
    schemaname, 
    tablename, 
    rowsecurity as rls_enabled
FROM pg_tables t
JOIN pg_class c ON c.relname = t.tablename
WHERE schemaname = 'public' AND tablename = 'pessoas_festival';

-- 2. Verificar políticas atuais de pessoas_festival
SELECT 
    policyname,
    cmd,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'pessoas_festival'
ORDER BY policyname;

-- 3. Comparar com uma tabela que funciona (ex: faqs)
SELECT 
    'faqs' as tabela,
    policyname,
    cmd,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'faqs'
UNION ALL
SELECT 
    'pessoas_festival' as tabela,
    policyname,
    cmd,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'pessoas_festival'
ORDER BY tabela, policyname;

-- 4. Verificar estrutura da tabela pessoas_festival
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'pessoas_festival'
ORDER BY ordinal_position;

-- 5. Testar inserção direta (como admin)
-- ATENÇÃO: Execute esta inserção de teste para verificar se o problema é de estrutura
INSERT INTO pessoas_festival (nome, especialidade, bio, instagram, tipo, ativo) 
VALUES ('Teste RLS', 'Teste', 'Bio de teste', 'https://instagram.com/teste', 'palestrante', true)
RETURNING id, nome, ativo;

-- 6. Se a inserção acima funcionou, remover o registro de teste
-- DELETE FROM pessoas_festival WHERE nome = 'Teste RLS';