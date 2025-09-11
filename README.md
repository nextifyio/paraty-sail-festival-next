# Paraty Sail Festival - Sistema Administrativo

Sistema completo de gerenciamento para o Paraty Sail Festival, construído com Next.js 15, Supabase e TypeScript.

## 🚀 Tecnologias

- **Next.js 15** - App Router, Server Components, Server Actions
- **Supabase** - Autenticação e banco PostgreSQL
- **Prisma** - ORM e migrations
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilização
- **React Hook Form + Zod** - Validação de formulários
- **Lucide React** - Ícones

## 📋 Funcionalidades

### Autenticação
- Login/logout seguro via Supabase Auth
- Middleware para proteção de rotas administrativas
- Gestão de sessões e cookies

### Dashboard Administrativo
- Visão geral com estatísticas
- Navegação intuitiva entre seções
- Interface responsiva

### Gestão de Entidades
- **Pessoas**: Palestrantes, organizadores, convidados
- **Atividades**: Palestras, workshops, competições
- **Patrocinadores**: Diferentes categorias de patrocínio
- **Hospedagens**: Hotéis e pousadas parceiras
- **Restaurantes**: Estabelecimentos gastronômicos
- **FAQs**: Perguntas frequentes

### Recursos CRUD
- Listagem com paginação e filtros
- Criação com validação completa
- Edição inline
- Exclusão suave (soft delete)
- Upload e exibição de imagens

## 🛠️ Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd paraty-sail-festival-next
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configuração do Supabase Cloud

1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Vá para Settings > API e copie as chaves
4. Configure o banco seguindo o passo 5

### 4. Configuração das Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase Cloud
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key

# Database (Supabase Cloud)
DATABASE_URL="postgresql://postgres:[SUA_SENHA]@db.[SEU_PROJETO].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[SUA_SENHA]@db.[SEU_PROJETO].supabase.co:5432/postgres"
```

### 5. Configuração do Banco de Dados (Cloud)

#### Setup Automático (Recomendado)

```bash
# Aplica schema e migra dados direto no Supabase Cloud
npm run setup
```

#### Setup Manual

```bash
# 1. Gera o cliente Prisma
npm run prisma:generate

# 2. Aplica o schema ao Supabase Cloud
npm run prisma:push

# 3. Executa o script SQL para RLS e funções
# Copie o conteúdo de scripts/setup-database.sql e execute no Supabase SQL Editor

# 4. Migra os dados JSON existentes
npm run db:migrate
```

### 6. Criar Usuário Administrador

Execute no SQL Editor do Supabase:

```sql
-- Inserir usuário admin (ajuste o email/senha)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  role,
  aud,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@paratysailfestival.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  'authenticated',
  'authenticated',
  '',
  '',
  '',
  ''
);
```

### 7. Execute o Projeto

```bash
npm run dev
```

Acesse:
- **Site**: http://localhost:3000
- **Admin**: http://localhost:3000/admin (use as credenciais criadas)

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── admin/                 # Área administrativa
│   │   ├── layout.tsx        # Layout do admin
│   │   ├── page.tsx          # Dashboard
│   │   ├── actions.ts        # Server Actions CRUD
│   │   ├── pessoas/          # Gestão de pessoas
│   │   ├── atividades/       # Gestão de atividades
│   │   ├── patrocinadores/   # Gestão de patrocinadores
│   │   ├── hospedagens/      # Gestão de hospedagens
│   │   ├── restaurantes/     # Gestão de restaurantes
│   │   └── faqs/            # Gestão de FAQs
│   ├── auth/                 # Autenticação
│   │   ├── login/           # Página de login
│   │   └── register/        # Página de registro
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Homepage
├── components/
│   ├── layout/              # Componentes de layout
│   └── sections/            # Seções da homepage
├── lib/
│   ├── supabase.ts          # Cliente Supabase (browser)
│   └── supabase-server.ts   # Cliente Supabase (server)
├── constants/
│   └── data.ts              # Dados estáticos
└── types/
    └── index.ts             # Definições de tipos

prisma/
└── schema.prisma            # Schema do banco

scripts/
├── setup-database.sql       # DDL e configurações RLS
├── migrate-data.ts          # Script de migração
└── package-scripts.json     # Scripts auxiliares
```

## 🗄️ Schema do Banco

### Principais Entidades

- **pessoas_festival**: Palestrantes, organizadores, etc.
- **atividades_festival**: Eventos e atividades
- **patrocinadores**: Parceiros e apoiadores
- **hospedagens**: Hotéis e pousadas
- **restaurantes**: Estabelecimentos gastronômicos
- **faqs**: Perguntas frequentes
- **itens_genericos**: Dados diversos

### Relacionamentos

- Atividades podem ter uma pessoa responsável
- Todas as entidades possuem soft delete (`ativo` field)
- IDs são UUIDs para maior segurança
- Timestamps automáticos (`created_at`, `updated_at`)

## 🔒 Segurança

### Row Level Security (RLS)

- **Leitura pública**: Dados visíveis para todos
- **Escrita autenticada**: Apenas usuários logados podem modificar
- **Soft delete**: Exclusões lógicas preservam histórico

### Middleware de Autenticação

- Protege todas as rotas `/admin/*`
- Redirecionamento automático para login
- Verificação de sessão em tempo real

## 📱 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build e Deploy
npm run build           # Build para produção
npm run start           # Inicia servidor de produção

# Database (Supabase Cloud)
npm run deploy:schema   # Aplica mudanças de schema
npm run deploy:data     # Migra dados JSON
npm run db:migrate      # Migra dados existentes

# Prisma
npm run prisma:generate # Gera cliente Prisma
npm run prisma:push     # Aplica schema ao Supabase Cloud
npm run prisma:studio   # Interface visual do banco

# Supabase CLI (Cloud)
npm run supabase:login  # Login no Supabase
npm run supabase:link   # Conecta ao projeto cloud
npm run supabase:db:diff # Mostra diferenças

# Configuração Completa
npm run setup           # Setup completo (recomendado)
```

## 🚀 Deploy no Vercel

### 1. Conecte o Repositório

1. Acesse [Vercel](https://vercel.com)
2. Importe o projeto do GitHub
3. Configure as variáveis de ambiente

### 2. Variáveis de Ambiente

Adicione as seguintes variáveis no painel do Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
DATABASE_URL=sua_database_url
DIRECT_URL=sua_direct_url
```

### 3. Deploy

```bash
# Faça o deploy
vercel --prod

# Ou configure deploy automático via GitHub
```

## 🧪 Desenvolvimento

### Adicionando Novas Entidades

1. **Atualize o schema Prisma** (`prisma/schema.prisma`)
2. **Aplique as mudanças**: `npm run prisma:push`
3. **Crie Server Actions** no arquivo `actions.ts`
4. **Implemente as telas CRUD** seguindo o padrão das existentes
5. **Adicione ao menu** em `layout.tsx`

### Estrutura das Telas CRUD

Cada entidade segue o padrão:
- `page.tsx` - Listagem
- `new/page.tsx` - Criação
- `new/Form.tsx` - Formulário de criação
- `[id]/page.tsx` - Edição
- `[id]/Form.tsx` - Formulário de edição

## 🔧 Troubleshooting

### Problema: Erro de conexão com Supabase
**Solução**: Verifique as variáveis de ambiente e URLs

### Problema: Erro no Prisma generate
**Solução**: Execute `npm run prisma:generate` após mudanças no schema

### Problema: RLS bloqueando operações
**Solução**: Verifique as políticas no Supabase Dashboard

### Problema: Middleware não funcionando
**Solução**: Certifique-se que o arquivo `middleware.ts` está na raiz

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique os logs no console do navegador
2. Consulte a documentação do Supabase
3. Revise as configurações de RLS
4. Verifique as variáveis de ambiente

## 📄 Licença

Este projeto é proprietário e confidencial. Todos os direitos reservados.

---

**Paraty Sail Festival** - Sistema de gestão completo e moderno.
