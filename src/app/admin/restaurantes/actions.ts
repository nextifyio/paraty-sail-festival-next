'use server'

import { createSupabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAuthForAction } from '@/lib/auth-guard'

interface RestauranteFormData {
  nome: string
  especialidade: string
  endereco: string
  telefone: string
  cardapio?: string
  ativo?: boolean
}

export async function createRestaurante(formData: FormData) {
  try {
    // ✅ Verificar autenticação
    const authResult = await requireAuthForAction()
    if (!authResult.isAuthenticated) {
      throw new Error(authResult.error || 'Não autorizado')
    }

    const supabase = createSupabaseAdmin()

    // Extrair campos do formulário
    const nome = formData.get('nome') as string
    const especialidade = formData.get('especialidade') as string
    const endereco = formData.get('endereco') as string
    const telefone = formData.get('telefone') as string
    const cardapio = formData.get('cardapio') as string

    // Validar campos obrigatórios
    if (!nome || nome.trim() === '') {
      throw new Error('Nome é obrigatório')
    }

    if (!especialidade || especialidade.trim() === '') {
      throw new Error('Especialidade é obrigatória')
    }

    if (!endereco || endereco.trim() === '') {
      throw new Error('Endereço é obrigatório')
    }

    if (!telefone || telefone.trim() === '') {
      throw new Error('Telefone é obrigatório')
    }

    // Dados para inserção
    const insertData: RestauranteFormData = {
      nome: nome.trim(),
      especialidade: especialidade.trim(),
      endereco: endereco.trim(),
      telefone: telefone.trim(),
      cardapio: cardapio?.trim() || undefined,
      ativo: true
    }

    const { error } = await supabase
      .from('restaurantes')
      .insert([insertData])

    if (error) {
      console.error('Erro ao criar restaurante:', error)
      throw new Error('Erro ao criar restaurante')
    }

    revalidatePath('/admin/restaurantes')
  } catch (error) {
    console.error('Error creating restaurante:', error)
    throw error
  }

  redirect('/admin/restaurantes')
}

export async function updateRestaurante(id: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    // ✅ Verificar autenticação
    const authResult = await requireAuthForAction()
    if (!authResult.isAuthenticated) {
      return { success: false, error: authResult.error || 'Não autorizado' }
    }

    const supabase = createSupabaseAdmin()

    // Extrair campos do formulário
    const nome = formData.get('nome') as string
    const especialidade = formData.get('especialidade') as string
    const endereco = formData.get('endereco') as string
    const telefone = formData.get('telefone') as string
    const cardapio = formData.get('cardapio') as string
    const ativo = formData.get('ativo') === 'true'

    // Validar campos obrigatórios
    if (!nome || nome.trim() === '') {
      return { 
        success: false, 
        error: 'Nome é obrigatório'
      }
    }

    if (!especialidade || especialidade.trim() === '') {
      return { 
        success: false, 
        error: 'Especialidade é obrigatória'
      }
    }

    if (!endereco || endereco.trim() === '') {
      return { 
        success: false, 
        error: 'Endereço é obrigatório'
      }
    }

    if (!telefone || telefone.trim() === '') {
      return { 
        success: false, 
        error: 'Telefone é obrigatório'
      }
    }

    // Dados para atualização
    const updateData: RestauranteFormData = {
      nome: nome.trim(),
      especialidade: especialidade.trim(),
      endereco: endereco.trim(),
      telefone: telefone.trim(),
      cardapio: cardapio?.trim() || undefined,
      ativo: ativo
    }

    const { error } = await supabase
      .from('restaurantes')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Erro ao atualizar restaurante:', error)
      return { 
        success: false, 
        error: error.message || 'Erro ao atualizar restaurante'
      }
    }

    revalidatePath('/admin/restaurantes')
    revalidatePath(`/admin/restaurantes/${id}`)

    return { success: true }
  } catch (error) {
    console.error('Error updating restaurante:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    }
  }
}

export async function deleteRestaurante(id: string) {
  try {
    // ✅ Verificar autenticação
    const authResult = await requireAuthForAction()
    if (!authResult.isAuthenticated) {
      return { success: false, error: authResult.error || 'Não autorizado' }
    }

    const supabase = createSupabaseAdmin()

    const { error } = await supabase
      .from('restaurantes')
      .update({ 
        ativo: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) {
      throw error
    }

    revalidatePath('/admin/restaurantes')

    return { success: true }
  } catch (error) {
    console.error('Error deleting restaurante:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    }
  }
}