export interface Pessoa {
  id: string;
  nome: string;
  especialidade: string;
  bio: string;
  instagram: string;
  imagem?: string;
  tipo: 'palestrante' | 'atracao';
}

export interface AtividadeFestival {
  id: string;
  titulo: string;
  tipo: 'palestra' | 'show' | 'workshop' | 'competicao' | 'regata' | 'cultura' | 'premiacao' | 'abertura' | 'encerramento' | 'homenagem' | 'kids';
  dia: string;
  data: string;
  horario: string;
  detalhes: string;
  pessoaId?: string; // Referência para o objeto Pessoa
  local?: string;
}

export interface Palestrante {
  nome: string;
  especialidade: string;
  bio: string;
  instagram: string;
  dia: string;
  horario: string;
  imagem?: string;
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

// Tipos para dados constantes (sem campos de banco)
export interface HospedagemData {
  nome: string;
  descricao: string;
  desconto?: string;
  contato: string;
  localizacao: string;
}

export interface RestauranteData {
  nome: string;
  especialidade: string;
  endereco: string;
  telefone: string;
  cardapio?: string;
}

export interface FAQData {
  pergunta: string;
  resposta: string;
}

// Tipos para dados do banco (com campos completos)
export interface Hospedagem {
  id: string;
  nome: string;
  descricao: string;
  desconto?: string;
  contato: string;
  localizacao: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Restaurante {
  id: string;
  nome: string;
  especialidade: string;
  endereco: string;
  telefone: string;
  cardapio?: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  pergunta: string;
  resposta: string;
  ordem: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}
