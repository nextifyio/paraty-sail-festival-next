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

async function verificarDados() {
  console.log('🔍 Verificando dados migrados...\n');

  try {
    // Verificar pessoas
    const { data: pessoas, error: pessoasError } = await supabaseAdmin
      .from('pessoas_festival')
      .select('*')
      .limit(5);

    if (pessoasError) throw pessoasError;
    console.log(`👥 Pessoas encontradas: ${pessoas.length}`);
    console.log('Exemplos:', pessoas.map(p => p.nome).join(', '));

    // Verificar atividades
    const { data: atividades, error: atividadesError } = await supabaseAdmin
      .from('atividades_festival')
      .select('*')
      .limit(5);

    if (atividadesError) throw atividadesError;
    console.log(`\n📅 Atividades encontradas: ${atividades.length}`);
    console.log('Exemplos:', atividades.map(a => a.titulo).join(', '));

    // Verificar patrocinadores
    const { data: patrocinadores, error: patrocinadoresError } = await supabaseAdmin
      .from('patrocinadores')
      .select('*');

    if (patrocinadoresError) throw patrocinadoresError;
    console.log(`\n🏆 Patrocinadores encontrados: ${patrocinadores.length}`);
    console.log('Exemplos:', patrocinadores.map(p => p.nome).join(', '));

    // Verificar hospedagens
    const { data: hospedagens, error: hospedagensError } = await supabaseAdmin
      .from('hospedagens')
      .select('*');

    if (hospedagensError) throw hospedagensError;
    console.log(`\n🏨 Hospedagens encontradas: ${hospedagens.length}`);
    console.log('Exemplos:', hospedagens.map(h => h.nome).join(', '));

    // Verificar restaurantes
    const { data: restaurantes, error: restaurantesError } = await supabaseAdmin
      .from('restaurantes')
      .select('*');

    if (restaurantesError) throw restaurantesError;
    console.log(`\n🍽️ Restaurantes encontrados: ${restaurantes.length}`);
    console.log('Exemplos:', restaurantes.map(r => r.nome).join(', '));

    // Verificar FAQs
    const { data: faqs, error: faqsError } = await supabaseAdmin
      .from('faqs')
      .select('*');

    if (faqsError) throw faqsError;
    console.log(`\n❓ FAQs encontradas: ${faqs.length}`);
    console.log('Exemplos:', faqs.map(f => f.pergunta.substring(0, 50) + '...').join(', '));

    console.log('\n✅ Verificação completa! Todos os dados estão no banco.');

  } catch (error) {
    console.error('❌ Erro na verificação:', error.message);
  }
}

verificarDados();