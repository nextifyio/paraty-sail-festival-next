#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Variáveis de ambiente não encontradas');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

async function verificarEstrutura() {
  console.log('🔍 Verificando estrutura das tabelas...\n');

  try {
    // Verificar atividades_festival
    console.log('📅 Estrutura da tabela atividades_festival:');
    const { data: atividades, error: atividadesError } = await supabaseAdmin
      .from('atividades_festival')
      .select('*')
      .limit(1);

    if (atividadesError) throw atividadesError;
    
    if (atividades && atividades.length > 0) {
      console.log('Campos disponíveis:', Object.keys(atividades[0]).join(', '));
    } else {
      console.log('Nenhuma atividade encontrada');
    }

    // Verificar pessoas_festival
    console.log('\n👥 Estrutura da tabela pessoas_festival:');
    const { data: pessoas, error: pessoasError } = await supabaseAdmin
      .from('pessoas_festival')
      .select('*')
      .limit(1);

    if (pessoasError) throw pessoasError;
    
    if (pessoas && pessoas.length > 0) {
      console.log('Campos disponíveis:', Object.keys(pessoas[0]).join(', '));
    } else {
      console.log('Nenhuma pessoa encontrada');
    }

    // Verificar hospedagens
    console.log('\n🏨 Estrutura da tabela hospedagens:');
    const { data: hospedagens, error: hospedagensError } = await supabaseAdmin
      .from('hospedagens')
      .select('*')
      .limit(1);

    if (hospedagensError) throw hospedagensError;
    
    if (hospedagens && hospedagens.length > 0) {
      console.log('Campos disponíveis:', Object.keys(hospedagens[0]).join(', '));
    } else {
      console.log('Nenhuma hospedagem encontrada');
    }

  } catch (error) {
    console.error('❌ Erro na verificação:', error.message);
  }
}

verificarEstrutura();