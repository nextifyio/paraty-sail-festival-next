# Google Analytics - Configuração

## Como configurar o Google Analytics no Festival Paraty à Vela

### 1. Criar uma conta no Google Analytics

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Faça login com sua conta Google
3. Clique em "Começar a medir"
4. Configure:
   - **Nome da conta**: Festival Paraty à Vela
   - **Nome da propriedade**: Site Festival Paraty à Vela
   - **URL do site**: https://paratysailfestival.com (ou seu domínio)
   - **Categoria**: Entretenimento

### 2. Obter o ID de medição

Após criar a propriedade, você receberá um **ID de medição** no formato `G-XXXXXXXXXX`.

### 3. Configurar no projeto

1. Abra o arquivo `.env.local`
2. Substitua `G-XXXXXXXXXX` pelo seu ID real:

```bash
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-SEU-ID-AQUI
```

### 4. Reiniciar o servidor

Após configurar a variável de ambiente:

```bash
npm run dev
```

### 5. Verificar se está funcionando

1. Acesse o site público (não área `/admin`)
2. Abra as ferramentas de desenvolvedor (F12)
3. Na aba **Network**, procure por requisições para `googletagmanager.com`
4. No Google Analytics, vá em **Tempo real** para ver os visitantes

## Funcionalidades implementadas

- ✅ **Carregamento condicional**: Analytics só carrega em páginas públicas
- ✅ **Exclusão da área admin**: Nenhum tracking em `/admin/*`
- ✅ **Performance otimizada**: Scripts carregam com estratégia `afterInteractive`
- ✅ **Configuração via ambiente**: Fácil de alterar sem modificar código

## Páginas rastreadas

O Google Analytics será carregado automaticamente em:

- `/` (página inicial)
- Todas as páginas públicas do festival
- **NÃO será carregado em**:
  - `/admin/*` (área administrativa)
  - Desenvolvimento local (se não configurado)

## Eventos personalizados (futuro)

Para implementar eventos personalizados no futuro, use:

```javascript
// Exemplo de evento personalizado
gtag('event', 'inscricao_festival', {
  event_category: 'engagement',
  event_label: 'botao_inscricoes'
});
```

## Problemas comuns

### Analytics não aparece

1. Verifique se o ID está correto no `.env.local`
2. Certifique-se de não estar na área `/admin`
3. Reinicie o servidor após alterar variáveis de ambiente
4. Verifique se não há bloqueadores de anúncios

### Dados não aparecem no Google Analytics

1. Pode demorar até 24 horas para aparecer dados
2. Use a seção "Tempo real" para verificação imediata
3. Certifique-se de que o site está em produção (não localhost)