'use server'

import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Tipos para formulários
interface PessoaFormData {
  nome: string
  especialidade: string
  bio: string
  instagram: string
  imagem?: string
  tipo: 'palestrante' | 'atracao'
}

interface AtividadeFormData {
  titulo: string
  tipo: string
  dia: string
  data: string
  horario: string
  detalhes: string
  local?: string
  pessoa_id?: string
}

interface PatrocinadorFormData {
  nome: string
  logo?: string
  link?: string
  nivel: 'master' | 'ouro' | 'prata' | 'bronze'
}

interface HospedagemFormData {
  nome: string
  descricao: string
  desconto?: string
  contato: string
  localizacao: string
}

interface RestauranteFormData {
  nome: string
  especialidade: string
  endereco: string
  telefone: string
  cardapio?: string
}

interface FAQFormData {
  pergunta: string
  resposta: string
  ordem: number
}

// CRUD Pessoas
export async function createPessoa(formData: FormData) {
  const supabase = await createClient()

  const data: PessoaFormData = {
    nome: formData.get('nome') as string,
    especialidade: formData.get('especialidade') as string,
    bio: formData.get('bio') as string,
    instagram: formData.get('instagram') as string,
    imagem: formData.get('imagem') as string || undefined,
    tipo: formData.get('tipo') as 'palestrante' | 'atracao'
  }

  const { error } = await supabase
    .from('pessoas_festival')
    .insert([data])

  if (error) {
    console.error('Erro ao criar pessoa:', error)
    throw new Error('Erro ao criar pessoa')
  }

  revalidatePath('/admin/pessoas')
  redirect('/admin/pessoas')
}

export async function updatePessoa(id: string, formData: FormData) {
  const supabase = await createClient()

  const data: PessoaFormData = {
    nome: formData.get('nome') as string,
    especialidade: formData.get('especialidade') as string,
    bio: formData.get('bio') as string,
    instagram: formData.get('instagram') as string,
    imagem: formData.get('imagem') as string || undefined,
    tipo: formData.get('tipo') as 'palestrante' | 'atracao'
  }

  const { error } = await supabase
    .from('pessoas_festival')
    .update(data)
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar pessoa:', error)
    throw new Error('Erro ao atualizar pessoa')
  }

  revalidatePath('/admin/pessoas')
  redirect('/admin/pessoas')
}

export async function deletePessoa(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('pessoas_festival')
    .update({ ativo: false })
    .eq('id', id)

  if (error) {
    console.error('Erro ao deletar pessoa:', error)
    throw new Error('Erro ao deletar pessoa')
  }

  revalidatePath('/admin/pessoas')
}

// CRUD Atividades
export async function createAtividade(formData: FormData) {
  const supabase = await createClient()

  const data: AtividadeFormData = {
    titulo: formData.get('titulo') as string,
    tipo: formData.get('tipo') as string,
    dia: formData.get('dia') as string,
    data: formData.get('data') as string,
    horario: formData.get('horario') as string,
    detalhes: formData.get('detalhes') as string,
    local: formData.get('local') as string || undefined,
    pessoa_id: formData.get('pessoa_id') as string || undefined
  }

  const { error } = await supabase
    .from('atividades_festival')
    .insert([data])

  if (error) {
    console.error('Erro ao criar atividade:', error)
    throw new Error('Erro ao criar atividade')
  }

  revalidatePath('/admin/atividades')
  redirect('/admin/atividades')
}

export async function updateAtividade(id: string, formData: FormData) {
  const supabase = await createClient()

  const data: AtividadeFormData = {
    titulo: formData.get('titulo') as string,
    tipo: formData.get('tipo') as string,
    dia: formData.get('dia') as string,
    data: formData.get('data') as string,
    horario: formData.get('horario') as string,
    detalhes: formData.get('detalhes') as string,
    local: formData.get('local') as string || undefined,
    pessoa_id: formData.get('pessoa_id') as string || undefined
  }

  const { error } = await supabase
    .from('atividades_festival')
    .update(data)
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar atividade:', error)
    throw new Error('Erro ao atualizar atividade')
  }

  revalidatePath('/admin/atividades')
  redirect('/admin/atividades')
}

export async function deleteAtividade(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('atividades_festival')
    .update({ ativo: false })
    .eq('id', id)

  if (error) {
    console.error('Erro ao deletar atividade:', error)
    throw new Error('Erro ao deletar atividade')
  }

  revalidatePath('/admin/atividades')
}

// CRUD Patrocinadores
export async function createPatrocinador(formData: FormData) {
  const supabase = await createClient()

  const data: PatrocinadorFormData = {
    nome: formData.get('nome') as string,
    logo: formData.get('logo') as string || undefined,
    link: formData.get('link') as string || undefined,
    nivel: formData.get('nivel') as 'master' | 'ouro' | 'prata' | 'bronze'
  }

  const { error } = await supabase
    .from('patrocinadores')
    .insert([data])

  if (error) {
    console.error('Erro ao criar patrocinador:', error)
    throw new Error('Erro ao criar patrocinador')
  }

  revalidatePath('/admin/patrocinadores')
  redirect('/admin/patrocinadores')
}

export async function updatePatrocinador(id: string, formData: FormData) {
  const supabase = await createClient()

  const data: PatrocinadorFormData = {
    nome: formData.get('nome') as string,
    logo: formData.get('logo') as string || undefined,
    link: formData.get('link') as string || undefined,
    nivel: formData.get('nivel') as 'master' | 'ouro' | 'prata' | 'bronze'
  }

  const { error } = await supabase
    .from('patrocinadores')
    .update(data)
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar patrocinador:', error)
    throw new Error('Erro ao atualizar patrocinador')
  }

  revalidatePath('/admin/patrocinadores')
  redirect('/admin/patrocinadores')
}

export async function deletePatrocinador(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('patrocinadores')
    .update({ ativo: false })
    .eq('id', id)

  if (error) {
    console.error('Erro ao deletar patrocinador:', error)
    throw new Error('Erro ao deletar patrocinador')
  }

  revalidatePath('/admin/patrocinadores')
}

// CRUD Hospedagens
export async function createHospedagem(formData: FormData) {
  const supabase = await createClient()

  const data: HospedagemFormData = {
    nome: formData.get('nome') as string,
    descricao: formData.get('descricao') as string,
    desconto: formData.get('desconto') as string || undefined,
    contato: formData.get('contato') as string,
    localizacao: formData.get('localizacao') as string
  }

  const { error } = await supabase
    .from('hospedagens')
    .insert([data])

  if (error) {
    console.error('Erro ao criar hospedagem:', error)
    throw new Error('Erro ao criar hospedagem')
  }

  revalidatePath('/admin/hospedagens')
  redirect('/admin/hospedagens')
}

export async function updateHospedagem(id: string, formData: FormData) {
  const supabase = await createClient()

  const data: HospedagemFormData = {
    nome: formData.get('nome') as string,
    descricao: formData.get('descricao') as string,
    desconto: formData.get('desconto') as string || undefined,
    contato: formData.get('contato') as string,
    localizacao: formData.get('localizacao') as string
  }

  const { error } = await supabase
    .from('hospedagens')
    .update(data)
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar hospedagem:', error)
    throw new Error('Erro ao atualizar hospedagem')
  }

  revalidatePath('/admin/hospedagens')
  redirect('/admin/hospedagens')
}

export async function deleteHospedagem(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('hospedagens')
    .update({ ativo: false })
    .eq('id', id)

  if (error) {
    console.error('Erro ao deletar hospedagem:', error)
    throw new Error('Erro ao deletar hospedagem')
  }

  revalidatePath('/admin/hospedagens')
}

// CRUD Restaurantes
export async function createRestaurante(formData: FormData) {
  const supabase = await createClient()

  const data: RestauranteFormData = {
    nome: formData.get('nome') as string,
    especialidade: formData.get('especialidade') as string,
    endereco: formData.get('endereco') as string,
    telefone: formData.get('telefone') as string,
    cardapio: formData.get('cardapio') as string || undefined
  }

  const { error } = await supabase
    .from('restaurantes')
    .insert([data])

  if (error) {
    console.error('Erro ao criar restaurante:', error)
    throw new Error('Erro ao criar restaurante')
  }

  revalidatePath('/admin/restaurantes')
  redirect('/admin/restaurantes')
}

export async function updateRestaurante(id: string, formData: FormData) {
  const supabase = await createClient()

  const data: RestauranteFormData = {
    nome: formData.get('nome') as string,
    especialidade: formData.get('especialidade') as string,
    endereco: formData.get('endereco') as string,
    telefone: formData.get('telefone') as string,
    cardapio: formData.get('cardapio') as string || undefined
  }

  const { error } = await supabase
    .from('restaurantes')
    .update(data)
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar restaurante:', error)
    throw new Error('Erro ao atualizar restaurante')
  }

  revalidatePath('/admin/restaurantes')
  redirect('/admin/restaurantes')
}

export async function deleteRestaurante(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('restaurantes')
    .update({ ativo: false })
    .eq('id', id)

  if (error) {
    console.error('Erro ao deletar restaurante:', error)
    throw new Error('Erro ao deletar restaurante')
  }

  revalidatePath('/admin/restaurantes')
}

// CRUD FAQs
export async function createFAQ(formData: FormData) {
  const supabase = await createClient()

  const data: FAQFormData = {
    pergunta: formData.get('pergunta') as string,
    resposta: formData.get('resposta') as string,
    ordem: parseInt(formData.get('ordem') as string) || 0
  }

  const { error } = await supabase
    .from('faqs')
    .insert([data])

  if (error) {
    console.error('Erro ao criar FAQ:', error)
    throw new Error('Erro ao criar FAQ')
  }

  revalidatePath('/admin/faqs')
  redirect('/admin/faqs')
}

export async function updateFAQ(id: string, formData: FormData) {
  const supabase = await createClient()

  const data: FAQFormData = {
    pergunta: formData.get('pergunta') as string,
    resposta: formData.get('resposta') as string,
    ordem: parseInt(formData.get('ordem') as string) || 0
  }

  const { error } = await supabase
    .from('faqs')
    .update(data)
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar FAQ:', error)
    throw new Error('Erro ao atualizar FAQ')
  }

  revalidatePath('/admin/faqs')
  redirect('/admin/faqs')
}

export async function deleteFAQ(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('faqs')
    .update({ ativo: false })
    .eq('id', id)

  if (error) {
    console.error('Erro ao deletar FAQ:', error)
    throw new Error('Erro ao deletar FAQ')
  }

  revalidatePath('/admin/faqs')
}