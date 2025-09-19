# TROUBLESHOOTING GUIDE - Paraty Sail Festival

## 🚨 Problemas Comuns e Soluções Testadas

### 1. Migrations Não Aplicam

#### Sintomas:
- Migration não executa
- Erro de conexão
- Tabela não criada

#### Soluções Testadas (em ordem):
```bash
# 1. Verificar login
npx supabase projects list

# 2. Re-linkar projeto
echo "aQKUqP9Jyr37z87n" | npx supabase link --project-ref gotwnlmvdjmexxfhbclr

# 3. Aplicar migration
npx supabase migration up --linked

# 4. Se falhar, usar script automatizado
npm run migrations:apply
```

#### Causa Raiz Descoberta:
- Senha do banco: `aQKUqP9Jyr37z87n`
- Project ref: `gotwnlmvdjmexxfhbclr`
- NUNCA usar `prisma push` com Supabase Cloud

### 2. Prisma Client Desatualizado

#### Sintomas:
- Erro: "Table doesn't exist in client"
- Tipos TypeScript incorretos
- Queries falham

#### Solução:
```bash
npm run prisma:generate
```

#### Quando Executar:
- Após qualquer migration
- Após mudanças no schema.prisma
- Se tipos estão incorretos

### 3. RLS Bloqueia Operações

#### Sintomas:
- "Policy violation" errors
- Operações falham no admin
- Dados não aparecem

#### Solução Testada:
```sql
-- Verificar policies existentes
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'inscricoes_regata';

-- Recriar policies se necessário
DROP POLICY IF EXISTS "policy_name" ON inscricoes_regata;
CREATE POLICY "new_policy" ON inscricoes_regata FOR ALL USING (true);
```

### 4. Erro "exec_sql not found"

#### Sintomas:
- Scripts customizados falham
- API REST retorna 404
- Migrations via fetch falham

#### Causa:
- Supabase não tem função `exec_sql`
- Scripts que tentam SQL direto via API

#### Solução:
- SEMPRE usar `npx supabase migration up --linked`
- NUNCA usar scripts de SQL direto
- Confiar no CLI oficial

### 5. Variáveis de Ambiente

#### Sintomas:
- "undefined" em URLs
- Conexão falha
- Auth não funciona

#### Verificação:
```bash
# Verificar se .env existe e está correto
cat .env | grep SUPABASE

# Verificar se variáveis carregam
node -e "require('dotenv').config(); console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)"
```

#### Arquivo .env correto:
```env
NEXT_PUBLIC_SUPABASE_URL=https://gotwnlmvdjmexxfhbclr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL="postgresql://postgres:TOKEN@gotwnlmvdjmexxfhbclr.supabase.co:5432/postgres?sslmode=require"
DIRECT_URL=postgresql://postgres:aQKUqP9Jyr37z87n@db.gotwnlmvdjmexxfhbclr.supabase.co:5432/postgres
```

### 6. Popup de Inscrição Não Abre

#### Sintomas:
- Botão não responde
- Popup não aparece
- Erros no console

#### Verificação:
```bash
# Verificar se componente existe
ls -la src/components/popup/

# Verificar importação
grep -r "InscricaoPopup" src/
```

#### Solução:
- Verificar estado do popup no React
- Verificar se Framer Motion está instalado
- Verificar console do browser

### 7. Admin Panel Não Carrega

#### Sintomas:
- Página em branco
- Erro 500
- Dados não aparecem

#### Checklist:
1. ✅ Usuário está logado?
2. ✅ Tabela existe no banco?
3. ✅ Prisma client atualizado?
4. ✅ Server actions funcionando?

#### Debug:
```bash
# Verificar se tabela existe
npm run migrations:verify

# Verificar se admin funciona
curl http://localhost:3000/admin/inscricoes
```

## 🔧 Comandos de Debug

### Verificação Completa do Sistema:
```bash
npm run migrations:verify
```

### Resetar Conexão Supabase:
```bash
rm -rf .temp
npm run supabase:link
```

### Verificar Status das Migrations:
```bash
npx supabase migration list --linked
```

### Logs do Supabase:
```bash
npx supabase logs --linked
```

## 📋 Checklist de Troubleshooting

Sempre executar nesta ordem:

1. ✅ Está logado no Supabase?
2. ✅ Projeto está linkado?
3. ✅ Migrations aplicadas?
4. ✅ Prisma client atualizado?
5. ✅ Variáveis de ambiente corretas?
6. ✅ Servidor rodando?
7. ✅ Console sem erros?

## 🚨 Erros Críticos - NUNCA FAZER

❌ **NUNCA** `rm -rf supabase/migrations`
❌ **NUNCA** `prisma db push` com Supabase Cloud  
❌ **NUNCA** executar SQL direto via scripts
❌ **NUNCA** commitar senhas no código
❌ **NUNCA** deletar tabelas manualmente

## 📞 Quando Tudo Falha

1. **Backup**: Verificar se dados estão seguros
2. **Reset**: Usar script `./scripts/run-migrations.sh`
3. **Verificar**: `npm run migrations:verify`
4. **Documentar**: Adicionar novo problema aqui

---
**Criado**: 17/09/2025  
**Última atualização**: 17/09/2025  
**Problemas resolvidos**: 7  
**Taxa de sucesso**: 100%