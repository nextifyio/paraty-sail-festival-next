# Design Doc: Sistema de Inscrições da Regata - Melhorias e Evolução

## 📋 Contexto e Estado Atual

### Sistema Implementado (v1.0)
O sistema de inscrições está **100% funcional** desde 17/09/2025, substituindo completamente o Google Forms anterior.

**Funcionalidades Atuais:**
- ✅ Popup de inscrição no site principal
- ✅ Admin panel completo (`/admin/inscricoes`)
- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Email service integrado (Resend)
- ✅ Database com RLS policies
- ✅ Migrations automatizadas

**Arquitetura Atual:**
```
Frontend (Next.js 15)
├── Popup Component (Framer Motion)
├── Admin Pages (Server Actions)
└── Email Service (Resend)
    ↓
Backend (Supabase)
├── PostgreSQL Database
├── RLS Policies 
└── Authentication
```

**Dados Coletados:**
- Informações pessoais (nome, email, telefone)
- Dados da embarcação (classe, nome, tamanho)
- Experiência do comandante
- Histórico de participação
- Expectativas e motivações

## 🎯 Problemas Identificados

### 1. **Limitações Funcionais**
- ❌ Sem validação de duplicatas por email
- ❌ Sem sistema de aprovação em lote
- ❌ Sem relatórios e estatísticas
- ❌ Sem notificações automáticas para organizadores
- ❌ Sem limite de vagas por categoria

### 2. **Experiência do Usuário**
- ❌ Sem confirmação visual após inscrição
- ❌ Sem status de acompanhamento para participantes
- ❌ Sem edição de inscrição pelo próprio usuário
- ❌ Formulário longo sem progressão visual

### 3. **Gestão Organizacional**
- ❌ Sem dashboard de métricas
- ❌ Sem exportação para planilhas
- ❌ Sem comunicação em massa
- ❌ Sem histórico de alterações

### 4. **Integrações**
- ❌ Sem integração com sistema de pagamento
- ❌ Sem geração de certificados
- ❌ Sem calendário de eventos
- ❌ Sem sincronização com redes sociais

## 🚀 Proposta: Sistema de Inscrições v2.0

### Visão Geral
Evoluir o sistema atual mantendo a base sólida, adicionando camadas de funcionalidade que melhoram a experiência tanto para participantes quanto organizadores.

## 📊 Funcionalidades Propostas

### **Fase 1: Melhorias Essenciais (2-3 semanas)**

#### 1.1 Dashboard de Métricas
```typescript
// /admin/dashboard
interface DashboardMetrics {
  totalInscricoes: number
  inscricoesPorStatus: {
    pendente: number
    aprovada: number
    rejeitada: number
  }
  inscricoesPorClasse: Record<string, number>
  inscricoesRecentes: InscricaoRegata[]
  tendenciaDiaria: Array<{data: string, count: number}>
}
```

**Componentes:**
- Cards de métricas principais
- Gráfico de inscrições por tempo
- Breakdown por classe de barco
- Lista de ações recentes

#### 1.2 Sistema de Validações Avançadas
```typescript
// Validações propostas
- Email único por edição
- Limite de vagas por categoria
- Validação de formato de telefone brasileiro
- Verificação de nomes de barcos duplicados
- Validação de idade mínima
```

#### 1.3 Notificações Automáticas
```typescript
// Sistema de notificações
- Email para organizadores a cada nova inscrição
- Digest diário com resumo
- Alertas quando atingir 80% da capacidade
- Notificação de inscrições incompletas
```

### **Fase 2: Experiência do Participante (3-4 semanas)**

#### 2.1 Portal do Participante
```
/participante/[email-token]
├── Status da inscrição
├── Edição de dados (até X dias antes)
├── Upload de documentos
├── Histórico de comunicações
└── Download de comprovantes
```

#### 2.2 Formulário Multi-step
```typescript
// Etapas do formulário
Step 1: Dados pessoais (nome, email, telefone)
Step 2: Dados da embarcação (classe, nome, specs)
Step 3: Experiência e histórico
Step 4: Documentos e termos
Step 5: Confirmação e pagamento
```

#### 2.3 Sistema de Status Visual
```typescript
enum StatusVisuais {
  INSCRICAO_INICIADA = "Inscrição Iniciada",
  DOCUMENTOS_PENDENTES = "Documentos Pendentes", 
  EM_ANALISE = "Em Análise",
  APROVADA = "Aprovada - Vaga Confirmada",
  LISTA_ESPERA = "Lista de Espera",
  REJEITADA = "Não Aprovada"
}
```

### **Fase 3: Ferramentas Organizacionais (2-3 semanas)**

#### 3.1 Gestão em Lote
```typescript
// Operações em lote
- Aprovação múltipla por filtros
- Envio de emails personalizados
- Exportação seletiva
- Mudança de status em massa
```

#### 3.2 Sistema de Comunicação
```typescript
// Templates de email
- Confirmação de inscrição
- Solicitação de documentos
- Aprovação/rejeição
- Lembretes importantes
- Newsletter da regata
```

#### 3.3 Relatórios Avançados
```typescript
// Tipos de relatório
- Lista de participantes por categoria
- Estatísticas demográficas
- Relatório financeiro
- Histórico de edições anteriores
- Análise de satisfação
```

### **Fase 4: Integrações Premium (4-5 semanas)**

#### 4.1 Sistema de Pagamento
```typescript
// Integração com Stripe/PIX
- Taxas de inscrição diferenciadas
- Parcelamento para sócios
- Comprovantes automáticos
- Controle de inadimplência
```

#### 4.2 Geração de Documentos
```typescript
// Documentos automáticos
- Certificados de participação
- Crachás com QR codes
- Lista de largada
- Regulamento personalizado
```

## 🏗️ Arquitetura Técnica Proposta

### Banco de Dados - Novas Tabelas
```sql
-- Extensões do schema atual
CREATE TABLE inscricao_documentos (
  id UUID PRIMARY KEY,
  inscricao_id UUID REFERENCES inscricoes_regata(id),
  tipo VARCHAR(50), -- 'identidade', 'habilitacao', 'atestado'
  url TEXT,
  status VARCHAR(20) DEFAULT 'pendente',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE inscricao_pagamentos (
  id UUID PRIMARY KEY,
  inscricao_id UUID REFERENCES inscricoes_regata(id),
  valor DECIMAL(10,2),
  status VARCHAR(20), -- 'pendente', 'pago', 'cancelado'
  gateway_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE comunicacoes (
  id UUID PRIMARY KEY,
  inscricao_id UUID REFERENCES inscricoes_regata(id),
  tipo VARCHAR(50), -- 'email', 'sms', 'notificacao'
  assunto TEXT,
  conteudo TEXT,
  enviado_em TIMESTAMPTZ,
  status VARCHAR(20)
);

CREATE TABLE configuracoes_regata (
  id UUID PRIMARY KEY,
  edicao INT,
  limite_inscricoes JSONB, -- por categoria
  valores JSONB, -- taxas por categoria
  datas_importantes JSONB,
  ativo BOOLEAN DEFAULT true
);
```

### APIs e Services Novos
```typescript
// services/notification.ts
export class NotificationService {
  async sendToOrganizers(event: string, data: any): Promise<void>
  async sendToParticipant(inscricaoId: string, template: string): Promise<void>
  async sendBulkEmail(inscricaoIds: string[], template: string): Promise<void>
}

// services/validation.ts
export class ValidationService {
  async validateUniqueEmail(email: string): Promise<boolean>
  async checkCategoryLimit(categoria: string): Promise<boolean>
  async validateDocuments(inscricaoId: string): Promise<ValidationResult>
}

// services/reports.ts
export class ReportsService {
  async generateParticipantsList(): Promise<Buffer>
  async generateStatistics(): Promise<ReportData>
  async generateCertificates(inscricaoIds: string[]): Promise<Buffer[]>
}
```

### Componentes Frontend
```typescript
// components/dashboard/
├── MetricsOverview.tsx
├── InscricoesChart.tsx
├── CategoryBreakdown.tsx
└── RecentActivity.tsx

// components/forms/
├── MultiStepForm.tsx
├── DocumentUpload.tsx
├── PaymentForm.tsx
└── StatusTracker.tsx

// components/admin/
├── BulkActions.tsx
├── CommunicationPanel.tsx
├── ReportsGenerator.tsx
└── ConfigurationPanel.tsx
```

## 📊 Estrutura de Arquivos Proposta

```
src/
├── app/
│   ├── admin/
│   │   ├── dashboard/              # NOVO - Métricas e visão geral
│   │   ├── inscricoes/            # EXISTENTE - Expandir
│   │   ├── comunicacao/           # NOVO - Sistema de comunicação
│   │   ├── relatorios/            # NOVO - Relatórios e exports
│   │   └── configuracao/          # NOVO - Configurações da regata
│   ├── participante/
│   │   └── [token]/               # NOVO - Portal do participante
│   └── api/
│       ├── webhooks/              # NOVO - Webhooks de pagamento
│       └── exports/               # NOVO - Geração de relatórios
├── components/
│   ├── dashboard/                 # NOVO - Componentes de dashboard
│   ├── forms/                     # EXPANDIR - Formulários multi-step
│   └── reports/                   # NOVO - Componentes de relatório
├── services/                      # NOVO - Camada de serviços
│   ├── notification.ts
│   ├── validation.ts
│   ├── payments.ts
│   └── reports.ts
└── types/
    ├── dashboard.ts               # NOVO - Types do dashboard
    ├── reports.ts                 # NOVO - Types de relatórios
    └── notifications.ts           # NOVO - Types de notificações
```

## 🎯 Priorização de Funcionalidades

### **Alta Prioridade (MVP v2.0)**
1. ✅ Dashboard de métricas básicas
2. ✅ Validação de emails duplicados
3. ✅ Notificações para organizadores
4. ✅ Exportação para Excel/CSV
5. ✅ Sistema de status visual

### **Média Prioridade (v2.1)**
1. ✅ Portal do participante
2. ✅ Formulário multi-step
3. ✅ Upload de documentos
4. ✅ Comunicação em massa
5. ✅ Relatórios avançados

### **Baixa Prioridade (v2.2+)**
1. ✅ Sistema de pagamento
2. ✅ Geração de certificados
3. ✅ Integração com redes sociais
4. ✅ App mobile
5. ✅ IA para insights

## ⚡ Timeline de Implementação

### **Sprint 1 (2 semanas) - Dashboard e Validações**
- Dashboard básico com métricas
- Validação de emails duplicados
- Notificações por email
- Melhorias de UX no admin

### **Sprint 2 (2 semanas) - Portal do Participante**
- Sistema de autenticação por token
- Portal para acompanhamento
- Edição limitada de dados
- Status tracking visual

### **Sprint 3 (2 semanas) - Comunicação e Relatórios**
- Sistema de templates de email
- Comunicação em massa
- Exportação para planilhas
- Relatórios básicos

### **Sprint 4+ (futuro) - Funcionalidades Premium**
- Sistema de pagamento
- Upload de documentos
- Geração de certificados
- Integrações avançadas

## 🔍 Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Complexidade adicional quebra sistema atual | Baixa | Alto | Desenvolvimento incremental, testes extensivos |
| Performance com muitas inscrições | Média | Médio | Paginação, otimização de queries, cache |
| Integração de pagamento complexa | Alta | Médio | Usar Stripe/PIX bem documentados |
| Sobrecarga de notificações | Média | Baixo | Sistema de preferências, rate limiting |
| Conflitos de migração | Baixa | Alto | Seguir padrão estabelecido de migrations |

## 📈 Métricas de Sucesso

### **Métricas Técnicas**
- ✅ Zero downtime durante deploys
- ✅ Tempo de resposta <2s em todas as páginas
- ✅ 99.9% uptime
- ✅ Zero bugs críticos em produção

### **Métricas de Negócio**
- ✅ 50% redução no tempo de gestão de inscrições
- ✅ 90% satisfação dos organizadores
- ✅ 80% dos participantes usam portal próprio
- ✅ 30% redução em emails de suporte

### **Métricas de Usuário**
- ✅ Taxa de abandono do formulário <20%
- ✅ Tempo de preenchimento <5 minutos
- ✅ 95% das notificações entregues
- ✅ Zero reclamações sobre processo

## 🛠️ Considerações de Implementação

### **Compatibilidade**
- ✅ Manter 100% compatibilidade com dados existentes
- ✅ Migração transparente para usuários
- ✅ Rollback possível a qualquer momento

### **Segurança**
- ✅ Tokens únicos para portal participante
- ✅ Rate limiting em APIs públicas
- ✅ Validação rigorosa de uploads
- ✅ Auditoria de todas as ações admin

### **Performance**
- ✅ Lazy loading em componentes pesados
- ✅ Cache de relatórios computados
- ✅ Otimização de queries com indexes
- ✅ CDN para assets estáticos

## 🎯 Decisão Recomendada

**Implementar em fases incrementais**, começando pelo **Dashboard e Validações (Sprint 1)**.

**Justificativa:**
1. ✅ **Baixo risco** - Não afeta sistema atual
2. ✅ **Alto valor** - Melhora imediata para organizadores  
3. ✅ **Base sólida** - Prepara para funcionalidades avançadas
4. ✅ **ROI rápido** - Benefícios visíveis em 2 semanas

**Próximo passo:**
Aprovação para início do Sprint 1 com foco em Dashboard de Métricas.

---
**Autor**: GitHub Copilot  
**Data**: 17/09/2025  
**Status**: Aguardando aprovação  
**Revisão**: Carlos, Stakeholders do evento  
**Estimativa total**: 8-10 semanas para v2.0 completo