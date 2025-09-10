import {
  Palestrante,
  DiaProgramacao,
  Patrocinador,
  Hospedagem,
  Restaurante,
  FAQ
} from '@/types';

export const palestrantes: Palestrante[] = [
  // {
  //   nome: "Amyr Klink",
  //   especialidade: "Navegador e Explorador",
  //   bio: "Homenagem especial ao maior navegador brasileiro",
  //   dia: "Sábado",
  //   horario: "19:00h"
  // },
  {
    nome: "Charles Flesch",
    especialidade: "Especialista em Vela",
    bio: "Palestrante renomado no mundo náutico",
    dia: "Sábado",
    horario: "11:00h"
  },
  {
    nome: "Dalminho",
    especialidade: "Barcos tradicionais no Brasil",
    bio: "Especialista em diferentes tipos de veleiros pelo Brasil",
    dia: "Sábado",
    horario: "13:00h"
  },
  {
    nome: "Ricardo e Fernanda Eleutheria",
    especialidade: "Iniciação na Vela",
    bio: "Como iniciar na vela e tirar o Arrais",
    dia: "Quinta",
    horario: "13:00h"
  },
  {
    nome: "Velho Jack",
    especialidade: "Primeiro Veleiro",
    bio: "Como avaliar seu primeiro veleiro",
    dia: "Sábado",
    horario: "16:30h"
  },
  {
    nome: "Cecília Veleiro Planckton",
    especialidade: "Homeschooling a Bordo",
    bio: "Crescer no mar: Educação e vida a bordo.",
    dia: "Domingo",
    horario: "11:00h"
  },
  {
    nome: "Carla Lopes Veleiro Andorinha",
    especialidade: "",
    bio: "Os erros que cometi na reforma do meu veleiro.",
    dia: "??",
    horario: "??"
  },
  {
    nome: "Giovanni Dolif Hashtag.ceu",
    especialidade: "Meteorologia para todos",
    bio: "",
    dia: "??",
    horario: "??"
  },
  {
    nome: "Adriano Plotzki Hasthtag Sal",
    especialidade: "Meteorologia para todos",
    bio: "Sem Paraty, não existiria #sal",
    dia: "??",
    horario: "??"
  },
  {
    nome: "Marcelo Anjos do Mar",
    especialidade: "Meteorologia para todos",
    bio: "Como funcionam os equipamentos de salvatagem.",
    dia: "??",
    horario: "??"
  },
  {
    nome: "Priscila/Cláudio e Noah Beijupira",
    especialidade: "Vida a Bordo",
    bio: "",
    dia: "??",
    horario: "??"
  }
];

export const atracoes: Palestrante[] = [

  {
    nome: "Mar Virado",
    especialidade: "Surf Music",
    bio: "@surflaskera",
    dia: "Sábado",
    horario: "11:00h"
  },
  {
    nome: "Mamba",
    especialidade: "Rock Clássico",
    bio: "@aaa",
    dia: "Sábado",
    horario: "13:00h"
  },
  {
    nome: "Mundiá Carimbó",
    especialidade: "Carimbó",
    bio: "",
    dia: "Quinta",
    horario: "13:00h"
  },
  {
    nome: "Maracatu Tira Mofo",
    especialidade: "Maracatu",
    bio: "",
    dia: "Sábado",
    horario: "16:30h"
  },
  {
    nome: "Capitão Rock",
    especialidade: "Rock",
    bio: "",
    dia: "Domingo",
    horario: "11:00h"
  },
  {
    nome: "Leonidas",
    especialidade: "Ciranda os Caiçaras",
    bio: "",
    dia: "??",
    horario: "??"
  },
  {
    nome: "DJ Tugão",
    especialidade: "",
    bio: "",
    dia: "??",
    horario: "??"
  }
];

export const programacao: DiaProgramacao[] = [
  {
    dia: "Quinta-feira",
    data: "20/11/2025",
    eventos: [
      { horario: "10:00h", evento: "Abertura do Festival", tipo: "abertura", detalhes: "Cerimônia oficial de abertura do festival" },
      { horario: "11:00h", evento: "Palestra no Palco Principal", tipo: "palestra", detalhes: "Palestra de boas-vindas aos participantes" },
      { horario: "13:00h", evento: "Palestra com Ricardo Eleutheria - Iniciando na Vela", tipo: "palestra", detalhes: "Aprenda os primeiros passos para começar na vela" },
      { horario: "15:00h", evento: "Corrida de Bote no Rio + Show de Banda Local", tipo: "competicao", detalhes: "Competição tradicional de botes com música ao vivo" },
      { horario: "17:00h", evento: "1º Socorros e Comissão de Regata Anjos do Mar", tipo: "workshop", detalhes: "Workshop prático sobre segurança no mar" },
      { horario: "19:00h", evento: "Show Musical", tipo: "show", detalhes: "Show com artistas locais" }
    ]
  },
  {
    dia: "Sexta-feira",
    data: "21/11/2025",
    eventos: [
      { horario: "10:00h", evento: "Concentração da Regata", tipo: "regata", detalhes: "Concentração das embarcações para a regata principal" },
      { horario: "11:00h", evento: "Largada da Regata Principal", tipo: "regata", detalhes: "Início oficial da regata principal do festival" },
      { horario: "11:00h", evento: "Regata Kids no Jabaquara", tipo: "kids", detalhes: "Competição especial para crianças na Praia do Jabaquara" },
      { horario: "13:00h", evento: "Ciranda / Maracatu", tipo: "cultura", detalhes: "Apresentação de danças tradicionais da região" },
      { horario: "16:30h", evento: "Chegada da Regata", tipo: "regata", detalhes: "Chegada prevista das embarcações da regata principal" },
      { horario: "18:00h", evento: "Entrega de Troféus", tipo: "premiacao", detalhes: "Cerimônia de premiação dos vencedores da regata" },
      { horario: "20:00h", evento: "Show Musical", tipo: "show", detalhes: "Apresentação musical de encerramento do dia" }
    ]
  },
  {
    dia: "Sábado",
    data: "22/11/2025",
    eventos: [
      { horario: "11:00h", evento: "Palestra com Charles Flesch", tipo: "palestra", detalhes: "Palestra sobre experiências e conhecimentos na vela" },
      { horario: "13:00h", evento: "Palestra com Dalminho - Tipos de Veleiros", tipo: "palestra", detalhes: "Conheça os diferentes tipos de embarcações" },
      { horario: "15:00h", evento: "Palestra #Céu - Meteorologia na Prática", tipo: "palestra", detalhes: "Aprenda sobre previsão do tempo para navegação" },
      { horario: "16:30h", evento: "Palestra com Velho Jack - 1º Veleiro", tipo: "palestra", detalhes: "Dicas para escolha do primeiro veleiro" },
      { horario: "17:30h", evento: "Palestra com #sal", tipo: "palestra", detalhes: "Experiências e histórias da navegação" },
      { horario: "19:00h", evento: "Homenagem Especial - Amyr Klink", tipo: "homenagem", detalhes: "Homenagem ao renomado navegador brasileiro" },
      { horario: "20:00h", evento: "Show Musical", tipo: "show", detalhes: "Apresentação musical de encerramento" }
    ]
  },
  {
    dia: "Domingo",
    data: "23/11/2025",
    eventos: [
      { horario: "11:00h", evento: "Regata Kids Jabaquara", tipo: "regata", detalhes: "Competição especial para jovens velejadores" },
      { horario: "11:00h", evento: "Palestra com Cecília - Homeschooling a Bordo", tipo: "palestra", detalhes: "Como educar crianças durante a vida no mar" },
      { horario: "13:00h", evento: "Palestra com Carla - Como Reformar seu Veleiro", tipo: "palestra", detalhes: "Dicas práticas para reforma de embarcações" },
      { horario: "15:00h", evento: "Troféu Kids/Encerramento + Show Mar Virado", tipo: "encerramento", detalhes: "Premiação das competições infantis e show de encerramento" }
    ]
  }
];

export const patrocinadores: Patrocinador[] = [
  { nome: "Patrocinador Master", logo: "", link: "https://instagram.com", nivel: "master" },
  { nome: "Patrocinador Ouro", logo: "", link: "https://instagram.com", nivel: "ouro" },
  { nome: "Patrocinador Prata", logo: "", link: "https://instagram.com", nivel: "prata" },
  { nome: "Patrocinador Bronze", logo: "", link: "https://instagram.com", nivel: "bronze" }
];

export const hospedagens: Hospedagem[] = [
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

export const restaurantes: Restaurante[] = [
  {
    nome: "Restaurante Banana da Terra",
    especialidade: "Culinária Regional",
    endereco: "Rua Dr. Samuel Costa, 198",
    telefone: "(24) 3371-1725"
  },
  {
    nome: "Quintal das Letras",
    especialidade: "Contemporânea",
    endereco: "Travessa das Flores, 1",
    telefone: "(24) 3371-1056"
  },
  {
    nome: "Margarida Café",
    especialidade: "Café e Lanches",
    endereco: "Praça do Chafariz, 15",
    telefone: "(24) 3371-2441"
  }
];

export const faqItems: FAQ[] = [
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
