#!/usr/bin/env node

/**
 * Script para verificar se as credenciais do Supabase estão configuradas corretamente
 */

const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

// Carregar variáveis de ambiente
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY', 
  'SUPABASE_SERVICE_ROLE_KEY',
  'DATABASE_URL'
];

console.log('🔍 Verificando configuração do Supabase...\n');

// Verificar se todas as variáveis existem
const missingVars = requiredVars.filter(varName => !process.env[varName] || process.env[varName].includes('your_') || process.env[varName].includes('SEU_'));

if (missingVars.length > 0) {
  console.log('❌ Variáveis faltando ou com valores placeholder:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}: ${process.env[varName] || 'AUSENTE'}`);
  });
  console.log('\n📝 Por favor, atualize o arquivo .env.local com suas credenciais reais.');
  console.log('📚 Consulte CONFIGURACAO-PENDENTE.md para instruções detalhadas.\n');
  process.exit(1);
}

// Testar conexão com Supabase
async function testSupabaseConnection() {
  try {
    console.log('🔗 Testando conexão com Supabase...');
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Tentar uma query de teste usando RPC (função SQL)
    const { data, error } = await supabase.rpc('version');
    
    if (error) {
      // Se RPC não funcionar, tenta uma query direta
      const { error: error2 } = await supabase.from('auth.users').select('id').limit(1);
      if (error2 && !error2.message.includes('permission denied')) {
        throw error2;
      }
    }

    console.log('✅ Conexão com Supabase: OK');
    console.log('✅ Credenciais válidas');
    console.log('✅ Banco de dados: Conectado com sucesso');

  } catch (error) {
    console.log('❌ Erro na conexão com Supabase:');
    console.log(`   ${error.message}`);
    
    // Se o erro for de permissão, a conexão ainda está funcionando
    if (error.message.includes('permission denied') || error.message.includes('schema cache')) {
      console.log('ℹ️  Conexão OK, mas sem permissões para tabelas do sistema (normal)');
      console.log('✅ Credenciais válidas - você pode continuar com o setup');
      return;
    }
    
    console.log('\n🔧 Verifique suas credenciais no arquivo .env.local');
    process.exit(1);
  }
}

// Verificar DATABASE_URL
function testDatabaseUrl() {
  const dbUrl = process.env.DATABASE_URL;
  
  console.log('🔗 Verificando DATABASE_URL...');
  
  if (!dbUrl.includes('supabase.co')) {
    console.log('⚠️  DATABASE_URL não parece ser do Supabase');
  }
  
  if (!dbUrl.includes('postgres://') && !dbUrl.includes('postgresql://')) {
    console.log('❌ DATABASE_URL deve começar com postgres:// ou postgresql://');
    process.exit(1);
  }
  
  console.log('✅ DATABASE_URL: OK');
}

async function main() {
  console.log('✅ Todas as variáveis de ambiente estão configuradas');
  
  testDatabaseUrl();
  await testSupabaseConnection();
  
  console.log('\n🎉 Configuração do Supabase está correta!');
  console.log('🚀 Você pode executar: npm run setup');
}

main().catch(error => {
  console.error('❌ Erro:', error.message);
  process.exit(1);
});