-- SQL para criar tabelas no Supabase
-- Execute este script no SQL Editor do Supabase

-- Criar enums
CREATE TYPE tipo_pessoa AS ENUM ('palestrante', 'atracao');
CREATE TYPE tipo_atividade AS ENUM ('palestra', 'show', 'workshop', 'competicao', 'regata', 'cultura', 'premiacao', 'abertura', 'encerramento', 'homenagem', 'kids');
CREATE TYPE nivel_patrocinio AS ENUM ('master', 'ouro', 'prata', 'bronze');

-- Tabela pessoas_festival
CREATE TABLE pessoas_festival (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    especialidade TEXT NOT NULL,
    bio TEXT NOT NULL,
    instagram TEXT NOT NULL,
    imagem TEXT,
    tipo tipo_pessoa NOT NULL,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela atividades_festival
CREATE TABLE atividades_festival (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    tipo tipo_atividade NOT NULL,
    dia TEXT NOT NULL,
    data TEXT NOT NULL,
    horario TEXT NOT NULL,
    detalhes TEXT NOT NULL,
    local TEXT,
    pessoa_id UUID REFERENCES pessoas_festival(id),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela patrocinadores
CREATE TABLE patrocinadores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    logo TEXT,
    link TEXT,
    nivel nivel_patrocinio NOT NULL,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela hospedagens
CREATE TABLE hospedagens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL,
    desconto TEXT,
    contato TEXT NOT NULL,
    localizacao TEXT NOT NULL,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela restaurantes
CREATE TABLE restaurantes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    especialidade TEXT NOT NULL,
    endereco TEXT NOT NULL,
    telefone TEXT NOT NULL,
    cardapio TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela faqs
CREATE TABLE faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pergunta TEXT NOT NULL,
    resposta TEXT NOT NULL,
    ordem INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela itens_genericos
CREATE TABLE itens_genericos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo TEXT NOT NULL,
    dados JSONB NOT NULL,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar triggers para updated_at
CREATE TRIGGER update_pessoas_festival_updated_at BEFORE UPDATE ON pessoas_festival FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_atividades_festival_updated_at BEFORE UPDATE ON atividades_festival FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patrocinadores_updated_at BEFORE UPDATE ON patrocinadores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hospedagens_updated_at BEFORE UPDATE ON hospedagens FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_restaurantes_updated_at BEFORE UPDATE ON restaurantes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_itens_genericos_updated_at BEFORE UPDATE ON itens_genericos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS (Row Level Security)
ALTER TABLE pessoas_festival ENABLE ROW LEVEL SECURITY;
ALTER TABLE atividades_festival ENABLE ROW LEVEL SECURITY;
ALTER TABLE patrocinadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospedagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_genericos ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para leitura pública (sem autenticação)
CREATE POLICY "Permitir leitura pública para pessoas_festival" ON pessoas_festival FOR SELECT USING (ativo = true);
CREATE POLICY "Permitir leitura pública para atividades_festival" ON atividades_festival FOR SELECT USING (ativo = true);
CREATE POLICY "Permitir leitura pública para patrocinadores" ON patrocinadores FOR SELECT USING (ativo = true);
CREATE POLICY "Permitir leitura pública para hospedagens" ON hospedagens FOR SELECT USING (ativo = true);
CREATE POLICY "Permitir leitura pública para restaurantes" ON restaurantes FOR SELECT USING (ativo = true);
CREATE POLICY "Permitir leitura pública para faqs" ON faqs FOR SELECT USING (ativo = true);
CREATE POLICY "Permitir leitura pública para itens_genericos" ON itens_genericos FOR SELECT USING (ativo = true);

-- Políticas RLS para escrita (apenas usuários autenticados)
CREATE POLICY "Permitir todas operações para usuários autenticados - pessoas_festival" ON pessoas_festival FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir todas operações para usuários autenticados - atividades_festival" ON atividades_festival FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir todas operações para usuários autenticados - patrocinadores" ON patrocinadores FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir todas operações para usuários autenticados - hospedagens" ON hospedagens FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir todas operações para usuários autenticados - restaurantes" ON restaurantes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir todas operações para usuários autenticados - faqs" ON faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir todas operações para usuários autenticados - itens_genericos" ON itens_genericos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir todas operações para usuários autenticados - itens_genericos" ON itens_genericos FOR ALL USING (auth.role() = 'authenticated');