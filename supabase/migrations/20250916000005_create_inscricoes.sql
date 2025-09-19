-- Tabela para inscrições da regata
CREATE TABLE IF NOT EXISTS inscricoes_regata (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Dados do responsável
  nome_capitao TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  
  -- Dados da embarcação
  classe_barco TEXT NOT NULL,
  nome_barco TEXT NOT NULL,
  tamanho_barco TEXT NOT NULL,
  num_tripulantes INTEGER NOT NULL,
  experiencia TEXT NOT NULL,
  ja_participou BOOLEAN NOT NULL,
  edicoes_anteriores TEXT,
  expectativas TEXT,
  como_conheceu TEXT,
  aceita_contato BOOLEAN DEFAULT true,
  
  -- Status e controle
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovada', 'rejeitada', 'cancelada')),
  observacoes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar índices
CREATE INDEX IF NOT EXISTS idx_inscricoes_regata_email ON inscricoes_regata(email);
CREATE INDEX IF NOT EXISTS idx_inscricoes_regata_status ON inscricoes_regata(status);
CREATE INDEX IF NOT EXISTS idx_inscricoes_regata_created_at ON inscricoes_regata(created_at);

-- Habilitar RLS (Row Level Security)
ALTER TABLE inscricoes_regata ENABLE ROW LEVEL SECURITY;

-- Política para leitura (permite acesso público para o admin)
CREATE POLICY "Permitir leitura para admin" ON inscricoes_regata
  FOR SELECT USING (true);

-- Política para inserção pública (qualquer um pode se inscrever)
CREATE POLICY "Permitir inserção pública" ON inscricoes_regata
  FOR INSERT WITH CHECK (true);

-- Política para atualização (permite atualização para admin)
CREATE POLICY "Permitir atualização para admin" ON inscricoes_regata
  FOR UPDATE USING (true);

-- Política para exclusão (permite exclusão para admin)
CREATE POLICY "Permitir exclusão para admin" ON inscricoes_regata
  FOR DELETE USING (true);

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_inscricoes_regata_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_inscricoes_regata_updated_at ON inscricoes_regata;
CREATE TRIGGER update_inscricoes_regata_updated_at
  BEFORE UPDATE ON inscricoes_regata
  FOR EACH ROW
  EXECUTE FUNCTION update_inscricoes_regata_updated_at();

-- Comentários na tabela
COMMENT ON TABLE inscricoes_regata IS 'Inscrições para a regata do Paraty Sail Festival';
COMMENT ON COLUMN inscricoes_regata.status IS 'Status da inscrição: pendente, aprovada, rejeitada, cancelada';
COMMENT ON COLUMN inscricoes_regata.classe_barco IS 'Classe da embarcação: cruceiro, esportivo, catamara, optimist, outro';
COMMENT ON COLUMN inscricoes_regata.experiencia IS 'Nível de experiência: iniciante, intermediario, avancado, expert';