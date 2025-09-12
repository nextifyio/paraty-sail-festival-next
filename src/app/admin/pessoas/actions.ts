'use server'

import { createSupabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function createPessoa(formData: FormData) {
  const supabase = createSupabaseAdmin()

  const ativo = formData.get('ativo') === 'on' || formData.get('ativo') === 'true' || true

  const data = {
    nome: formData.get('nome') as string,
    especialidade: formData.get('especialidade') as string,
    bio: formData.get('bio') as string,
    instagram: formData.get('instagram') as string,
    imagem: formData.get('imagem') as string || null,
    tipo: formData.get('tipo') as 'palestrante' | 'atracao',
    ativo: ativo,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  const { error } = await supabase
    .from('pessoas_festival')
    .insert([data])

  if (error) {
    console.error('Erro ao criar pessoa:', error)
    return { success: false, error: 'Erro ao criar pessoa' }
  }

  revalidatePath('/admin/pessoas')
  return { success: true, message: 'Participante criado com sucesso!' }
}

export async function updatePessoa(id: string, formData: FormData) {
  const supabase = createSupabaseAdmin()

  const ativo = formData.get('ativo') === 'on' || formData.get('ativo') === 'true'

  const data = {
    nome: formData.get('nome') as string,
    especialidade: formData.get('especialidade') as string,
    bio: formData.get('bio') as string,
    instagram: formData.get('instagram') as string,
    imagem: formData.get('imagem') as string || null,
    tipo: formData.get('tipo') as 'palestrante' | 'atracao',
    ativo: ativo,
    updated_at: new Date().toISOString()
  }

  const { error } = await supabase
    .from('pessoas_festival')
    .update(data)
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar pessoa:', error)
    return { success: false, error: 'Erro ao atualizar pessoa' }
  }

  revalidatePath('/admin/pessoas')
  return { success: true, message: 'Participante atualizado com sucesso!' }
}