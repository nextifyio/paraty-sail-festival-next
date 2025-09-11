# 🔑 GUIA PARA CONFIGURAR VARIÁVEIS DE AMBIENTE NO VERCEL

## Onde encontrar os valores no Supabase:

### 1. NEXT_PUBLIC_SUPABASE_URL
- Acesse seu projeto no Supabase Dashboard
- Vá em Settings → API
- Copie o valor de "Project URL"
- Exemplo: https://xxxxxxxxxxx.supabase.co

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY  
- Na mesma página (Settings → API)
- Copie o valor de "anon public"
- Exemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

### 3. SUPABASE_SERVICE_ROLE_KEY
- Na mesma página (Settings → API)  
- Copie o valor de "service_role" (⚠️ CUIDADO: Esta é uma chave secreta!)
- Exemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

## Configuração no Vercel:

### Via Dashboard:
1. Vá para seu projeto no Vercel
2. Settings → Environment Variables
3. Adicione cada variável:
   - Name: NEXT_PUBLIC_SUPABASE_URL
   - Value: sua_url_do_supabase
   - Environment: Production, Preview, Development

### Via CLI:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Cole o valor quando solicitado

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY  
# Cole o valor quando solicitado

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Cole o valor quando solicitado
```

## ⚠️ IMPORTANTE:
- NUNCA commite o arquivo .env para o Git
- A service_role_key tem acesso total ao banco
- Configure as variáveis no Vercel antes do primeiro deploy
- Use .env.example como referência para outros desenvolvedores