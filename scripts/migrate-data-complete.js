#!/usr/bin/env node

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

// Função para gerar UUID válido
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Dados completos do data.ts com campos obrigatórios
const pessoasFestival = [
  // PALESTRANTES
  {
    id: generateUUID(),
    nome: 'Orlando Salomão',
    especialidade: 'Propulsão Elétrica e baterias de lithium',
    bio: 'Empresa que desenvolve soluções inteligentes para Veleiro.',
    instagram: 'https://www.instagram.com/alnitak.nautica/',
    imagem: '/images/orlando-salomao.jpg',
    tipo: 'palestrante',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Ricardo e Fernanda Eleutheria',
    especialidade: 'Iniciação na Vela',
    bio: 'Casal de Velejadores do Sul do Brasil, decidem mudar para Paraty com seu veleiro Eleutheria, um Fast 345, atualmente conquistaram a homologação da Marinha do Brasil, para dar o curso e a certificação de arrais amador.',
    instagram: 'https://www.instagram.com/veleiroeleutheria/',
    imagem: '/images/ricardo-fernanda.jpg',
    tipo: 'palestrante',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Anjos do Mar: Marcelo Ulysses',
    especialidade: '1º Socorros e demonstração de equipamentos de salvatagem',
    bio: 'Como funcionam os equipamentos de salvatagem.',
    instagram: 'https://www.instagram.com/anjosdomarbr/',
    imagem: '/images/marcelo.jpg',
    tipo: 'palestrante',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Veleiro Andorinha: Carla Lopes',
    especialidade: 'Os erros que cometi na reforma do meu veleiro',
    bio: 'Engenheira e Velejadora em seu currículo, já participou de travessias oceânicas pelo atlântico e antártica., mora a bordo do seu Fast 310 e recentemente fez uma reforma e agora quer nos contar.',
    instagram: 'https://www.instagram.com/lopes_carla/',
    imagem: '/images/carla-lopes.jpg',
    tipo: 'palestrante',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Charlie Flesch',
    especialidade: 'Rádio VHF',
    bio: 'A importância do rádio VHF em uma navegação.',
    instagram: 'https://www.instagram.com/charlieflesch/',
    imagem: '/images/charlie.jpg',
    tipo: 'palestrante',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Giovanni Dolif',
    especialidade: 'Meteorologia para todos',
    bio: 'Como interpretar cartas de tempo.',
    instagram: 'https://www.instagram.com/giovannidolif/',
    imagem: '/images/giovanni.jpg',
    tipo: 'palestrante',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Velho Jack',
    especialidade: 'O que eu analiso em um veleiro antes de comprar!',
    bio: 'Compra e venda de embarcações usadas.',
    instagram: 'https://www.instagram.com/velhojack/',
    imagem: '/images/velho-jack.jpg',
    tipo: 'palestrante',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Adriano Plotzki',
    especialidade: 'Meteorologia para todos',
    bio: 'Skipper Profissional, meteorologista.',
    instagram: 'https://www.instagram.com/adrianoplotzki/',
    imagem: '/images/adriano.jpg',
    tipo: 'palestrante',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Chris Amaral',
    especialidade: 'ElaVela, escola de navegação oceânica para mulheres',
    bio: 'Velejadora e skipper com experiência internacional.',
    instagram: 'https://www.instagram.com/chrisamaral/',
    imagem: '/images/chris.jpg',
    tipo: 'palestrante',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Priscila e Claudio',
    especialidade: 'Vida a Bordo',
    bio: 'Experiências de vida a bordo de um clássico de 53 pés.',
    instagram: 'https://www.instagram.com/priscilaclaudio/',
    imagem: '/images/priscila-claudio.jpg',
    tipo: 'palestrante',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Paulo Rodrigo',
    especialidade: 'Do Campo ao Mar',
    bio: 'Experiências de um velejador e skipper profissional.',
    instagram: 'https://www.instagram.com/paulorodrigo/',
    imagem: '/images/paulo.jpg',
    tipo: 'palestrante',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Cecília e Fábio',
    especialidade: 'Homeschooling a Bordo',
    bio: 'Como educar crianças durante a vida no mar.',
    instagram: 'https://www.instagram.com/ceciliafabio/',
    imagem: '/images/cecilia-fabio.jpg',
    tipo: 'palestrante',
    ativo: true
  },

  // ATRAÇÕES MUSICAIS
  {
    id: generateUUID(),
    nome: 'Mar Virado',
    especialidade: 'Música Regional',
    bio: 'Banda de música regional de Paraty.',
    instagram: 'https://www.instagram.com/marvirado/',
    imagem: '/images/mar-virado.jpg',
    tipo: 'atracao',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Mamba',
    especialidade: 'Rock Clássico',
    bio: 'Banda de rock clássico.',
    instagram: 'https://www.instagram.com/mamba/',
    imagem: '/images/mamba.jpg',
    tipo: 'atracao',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'DJ Tugão',
    especialidade: 'Música Eletrônica',
    bio: 'DJ especializado em música eletrônica.',
    instagram: 'https://www.instagram.com/djtugao/',
    imagem: '/images/dj-tugao.jpg',
    tipo: 'atracao',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Mundiá Carimbó',
    especialidade: 'Carimbó',
    bio: 'Grupo tradicional de Carimbó.',
    instagram: 'https://www.instagram.com/mundiacarimbo/',
    imagem: '/images/mundia.jpg',
    tipo: 'atracao',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Maracatu Tira Mofo',
    especialidade: 'Maracatu',
    bio: 'Grupo tradicional de Maracatu.',
    instagram: 'https://www.instagram.com/maracatutiramofo/',
    imagem: '/images/maracatu.jpg',
    tipo: 'atracao',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Capitão Rock',
    especialidade: 'Rock',
    bio: 'Banda de rock local.',
    instagram: 'https://www.instagram.com/capitaorock/',
    imagem: '/images/capitao-rock.jpg',
    tipo: 'atracao',
    ativo: true
  }
];

const atividadesFestival = [
  // QUINTA-FEIRA - 20/11/2025
  {
    id: generateUUID(),
    titulo: 'Abertura do Festival',
    tipo: 'abertura',
    dia: 'Quinta-feira',
    data: '20/11/2025',
    horario: '10:00h',
    detalhes: 'Cerimônia oficial de abertura do festival',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Propulsão Elétrica e baterias de lithium',
    tipo: 'palestra',
    dia: 'Quinta-feira',
    data: '20/11/2025',
    horario: '10:00h às 12:00h',
    detalhes: 'Empresa que desenvolve soluções inteligentes para Veleiro',
    local: 'Palco Principal',
    pessoa_id: null, // Será atualizado com pessoa correspondente
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Iniciação na Vela',
    tipo: 'palestra',
    dia: 'Quinta-feira',
    data: '20/11/2025',
    horario: '11:30h às 12:50h',
    detalhes: 'Aprenda os primeiros passos para começar na vela',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Show Mundiá Carimbó',
    tipo: 'show',
    dia: 'Quinta-feira',
    data: '20/11/2025',
    horario: '13:00h',
    detalhes: 'Apresentação de Carimbó',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: '1º Socorros e demonstração de equipamentos de salvatagem',
    tipo: 'workshop',
    dia: 'Quinta-feira',
    data: '20/11/2025',
    horario: '13:50h às 15:10h',
    detalhes: 'Workshop prático sobre segurança no mar',
    local: 'Área de Workshop',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Os erros que cometi na reforma do meu veleiro',
    tipo: 'palestra',
    dia: 'Quinta-feira',
    data: '20/11/2025',
    horario: '15:20h às 16:40h',
    detalhes: 'Dicas práticas para reforma de embarcações',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Corrida de Bote no Rio + Show de Banda Local',
    tipo: 'competicao',
    dia: 'Quinta-feira',
    data: '20/11/2025',
    horario: '15:00h',
    detalhes: 'Competição tradicional de botes com música ao vivo',
    local: 'Rio',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Show Musical',
    tipo: 'show',
    dia: 'Quinta-feira',
    data: '20/11/2025',
    horario: '19:00h',
    detalhes: 'Show com artistas locais',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  },
  
  // SEXTA-FEIRA - 21/11/2025
  {
    id: generateUUID(),
    titulo: 'Concentração da Regata',
    tipo: 'regata',
    dia: 'Sexta-feira',
    data: '21/11/2025',
    horario: '10:00h',
    detalhes: 'Concentração das embarcações para a regata principal',
    local: 'Baía de Paraty',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Largada da Regata Principal',
    tipo: 'regata',
    dia: 'Sexta-feira',
    data: '21/11/2025',
    horario: '11:00h',
    detalhes: 'Início da competição principal do festival',
    local: 'Baía de Paraty',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Rádio VHF',
    tipo: 'palestra',
    dia: 'Sexta-feira',
    data: '21/11/2025',
    horario: '14:00h às 15:30h',
    detalhes: 'A importância do rádio VHF em uma navegação',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Show Mar Virado',
    tipo: 'show',
    dia: 'Sexta-feira',
    data: '21/11/2025',
    horario: '16:00h',
    detalhes: 'Apresentação de música regional',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Premiação da Regata',
    tipo: 'premiacao',
    dia: 'Sexta-feira',
    data: '21/11/2025',
    horario: '17:00h',
    detalhes: 'Cerimônia de premiação dos vencedores',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  },
  
  // SÁBADO - 22/11/2025
  {
    id: generateUUID(),
    titulo: 'Show Mamba',
    tipo: 'show',
    dia: 'Sábado',
    data: '22/11/2025',
    horario: '13:00h',
    detalhes: 'Apresentação de Rock Clássico',
    local: 'Palco Alternativo',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Meteorologia para todos',
    tipo: 'palestra',
    dia: 'Sábado',
    data: '22/11/2025',
    horario: '14:40h às 16:10h',
    detalhes: 'Aprenda sobre previsão do tempo para navegação',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Show Maracatu Tira Mofo',
    tipo: 'show',
    dia: 'Sábado',
    data: '22/11/2025',
    horario: '16:30h',
    detalhes: 'Apresentação de Maracatu',
    local: 'Palco Alternativo',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'O que eu analiso em um veleiro antes de comprar!',
    tipo: 'palestra',
    dia: 'Sábado',
    data: '22/11/2025',
    horario: '16:20h às 17:50h',
    detalhes: 'Dicas para escolha do primeiro veleiro',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Homenagem Especial - Amyr Klink',
    tipo: 'homenagem',
    dia: 'Sábado',
    data: '22/11/2025',
    horario: '19:00h',
    detalhes: 'Homenagem ao renomado navegador brasileiro',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'DJ Tugão',
    tipo: 'show',
    dia: 'Sábado',
    data: '22/11/2025',
    horario: '20:00h',
    detalhes: 'Apresentação musical de encerramento',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  },
  
  // DOMINGO - 23/11/2025
  {
    id: generateUUID(),
    titulo: 'ElaVela, escola de navegação oceânica para mulheres',
    tipo: 'palestra',
    dia: 'Domingo',
    data: '23/11/2025',
    horario: '10:00h',
    detalhes: 'Velejadora e skipper com experiência internacional compartilha experiências',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Regata Kids Jabaquara',
    tipo: 'regata',
    dia: 'Domingo',
    data: '23/11/2025',
    horario: '11:00h',
    detalhes: 'Competição especial para jovens velejadores',
    local: 'Praia do Jabaquara',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Vida a Bordo',
    tipo: 'palestra',
    dia: 'Domingo',
    data: '23/11/2025',
    horario: '11:00h',
    detalhes: 'Experiências de vida a bordo de um clássico de 53 pés',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Show Capitão Rock',
    tipo: 'show',
    dia: 'Domingo',
    data: '23/11/2025',
    horario: '11:00h',
    detalhes: 'Apresentação de Rock',
    local: 'Palco Alternativo',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Do Campo ao Mar',
    tipo: 'palestra',
    dia: 'Domingo',
    data: '23/11/2025',
    horario: '12:30h',
    detalhes: 'Experiências de um velejador e skipper profissional',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Homeschooling a Bordo',
    tipo: 'palestra',
    dia: 'Domingo',
    data: '23/11/2025',
    horario: '17:00h às 18:20h',
    detalhes: 'Como educar crianças durante a vida no mar',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  },
  {
    id: generateUUID(),
    titulo: 'Troféu Kids/Encerramento + Show Final',
    tipo: 'encerramento',
    dia: 'Domingo',
    data: '23/11/2025',
    horario: '15:00h',
    detalhes: 'Premiação das competições infantis e show de encerramento',
    local: 'Palco Principal',
    pessoa_id: null,
    ativo: true
  }
];

const patrocinadores = [
  {
    id: generateUUID(),
    nome: 'Patrocinador Master',
    logo: '/images/logos/master-sponsor.png',
    link: 'https://instagram.com/master',
    nivel: 'master',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Patrocinador Ouro',
    logo: '/images/logos/gold-sponsor.png',
    link: 'https://instagram.com/gold',
    nivel: 'ouro',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Patrocinador Prata',
    logo: '/images/logos/silver-sponsor.png',
    link: 'https://instagram.com/silver',
    nivel: 'prata',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Patrocinador Bronze',
    logo: '/images/logos/bronze-sponsor.png',
    link: 'https://instagram.com/bronze',
    nivel: 'bronze',
    ativo: true
  }
];

const hospedagens = [
  {
    id: generateUUID(),
    nome: 'Pousada Paraty Mirim',
    descricao: 'Pousada charmosa com vista para o mar, oferecendo conforto e tranquilidade aos hóspedes.',
    desconto: '15% OFF para participantes do festival',
    contato: '(24) 3371-1234',
    localizacao: 'Centro Histórico',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Hotel Solar do Rosário',
    descricao: 'Hotel boutique no coração de Paraty, com arquitetura colonial preservada e serviço de excelência.',
    desconto: '20% OFF para participantes do festival',
    contato: '(24) 3371-5678',
    localizacao: 'Centro Histórico',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Pousada do Ouro',
    descricao: 'Ambiente acolhedor com café da manhã especial e localização privilegiada.',
    desconto: '10% OFF para participantes do festival',
    contato: '(24) 3371-9012',
    localizacao: 'Próximo ao Porto',
    ativo: true
  }
];

const restaurantes = [
  {
    id: generateUUID(),
    nome: 'Restaurante Banana da Terra',
    especialidade: 'Culinária Regional',
    endereco: 'Rua Dr. Samuel Costa, 198 - Centro Histórico',
    telefone: '(24) 3371-1725',
    cardapio: 'Pratos típicos da região, frutos do mar frescos e especialidades locais.',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Quintal das Letras',
    especialidade: 'Contemporânea',
    endereco: 'Travessa das Flores, 1 - Centro Histórico',
    telefone: '(24) 3371-1056',
    cardapio: 'Culinária contemporânea com ingredientes regionais e apresentação moderna.',
    ativo: true
  },
  {
    id: generateUUID(),
    nome: 'Margarida Café',
    especialidade: 'Café e Lanches',
    endereco: 'Praça do Chafariz, 15 - Centro Histórico',
    telefone: '(24) 3371-2441',
    cardapio: 'Cafés especiais, lanches artesanais e doces caseiros.',
    ativo: true
  }
];

const faqs = [
  {
    id: generateUUID(),
    pergunta: 'Como faço para me inscrever na regata?',
    resposta: 'As inscrições podem ser feitas através do formulário Google Forms disponível na seção de inscrições. Preencha todos os dados da embarcação e categoria, e tripulação. Após o cadastro, entraremos em contato para confirmação de pagamento.',
    ordem: 1,
    ativo: true
  },
  {
    id: generateUUID(),
    pergunta: 'Qual é o endereço do evento?',
    resposta: 'O evento acontecerá no espaço do estacionamento ao lado do Hospital de Paraty Hugo Miranda, av. Nossa Senhora dos Remédios, Praia do Pontal.',
    ordem: 2,
    ativo: true
  },
  {
    id: generateUUID(),
    pergunta: 'Há estacionamento disponível?',
    resposta: 'Sim, há estacionamentos públicos e privados no centro histórico. Recomendamos chegar cedo devido à alta demanda.',
    ordem: 3,
    ativo: true
  },
  {
    id: generateUUID(),
    pergunta: 'O evento é gratuito?',
    resposta: 'Algumas atividades são gratuitas, como palestras específicas. Outras têm valores diferenciados. Consulte a programação para detalhes.',
    ordem: 4,
    ativo: true
  },
  {
    id: generateUUID(),
    pergunta: 'Posso levar crianças?',
    resposta: 'Sim! Temos atividades especiais para crianças, incluindo aulas de vela com o projeto Na Vela Paraty, com Bianca na praia do Jabaquara e a Regata Kids no Pontal.',
    ordem: 5,
    ativo: true
  }
];

async function criarUsuarioAdmin() {
  try {
    console.log('👤 Criando usuário admin...');
    
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@paratysailfestival.com',
      password: 'paraty2025!',
      email_confirm: true
    });

    if (error && !error.message.includes('already exists')) {
      throw error;
    }

    console.log('✅ Usuário admin criado/verificado com sucesso');
    return true;
  } catch (error) {
    console.error('❌ Erro ao criar usuário admin:', error.message);
    return false;
  }
}

async function migrarPessoas() {
  try {
    console.log('👥 Migrando pessoas do festival...');
    
    const { data, error } = await supabaseAdmin
      .from('pessoas_festival')
      .insert(pessoasFestival)
      .select();

    if (error) throw error;
    
    console.log(`✅ ${data.length} pessoas migradas com sucesso`);
    return data;
  } catch (error) {
    console.error('❌ Erro ao migrar pessoas:', error.message);
    return null;
  }
}

async function migrarAtividades(pessoasInseridas) {
  try {
    console.log('📅 Migrando atividades do festival...');
    
    // Mapear títulos de atividades para pessoas
    const mapeamentoPessoas = {
      'Propulsão Elétrica e baterias de lithium': 'Orlando Salomão',
      'Iniciação na Vela': 'Ricardo e Fernanda Eleutheria',
      '1º Socorros e demonstração de equipamentos de salvatagem': 'Anjos do Mar: Marcelo Ulysses',
      'Os erros que cometi na reforma do meu veleiro': 'Veleiro Andorinha: Carla Lopes',
      'Rádio VHF': 'Charlie Flesch',
      'Meteorologia para todos': 'Giovanni Dolif',
      'O que eu analiso em um veleiro antes de comprar!': 'Velho Jack',
      'ElaVela, escola de navegação oceânica para mulheres': 'Chris Amaral',
      'Vida a Bordo': 'Priscila e Claudio',
      'Do Campo ao Mar': 'Paulo Rodrigo',
      'Homeschooling a Bordo': 'Cecília e Fábio',
      'Show Mundiá Carimbó': 'Mundiá Carimbó',
      'Show Mar Virado': 'Mar Virado',
      'Show Mamba': 'Mamba',
      'DJ Tugão': 'DJ Tugão',
      'Show Maracatu Tira Mofo': 'Maracatu Tira Mofo',
      'Show Capitão Rock': 'Capitão Rock'
    };

    // Atualizar atividades com pessoa_id correto
    const atividadesComPessoas = atividadesFestival.map(atividade => {
      const nomePessoa = mapeamentoPessoas[atividade.titulo];
      const pessoa = pessoasInseridas?.find(p => p.nome === nomePessoa);
      
      return {
        ...atividade,
        pessoa_id: pessoa?.id || null
      };
    });

    const { data, error } = await supabaseAdmin
      .from('atividades_festival')
      .insert(atividadesComPessoas)
      .select();

    if (error) throw error;
    
    console.log(`✅ ${data.length} atividades migradas com sucesso`);
    return data;
  } catch (error) {
    console.error('❌ Erro ao migrar atividades:', error.message);
    return null;
  }
}

async function migrarPatrocinadores() {
  try {
    console.log('🏆 Migrando patrocinadores...');
    
    const { data, error } = await supabaseAdmin
      .from('patrocinadores')
      .insert(patrocinadores)
      .select();

    if (error) throw error;
    
    console.log(`✅ ${data.length} patrocinadores migrados com sucesso`);
    return data;
  } catch (error) {
    console.error('❌ Erro ao migrar patrocinadores:', error.message);
    return null;
  }
}

async function migrarHospedagens() {
  try {
    console.log('🏨 Migrando hospedagens...');
    
    const { data, error } = await supabaseAdmin
      .from('hospedagens')
      .insert(hospedagens)
      .select();

    if (error) throw error;
    
    console.log(`✅ ${data.length} hospedagens migradas com sucesso`);
    return data;
  } catch (error) {
    console.error('❌ Erro ao migrar hospedagens:', error.message);
    return null;
  }
}

async function migrarRestaurantes() {
  try {
    console.log('🍽️ Migrando restaurantes...');
    
    const { data, error } = await supabaseAdmin
      .from('restaurantes')
      .insert(restaurantes)
      .select();

    if (error) throw error;
    
    console.log(`✅ ${data.length} restaurantes migrados com sucesso`);
    return data;
  } catch (error) {
    console.error('❌ Erro ao migrar restaurantes:', error.message);
    return null;
  }
}

async function migrarFAQs() {
  try {
    console.log('❓ Migrando FAQs...');
    
    const { data, error } = await supabaseAdmin
      .from('faqs')
      .insert(faqs)
      .select();

    if (error) throw error;
    
    console.log(`✅ ${data.length} FAQs migradas com sucesso`);
    return data;
  } catch (error) {
    console.error('❌ Erro ao migrar FAQs:', error.message);
    return null;
  }
}

async function executarMigracaoCompleta() {
  console.log('🚀 Iniciando migração completa do Paraty Sail Festival...\n');
  
  let sucessos = 0;
  const total = 7;

  // 1. Criar usuário admin
  if (await criarUsuarioAdmin()) sucessos++;

  // 2. Migrar pessoas
  const pessoasInseridas = await migrarPessoas();
  if (pessoasInseridas) sucessos++;

  // 3. Migrar atividades (depende das pessoas)
  const atividadesInseridas = await migrarAtividades(pessoasInseridas);
  if (atividadesInseridas) sucessos++;

  // 4. Migrar patrocinadores
  if (await migrarPatrocinadores()) sucessos++;

  // 5. Migrar hospedagens
  if (await migrarHospedagens()) sucessos++;

  // 6. Migrar restaurantes
  if (await migrarRestaurantes()) sucessos++;

  // 7. Migrar FAQs
  if (await migrarFAQs()) sucessos++;

  console.log(`\n🎉 Migração completa finalizada: ${sucessos}/${total} operações bem-sucedidas`);
  
  if (sucessos === total) {
    console.log('✅ Todos os dados foram migrados com sucesso!');
    console.log('🌊 O Paraty Sail Festival está pronto para navegar!');
  } else {
    console.log('⚠️ Algumas operações falharam. Verifique os logs acima.');
  }
}

// Executar migração
executarMigracaoCompleta()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('💥 Erro fatal na migração:', error);
    process.exit(1);
  });