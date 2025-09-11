# 🚀 Guia do Supabase CLI - Paraty Sail Festival

## ✅ Supabase CLI Instalado com Sucesso!

O Supabase CLI versão **2.40.7** foi instalado e está pronto para uso.

## 📋 Scripts Disponíveis

### 🔧 Scripts de Desenvolvimento Local
```bash
# Iniciar ambiente local Supabase (Docker)
npm run supabase:start

# Parar ambiente local
npm run supabase:stop

# Ver status dos containers
npm run supabase:status

# Inicializar projeto Supabase local
npm run supabase:init
```

### 🔐 Autenticação
```bash
# Fazer login no Supabase
npm run supabase:login

# Conectar projeto local ao projeto remoto
npm run supabase:link
```

### 🗄️ Gerenciamento de Database
```bash
# Resetar banco local
npm run supabase:db:reset

# Aplicar mudanças do schema
npm run supabase:db:push

# Ver diferenças entre local e remoto
npm run supabase:db:diff

# Criar nova migration
npm run supabase:migration:new nome_da_migration

# Aplicar migrations
npm run supabase:migration:up
```

## 🛠️ Comandos Diretos Úteis

### Desenvolvimento Local
```bash
# Inicializar projeto Supabase (primeira vez)
npx supabase init

# Fazer login (necessário para link)
npx supabase login

# Conectar ao projeto remoto
npx supabase link --project-ref SEU_PROJECT_REF

# Iniciar ambiente local completo
npx supabase start
```

### Gestão de Schema
```bash
# Gerar migration a partir das diferenças
npx supabase db diff -f nome_da_migration

# Aplicar schema do Prisma ao Supabase
npx supabase db push

# Resetar banco e aplicar todas as migrations
npx supabase db reset
```

### Funções Edge
```bash
# Criar nova função
npx supabase functions new minha_funcao

# Servir funções localmente
npx supabase functions serve

# Deploy de função
npx supabase functions deploy minha_funcao
```

## 🔄 Workflow Recomendado

### 1. Setup Inicial (Uma vez)
```bash
# 1. Inicializar projeto
npx supabase init

# 2. Fazer login
npx supabase login

# 3. Conectar ao projeto
npx supabase link --project-ref SEU_PROJECT_REF
```

### 2. Desenvolvimento (Diário)
```bash
# 1. Iniciar ambiente local
npm run supabase:start

# 2. Trabalhar no código...

# 3. Aplicar mudanças de schema
npm run supabase:db:push

# 4. Parar quando terminar
npm run supabase:stop
```

### 3. Deploy (Produção)
```bash
# 1. Gerar migration das mudanças
npx supabase db diff -f nova_feature

# 2. Aplicar ao projeto remoto
npx supabase db push --linked
```

## 🐳 Ambiente Local Supabase

O `supabase start` cria um ambiente completo local com:

- **PostgreSQL** (porta 54322)
- **Supabase Studio** (http://localhost:54323)
- **Auth Server** (porta 9999)
- **Rest API** (porta 54321)
- **Storage API** (porta 54321)
- **Edge Functions** (porta 54321)

### Acessos Locais
- **Database**: `postgresql://postgres:postgres@localhost:54322/postgres`
- **Studio**: http://localhost:54323
- **API URL**: http://localhost:54321

## 📊 Comandos de Monitoramento

```bash
# Ver status completo
npx supabase status

# Ver logs dos containers
npx supabase logs

# Inspecionar database
npx supabase inspect db --linked

# Ver configurações
npx supabase gen config
```

## 🔧 Configuração Avançada

### supabase/config.toml
Após `supabase init`, edite o arquivo de configuração:

```toml
[api]
enabled = true
port = 54321

[db]
port = 54322

[studio]
enabled = true
port = 54323

[auth]
enabled = true
```

### Migrations Automáticas
```bash
# Gerar migration a partir do Prisma schema
npx supabase db diff --use-migra -f sync_prisma_schema

# Aplicar migration
npx supabase migration up
```

## 🚀 Comandos para o Projeto Atual

Para o **Paraty Sail Festival**, use principalmente:

```bash
# Setup completo (nosso script customizado)
npm run setup

# Ou manualmente:
npm run prisma:generate  # Gera cliente Prisma
npm run prisma:push      # Aplica schema ao Supabase
npm run db:migrate       # Migra dados JSON existentes

# Para desenvolvimento com ambiente local:
npm run supabase:start   # Inicia ambiente local
npm run dev              # Inicia Next.js
```

## 📝 Dicas Importantes

1. **Primeiro uso**: Sempre execute `supabase login` antes de conectar projetos
2. **Ambiente local**: Use `supabase start` para desenvolvimento offline
3. **Migrations**: Sempre teste localmente antes de aplicar em produção
4. **Backup**: Use `supabase db dump` para backup regular
5. **Schema sync**: Use `supabase db diff` para sincronizar mudanças

## 🎯 Próximos Passos

Agora você pode:
- ✅ Desenvolver offline com ambiente local
- ✅ Sincronizar mudanças de schema facilmente
- ✅ Gerenciar migrations de forma profissional
- ✅ Deploy automatizado para produção

O Supabase CLI está configurado e pronto para uso! 🚀