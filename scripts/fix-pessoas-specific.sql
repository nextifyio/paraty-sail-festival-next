-- CORREÇÃO ESPECÍFICA: pessoas_festival RLS
-- Execute este script no SQL Editor do Supabase

-- 1. Remover TODAS as políticas da tabela pessoas_festival
DROP POLICY IF EXISTS "Permitir leitura pública para pessoas_festival" ON pessoas_festival;
DROP POLICY IF EXISTS "Permitir todas operações para usuários autenticados - pessoas_festival" ON pessoas_festival;
DROP POLICY IF EXISTS "Leitura pública pessoas ativas" ON pessoas_festival;
DROP POLICY IF EXISTS "Leitura admin todas pessoas" ON pessoas_festival;
DROP POLICY IF EXISTS "Inserção admin pessoas" ON pessoas_festival;
DROP POLICY IF EXISTS "Atualização admin pessoas" ON pessoas_festival;
DROP POLICY IF EXISTS "Deleção admin pessoas" ON pessoas_festival;
DROP POLICY IF EXISTS "Admin pode fazer tudo - pessoas" ON pessoas_festival;

-- 2. Verificar se não há mais políticas
SELECT count(*) as policies_count FROM pg_policies WHERE tablename = 'pessoas_festival';

-- 3. Criar apenas duas políticas simples e funcionais

-- Política para leitura pública (anônimos) - apenas registros ativos
CREATE POLICY "public_read_pessoas" ON pessoas_festival 
    FOR SELECT 
    TO anon, authenticated
    USING (ativo = true);

-- Política para admin (autenticados) - todas as operações
CREATE POLICY "admin_all_pessoas" ON pessoas_festival 
    FOR ALL 
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4. Verificar se as políticas foram criadas
SELECT 
    policyname,
    cmd,
    roles,
    permissive
FROM pg_policies 
WHERE tablename = 'pessoas_festival'
ORDER BY policyname;

-- 5. Testar inserção como usuário autenticado
-- Esta query deve funcionar se você estiver logado como admin
SELECT 'Teste de contexto auth:' as teste, auth.role() as role, auth.uid() as uid;