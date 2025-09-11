import {
  Palestrante,
  DiaProgramacao,
  Patrocinador,
  Hospedagem,
  Restaurante,
  FAQ,
  HospedagemData,
  RestauranteData,
  FAQData,
  Pessoa,
  AtividadeFestival
} from '@/types';

// SISTEMA UNIFICADO - Pessoas do Festival (Palestrantes + Atrações)
export const pessoasFestival: Pessoa[] = [
  // PALESTRANTES
  {
    id: "orlando-salomao",
    nome: "Orlando Salomão",
    especialidade: "Propulsão Elétrica e baterias de lithium",
    bio: "Empresa que desenvolve soluções inteligentes para Veleiro.",
    instagram: "https://www.instagram.com/alnitak.nautica/",
    imagem: "/images/orlando-salomao.jpg",
    tipo: "palestrante"
  },
  {
    id: "ricardo-fernanda",
    nome: "Ricardo e Fernanda Eleutheria",
    especialidade: "Iniciação na Vela",
    bio: " Casal de Velejadores do Sul do Brasil, decidem mudar para Paraty com seu veleiro Eleutheria, um Fast 345, atualmente conquistaram a homologação da Marinha do Brasil, para dar o curso e a certificação de arrais amador.",
    instagram: "https://www.instagram.com/veleiroeleutheria/",
    imagem: "/images/ricardo-fernanda.jpg",
    tipo: "palestrante"
  },
  {
    id: "marcelo-ulysses",
    nome: "Anjos do Mar: Marcelo Ulysses",
    especialidade: "1º Socorros e demonstração de equipamentos de salvatagem",
    bio: "Como funcionam os equipamentos de salvatagem.",
    instagram: "https://www.instagram.com/anjosdomarbr/",
    imagem: "/images/marcelo.jpg",
    tipo: "palestrante"
  },
  {
    id: "carla-lopes",
    nome: "Veleiro Andorinha: Carla Lopes",
    especialidade: "Os erros que cometi na reforma do meu veleiro",
    bio: "Engenheira e Velejadora em seu currículo, já participou de travessias oceânicas pelo atlântico e antártica., mora a bordo do seu Fast 310 e recentemente fez uma reforma e agora quer nos contar.",
    instagram: "https://www.instagram.com/lopes_carla/",
    imagem: "/images/carla-lopes.jpg",
    tipo: "palestrante"
  },
  {
    id: "charlie-flesch",
    nome: "Charlie Flesch",
    especialidade: "Como se tornar capaz de enfrentar o Drake?",
    bio: "Velejador experiente, com 6 viagens para a Antártica  ensina sobre navegar em lugares mais remotos como o Drake.",
    instagram: "https://www.instagram.com/homozapiens/",
    imagem: "/images/charles-flesch.jpg",
    tipo: "palestrante"
  },
  {
    id: "dalminho",
    nome: "Dalminho",
    especialidade: "Barcos tradicionais no Brasil",
    bio: "Especialista em diferentes tipos de veleiros pelo Brasil",
    instagram: "https://www.instagram.com/",
    imagem: "/images/dalminho.jpg",
    tipo: "palestrante"
  },
  {
    id: "giovanni-dolif",
    nome: "Giovanni Dolif Hashtag.ceu",
    especialidade: "Meteorologia para todos",
    bio: "Doutor e mestre na área da meteorologia na USP, velejador e apaixonado pelo céu e mar, vem dividir conosco um pouco do seu conhecimento.",
    instagram: "https://www.instagram.com/hashtag.ceu/",
    imagem: "/images/giovanni.jpg",
    tipo: "palestrante"
  },
  {
    id: "velho-jack",
    nome: "Velho Jack",
    especialidade: "O que eu analiso em um veleiro antes de comprar!",
    bio: "Morando a bordo com sua esposa Angel há 10 anos em Paraty, logo em seguida seu filho Kurt Dali, veio fazer sociedade e trabalham juntos avaliando e vendendo veleiro pelo Brasil todo. Com canal no Youtube e Instagram, ensinam muitas curiosidades de modelos de barcos, manutenções e vida a bordo.",
    instagram: "https://www.instagram.com/velhojacksn/",
    imagem: "/images/velho-jack.jpg",
    tipo: "palestrante"
  },
  {
    id: "adriano-plotzki",
    nome: "Adriano Plotzki Hasthtag Sal",
    especialidade: "Meteorologia para todos",
    bio: "Sem Paraty, não existiria #sal",
    instagram: "https://www.instagram.com/hashtagsal_oficial/",
    imagem: "/images/adriano.jpg",
    tipo: "palestrante"
  },
  {
    id: "chris-amaral",
    nome: "Chris Amaral",
    especialidade: "ElaVela, escola de navegação oceânica para mulheres.",
    bio: "Velejadora e skipper com experiência internacional, moradora a bordo há 26 anos, Chris, navegou por 2 anos a costa brasileira a bordo do seu 22 pés sem motor, fez várias viagens ate Patagonia. 'No mar, com as forças da Natureza, o velejar é um lugar onde só se pode habitar com a presença.'",
    instagram: "https://www.instagram.com/chrisamaral_oficial/",
    imagem: "/images/chris_amaral.jpg",
    tipo: "palestrante"
  },
  {
    id: "priscila-claudio",
    nome: "Beijupira: Priscila L. Silva",
    especialidade: "Vida a Bordo",
    bio: "Um casal que juntos realizaram o sonho de morar a bordo de um clássico de 53 pés, Com 10 anos fazendo charter em Paraty, o resultado, muitas histórias boas para contar.",
    instagram: "https://www.instagram.com/beijupiracharters/",
    imagem: "/images/priscila-claudio.jpg",
    tipo: "palestrante"
  },
  {
    id: "paulo-rodrigo",
    nome: "Paulo Rodrigo Moreira",
    especialidade: "Do Campo ao Mar",
    bio: "Velejador e skipper profissional, instrutor de velas, entre outros trabalhos na área náutica. Trabalha também em defesa da mata atlântica na sua propriedade.",
    instagram: "https://www.instagram.com/skipperrodrigo/",
    imagem: "/images/paulo-rodrigo.jpg",
    tipo: "palestrante"
  },
  {
    id: "cecilia-fabio",
    nome: "Veleiro Planckton: Cecilia e Fábio",
    especialidade: "Homeschooling a Bordo",
    bio: "Crescer no mar: Educação e vida a bordo.",
    instagram: "https://www.instagram.com/veleiro_planckton/",
    imagem: "/images/cecilia.jpg",
    tipo: "palestrante"
  },
  // ATRAÇÕES MUSICAIS
  {
    id: "mar-virado",
    nome: "Mar Virado",
    especialidade: "Surf Music",
    bio: "",
    instagram: "https://www.instagram.com/surflaskera/",
    imagem: "/images/mar-virado.jpg",
    tipo: "atracao"
  },
  {
    id: "mamba",
    nome: "Mamba",
    especialidade: "Rock Clássico",
    bio: "",
    instagram: "",
    imagem: "/images/mamba.jpg",
    tipo: "atracao"
  },
  {
    id: "mundia-carimbo",
    nome: "Mundiá Carimbó",
    especialidade: "Carimbó",
    bio: "",
    instagram: "https://www.instagram.com/mundiacarimbo/",
    imagem: "/images/mundia-carimbo.jpg",
    tipo: "atracao"
  },
  {
    id: "maracatu-tira-mofo",
    nome: "Maracatu Tira Mofo",
    especialidade: "Maracatu",
    bio: "",
    instagram: "https://www.instagram.com/maracatutiraomofo/",
    imagem: "/images/maracatu-tira-mofo.jpg",
    tipo: "atracao"
  },
  {
    id: "capitao-rock",
    nome: "Capitão Rock",
    especialidade: "Rock",
    bio: "",
    instagram: "https://www.instagram.com/capitaorockoficial/",
    imagem: "/images/capitao-rock.jpg",
    tipo: "atracao"
  },
  {
    id: "leonidas",
    nome: "Leonidas",
    especialidade: "Ciranda os Caiçaras",
    bio: "",
    instagram: "https://www.instagram.com/leonidasparaty/",
    imagem: "/images/leonidas.jpg",
    tipo: "atracao"
  },
  {
    id: "dj-tugao",
    nome: "DJ Tugão",
    especialidade: "DJ",
    bio: "",
    instagram: "https://www.instagram.com/veleiroalegria/",
    imagem: "/images/dj-tugao.jpg",
    tipo: "atracao"
  }
];

  // SISTEMA UNIFICADO - Atividades do Festival
export const atividadesFestival: AtividadeFestival[] = [
  // QUINTA-FEIRA - 20/11/2025
  {
    id: "abertura-festival",
    titulo: "Abertura do Festival",
    tipo: "abertura",
    dia: "Quinta-feira",
    data: "20/11/2025",
    horario: "10:00h",
    detalhes: "Cerimônia oficial de abertura do festival",
    local: "Palco Principal"
  },
  {
    id: "palestra-orlando",
    titulo: "Propulsão Elétrica e baterias de lithium",
    tipo: "palestra",
    dia: "Quinta-feira",
    data: "20/11/2025",
    horario: "10:00h às 12:00h",
    detalhes: "Empresa que desenvolve soluções inteligentes para Veleiro",
    pessoaId: "orlando-salomao",
    local: "Palco Principal"
  },
  {
    id: "palestra-ricardo",
    titulo: "Iniciação na Vela",
    tipo: "palestra",
    dia: "Quinta-feira",
    data: "20/11/2025",
    horario: "11:30h às 12:50h",
    detalhes: "Aprenda os primeiros passos para começar na vela",
    pessoaId: "ricardo-fernanda",
    local: "Palco Principal"
  },
  {
    id: "show-mundia",
    titulo: "Show Mundiá Carimbó",
    tipo: "show",
    dia: "Quinta-feira",
    data: "20/11/2025",
    horario: "13:00h",
    detalhes: "Apresentação de Carimbó",
    pessoaId: "mundia-carimbo",
    local: "Palco Principal"
  },
  {
    id: "workshop-primeiros-socorros",
    titulo: "1º Socorros e demonstração de equipamentos de salvatagem",
    tipo: "workshop",
    dia: "Quinta-feira",
    data: "20/11/2025",
    horario: "13:50h às 15:10h",
    detalhes: "Workshop prático sobre segurança no mar",
    pessoaId: "marcelo-ulysses",
    local: "Área de Workshop"
  },
  {
    id: "palestra-carla",
    titulo: "Os erros que cometi na reforma do meu veleiro",
    tipo: "palestra",
    dia: "Quinta-feira",
    data: "20/11/2025",
    horario: "15:20h às 16:40h",
    detalhes: "Dicas práticas para reforma de embarcações",
    pessoaId: "carla-lopes",
    local: "Palco Principal"
  },
  {
    id: "corrida-bote",
    titulo: "Corrida de Bote no Rio + Show de Banda Local",
    tipo: "competicao",
    dia: "Quinta-feira",
    data: "20/11/2025",
    horario: "15:00h",
    detalhes: "Competição tradicional de botes com música ao vivo",
    local: "Rio"
  },
  {
    id: "show-musical-quinta",
    titulo: "Show Musical",
    tipo: "show",
    dia: "Quinta-feira",
    data: "20/11/2025",
    horario: "19:00h",
    detalhes: "Show com artistas locais",
    local: "Palco Principal"
  },
  
  // SEXTA-FEIRA - 21/11/2025
  {
    id: "concentracao-regata",
    titulo: "Concentração da Regata",
    tipo: "regata",
    dia: "Sexta-feira",
    data: "21/11/2025",
    horario: "10:00h",
    detalhes: "Concentração das embarcações para a regata principal",
    local: "Baía de Paraty"
  },
  {
    id: "largada-regata",
    titulo: "Largada da Regata Principal",
    tipo: "regata",
    dia: "Sexta-feira",
    data: "21/11/2025",
    horario: "11:00h",
    detalhes: "Início oficial da regata principal do festival",
    local: "Baía de Paraty"
  },
  {
    id: "regata-kids-sexta",
    titulo: "Regata Kids no Jabaquara",
    tipo: "kids",
    dia: "Sexta-feira",
    data: "21/11/2025",
    horario: "11:00h",
    detalhes: "Competição especial para crianças na Praia do Jabaquara",
    local: "Praia do Jabaquara"
  },
  {
    id: "apresentacao-cultural",
    titulo: "Ciranda / Maracatu",
    tipo: "cultura",
    dia: "Sexta-feira",
    data: "21/11/2025",
    horario: "13:00h",
    detalhes: "Apresentação de danças tradicionais da região",
    pessoaId: "leonidas",
    local: "Palco Principal"
  },
  {
    id: "chegada-regata",
    titulo: "Chegada da Regata",
    tipo: "regata",
    dia: "Sexta-feira",
    data: "21/11/2025",
    horario: "16:30h",
    detalhes: "Chegada prevista das embarcações da regata principal",
    local: "Baía de Paraty"
  },
  {
    id: "premiacao-regata",
    titulo: "Entrega de Troféus",
    tipo: "premiacao",
    dia: "Sexta-feira",
    data: "21/11/2025",
    horario: "18:00h",
    detalhes: "Cerimônia de premiação dos vencedores da regata",
    local: "Palco Principal"
  },
  {
    id: "show-sexta",
    titulo: "Show Musical",
    tipo: "show",
    dia: "Sexta-feira",
    data: "21/11/2025",
    horario: "20:00h",
    detalhes: "Apresentação musical de encerramento do dia",
    local: "Palco Principal"
  },
  
  // SÁBADO - 22/11/2025
  {
    id: "palestra-charlie",
    titulo: "Como se tornar capaz de enfrentar o Drake?",
    tipo: "palestra",
    dia: "Sábado",
    data: "22/11/2025",
    horario: "11:00h",
    detalhes: "Palestra sobre experiências e conhecimentos na vela",
    pessoaId: "charlie-flesch",
    local: "Palco Principal"
  },
  {
    id: "show-mar-virado",
    titulo: "Show Mar Virado",
    tipo: "show",
    dia: "Sábado",
    data: "22/11/2025",
    horario: "11:00h",
    detalhes: "Apresentação de Surf Music",
    pessoaId: "mar-virado",
    local: "Palco Alternativo"
  },
  {
    id: "palestra-dalminho",
    titulo: "Barcos tradicionais no Brasil",
    tipo: "palestra",
    dia: "Sábado",
    data: "22/11/2025",
    horario: "13:00h",
    detalhes: "Conheça os diferentes tipos de embarcações",
    pessoaId: "dalminho",
    local: "Palco Principal"
  },
  {
    id: "show-mamba",
    titulo: "Show Mamba",
    tipo: "show",
    dia: "Sábado",
    data: "22/11/2025",
    horario: "13:00h",
    detalhes: "Apresentação de Rock Clássico",
    pessoaId: "mamba",
    local: "Palco Alternativo"
  },
  {
    id: "palestra-giovanni",
    titulo: "Meteorologia para todos",
    tipo: "palestra",
    dia: "Sábado",
    data: "22/11/2025",
    horario: "14:40h às 16:10h",
    detalhes: "Aprenda sobre previsão do tempo para navegação",
    pessoaId: "giovanni-dolif",
    local: "Palco Principal"
  },
  {
    id: "show-maracatu",
    titulo: "Show Maracatu Tira Mofo",
    tipo: "show",
    dia: "Sábado",
    data: "22/11/2025",
    horario: "16:30h",
    detalhes: "Apresentação de Maracatu",
    pessoaId: "maracatu-tira-mofo",
    local: "Palco Alternativo"
  },
  {
    id: "palestra-velho-jack",
    titulo: "O que eu analiso em um veleiro antes de comprar!",
    tipo: "palestra",
    dia: "Sábado",
    data: "22/11/2025",
    horario: "16:20h às 17:50h",
    detalhes: "Dicas para escolha do primeiro veleiro",
    pessoaId: "velho-jack",
    local: "Palco Principal"
  },
  {
    id: "palestra-adriano",
    titulo: "Meteorologia para todos",
    tipo: "palestra",
    dia: "Sábado",
    data: "22/11/2025",
    horario: "18:00h às 19:30h",
    detalhes: "Experiências e histórias da navegação",
    pessoaId: "adriano-plotzki",
    local: "Palco Principal"
  },
  {
    id: "homenagem-amyr",
    titulo: "Homenagem Especial - Amyr Klink",
    tipo: "homenagem",
    dia: "Sábado",
    data: "22/11/2025",
    horario: "19:00h",
    detalhes: "Homenagem ao renomado navegador brasileiro",
    local: "Palco Principal"
  },
  {
    id: "show-dj-tugao",
    titulo: "DJ Tugão",
    tipo: "show",
    dia: "Sábado",
    data: "22/11/2025",
    horario: "20:00h",
    detalhes: "Apresentação musical de encerramento",
    pessoaId: "dj-tugao",
    local: "Palco Principal"
  },
  
  // DOMINGO - 23/11/2025
  {
    id: "palestra-chris",
    titulo: "ElaVela, escola de navegação oceânica para mulheres",
    tipo: "palestra",
    dia: "Domingo",
    data: "23/11/2025",
    horario: "10:00h",
    detalhes: "Velejadora e skipper com experiência internacional compartilha experiências",
    pessoaId: "chris-amaral",
    local: "Palco Principal"
  },
  {
    id: "regata-kids-domingo",
    titulo: "Regata Kids Jabaquara",
    tipo: "regata",
    dia: "Domingo",
    data: "23/11/2025",
    horario: "11:00h",
    detalhes: "Competição especial para jovens velejadores",
    local: "Praia do Jabaquara"
  },
  {
    id: "palestra-priscila",
    titulo: "Vida a Bordo",
    tipo: "palestra",
    dia: "Domingo",
    data: "23/11/2025",
    horario: "11:00h",
    detalhes: "Experiências de vida a bordo de um clássico de 53 pés",
    pessoaId: "priscila-claudio",
    local: "Palco Principal"
  },
  {
    id: "show-capitao-rock",
    titulo: "Show Capitão Rock",
    tipo: "show",
    dia: "Domingo",
    data: "23/11/2025",
    horario: "11:00h",
    detalhes: "Apresentação de Rock",
    pessoaId: "capitao-rock",
    local: "Palco Alternativo"
  },
  {
    id: "palestra-paulo",
    titulo: "Do Campo ao Mar",
    tipo: "palestra",
    dia: "Domingo",
    data: "23/11/2025",
    horario: "12:30h",
    detalhes: "Experiências de um velejador e skipper profissional",
    pessoaId: "paulo-rodrigo",
    local: "Palco Principal"
  },
  {
    id: "palestra-cecilia",
    titulo: "Homeschooling a Bordo",
    tipo: "palestra",
    dia: "Domingo",
    data: "23/11/2025",
    horario: "17:00h às 18:20h",
    detalhes: "Como educar crianças durante a vida no mar",
    pessoaId: "cecilia-fabio",
    local: "Palco Principal"
  },
  {
    id: "encerramento-festival",
    titulo: "Troféu Kids/Encerramento + Show Final",
    tipo: "encerramento",
    dia: "Domingo",
    data: "23/11/2025",
    horario: "15:00h",
    detalhes: "Premiação das competições infantis e show de encerramento",
    local: "Palco Principal"
  }
];// Funções auxiliares para buscar dados
export const getPessoaById = (id: string): Pessoa | undefined => {
  return pessoasFestival.find(pessoa => pessoa.id === id);
};

export const getAtividadesByDia = (dia: string): AtividadeFestival[] => {
  return atividadesFestival.filter(atividade => atividade.dia === dia);
};

export const getPalestrantes = (): Pessoa[] => {
  return pessoasFestival.filter(pessoa => pessoa.tipo === 'palestrante');
};

export const getAtracoes = (): Pessoa[] => {
  return pessoasFestival.filter(pessoa => pessoa.tipo === 'atracao');
};

// Funções avançadas para integração entre pessoas e atividades
export const getAtividadesByPessoa = (pessoaId: string): AtividadeFestival[] => {
  return atividadesFestival.filter(atividade => atividade.pessoaId === pessoaId);
};

export const getDiasProgramacao = (): string[] => {
  return [...new Set(atividadesFestival.map(atividade => atividade.dia))];
};

export const getAtividadesByTipo = (tipo: string): AtividadeFestival[] => {
  return atividadesFestival.filter(atividade => atividade.tipo === tipo);
};

export const getProgramacaoAgrupada = () => {
  const programacao: DiaProgramacao[] = [];
  
  // Agrupar por dia
  const diasUnicos = [...new Set(atividadesFestival.map(atividade => atividade.dia))];
  
  diasUnicos.forEach(dia => {
    const atividadesDoDia = atividadesFestival.filter(atividade => atividade.dia === dia);
    const data = atividadesDoDia.length > 0 ? atividadesDoDia[0].data : '';
    
    const eventos = atividadesDoDia.map(atividade => {
      return {
        horario: atividade.horario,
        evento: atividade.titulo,
        tipo: atividade.tipo,
        detalhes: atividade.detalhes
      };
    });
    
    programacao.push({
      dia,
      data,
      eventos
    });
  });
  
  return programacao;
};

// MANTER COMPATIBILIDADE COM CÓDIGO EXISTENTE
// Estas funções são para manter retrocompatibilidade enquanto migramos para o sistema unificado
export const palestrantes: Palestrante[] = getPalestrantes().map(pessoa => ({
  nome: pessoa.nome,
  especialidade: pessoa.especialidade,
  bio: pessoa.bio,
  instagram: pessoa.instagram,
  dia: getAtividadesByPessoa(pessoa.id)[0]?.dia || "",
  horario: getAtividadesByPessoa(pessoa.id)[0]?.horario || "",
  imagem: pessoa.imagem
}));

export const atracoes: Palestrante[] = getAtracoes().map(pessoa => ({
  nome: pessoa.nome,
  especialidade: pessoa.especialidade,
  bio: pessoa.bio,
  instagram: pessoa.instagram,
  dia: getAtividadesByPessoa(pessoa.id)[0]?.dia || "",
  horario: getAtividadesByPessoa(pessoa.id)[0]?.horario || "",
  imagem: pessoa.imagem
}));

// Use a função de agrupar dados para criar programação compatível com o formato antigo
export const programacao: DiaProgramacao[] = getProgramacaoAgrupada();

export const patrocinadores: Patrocinador[] = [
  { nome: "Patrocinador Master", logo: "", link: "https://instagram.com", nivel: "master" },
  { nome: "Patrocinador Ouro", logo: "", link: "https://instagram.com", nivel: "ouro" },
  { nome: "Patrocinador Prata", logo: "", link: "https://instagram.com", nivel: "prata" },
  { nome: "Patrocinador Bronze", logo: "", link: "https://instagram.com", nivel: "bronze" }
];

export const hospedagens: HospedagemData[] = [
  {
    nome: "Pousada Paraty Mirim",
    descricao: "Pousada charmosa com vista para o mar",
    desconto: "15% OFF",
    contato: "(24) 3371-1234",
    localizacao: "Centro Histórico"
  },
  {
    nome: "Hotel Solar do Rosário",
    descricao: "Hotel boutique no coração de Paraty",
    desconto: "20% OFF",
    contato: "(24) 3371-5678",
    localizacao: "Centro Histórico"
  },
  {
    nome: "Pousada do Ouro",
    descricao: "Ambiente acolhedor com café da manhã especial",
    desconto: "10% OFF",
    contato: "(24) 3371-9012",
    localizacao: "Próximo ao Porto"
  }
];

export const restaurantes: RestauranteData[] = [
  {
    nome: "Restaurante Banana da Terra",
    especialidade: "Culinária Regional",
    endereco: "Rua Dr. Samuel Costa, 198",
    telefone: "(24) 3371-1725",
    cardapio: "https://www.bananadaterra.com.br/cardapio"
  },
  {
    nome: "Quintal das Letras",
    especialidade: "Contemporânea",
    endereco: "Travessa das Flores, 1",
    telefone: "(24) 3371-1056",
    cardapio: "https://www.quintaldasletras.com.br/menu"
  },
  {
    nome: "Margarida Café",
    especialidade: "Café e Lanches",
    endereco: "Praça do Chafariz, 15",
    telefone: "(24) 3371-2441",
    cardapio: "https://www.margaridacafe.com.br/cardapio"
  }
];

export const faqItems: FAQData[] = [
  {
    pergunta: "Como faço para me inscrever na regata?",
    resposta: "As inscrições podem ser feitas através do formulário Google Forms disponível na seção de inscrições. Preencha todos os dados da embarcação e categoria, e tripulação. Após o cadastro, entraremos em contato para confirmação de pagamento."
  },
  {
    pergunta: "Qual é o endereço do evento?",
    resposta: "O evento acontecerá  no espaço do estacionamento ao lado do Hospital de Paraty Hugo Miranda, av. Nossa Senhora dos Remédios, Praia do Pontal."
  },
  {
    pergunta: "Há estacionamento disponível?",
    resposta: "Sim, há estacionamentos públicos e privados no centro histórico. Recomendamos chegar cedo devido à alta demanda."
  },
  {
    pergunta: "O evento é gratuito?",
    resposta: "Algumas atividades são gratuitas, como palestras específicas. Outras têm valores diferenciados. Consulte a programação para detalhes."
  },
  {
    pergunta: "Posso levar crianças?",
    resposta: "Sim! Temos atividades especiais para crianças, incluindo aulas de vela com o projeto Na Vela Paraty, com Bianca na praia do Jabaquara e a Regata Kids no Pontal."
  }
];
