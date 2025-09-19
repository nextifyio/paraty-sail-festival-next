# PROJECT CONTEXT - Paraty Sail Festival

## 🎯 Visão Geral do Projeto
Sistema completo de gerenciamento para o Paraty Sail Festival, com foco especial no sistema de inscrições da regata.

## 🏗️ Arquitetura de Decisões Críticas

### Database & Migrations
- **NUNCA usar Prisma Push** - Sempre usar Supabase Migrations
- **Processo testado**: Login → Link → Migration Up → Prisma Generate
- **Senha do banco**: `aQKUqP9Jyr37z87n`
- **Project Ref**: `gotwnlmvdjmexxfhbclr`
- **Comando principal**: `npm run migrations:apply` (script automatizado)

### Estrutura de Dados
- **Tabela principal**: `inscricoes_regata` (não `inscricoes`)
- **Campos essenciais**: nome_capitao, email, telefone, classe_barco, nome_barco, tamanho_barco, num_tripulantes, experiencia, ja_participou
- **Status**: pendente, aprovada, rejeitada, cancelada
- **RLS policies**: Leitura/escrita públicas para admin, inserção pública

### Padrões de Código
- **Server Actions** em `actions.ts` de cada pasta admin
- **Formulários** com React Hook Form + Zod
- **Popup de inscrição** integrado no site principal
- **Admin panel** em `/admin/inscricoes`

## 🔧 Comandos Que Sempre Funcionam
```bash
# Setup completo
npm run migrations:apply

# Verificar sistema
npm run migrations:verify

# Nova migration
npm run supabase:migration:new nome

# Aplicar migration
npm run supabase:migration:up
```

## ⚠️ O Que NUNCA Fazer
- ❌ `npm run prisma:push` - Não funciona com Supabase Cloud
- ❌ Executar SQL direto via scripts - Usar migrations
- ❌ Referenciar tabelas inexistentes nas policies
- ❌ Esquecer de regenerar Prisma após mudanças

## 🎯 Funcionalidades Implementadas
- ✅ Sistema de inscrições completo
- ✅ Popup de inscrição no site
- ✅ Admin panel com CRUD
- ✅ Email service (Resend)
- ✅ Migrations automatizadas
- ✅ RLS policies configuradas

## 📝 Próximos Passos Conhecidos
- [ ] Configurar RESEND_API_KEY para emails
- [ ] Implementar filtros avançados no admin
- [ ] Sistema de relatórios
- [ ] Backup automático de dados

## 🔍 Debugging Específico
- **Erro de conexão**: Verificar se projeto está linkado
- **Migration falha**: Verificar sintaxe SQL e dependências
- **Tabela não existe**: Aplicar migrations primeiro
- **RLS bloqueia**: Verificar policies no Supabase Dashboard

## 💡 Lições Aprendidas
1. Supabase Cloud requer abordagem diferente do local
2. Migrations via CLI são mais confiáveis que scripts
3. Sempre regenerar Prisma após mudanças de schema
4. Documentar senhas e credenciais de forma segura
5. Scripts automatizados evitam erros manuais

---
**Última atualização**: 17/09/2025
**Status**: Sistema funcionando 100%