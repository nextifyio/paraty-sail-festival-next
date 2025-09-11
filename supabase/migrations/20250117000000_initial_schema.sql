-- Enums
CREATE TYPE "TipoPessoa" AS ENUM ('palestrante', 'atracao');
CREATE TYPE "TipoAtividade" AS ENUM ('palestra', 'show', 'workshop', 'competicao', 'regata', 'cultura', 'premiacao', 'abertura', 'encerramento', 'homenagem', 'kids');
CREATE TYPE "NivelPatrocinio" AS ENUM ('master', 'ouro', 'prata', 'bronze');

-- Tabela pessoas_festival
CREATE TABLE IF NOT EXISTS "pessoas_festival" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "imagem" TEXT,
    "tipo" "TipoPessoa" NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela atividades_festival
CREATE TABLE IF NOT EXISTS "atividades_festival" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "titulo" TEXT NOT NULL,
    "tipo" "TipoAtividade" NOT NULL,
    "dia" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "detalhes" TEXT NOT NULL,
    "local" TEXT,
    "pessoa_id" UUID,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "fk_atividades_pessoa" FOREIGN KEY ("pessoa_id") REFERENCES "pessoas_festival"("id")
);

-- Tabela patrocinadores
CREATE TABLE IF NOT EXISTS "patrocinadores" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "logo" TEXT,
    "link" TEXT,
    "nivel" "NivelPatrocinio" NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela hospedagens
CREATE TABLE IF NOT EXISTS "hospedagens" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "desconto" TEXT,
    "contato" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela restaurantes
CREATE TABLE IF NOT EXISTS "restaurantes" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cardapio" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela faqs
CREATE TABLE IF NOT EXISTS "faqs" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "pergunta" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela itens_genericos
CREATE TABLE IF NOT EXISTS "itens_genericos" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "tipo" TEXT NOT NULL,
    "dados" JSONB NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pessoas_festival_updated_at BEFORE UPDATE ON "pessoas_festival" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_atividades_festival_updated_at BEFORE UPDATE ON "atividades_festival" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patrocinadores_updated_at BEFORE UPDATE ON "patrocinadores" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hospedagens_updated_at BEFORE UPDATE ON "hospedagens" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_restaurantes_updated_at BEFORE UPDATE ON "restaurantes" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON "faqs" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_itens_genericos_updated_at BEFORE UPDATE ON "itens_genericos" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS "idx_pessoas_festival_tipo" ON "pessoas_festival"("tipo");
CREATE INDEX IF NOT EXISTS "idx_pessoas_festival_ativo" ON "pessoas_festival"("ativo");
CREATE INDEX IF NOT EXISTS "idx_atividades_festival_tipo" ON "atividades_festival"("tipo");
CREATE INDEX IF NOT EXISTS "idx_atividades_festival_pessoa_id" ON "atividades_festival"("pessoa_id");
CREATE INDEX IF NOT EXISTS "idx_atividades_festival_ativo" ON "atividades_festival"("ativo");
CREATE INDEX IF NOT EXISTS "idx_patrocinadores_nivel" ON "patrocinadores"("nivel");
CREATE INDEX IF NOT EXISTS "idx_patrocinadores_ativo" ON "patrocinadores"("ativo");
CREATE INDEX IF NOT EXISTS "idx_hospedagens_ativo" ON "hospedagens"("ativo");
CREATE INDEX IF NOT EXISTS "idx_restaurantes_ativo" ON "restaurantes"("ativo");
CREATE INDEX IF NOT EXISTS "idx_faqs_ativo" ON "faqs"("ativo");
CREATE INDEX IF NOT EXISTS "idx_faqs_ordem" ON "faqs"("ordem");
CREATE INDEX IF NOT EXISTS "idx_itens_genericos_tipo" ON "itens_genericos"("tipo");
CREATE INDEX IF NOT EXISTS "idx_itens_genericos_ativo" ON "itens_genericos"("ativo");