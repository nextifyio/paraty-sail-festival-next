# Design Doc: Sistema de Relatórios Automatizados

## Contexto e Problema
O Paraty Sail Festival precisa de relatórios automáticos sobre inscrições, participantes e estatísticas do evento para tomada de decisão dos organizadores.

**Atualmente:**
- Dados existem no banco mas não há visualização
- Organizadores fazem consultas manuais
- Não há insights automáticos ou alertas

## Objetivos
1. Dashboard com métricas em tempo real
2. Relatórios automáticos por email
3. Insights sobre tendências de inscrição
4. Alertas para situações críticas

## Proposta de Solução

### Opção 1: Dashboard Simples (Recomendada)
```
/admin/dashboard
├── Cards com métricas principais
├── Gráficos de inscrições por tempo
├── Breakdown por classe de barco
└── Lista de inscrições recentes
```

**Tecnologias:**
- Charts.js para gráficos
- Server Actions para dados
- Refresh automático a cada 30s

### Opção 2: Sistema Completo com MCP
- Servidor MCP para análises
- IA para insights automáticos
- Relatórios em PDF
- Notificações inteligentes

### Opção 3: Integração Externa
- Google Data Studio
- Metabase
- Grafana

## Decisão Recomendada: Opção 1

**Por que:**
- ✅ Simples de implementar
- ✅ Integra com sistema existente
- ✅ Atende 80% das necessidades
- ✅ Pode evoluir incrementalmente

## Arquitetura Técnica

### Estrutura de Arquivos
```
src/app/admin/dashboard/
├── page.tsx              # Dashboard principal
├── components/
│   ├── MetricsCards.tsx  # Cards de métricas
│   ├── Charts.tsx        # Gráficos
│   └── RecentList.tsx    # Lista recente
└── actions.ts            # Server Actions para dados
```

### APIs Necessárias
```typescript
// actions.ts
export async function getDashboardData() {
  return {
    totalInscricoes: number,
    inscricoesPorStatus: object,
    inscricoesPorClasse: object,
    inscricoesRecentes: array,
    tendencia: object
  }
}
```

### Componentes
```typescript
// MetricsCards.tsx
interface Metrics {
  total: number
  pendentes: number
  aprovadas: number
  crescimento: string
}
```

## Timeline
- **Semana 1**: Estrutura básica e métricas
- **Semana 2**: Gráficos e visualizações
- **Semana 3**: Refresh automático e polish
- **Semana 4**: Testes e ajustes

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Performance com muitos dados | Média | Alto | Paginação e cache |
| Charts complexos | Baixa | Médio | Usar biblioteca testada |
| Refresh automático | Baixa | Baixo | Fallback manual |

## Métricas de Sucesso
- ✅ Dashboard carrega em <2s
- ✅ Organizadores usam semanalmente
- ✅ Reduz consultas manuais em 80%
- ✅ Zero bugs críticos em produção

## Alternativas Não Escolhidas
- **MCP/IA**: Complexo demais para MVP
- **Ferramentas externas**: Dependência adicional
- **Relatórios PDF**: Feature secundária

---
**Autor**: GitHub Copilot  
**Data**: 17/09/2025  
**Status**: Proposta para aprovação  
**Revisores**: Carlos, Stakeholders