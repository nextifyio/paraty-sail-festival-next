export interface Pessoa {
  id: string;
  nome: string;
  especialidade: string;
  bio: string;
  instagram: string;
  imagem?: string;
  tipo: 'palestrante' | 'atracao';
  ativo?: boolean; // Optional for local data, required for database
  created_at?: string;
  updated_at?: string;
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
  ativo?: boolean; // Optional for local data, required for database
  created_at?: string;
  updated_at?: string;
}

// Interface para atividades com dados da pessoa relacionada (do Supabase)
export interface AtividadeFestivalComPessoa extends AtividadeFestival {
  pessoa?: {
    nome: string;
    tipo: 'palestrante' | 'atracao';
  } | null;
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
  pessoa?: string; // Nome da pessoa responsável pela atividade
}

export interface DiaProgramacao {
  dia: string;
  data: string;
  eventos: Evento[];
}

export interface Patrocinador {
  id: string;
  nome: string;
  logo: string;
  link: string;
  nivel: 'master' | 'ouro' | 'prata' | 'bronze';
  ativo?: boolean; // Optional for local data, required for database
  created_at?: string;
  updated_at?: string;
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
  ativo?: boolean; // Optional for local data, required for database
  created_at?: string;
  updated_at?: string;
}

export interface Restaurante {
  id: string;
  nome: string;
  especialidade: string;
  endereco: string;
  telefone: string;
  cardapio?: string;
  ativo?: boolean; // Optional for local data, required for database
  created_at?: string;
  updated_at?: string;
}

export interface FAQ {
  id: string;
  pergunta: string;
  resposta: string;
  ordem?: number;
  ativo?: boolean; // Optional for local data, required for database
  created_at?: string;
  updated_at?: string;
}

// Tipos para inscrições da regata
export type CategoriaRegata = 
  | 'Força Livre: Barcos com medição IRC, ORC, RGS, barcos One Design e ou + 40 pés'
  | 'Aço: Barcos de cruzeiro com casco de aço / restrição de tamanho'
  | 'Clássicos: Barcos de projeto clássico ou com data de construção anterior 1975'
  | 'Cruzeiro 18: Barcos de até 22,9 pés.'
  | 'Cruzeiro 23: Barcos de 23 a 26,9 pés.'
  | 'Cruzeiro 27: Barcos de 27 a 31,9 pés.'
  | 'Cruzeiro 32: Barcos de 32 a 35,9 pés.'
  | 'Cruzeiro 36: Barcos de 36 a 39,9 pés.';

export type StatusInscricao = 'pendente' | 'confirmada' | 'cancelada';

export interface Inscricao {
  id: string;
  // Dados do responsável
  email: string;
  nome_comandante: string;
  telefone_comandante: string;
  
  // Dados da embarcação
  nome_barco: string;
  clube_marina?: string;
  modelo_barco_tamanho: string;
  categoria: CategoriaRegata;
  
  // Tripulação
  lista_tripulantes: string;
  
  // Contato de emergência
  nome_contato_emergencia: string;
  telefone_contato_emergencia: string;
  
  // Comprovante e declaração
  comprovante_pix_url?: string;
  aceita_termos: boolean;
  
  // Status e controle
  status: StatusInscricao;
  data_inscricao: string;
  valor_total: number;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

// Tipo para dados do formulário de inscrição (antes de salvar)
export interface InscricaoForm {
  email: string;
  nome_comandante: string;
  telefone_comandante: string;
  nome_barco: string;
  clube_marina?: string;
  modelo_barco_tamanho: string;
  categoria: CategoriaRegata;
  lista_tripulantes: string;
  nome_contato_emergencia: string;
  telefone_contato_emergencia: string;
  comprovante_pix?: File;
  aceita_termos: boolean;
}
