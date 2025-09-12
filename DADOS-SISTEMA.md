# Sistema de Dados do Festival - Documentação

## Visão Geral

O sistema de dados foi redesenhado para permitir fácil alternância entre duas fontes de dados:
- **Supabase**: Base de dados PostgreSQL completa (recomendado para produção)
- **Arquivos Locais**: Dados estáticos do arquivo `src/constants/data.ts` (fallback/desenvolvimento)

## Como Alternar Entre Fontes de Dados

### Configuração Principal

Edite o arquivo `src/hooks/useFestivalData.ts` e modifique a constante:

```typescript
// Flag para controlar origem dos dados
const USE_SUPABASE = true // true = Supabase, false = arquivo local
```

- `USE_SUPABASE = true` → **Supabase** (apenas registros ativos)
- `USE_SUPABASE = false` → **Arquivo local** (todos os registros)

### Diferenças Entre as Fontes

#### Supabase (USE_SUPABASE = true)
- ✅ Dados dinâmicos atualizados em tempo real
- ✅ Filtragem automática por campo `ativo = true`
- ✅ Interface administrativa completa
- ✅ Suporte a uploads de imagens
- ⚠️ Requer conexão com internet
- ⚠️ Depende da configuração do Supabase

#### Arquivo Local (USE_SUPABASE = false)
- ✅ Funciona offline
- ✅ Não depende de serviços externos
- ✅ Carregamento instantâneo
- ❌ Dados estáticos (não atualizáveis)
- ❌ Todos os registros são considerados ativos

## Estrutura dos Hooks

### Hook Principal
```typescript
import { useFestivalData } from '@/hooks/useFestivalData'

const {
  loading,
  error,
  pessoas,
  atividades,
  patrocinadores,
  hospedagens,
  restaurantes,
  faqs,
  isUsingSupabase,
  reload
} = useFestivalData()
```

### Hooks Específicos
```typescript
import { 
  usePessoas,
  useAtividades,
  usePatrocinadores,
  useHospedagens,
  useRestaurantes,
  useFaqs,
  usePalestrantes,
  useAtracoes,
  useProgramacao
} from '@/hooks/useFestivalData'

// Exemplo de uso
const { patrocinadores, loading, error } = usePatrocinadores()
```

## Funcionalidade de Registros Ativos/Inativos

### Campo `ativo` nas Tabelas

Todas as tabelas do Supabase possuem o campo `ativo` (boolean):
- `pessoas_festival.ativo`
- `atividades_festival.ativo`
- `patrocinadores.ativo`
- `hospedagens.ativo`
- `restaurantes.ativo`
- `faqs.ativo`

### Comportamento no Site Público

- **Supabase**: Apenas registros com `ativo = true` são exibidos
- **Arquivo Local**: Todos os registros são considerados ativos

### Comportamento no Painel Admin

- **Sempre**: Todos os registros são exibidos (ativos e inativos)
- **Interface**: Permite ativar/desativar registros individualmente

## Componentes Atualizados

Os seguintes componentes foram migrados para usar os novos hooks:

- ✅ `PatrocinadoresSection` → `usePatrocinadores()`
- ✅ `RestaurantesSection` → `useRestaurantes()`
- ✅ `HospedagensSection` → `useHospedagens()`
- ✅ `FAQSection` → `useFaqs()`
- ✅ `PalestrantesSection` → `usePalestrantes()`
- ✅ `AtracoesSection` → `useAtracoes()`
- ✅ `ProgramacaoSection` → `useProgramacao()`

## Estados de Carregamento

Todos os hooks fornecem três estados essenciais:

```typescript
const { data, loading, error } = useHook()

if (loading) {
  return <div>Carregando...</div>
}

if (error) {
  return <div>Erro: {error}</div>
}

// Renderizar dados normalmente
return <div>{/* conteúdo */}</div>
```

## Fallback Automático

O sistema possui fallback automático:
1. **Tentativa Primária**: Carrega dados do Supabase
2. **Em Caso de Erro**: Automaticamente usa dados locais
3. **Notificação**: Registra erro no console

```typescript
// Em caso de erro no Supabase
console.error('Erro ao carregar dados do Supabase:', err)
setError(err instanceof Error ? err.message : 'Erro desconhecido')
// Fallback para dados locais
loadFromLocal()
```

## Instruções de Migração Completa

### Para Produção (Supabase)
1. Configure `USE_SUPABASE = true`
2. Garanta que as variáveis de ambiente estão configuradas
3. Verifique se os dados estão populados no Supabase
4. Teste todas as seções do site

### Para Desenvolvimento/Offline
1. Configure `USE_SUPABASE = false`
2. Trabalhe com os dados locais em `src/constants/data.ts`
3. Use o painel admin apenas para teste da interface

### Verificação de Status
Componente de exemplo para verificar o status:
```typescript
import { useFestivalData } from '@/hooks/useFestivalData'

function DataStatus() {
  const { isUsingSupabase, loading, error } = useFestivalData()
  
  return (
    <div>
      <p>Fonte: {isUsingSupabase ? 'Supabase' : 'Local'}</p>
      <p>Status: {loading ? 'Carregando' : error ? 'Erro' : 'OK'}</p>
    </div>
  )
}
```

## Próximos Passos

1. **Teste Completo**: Verificar todas as seções do site
2. **Dados de Produção**: Popular o Supabase com dados reais
3. **Otimização**: Implementar cache e otimizações de performance
4. **Monitoramento**: Configurar logs e alertas para erros

## Notas Importantes

- ⚠️ **Backup**: Sempre mantenha o arquivo `data.ts` como backup
- ⚠️ **Teste**: Teste ambas as fontes antes de fazer deploy
- ⚠️ **Performance**: Monitore performance com dados reais
- ⚠️ **SEO**: Dados carregados client-side podem afetar SEO