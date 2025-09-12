-- Script para verificar o status do RLS e policies
-- Execute este script no SQL Editor do Supabase para verificar a configuração atual

-- 1. Verificar se RLS está habilitado em todas as tabelas
SELECT 
    schemaname,
    tablename, 
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
    'pessoas_festival', 
    'atividades_festival', 
    'patrocinadores', 
    'hospedagens', 
    'restaurantes', 
    'faqs', 
    'itens_genericos'
)
ORDER BY tablename;

-- 2. Verificar policies existentes
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

-- 3. Testar acesso anônimo (deve funcionar apenas para leitura de dados ativos)
-- Esta query deve retornar apenas registros com ativo = true
SELECT 'Test: Pessoas Ativas' as teste, count(*) as total FROM pessoas_festival WHERE ativo = true;
SELECT 'Test: Atividades Ativas' as teste, count(*) as total FROM atividades_festival WHERE ativo = true;
SELECT 'Test: Restaurantes Ativos' as teste, count(*) as total FROM restaurantes WHERE ativo = true;
SELECT 'Test: FAQs Ativas' as teste, count(*) as total FROM faqs WHERE ativo = true;

-- 4. Verificar se consegue acessar dados inativos (deve falhar para usuário anônimo)
-- Esta query deve retornar 0 ou dar erro de permissão
SELECT 'Test: Pessoas Inativas' as teste, count(*) as total FROM pessoas_festival WHERE ativo = false;