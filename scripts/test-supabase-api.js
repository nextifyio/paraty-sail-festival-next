const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

console.log('🔍 Testando conexão via Supabase JavaScript Client...\n');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Variáveis de ambiente não encontradas');
  process.exit(1);
}

console.log(`📡 URL: ${supabaseUrl}`);
console.log(`🔑 Service Role Key: ${serviceRoleKey.substring(0, 20)}...`);

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function testSupabaseConnection() {
  try {
    // Teste 1: Verificar se consegue acessar auth
    console.log('\n1. Testando acesso ao Auth...');
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.log(`   ❌ Erro no Auth: ${authError.message}`);
    } else {
      console.log(`   ✅ Auth funcionando! ${authData.users.length} usuários encontrados`);
    }

    // Teste 2: Testar query SQL direta
    console.log('\n2. Testando query SQL...');
    const { data: sqlData, error: sqlError } = await supabase
      .rpc('version');
    
    if (sqlError) {
      console.log(`   ❌ Erro SQL: ${sqlError.message}`);
    } else {
      console.log(`   ✅ SQL funcionando!`);
    }

    // Teste 3: Tentar listar tabelas existentes
    console.log('\n3. Listando tabelas existentes...');
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    if (tablesError) {
      console.log(`   ❌ Erro ao listar tabelas: ${tablesError.message}`);
    } else {
      console.log(`   ✅ ${tables.length} tabelas encontradas:`);
      tables.forEach(table => console.log(`      - ${table.table_name}`));
    }

    console.log('\n🎉 Supabase está acessível via API!');
    console.log('💡 O problema pode estar na configuração do DATABASE_URL para Prisma');
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

testSupabaseConnection();