# Guia Completo de Migrations - Paraty Sail Festival

## 📋 Resumo Executivo
Este documento explica como funcionam as migrations no projeto Paraty Sail Festival, detalhando o processo que foi descoberto e testado com sucesso.

## 🔧 Configuração do Ambiente

### Variáveis de Ambiente Essenciais
```bash
# .env
NEXT_PUBLIC_SUPABASE_URL=https://gotwnlmvdjmexxfhbclr.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL="postgresql://postgres:SERVICE_ROLE_KEY@gotwnlmvdjmexxfhbclr.supabase.co:5432/postgres?sslmode=require"
DIRECT_URL=postgresql://postgres:aQKUqP9Jyr37z87n@db.gotwnlmvdjmexxfhbclr.supabase.co:5432/postgres
```

### Senha do Banco
**IMPORTANTE**: A senha do PostgreSQL é: `aQKUqP9Jyr37z87n`

## 🚀 Processo de Migration Funcional

### 1. Login no Supabase CLI
```bash
npx supabase login
# Seguir instruções do browser para autenticar
```

### 2. Linkar Projeto Local com Remoto
```bash
# Usar a senha: aQKUqP9Jyr37z87n quando solicitado
echo "aQKUqP9Jyr37z87n" | npx supabase link --project-ref gotwnlmvdjmexxfhbclr
```

### 3. Aplicar Migrations
```bash
npx supabase migration up --linked
```

## 📁 Estrutura de Arquivos

### Localização das Migrations
```
supabase/
└── migrations/
    ├── 20250117000000_initial_schema.sql     # Schema inicial (funcionou)
    ├── 20250117100000_storage_setup.sql     # Setup de storage
    ├── 20250911173359_remote_schema.sql     # Schema remoto
    └── 20250916000005_create_inscricoes.sql # Inscrições (nossa migration)
```

### Scripts NPM Disponíveis
```json
{
  "scripts": {
    "supabase:login": "npx supabase login",
    "supabase:link": "npx supabase link",
    "supabase:migration:new": "npx supabase migration new",
    "supabase:migration:up": "npx supabase migration up --linked",
    "prisma:generate": "npx prisma generate",
    "prisma:push": "npx prisma db push"
  }
}
```

## ✅ Processo Testado e Aprovado

### Ordem de Execução
1. **Login**: `npx supabase login`
2. **Link**: `echo "aQKUqP9Jyr37z87n" | npx supabase link --project-ref gotwnlmvdjmexxfhbclr`
3. **Aplicar**: `npx supabase migration up --linked`
4. **Gerar Cliente**: `npm run prisma:generate`
5. **Verificar**: `node scripts/verificar-sistema-completo.js`

### Resultado Esperado
```
Initialising login role...
Connecting to remote database...
Applying migration 20250916000005_create_inscricoes.sql...
Local database is up to date.
```

## 🏗️ Estrutura de Migration Correta

### Template de Migration SQL
```sql
-- Nome descritivo da migration
CREATE TABLE IF NOT EXISTS nome_tabela (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- campos da tabela
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_nome_tabela_campo ON nome_tabela(campo);

-- RLS
ALTER TABLE nome_tabela ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "nome_politica" ON nome_tabela
  FOR SELECT USING (true);

-- Função de updated_at
CREATE OR REPLACE FUNCTION update_nome_tabela_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
DROP TRIGGER IF EXISTS update_nome_tabela_updated_at ON nome_tabela;
CREATE TRIGGER update_nome_tabela_updated_at
  BEFORE UPDATE ON nome_tabela
  FOR EACH ROW
  EXECUTE FUNCTION update_nome_tabela_updated_at();
```

## ❌ O Que NÃO Funciona

### Métodos que Falharam
1. **Prisma Push**: `npm run prisma:push` - Erro de conexão
2. **SQL Direto via API**: Função `exec_sql` não existe
3. **Scripts Customizados**: Não conseguem executar SQL direto
4. **Migration sem Link**: Supabase CLI tenta conexão local

### Erros Comuns
- `failed to connect to postgres`: Senha incorreta ou projeto não linkado
- `exec_sql not found`: Tentativa de usar API REST para SQL
- `relation does not exist`: Referência a tabelas inexistentes na migration

## 🔍 Verificação e Debugging

### Script de Verificação
```bash
node scripts/verificar-sistema-completo.js
```

### Testes Realizados
- ✅ Acesso à tabela
- ✅ Inserção de dados
- ✅ Leitura de dados
- ✅ Atualização de dados
- ✅ Exclusão de dados
- ✅ Contagem de registros

## 📝 Lições Aprendidas

### Por que Este Método Funciona
1. **Supabase CLI** é a ferramenta oficial e funciona perfeitamente
2. **Link do projeto** estabelece conexão segura com o banco remoto
3. **Senha correta** (`aQKUqP9Jyr37z87n`) é essencial
4. **Migrations incrementais** são aplicadas automaticamente
5. **Prisma Client** deve ser regenerado após mudanças no schema

### Diferenças do Desenvolvimento Local
- **Não usamos** Supabase local (`supabase start`)
- **Conectamos direto** no Supabase Cloud
- **Migrations** são aplicadas diretamente no banco de produção
- **Schema** é sincronizado entre Prisma e Supabase

## 🎯 Comandos de Referência Rápida

```bash
# Setup completo (recomendado)
./scripts/run-migrations.sh

# Ou manualmente:
npx supabase login
echo "aQKUqP9Jyr37z87n" | npx supabase link --project-ref gotwnlmvdjmexxfhbclr
npx supabase migration up --linked
npm run prisma:generate

# Criar nova migration
npx supabase migration new nome_da_migration

# Verificar funcionamento
node scripts/verificar-sistema-completo.js

# Scripts NPM disponíveis
npm run setup                    # Executa run-migrations.sh
npm run migrations:apply         # Executa run-migrations.sh  
npm run migrations:verify        # Verifica sistema funcionando
npm run supabase:migration:new   # Cria nova migration
npm run supabase:migration:up    # Aplica migrations
```

## 📊 Status Atual

### Tabelas Existentes
- ✅ `pessoas_festival` - Palestrantes e atrações
- ✅ `atividades_festival` - Programação do evento
- ✅ `patrocinadores` - Patrocinadores do evento
- ✅ `hospedagens` - Opções de hospedagem
- ✅ `restaurantes` - Restaurantes parceiros
- ✅ `faqs` - Perguntas frequentes
- ✅ `itens_genericos` - Dados flexíveis
- ✅ `inscricoes_regata` - **NOVA** Inscrições da regata

### Sistema Funcionando
- ✅ Popup de inscrição no site
- ✅ Painel admin em `/admin/inscricoes`
- ✅ CRUD completo
- ✅ Políticas RLS
- ✅ Triggers de updated_at

## 🔒 Segurança

### Credenciais Importantes
- **Project Ref**: `gotwnlmvdjmexxfhbclr`
- **Senha DB**: `aQKUqP9Jyr37z87n`
- **URL**: `https://gotwnlmvdjmexxfhbclr.supabase.co`

### Acesso Admin
- **Email**: `admin@paratysailfestival.com`
- **Senha**: `admin123456`

---

**Data de Criação**: 17 de Setembro de 2025  
**Última Atualização**: 17 de Setembro de 2025  
**Status**: ✅ Funcionando perfeitamente  
**Testado por**: GitHub Copilot + Carlos