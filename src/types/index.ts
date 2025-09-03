export interface Palestrante {
  nome: string;
  especialidade: string;
  bio: string;
  dia: string;
  horario: string;
}

export interface Evento {
  horario: string;
  evento: string;
  tipo: string;
  detalhes: string;
}

export interface DiaProgramacao {
  dia: string;
  data: string;
  eventos: Evento[];
}

export interface Patrocinador {
  nome: string;
  logo: string;
  link: string;
  nivel: 'master' | 'ouro' | 'prata' | 'bronze';
}

export interface Hospedagem {
  nome: string;
  descricao: string;
  desconto: string;
  contato: string;
  localizacao: string;
}

export interface Restaurante {
  nome: string;
  especialidade: string;
  endereco: string;
  telefone: string;
}

export interface FAQ {
  pergunta: string;
  resposta: string;
}
