'use server'

import { createSupabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAuthForAction } from '@/lib/auth-guard'

export async function createFAQ(formData: FormData) {
  try {
    // ✅ Verificar autenticação
    const authResult = await requireAuthForAction()
    if (!authResult.isAuthenticated) {
      throw new Error(authResult.error || 'Não autorizado')
    }

    const supabase = createSupabaseAdmin()

    // Extrair campos do formulário
    const pergunta = formData.get('pergunta') as string
    const resposta = formData.get('resposta') as string
    const ordem = parseInt(formData.get('ordem') as string) || 0

    // Validar campos obrigatórios
    if (!pergunta || pergunta.trim() === '') {
      throw new Error('Pergunta é obrigatória')
    }

    if (!resposta || resposta.trim() === '') {
      throw new Error('Resposta é obrigatória')
    }

    // Dados para inserção
    const insertData = {
      pergunta: pergunta.trim(),
      resposta: resposta.trim(),
      ordem: ordem,
      ativo: true
    }

    const { error } = await supabase
      .from('faqs')
      .insert([insertData])

    if (error) {
      console.error('Erro ao criar FAQ:', error)
      throw new Error('Erro ao criar FAQ')
    }

    revalidatePath('/admin/faqs')
  } catch (error) {
    console.error('Error creating FAQ:', error)
    throw error
  }

  redirect('/admin/faqs')
}

export async function updateFAQ(id: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    // ✅ Verificar autenticação
    const authResult = await requireAuthForAction()
    if (!authResult.isAuthenticated) {
      return { success: false, error: authResult.error || 'Não autorizado' }
    }

    const supabase = createSupabaseAdmin()

    // Extrair campos do formulário
    const pergunta = formData.get('pergunta') as string
    const resposta = formData.get('resposta') as string
    const ordem = parseInt(formData.get('ordem') as string) || 0
    const ativo = formData.get('ativo') === 'true'

    // Validar campos obrigatórios
    if (!pergunta || pergunta.trim() === '') {
      return { 
        success: false, 
        error: 'Pergunta é obrigatória'
      }
    }

    if (!resposta || resposta.trim() === '') {
      return { 
        success: false, 
        error: 'Resposta é obrigatória'
      }
    }

    // Dados para atualização
    const updateData = {
      pergunta: pergunta.trim(),
      resposta: resposta.trim(),
      ordem: ordem,
      ativo: ativo,
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('faqs')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Erro ao atualizar FAQ:', error)
      return { 
        success: false, 
        error: error.message || 'Erro ao atualizar FAQ'
      }
    }

    revalidatePath('/admin/faqs')
    revalidatePath(`/admin/faqs/${id}`)

    return { success: true }
  } catch (error) {
    console.error('Error updating FAQ:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    }
  }
}

export async function deleteFAQ(id: string) {
  try {
    // ✅ Verificar autenticação
    const authResult = await requireAuthForAction()
    if (!authResult.isAuthenticated) {
      return { success: false, error: authResult.error || 'Não autorizado' }
    }

    const supabase = createSupabaseAdmin()

    const { error } = await supabase
      .from('faqs')
      .update({ 
        ativo: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) {
      throw error
    }

    revalidatePath('/admin/faqs')

    return { success: true }
  } catch (error) {
    console.error('Error deleting FAQ:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    }
  }
}