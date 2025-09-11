import { createSupabaseAdmin } from '../src/lib/supabase'
import { pessoasFestival, atividadesFestival, patrocinadores, hospedagens, restaurantes, faqItems } from '../src/constants/data'

const supabaseAdmin = createSupabaseAdmin()

interface MigrationResult {
  success: boolean
  message: string
  data?: any
}

async function migratePessoasFestival(): Promise<MigrationResult> {
  try {
    console.log('🚀 Migrando pessoas do festival...')
    
    const { data, error } = await supabaseAdmin
      .from('pessoas_festival')
      .insert(pessoasFestival.map(pessoa => ({
        id: pessoa.id,
        nome: pessoa.nome,
        especialidade: pessoa.especialidade,
        bio: pessoa.bio,
        instagram: pessoa.instagram,
        imagem: pessoa.imagem,
        tipo: pessoa.tipo
      })))
    
    if (error) throw error
    
    console.log(`✅ ${pessoasFestival.length} pessoas migradas com sucesso`)
    return { success: true, message: 'Pessoas migradas com sucesso', data }
  } catch (error) {
    console.error('❌ Erro ao migrar pessoas:', error)
    return { success: false, message: `Erro ao migrar pessoas: ${error}` }
  }
}

async function migrateAtividadesFestival(): Promise<MigrationResult> {
  try {
    console.log('🚀 Migrando atividades do festival...')
    
    const { data, error } = await supabaseAdmin
      .from('atividades_festival')
      .insert(atividadesFestival.map(atividade => ({
        id: atividade.id,
        titulo: atividade.titulo,
        tipo: atividade.tipo,
        dia: atividade.dia,
        data: atividade.data,
        horario: atividade.horario,
        detalhes: atividade.detalhes,
        local: atividade.local,
        pessoa_id: atividade.pessoaId
      })))
    
    if (error) throw error
    
    console.log(`✅ ${atividadesFestival.length} atividades migradas com sucesso`)
    return { success: true, message: 'Atividades migradas com sucesso', data }
  } catch (error) {
    console.error('❌ Erro ao migrar atividades:', error)
    return { success: false, message: `Erro ao migrar atividades: ${error}` }
  }
}

async function migratePatrocinadores(): Promise<MigrationResult> {
  try {
    console.log('🚀 Migrando patrocinadores...')
    
    const { data, error } = await supabaseAdmin
      .from('patrocinadores')
      .insert(patrocinadores.map(patrocinador => ({
        nome: patrocinador.nome,
        logo: patrocinador.logo,
        link: patrocinador.link,
        nivel: patrocinador.nivel
      })))
    
    if (error) throw error
    
    console.log(`✅ ${patrocinadores.length} patrocinadores migrados com sucesso`)
    return { success: true, message: 'Patrocinadores migrados com sucesso', data }
  } catch (error) {
    console.error('❌ Erro ao migrar patrocinadores:', error)
    return { success: false, message: `Erro ao migrar patrocinadores: ${error}` }
  }
}

async function migrateHospedagens(): Promise<MigrationResult> {
  try {
    console.log('🚀 Migrando hospedagens...')
    
    const { data, error } = await supabaseAdmin
      .from('hospedagens')
      .insert(hospedagens.map(hospedagem => ({
        nome: hospedagem.nome,
        descricao: hospedagem.descricao,
        desconto: hospedagem.desconto,
        contato: hospedagem.contato,
        localizacao: hospedagem.localizacao
      })))
    
    if (error) throw error
    
    console.log(`✅ ${hospedagens.length} hospedagens migradas com sucesso`)
    return { success: true, message: 'Hospedagens migradas com sucesso', data }
  } catch (error) {
    console.error('❌ Erro ao migrar hospedagens:', error)
    return { success: false, message: `Erro ao migrar hospedagens: ${error}` }
  }
}

async function migrateRestaurantes(): Promise<MigrationResult> {
  try {
    console.log('🚀 Migrando restaurantes...')
    
    const { data, error } = await supabaseAdmin
      .from('restaurantes')
      .insert(restaurantes.map(restaurante => ({
        nome: restaurante.nome,
        especialidade: restaurante.especialidade,
        endereco: restaurante.endereco,
        telefone: restaurante.telefone,
        cardapio: restaurante.cardapio
      })))
    
    if (error) throw error
    
    console.log(`✅ ${restaurantes.length} restaurantes migrados com sucesso`)
    return { success: true, message: 'Restaurantes migrados com sucesso', data }
  } catch (error) {
    console.error('❌ Erro ao migrar restaurantes:', error)
    return { success: false, message: `Erro ao migrar restaurantes: ${error}` }
  }
}

async function migrateFAQs(): Promise<MigrationResult> {
  try {
    console.log('🚀 Migrando FAQs...')
    
    const { data, error } = await supabaseAdmin
      .from('faqs')
      .insert(faqItems.map((faq, index) => ({
        pergunta: faq.pergunta,
        resposta: faq.resposta,
        ordem: index + 1
      })))
    
    if (error) throw error
    
    console.log(`✅ ${faqItems.length} FAQs migrados com sucesso`)
    return { success: true, message: 'FAQs migrados com sucesso', data }
  } catch (error) {
    console.error('❌ Erro ao migrar FAQs:', error)
    return { success: false, message: `Erro ao migrar FAQs: ${error}` }
  }
}

async function createAdminUser(): Promise<MigrationResult> {
  try {
    console.log('🚀 Criando usuário administrador...')
    
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: process.env.ADMIN_EMAIL || 'admin@paratysailfestival.com',
      password: process.env.ADMIN_PASSWORD || 'admin123456',
      email_confirm: true
    })
    
    if (error) throw error
    
    console.log('✅ Usuário administrador criado com sucesso')
    return { success: true, message: 'Admin criado com sucesso', data }
  } catch (error) {
    console.error('❌ Erro ao criar admin:', error)
    return { success: false, message: `Erro ao criar admin: ${error}` }
  }
}

async function runMigration() {
  console.log('🎯 Iniciando migração de dados...\n')
  
  const results = await Promise.all([
    createAdminUser(),
    migratePessoasFestival(),
    migrateAtividadesFestival(),
    migratePatrocinadores(),
    migrateHospedagens(),
    migrateRestaurantes(),
    migrateFAQs()
  ])
  
  console.log('\n📊 Resultado da migração:')
  results.forEach((result, index) => {
    const operations = ['Admin User', 'Pessoas', 'Atividades', 'Patrocinadores', 'Hospedagens', 'Restaurantes', 'FAQs']
    console.log(`${result.success ? '✅' : '❌'} ${operations[index]}: ${result.message}`)
  })
  
  const successCount = results.filter(r => r.success).length
  console.log(`\n🎉 Migração concluída: ${successCount}/${results.length} operações bem-sucedidas`)
  
  if (successCount === results.length) {
    console.log('🚀 Todos os dados foram migrados com sucesso!')
  } else {
    console.log('⚠️  Algumas operações falharam. Verifique os logs acima.')
  }
}

// Executar migração se o script for chamado diretamente
if (require.main === module) {
  runMigration().catch(console.error)
}

export { runMigration }