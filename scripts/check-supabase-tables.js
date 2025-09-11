const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

console.log('🔍 Verificando configuração do banco via API Supabase...\n');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkDatabase() {
  try {
    // Tentar criar tabela de teste diretamente via SQL
    console.log('1. Testando execução de SQL...');
    
    const { data, error } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');
    
    if (error) {
      console.log(`   ❌ Erro ao listar tabelas: ${error.message}`);
      
      // Se não conseguir via FROM, tentar via RPC
      console.log('\n2. Tentando via RPC SQL...');
      const { data: rpcData, error: rpcError } = await supabase.rpc('sql', {
        query: 'SELECT tablename FROM pg_tables WHERE schemaname = \'public\''
      });
      
      if (rpcError) {
        console.log(`   ❌ RPC também falhou: ${rpcError.message}`);
        
        // Tentar criar uma função personalizada
        console.log('\n3. Criando função de listagem...');
        const createFn = `
          CREATE OR REPLACE FUNCTION list_tables()
          RETURNS TABLE(name text)
          LANGUAGE sql
          AS $$
            SELECT tablename::text FROM pg_tables WHERE schemaname = 'public';
          $$;
        `;
        
        const { error: createError } = await supabase.rpc('sql', { query: createFn });
        if (createError) {
          console.log(`   ❌ Erro ao criar função: ${createError.message}`);
        } else {
          console.log('   ✅ Função criada com sucesso!');
          
          const { data: tablesData, error: tablesError } = await supabase.rpc('list_tables');
          if (tablesError) {
            console.log(`   ❌ Erro ao executar função: ${tablesError.message}`);
          } else {
            console.log(`   ✅ ${tablesData.length} tabelas encontradas:`);
            tablesData.forEach(table => console.log(`      - ${table.name}`));
          }
        }
        
      } else {
        console.log(`   ✅ ${rpcData.length} tabelas via RPC:`);
        console.log(rpcData);
      }
      
    } else {
      console.log(`   ✅ ${data.length} tabelas encontradas:`);
      data.forEach(table => console.log(`      - ${table.tablename}`));
    }

    // Informar sobre possível solução
    console.log('\n💡 POSSÍVEL SOLUÇÃO:');
    console.log('Como o Supabase CLI funciona mas o Prisma não consegue conectar,');
    console.log('vamos tentar aplicar o schema usando migrations do Supabase.');
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

checkDatabase();