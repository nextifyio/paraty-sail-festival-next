#!/bin/bash

# Script de Migrations - Paraty Sail Festival
# Uso: ./scripts/run-migrations.sh

echo "🚀 Iniciando processo de migrations..."

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Execute este script na raiz do projeto"
    exit 1
fi

# Verificar se está logado no Supabase
echo "1. Verificando login no Supabase..."
if ! npx supabase projects list > /dev/null 2>&1; then
    echo "⚠️  Não está logado. Fazendo login..."
    npx supabase login
fi

# Verificar se projeto está linkado
echo "2. Verificando link do projeto..."
if [ ! -f ".temp/project-ref" ]; then
    echo "⚠️  Projeto não está linkado. Linkando..."
    echo "📝 Usando senha: aQKUqP9Jyr37z87n"
    echo "aQKUqP9Jyr37z87n" | npx supabase link --project-ref gotwnlmvdjmexxfhbclr
fi

# Aplicar migrations
echo "3. Aplicando migrations..."
npx supabase migration up --linked

if [ $? -eq 0 ]; then
    echo "✅ Migrations aplicadas com sucesso!"
    
    # Gerar cliente Prisma
    echo "4. Atualizando cliente Prisma..."
    npm run prisma:generate
    
    if [ $? -eq 0 ]; then
        echo "✅ Cliente Prisma atualizado!"
        
        # Verificar sistema
        echo "5. Verificando sistema..."
        if [ -f "scripts/verificar-sistema-completo.js" ]; then
            node scripts/verificar-sistema-completo.js
        else
            echo "⚠️  Script de verificação não encontrado"
        fi
        
        echo ""
        echo "🎉 Processo concluído com sucesso!"
        echo "📋 Sistema pronto para uso:"
        echo "   • Tabelas criadas no Supabase"
        echo "   • Cliente Prisma atualizado"
        echo "   • Sistema de inscrições funcionando"
        echo ""
        echo "🌐 Acesse: http://localhost:3000/admin/inscricoes"
        
    else
        echo "❌ Erro ao gerar cliente Prisma"
        exit 1
    fi
else
    echo "❌ Erro ao aplicar migrations"
    echo "💡 Verifique:"
    echo "   • Conexão com internet"
    echo "   • Credenciais do Supabase"
    echo "   • Sintaxe dos arquivos SQL"
    exit 1
fi