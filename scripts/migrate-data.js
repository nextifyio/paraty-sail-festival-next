const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuração do Supabase Admin
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Variáveis de ambiente não encontradas');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

// Dados completos do data.ts em formato simplificado
const pessoasFestival = [
  // PALESTRANTES
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    nome: 'Orlando Salomão',
    especialidade: 'Propulsão Elétrica e baterias de lithium',
    bio: 'Empresa que desenvolve soluções inteligentes para Veleiro.',
    instagram: 'https://www.instagram.com/alnitak.nautica/',
    imagem: '/images/orlando-salomao.jpg',
    tipo: 'palestrante'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
    nome: 'Ricardo e Fernanda Eleutheria',
    especialidade: 'Iniciação na Vela',
    bio: 'Casal de Velejadores do Sul do Brasil, decidem mudar para Paraty com seu veleiro Eleutheria, um Fast 345.',
    instagram: 'https://www.instagram.com/veleiroeleutheria/',
    imagem: '/images/ricardo-fernanda.jpg',
    tipo: 'palestrante'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
    nome: 'Anjos do Mar: Marcelo Ulysses',
    especialidade: '1º Socorros e demonstração de equipamentos de salvatagem',
    bio: 'Como funcionam os equipamentos de salvatagem.',
    instagram: 'https://www.instagram.com/anjosdomarbr/',
    imagem: '/images/marcelo.jpg',
    tipo: 'palestrante'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d482',
    nome: 'Veleiro Andorinha: Carla Lopes',
    especialidade: 'Os erros que cometi na reforma do meu veleiro',
    bio: 'Engenheira e Velejadora em seu currículo, já participou de travessias oceânicas pelo atlântico e antártica.',
    instagram: 'https://www.instagram.com/lopes_carla/',
    imagem: '/images/carla-lopes.jpg',
    tipo: 'palestrante'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d483',
    nome: 'Charlie Flesch',
    especialidade: 'Como se tornar capaz de enfrentar o Drake?',
    bio: 'Velejador experiente, com 6 viagens para a Antártica ensina sobre navegar em lugares mais remotos.',
    instagram: 'https://www.instagram.com/homozapiens/',
    imagem: '/images/charles-flesch.jpg',
    tipo: 'palestrante'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d484',
    nome: 'Dalminho',
    especialidade: 'Barcos tradicionais no Brasil',
    bio: 'Especialista em diferentes tipos de veleiros pelo Brasil',
    instagram: 'https://www.instagram.com/',
    imagem: '/images/dalminho.jpg',
    tipo: 'palestrante'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d485',
    nome: 'Giovanni Dolif Hashtag.ceu',
    especialidade: 'Meteorologia para todos',
    bio: 'Doutor e mestre na área da meteorologia na USP, velejador e apaixonado pelo céu e mar.',
    instagram: 'https://www.instagram.com/hashtag.ceu/',
    imagem: '/images/giovanni.jpg',
    tipo: 'palestrante'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d486',
    nome: 'Velho Jack',
    especialidade: 'O que eu analiso em um veleiro antes de comprar!',
    bio: 'Morando a bordo com sua esposa Angel há 10 anos em Paraty, trabalham avaliando e vendendo veleiro pelo Brasil.',
    instagram: 'https://www.instagram.com/velhojacksn/',
    imagem: '/images/velho-jack.jpg',
    tipo: 'palestrante'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d487',
    nome: 'Adriano Plotzki Hasthtag Sal',
    especialidade: 'Meteorologia para todos',
    bio: 'Sem Paraty, não existiria #sal',
    instagram: 'https://www.instagram.com/hashtagsal_oficial/',
    imagem: '/images/adriano.jpg',
    tipo: 'palestrante'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d488',
    nome: 'Chris Amaral',
    especialidade: 'ElaVela, escola de navegação oceânica para mulheres.',
    bio: 'Velejadora e skipper com experiência internacional, moradora a bordo há 26 anos.',
    instagram: 'https://www.instagram.com/chrisamaral_oficial/',
    imagem: '/images/chris_amaral.jpg',
    tipo: 'palestrante'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d489',
    nome: 'Beijupira: Priscila L. Silva',
    especialidade: 'Vida a Bordo',
    bio: 'Um casal que juntos realizaram o sonho de morar a bordo de um clássico de 53 pés.',
    instagram: 'https://www.instagram.com/beijupiracharters/',
    imagem: '/images/priscila-claudio.jpg',
    tipo: 'palestrante'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d490',
    nome: 'Paulo Rodrigo Moreira',
    especialidade: 'Do Campo ao Mar',
    bio: 'Velejador e skipper profissional, instrutor de velas, entre outros trabalhos na área náutica.',
    instagram: 'https://www.instagram.com/skipperrodrigo/',
    imagem: '/images/paulo-rodrigo.jpg',
    tipo: 'palestrante'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d491',
    nome: 'Veleiro Planckton: Cecilia e Fábio',
    especialidade: 'Homeschooling a Bordo',
    bio: 'Crescer no mar: Educação e vida a bordo.',
    instagram: 'https://www.instagram.com/veleiro_planckton/',
    imagem: '/images/cecilia.jpg',
    tipo: 'palestrante'
  },
  // ATRAÇÕES MUSICAIS
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d492',
    nome: 'Mar Virado',
    especialidade: 'Surf Music',
    bio: 'Banda de Surf Music',
    instagram: 'https://www.instagram.com/surflaskera/',
    imagem: '/images/mar-virado.jpg',
    tipo: 'atracao'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d493',
    nome: 'Mamba',
    especialidade: 'Rock Clássico',
    bio: 'Banda de Rock Clássico',
    instagram: '',
    imagem: '/images/mamba.jpg',
    tipo: 'atracao'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d494',
    nome: 'Mundiá Carimbó',
    especialidade: 'Carimbó',
    bio: 'Grupo de Carimbó',
    instagram: 'https://www.instagram.com/mundiacarimbo/',
    imagem: '/images/mundia-carimbo.jpg',
    tipo: 'atracao'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d495',
    nome: 'Maracatu Tira Mofo',
    especialidade: 'Maracatu',
    bio: 'Grupo de Maracatu',
    instagram: 'https://www.instagram.com/maracatutiraomofo/',
    imagem: '/images/maracatu-tira-mofo.jpg',
    tipo: 'atracao'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d496',
    nome: 'Capitão Rock',
    especialidade: 'Rock',
    bio: 'Banda de Rock',
    instagram: 'https://www.instagram.com/capitaorockoficial/',
    imagem: '/images/capitao-rock.jpg',
    tipo: 'atracao'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d497',
    nome: 'Leonidas',
    especialidade: 'Ciranda os Caiçaras',
    bio: 'Artista tradicional de Ciranda Caiçara',
    instagram: 'https://www.instagram.com/leonidasparaty/',
    imagem: '/images/leonidas.jpg',
    tipo: 'atracao'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d498',
    nome: 'DJ Tugão',
    especialidade: 'DJ',
    bio: 'DJ residente',
    instagram: 'https://www.instagram.com/veleiroalegria/',
    imagem: '/images/dj-tugao.jpg',
    tipo: 'atracao'
  }
];

const atividadesFestival = [
  // QUINTA-FEIRA
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3e001',
    titulo: 'Abertura do Festival',
    tipo: 'abertura',
    dia: 'Quinta-feira',
    data: '20/11/2025',
    horario: '10:00h',
    detalhes: 'Cerimônia oficial de abertura do festival',
    local: 'Palco Principal',
    pessoa_id: null
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3e002',
    titulo: 'Propulsão Elétrica e baterias de lithium',
    tipo: 'palestra',
    dia: 'Quinta-feira',
    data: '20/11/2025',
    horario: '10:00h às 12:00h',
    detalhes: 'Empresa que desenvolve soluções inteligentes para Veleiro',
    local: 'Palco Principal',
    pessoa_id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3e003',
    titulo: 'Iniciação na Vela',
    tipo: 'palestra',
    dia: 'Quinta-feira',
    data: '20/11/2025',
    horario: '11:30h às 12:50h',
    detalhes: 'Aprenda os primeiros passos para começar na vela',
    local: 'Palco Principal',
    pessoa_id: 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
  },
  // Adicionar mais atividades conforme necessário...
];

const patrocinadores = [
  {
    nome: 'Velas Oceano',
    logo: '/images/sponsor1.jpg',
    link: 'https://velasoceano.com',
    nivel: 'ouro'
  },
  {
    nome: 'Marina Paraty',
    logo: '/images/sponsor2.jpg',
    link: 'https://marinaparaty.com',
    nivel: 'prata'
  },
  {
    nome: 'Patrocinador Master',
    logo: '/images/master-sponsor.jpg',
    link: 'https://mastersponsor.com',
    nivel: 'master'
  },
  {
    nome: 'Patrocinador Bronze',
    logo: '/images/bronze-sponsor.jpg',
    link: 'https://bronzesponsor.com',
    nivel: 'bronze'
  }
];

const hospedagens = [
  {
    nome: 'Pousada Paraty Mirim',
    descricao: 'Pousada charmosa com vista para o mar',
    desconto: '15% OFF',
    contato: '(24) 3371-1234',
    localizacao: 'Centro Histórico'
  },
  {
    nome: 'Hotel Solar do Rosário',
    descricao: 'Hotel boutique no coração de Paraty',
    desconto: '20% OFF',
    contato: '(24) 3371-5678',
    localizacao: 'Centro Histórico'
  },
  {
    nome: 'Pousada do Ouro',
    descricao: 'Ambiente acolhedor com café da manhã especial',
    desconto: '10% OFF',
    contato: '(24) 3371-9012',
    localizacao: 'Próximo ao Porto'
  }
];

const restaurantes = [
  {
    nome: 'Restaurante Banana da Terra',
    especialidade: 'Culinária Regional',
    endereco: 'Rua Dr. Samuel Costa, 198',
    telefone: '(24) 3371-1725',
    cardapio: 'https://www.bananadaterra.com.br/cardapio'
  },
  {
    nome: 'Quintal das Letras',
    especialidade: 'Contemporânea',
    endereco: 'Travessa das Flores, 1',
    telefone: '(24) 3371-1056',
    cardapio: 'https://www.quintaldasletras.com.br/menu'
  },
  {
    nome: 'Margarida Café',
    especialidade: 'Café e Lanches',
    endereco: 'Praça do Chafariz, 15',
    telefone: '(24) 3371-2441',
    cardapio: 'https://www.margaridacafe.com.br/cardapio'
  }
];

const faqItems = [
  {
    pergunta: 'Como faço para me inscrever na regata?',
    resposta: 'As inscrições podem ser feitas através do formulário Google Forms disponível na seção de inscrições. Preencha todos os dados da embarcação e categoria, e tripulação. Após o cadastro, entraremos em contato para confirmação de pagamento.',
    ordem: 1
  },
  {
    pergunta: 'Qual é o endereço do evento?',
    resposta: 'O evento acontecerá no espaço do estacionamento ao lado do Hospital de Paraty Hugo Miranda, av. Nossa Senhora dos Remédios, Praia do Pontal.',
    ordem: 2
  },
  {
    pergunta: 'Há estacionamento disponível?',
    resposta: 'Sim, há estacionamentos públicos e privados no centro histórico. Recomendamos chegar cedo devido à alta demanda.',
    ordem: 3
  },
  {
    pergunta: 'O evento é gratuito?',
    resposta: 'Algumas atividades são gratuitas, como palestras específicas. Outras têm valores diferenciados. Consulte a programação para detalhes.',
    ordem: 4
  },
  {
    pergunta: 'Posso levar crianças?',
    resposta: 'Sim! Temos atividades especiais para crianças, incluindo aulas de vela com o projeto Na Vela Paraty, com Bianca na praia do Jabaquara e a Regata Kids no Pontal.',
    ordem: 5
  }
];

async function migratePessoasFestival() {
  try {
    console.log('🚀 Migrando pessoas do festival...');
    
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
      })));
    
    if (error) throw error;
    
    console.log(`✅ ${pessoasFestival.length} pessoas migradas com sucesso`);
    return { success: true, message: 'Pessoas migradas com sucesso', data };
  } catch (error) {
    console.error('❌ Erro ao migrar pessoas:', error);
    return { success: false, message: `Erro ao migrar pessoas: ${error.message}` };
  }
}

async function migrateAtividadesFestival() {
  try {
    console.log('🚀 Migrando atividades do festival...');
    
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
      })));
    
    if (error) throw error;
    
    console.log(`✅ ${atividadesFestival.length} atividades migradas com sucesso`);
    return { success: true, message: 'Atividades migradas com sucesso', data };
  } catch (error) {
    console.error('❌ Erro ao migrar atividades:', error);
    return { success: false, message: `Erro ao migrar atividades: ${error.message}` };
  }
}

async function migratePatrocinadores() {
  try {
    console.log('🚀 Migrando patrocinadores...');
    
    const { data, error } = await supabaseAdmin
      .from('patrocinadores')
      .insert(patrocinadores.map(patrocinador => ({
        nome: patrocinador.nome,
        logo: patrocinador.logo,
        link: patrocinador.link,
        nivel: patrocinador.nivel
      })));
    
    if (error) throw error;
    
    console.log(`✅ ${patrocinadores.length} patrocinadores migrados com sucesso`);
    return { success: true, message: 'Patrocinadores migrados com sucesso', data };
  } catch (error) {
    console.error('❌ Erro ao migrar patrocinadores:', error);
    return { success: false, message: `Erro ao migrar patrocinadores: ${error.message}` };
  }
}

async function migrateHospedagens() {
  try {
    console.log('🚀 Migrando hospedagens...');
    
    const { data, error } = await supabaseAdmin
      .from('hospedagens')
      .insert(hospedagens.map(hospedagem => ({
        nome: hospedagem.nome,
        descricao: hospedagem.descricao,
        desconto: hospedagem.desconto,
        contato: hospedagem.contato,
        localizacao: hospedagem.localizacao
      })));
    
    if (error) throw error;
    
    console.log(`✅ ${hospedagens.length} hospedagens migradas com sucesso`);
    return { success: true, message: 'Hospedagens migradas com sucesso', data };
  } catch (error) {
    console.error('❌ Erro ao migrar hospedagens:', error);
    return { success: false, message: `Erro ao migrar hospedagens: ${error.message}` };
  }
}

async function migrateRestaurantes() {
  try {
    console.log('🚀 Migrando restaurantes...');
    
    const { data, error } = await supabaseAdmin
      .from('restaurantes')
      .insert(restaurantes.map(restaurante => ({
        nome: restaurante.nome,
        especialidade: restaurante.especialidade,
        endereco: restaurante.endereco,
        telefone: restaurante.telefone,
        cardapio: restaurante.cardapio
      })));
    
    if (error) throw error;
    
    console.log(`✅ ${restaurantes.length} restaurantes migrados com sucesso`);
    return { success: true, message: 'Restaurantes migrados com sucesso', data };
  } catch (error) {
    console.error('❌ Erro ao migrar restaurantes:', error);
    return { success: false, message: `Erro ao migrar restaurantes: ${error.message}` };
  }
}

async function migrateFAQs() {
  try {
    console.log('🚀 Migrando FAQs...');
    
    const { data, error } = await supabaseAdmin
      .from('faqs')
      .insert(faqItems.map((faq, index) => ({
        pergunta: faq.pergunta,
        resposta: faq.resposta,
        ordem: index + 1
      })));
    
    if (error) throw error;
    
    console.log(`✅ ${faqItems.length} FAQs migrados com sucesso`);
    return { success: true, message: 'FAQs migrados com sucesso', data };
  } catch (error) {
    console.error('❌ Erro ao migrar FAQs:', error);
    return { success: false, message: `Erro ao migrar FAQs: ${error.message}` };
  }
}

async function createAdminUser() {
  try {
    console.log('🚀 Criando usuário administrador...');
    
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: process.env.ADMIN_EMAIL || 'admin@paratysailfestival.com',
      password: process.env.ADMIN_PASSWORD || 'admin123456',
      email_confirm: true
    });
    
    if (error) throw error;
    
    console.log('✅ Usuário administrador criado com sucesso');
    return { success: true, message: 'Admin criado com sucesso', data };
  } catch (error) {
    console.error('❌ Erro ao criar admin:', error);
    return { success: false, message: `Erro ao criar admin: ${error.message}` };
  }
}

async function runMigration() {
  console.log('🎯 Iniciando migração de dados...\n');
  
  const results = await Promise.all([
    createAdminUser(),
    migratePessoasFestival(),
    migrateAtividadesFestival(),
    migratePatrocinadores(),
    migrateHospedagens(),
    migrateRestaurantes(),
    migrateFAQs()
  ]);
  
  console.log('\n📊 Resultado da migração:');
  results.forEach((result, index) => {
    const operations = ['Admin User', 'Pessoas', 'Atividades', 'Patrocinadores', 'Hospedagens', 'Restaurantes', 'FAQs'];
    console.log(`${result.success ? '✅' : '❌'} ${operations[index]}: ${result.message}`);
  });
  
  const successCount = results.filter(r => r.success).length;
  console.log(`\n🎉 Migração concluída: ${successCount}/${results.length} operações bem-sucedidas`);
  
  if (successCount === results.length) {
    console.log('🚀 Todos os dados foram migrados com sucesso!');
  } else {
    console.log('⚠️  Algumas operações falharam. Verifique os logs acima.');
  }
}

// Executar migração
runMigration().catch(console.error);