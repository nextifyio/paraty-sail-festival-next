# 🌐 Guia de Desenvolvimento Cloud - Supabase

## ☁️ Desenvolvimento com Supabase Cloud

Este guia é focado no desenvolvimento usando a instância do Supabase na nuvem, sem necessidade de ambiente local.

## 🚀 Setup Inicial (Uma vez)

### 1. Configurar Variáveis de Ambiente

Certifique-se que o arquivo `.env.local` está configurado:

```env
# Supabase Cloud - Suas credenciais do projeto
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui

# Database URLs apontando para o Supabase Cloud
DATABASE_URL="postgresql://postgres:[SUA_SENHA]@db.[SEU_PROJETO].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[SUA_SENHA]@db.[SEU_PROJETO].supabase.co:5432/postgres"
```

### 2. Setup do Projeto

```bash
# Gerar cliente Prisma, aplicar schema e migrar dados
npm run setup
```

Este comando faz:
1. `prisma:generate` - Gera o cliente Prisma
2. `prisma:push` - Aplica o schema direto no Supabase Cloud
3. `db:migrate` - Migra os dados JSON existentes

## 📋 Scripts para Desenvolvimento Cloud

### 🔧 **Desenvolvimento Diário**
```bash
# Iniciar desenvolvimento
npm run dev

# Aplicar mudanças de schema
npm run deploy:schema

# Migrar novos dados
npm run deploy:data

# Visualizar banco (Prisma Studio)
npm run prisma:studio
```

### 🗄️ **Gestão do Database**
```bash
# Aplicar schema Prisma ao Supabase Cloud
npm run prisma:push

# Gerar cliente após mudanças no schema
npm run prisma:generate

# Migrar dados do JSON para o banco
npm run db:migrate
```

### 🔄 **Supabase CLI (Cloud)**
```bash
# Login no Supabase (uma vez)
npm run supabase:login

# Conectar projeto local ao cloud (uma vez)
npm run supabase:link

# Ver diferenças entre local e cloud
npm run supabase:db:diff

# Aplicar mudanças ao cloud
npm run supabase:db:push

# Criar nova migration
npm run supabase:migration:new nome_da_migration

# Aplicar migrations ao cloud
npm run supabase:migration:up
```

## 🔄 Workflow de Desenvolvimento

### 1. **Setup Inicial (primeira vez)**
```bash
# 1. Configurar .env.local com credenciais do Supabase
# 2. Setup completo
npm run setup

# 3. Conectar ao projeto Supabase (opcional, para CLI)
npm run supabase:login
npm run supabase:link --project-ref SEU_PROJECT_REF
```

### 2. **Desenvolvimento Diário**
```bash
# 1. Iniciar desenvolvimento
npm run dev

# 2. Fazer mudanças no código...

# 3. Se mudou o schema Prisma:
npm run deploy:schema

# 4. Se precisa migrar novos dados:
npm run deploy:data
```

### 3. **Mudanças de Schema**
```bash
# 1. Editar prisma/schema.prisma
# 2. Aplicar ao Supabase Cloud
npm run prisma:push

# 3. Gerar novo cliente
npm run prisma:generate

# 4. Testar a aplicação
npm run dev
```

## 🎯 Vantagens do Desenvolvimento Cloud

### ✅ **Benefícios**
- **Sem Docker**: Não precisa de containers locais
- **Dados Reais**: Trabalha com dados de produção/staging
- **Colaboração**: Toda equipe usa os mesmos dados
- **Performance**: Usa a infraestrutura otimizada do Supabase
- **Backups**: Backups automáticos e point-in-time recovery
- **Monitoring**: Métricas e logs em tempo real

### 🔧 **Ferramentas Disponíveis**
- **Supabase Dashboard**: Interface web completa
- **SQL Editor**: Execute queries direto no browser
- **Table Editor**: Edite dados visualmente
- **Auth**: Gerencie usuários
- **Storage**: Gerencie arquivos
- **Functions**: Deploy edge functions

## 🌐 Acessos Importantes

### **Supabase Dashboard**
- URL: https://app.supabase.com/project/SEU_PROJECT_REF
- **Table Editor**: Visualizar e editar dados
- **SQL Editor**: Executar queries
- **Auth**: Gerenciar usuários
- **Settings**: Configurações e credenciais

### **Prisma Studio (Local)**
```bash
# Abrir Prisma Studio conectado ao Supabase Cloud
npm run prisma:studio
# Acesso: http://localhost:5555
```

## 📊 Monitoramento e Debug

### **Ver Dados em Tempo Real**
1. **Supabase Dashboard** → Table Editor
2. **Prisma Studio** → `npm run prisma:studio`
3. **SQL Editor** no Supabase Dashboard

### **Logs e Monitoring**
- **Supabase Dashboard** → Settings → Logs
- **Performance**: Metrics em tempo real
- **Queries**: Slow query monitoring

### **Debug da Aplicação**
```bash
# Logs do Next.js
npm run dev

# Ver dados no Prisma Studio
npm run prisma:studio

# Executar queries direto no Supabase SQL Editor
```

## 🚀 Deploy para Produção

### **Vercel + Supabase Cloud**
```bash
# 1. Build da aplicação
npm run build

# 2. Deploy no Vercel (com env vars configuradas)
vercel --prod

# 3. Schema já está no Supabase Cloud
# 4. Dados já estão migrados
```

### **Environment Variables no Vercel**
Configure no Vercel Dashboard:
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
DATABASE_URL=sua_database_url
DIRECT_URL=sua_direct_url
```

## 🔒 Segurança

### **Row Level Security (RLS)**
- Já configurado no script `setup-database.sql`
- **Leitura pública**: Todos podem ver dados
- **Escrita autenticada**: Só usuários logados podem modificar

### **API Keys**
- **Anon Key**: Para operações public
- **Service Role Key**: Para operações admin (server-side)
- **Nunca** exponha service role no client-side

## 📝 Dicas Importantes

### ✅ **Best Practices**
1. **Sempre** teste mudanças de schema em staging primeiro
2. **Use** Prisma Studio para debug rápido
3. **Monitore** performance no Supabase Dashboard
4. **Faça** backup antes de mudanças grandes
5. **Use** migrations para mudanças de schema em produção

### ⚠️ **Cuidados**
1. **Não** delete dados importantes sem backup
2. **Teste** RLS policies cuidadosamente
3. **Monitore** usage limits do Supabase
4. **Use** service role key apenas no servidor

## 🎯 Comandos Mais Usados

```bash
# Desenvolvimento diário
npm run dev                    # Iniciar desenvolvimento
npm run prisma:studio         # Visualizar dados
npm run deploy:schema         # Aplicar mudanças de schema

# Setup e manutenção
npm run setup                 # Setup completo
npm run prisma:generate       # Gerar cliente Prisma
npm run db:migrate           # Migrar dados JSON
```

## 🚀 Resultado

Com essa configuração você tem:
- ✅ **Desenvolvimento ágil** direto no cloud
- ✅ **Dados reais** sempre atualizados
- ✅ **Colaboração fácil** com a equipe
- ✅ **Deploy simples** sem configurações extras
- ✅ **Monitoring completo** via Supabase Dashboard
- ✅ **Backup automático** e recovery

**Desenvolvimento cloud-first é mais simples e produtivo!** 🌐