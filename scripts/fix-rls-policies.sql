-- Script para verificar e corrigir políticas RLS para operações admin
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar usuário atual e contexto de auth
SELECT 
    current_user,
    session_user,
    auth.role() as auth_role,
    auth.uid() as auth_uid;

-- 2. Verificar políticas atuais da tabela pessoas_festival
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
WHERE schemaname = 'public' AND tablename = 'pessoas_festival'
ORDER BY policyname;

-- 3. Remover políticas antigas se existirem e recriar corretamente
DROP POLICY IF EXISTS "Permitir todas operações para usuários autenticados - pessoas_festival" ON pessoas_festival;
DROP POLICY IF EXISTS "Permitir leitura pública para pessoas_festival" ON pessoas_festival;

-- 4. Criar políticas mais específicas e funcionais

-- Política de leitura pública (sem autenticação) - apenas registros ativos
CREATE POLICY "Leitura pública pessoas ativas" ON pessoas_festival 
    FOR SELECT 
    USING (ativo = true);

-- Política de leitura para usuários autenticados (todos os registros)
CREATE POLICY "Leitura admin todas pessoas" ON pessoas_festival 
    FOR SELECT 
    TO authenticated 
    USING (true);

-- Política de inserção para usuários autenticados
CREATE POLICY "Inserção admin pessoas" ON pessoas_festival 
    FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

-- Política de atualização para usuários autenticados
CREATE POLICY "Atualização admin pessoas" ON pessoas_festival 
    FOR UPDATE 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

-- Política de deleção para usuários autenticados
CREATE POLICY "Deleção admin pessoas" ON pessoas_festival 
    FOR DELETE 
    TO authenticated 
    USING (true);

-- 5. Verificar se as políticas foram criadas corretamente
SELECT 
    policyname,
    cmd,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'pessoas_festival'
ORDER BY policyname;