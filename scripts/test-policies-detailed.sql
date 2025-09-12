-- Script para testar políticas RLS detalhadamente
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar status RLS das tabelas
SELECT 
    schemaname, 
    tablename, 
    rowsecurity as rls_enabled,
    relhasoids
FROM pg_tables t
JOIN pg_class c ON c.relname = t.tablename
WHERE schemaname = 'public'
AND tablename IN ('pessoas_festival', 'atividades_festival', 'patrocinadores', 'hospedagens', 'restaurantes', 'faqs', 'itens_genericos')
ORDER BY tablename;

-- 2. Listar todas as políticas existentes
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 3. Verificar se as tabelas têm registros
SELECT 'pessoas_festival' as tabela, count(*) as total_registros FROM pessoas_festival
UNION ALL
SELECT 'atividades_festival' as tabela, count(*) as total_registros FROM atividades_festival
UNION ALL
SELECT 'patrocinadores' as tabela, count(*) as total_registros FROM patrocinadores
UNION ALL
SELECT 'hospedagens' as tabela, count(*) as total_registros FROM hospedagens
UNION ALL
SELECT 'restaurantes' as tabela, count(*) as total_registros FROM restaurantes
UNION ALL
SELECT 'faqs' as tabela, count(*) as total_registros FROM faqs
UNION ALL
SELECT 'itens_genericos' as tabela, count(*) as total_registros FROM itens_genericos;

-- 4. Testar acesso público (sem autenticação) - apenas leitura de registros ativos
-- Estas consultas deveriam retornar apenas registros com ativo = true
SELECT 'FAQs públicos' as teste, count(*) as registros_visiveis FROM faqs WHERE ativo = true;
SELECT 'Patrocinadores públicos' as teste, count(*) as registros_visiveis FROM patrocinadores WHERE ativo = true;

-- 5. Verificar estrutura das tabelas para confirmar campo 'ativo'
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('faqs', 'patrocinadores', 'pessoas_festival')
AND column_name = 'ativo'
ORDER BY table_name;

-- 6. Verificar contexto de autenticação atual
SELECT 
    current_user,
    session_user,
    auth.role() as auth_role,
    auth.uid() as auth_uid;

-- 7. Testar uma política específica - FAQs
SELECT 
    id, 
    pergunta, 
    resposta, 
    ativo,
    'Acesso via policy' as fonte
FROM faqs 
LIMIT 5;