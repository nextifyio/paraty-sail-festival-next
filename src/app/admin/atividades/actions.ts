'use server'

import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createAtividade(formData: FormData) {
  try {
    const supabase = await createClient()

    // Extrair campos do formulário
    const titulo = formData.get('titulo') as string
    const tipo = formData.get('tipo') as string
    const dia = formData.get('dia') as string
    const data = formData.get('data') as string
    const horario = formData.get('horario') as string
    const detalhes = formData.get('detalhes') as string
    const local = formData.get('local') as string
    const pessoaId = formData.get('pessoa_id') as string

    // Validar campos obrigatórios
    if (!titulo || titulo.trim() === '') {
      throw new Error('Título é obrigatório')
    }

    if (!tipo || tipo.trim() === '') {
      throw new Error('Tipo é obrigatório')
    }

    if (!dia || dia.trim() === '') {
      throw new Error('Dia é obrigatório')
    }

    if (!data || data.trim() === '') {
      throw new Error('Data é obrigatória')
    }

    if (!horario || horario.trim() === '') {
      throw new Error('Horário é obrigatório')
    }

    if (!detalhes || detalhes.trim() === '') {
      throw new Error('Detalhes são obrigatórios')
    }

    // Dados para inserção
    const insertData = {
      titulo: titulo.trim(),
      tipo: tipo.trim(),
      dia: dia.trim(),
      data: data.trim(),
      horario: horario.trim(),
      detalhes: detalhes.trim(),
      local: local?.trim() || null,
      pessoa_id: pessoaId?.trim() || null,
      ativo: true
    }

    const { error } = await supabase
      .from('atividades_festival')
      .insert([insertData])

    if (error) {
      console.error('Erro ao criar atividade:', error)
      throw new Error('Erro ao criar atividade')
    }

    revalidatePath('/admin/atividades')
  } catch (error) {
    console.error('Error creating atividade:', error)
    throw error
  }

  redirect('/admin/atividades')
}

export async function updateAtividade(id: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient()

    // Extrair campos do formulário
    const titulo = formData.get('titulo') as string
    const tipo = formData.get('tipo') as string
    const dia = formData.get('dia') as string
    const data = formData.get('data') as string
    const horario = formData.get('horario') as string
    const detalhes = formData.get('detalhes') as string
    const local = formData.get('local') as string
    const pessoaId = formData.get('pessoa_id') as string
    const ativo = formData.get('ativo') === 'true'

    // Validar campos obrigatórios
    if (!titulo || titulo.trim() === '') {
      return { 
        success: false, 
        error: 'Título é obrigatório'
      }
    }

    if (!tipo || tipo.trim() === '') {
      return { 
        success: false, 
        error: 'Tipo é obrigatório'
      }
    }

    if (!dia || dia.trim() === '') {
      return { 
        success: false, 
        error: 'Dia é obrigatório'
      }
    }

    if (!data || data.trim() === '') {
      return { 
        success: false, 
        error: 'Data é obrigatória'
      }
    }

    if (!horario || horario.trim() === '') {
      return { 
        success: false, 
        error: 'Horário é obrigatório'
      }
    }

    if (!detalhes || detalhes.trim() === '') {
      return { 
        success: false, 
        error: 'Detalhes são obrigatórios'
      }
    }

    // Dados para atualização
    const updateData = {
      titulo: titulo.trim(),
      tipo: tipo.trim(),
      dia: dia.trim(),
      data: data.trim(),
      horario: horario.trim(),
      detalhes: detalhes.trim(),
      local: local?.trim() || null,
      pessoa_id: pessoaId?.trim() || null,
      ativo: ativo,
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('atividades_festival')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Erro ao atualizar atividade:', error)
      return { 
        success: false, 
        error: error.message || 'Erro ao atualizar atividade'
      }
    }

    revalidatePath('/admin/atividades')
    revalidatePath(`/admin/atividades/${id}`)

    return { success: true }
  } catch (error) {
    console.error('Error updating atividade:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    }
  }
}

export async function deleteAtividade(id: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('atividades_festival')
      .update({ 
        ativo: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) {
      throw error
    }

    revalidatePath('/admin/atividades')

    return { success: true }
  } catch (error) {
    console.error('Error deleting atividade:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    }
  }
}