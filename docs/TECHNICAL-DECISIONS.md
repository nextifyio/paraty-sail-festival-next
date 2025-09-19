# TECHNICAL DECISIONS - Paraty Sail Festival

## 🏗️ Decisões de Arquitetura

### Por que Supabase Migrations em vez de Prisma?
**Decisão**: Usar Supabase CLI para migrations
**Motivo**: Prisma Push não funciona com Supabase Cloud
**Testado em**: 17/09/2025
**Resultado**: 100% funcional

### Por que Server Actions em vez de API Routes?
**Decisão**: Server Actions para operações CRUD
**Motivo**: Melhor integração com React, menos boilerplate
**Implementado em**: Todas as páginas admin
**Performance**: Excelente

### Por que RLS Policies Públicas?
**Decisão**: Policies permissivas no banco
**Motivo**: Controle de acesso feito no middleware Next.js
**Segurança**: Middleware protege rotas `/admin/*`
**Flexibilidade**: Permite operações sem complicações

## 🗄️ Estrutura de Dados

### Nome da Tabela: `inscricoes_regata`
**Por que não `inscricoes`?**: 
- Mais específica
- Evita conflitos futuros
- Alinhada com outras tabelas (`*_festival`)

### Campos de Status
**Opções**: pendente, aprovada, rejeitada, cancelada
**Por que texto em vez de enum?**: 
- Flexibilidade para mudanças
- Prisma schema mais simples
- Check constraint no SQL garante integridade

### Campos de Experiência
**Opções**: iniciante, intermediario, avancado, expert
**Por que esses níveis?**: 
- Baseado no formulário Google original
- Permite categorização para regata
- Fácil de entender pelos usuários

## 🔧 Padrões de Implementação

### Estrutura de Páginas Admin
```
admin/entity/
├── page.tsx           # Listagem
├── actions.ts         # Server Actions
├── new/
│   └── page.tsx      # Formulário de criação
└── [id]/
    └── page.tsx      # Formulário de edição
```

### Padrão de Server Actions
```typescript
// Sempre async
// Sempre com revalidatePath
// Sempre com try/catch
// Sempre retornar sucesso/erro
export async function createEntity(formData: FormData) {
  try {
    // validação
    // operação
    revalidatePath('/admin/entity')
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
```

### Padrão de Formulários
```typescript
// React Hook Form + Zod
// useTransition para loading states
// Toast notifications
// Redirect após sucesso
```

## 🎨 Padrões de UI

### Layout Admin
- **Sidebar fixa** com navegação
- **Breadcrumbs** em todas as páginas
- **Loading states** em operações
- **Confirmação** para exclusões

### Cores e Tema
- **Primary**: Azul do mar (tema náutico)
- **Success**: Verde para aprovações
- **Warning**: Amarelo para pendentes
- **Error**: Vermelho para rejeições

## 🔐 Segurança

### Autenticação
- **Supabase Auth** para login
- **Middleware** protege rotas admin
- **Session** persistida em cookies
- **Redirect** automático para login

### Autorização
- **RLS habilitado** em todas as tabelas
- **Policies permissivas** para simplificar
- **Controle no middleware** Next.js
- **Service role** para operações admin

## 📧 Integrações

### Email (Resend)
- **Variável**: RESEND_API_KEY
- **Templates**: HTML inline
- **Eventos**: Criação, aprovação, rejeição
- **Fallback**: Logs se API key não configurada

### Analytics (Google)
- **Variável**: NEXT_PUBLIC_GA_MEASUREMENT_ID
- **Implementação**: Script customizado
- **Páginas**: Todas exceto admin
- **GDPR**: Implementar se necessário

## 🚀 Deploy

### Vercel
- **Variáveis de ambiente** obrigatórias
- **Build command**: `npm run build`
- **Node version**: 18+
- **Prisma**: Executado automaticamente

### Banco de Dados
- **Supabase Cloud** sempre
- **Backups**: Automáticos pelo Supabase
- **Migrations**: Via CLI antes do deploy
- **Monitoring**: Dashboard Supabase

---
**Criado**: 17/09/2025
**Status**: Documentação completa das decisões