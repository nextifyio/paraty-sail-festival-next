-- CORREÇÃO URGENTE: Políticas RLS para permitir operações admin
-- Execute IMEDIATAMENTE no SQL Editor do Supabase

-- Remover políticas restritivas
DROP POLICY IF EXISTS "Permitir todas operações para usuários autenticados - pessoas_festival" ON pessoas_festival;

-- Criar políticas específicas mais funcionais
CREATE POLICY "Admin pode fazer tudo - pessoas" ON pessoas_festival 
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

-- Também aplicar para todas as outras tabelas
DROP POLICY IF EXISTS "Permitir todas operações para usuários autenticados - atividades_festival" ON atividades_festival;
CREATE POLICY "Admin pode fazer tudo - atividades" ON atividades_festival 
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir todas operações para usuários autenticados - patrocinadores" ON patrocinadores;
CREATE POLICY "Admin pode fazer tudo - patrocinadores" ON patrocinadores 
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir todas operações para usuários autenticados - hospedagens" ON hospedagens;
CREATE POLICY "Admin pode fazer tudo - hospedagens" ON hospedagens 
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir todas operações para usuários autenticados - restaurantes" ON restaurantes;
CREATE POLICY "Admin pode fazer tudo - restaurantes" ON restaurantes 
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir todas operações para usuários autenticados - faqs" ON faqs;
CREATE POLICY "Admin pode fazer tudo - faqs" ON faqs 
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir todas operações para usuários autenticados - itens_genericos" ON itens_genericos;
CREATE POLICY "Admin pode fazer tudo - itens_genericos" ON itens_genericos 
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

-- Verificar se funcionou
SELECT 'pessoas_festival' as tabela, count(*) as policies FROM pg_policies WHERE tablename = 'pessoas_festival' AND cmd = 'ALL';