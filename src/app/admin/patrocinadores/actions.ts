'use server'

import { createSupabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAuthForAction } from '@/lib/auth-guard'

interface PatrocinadorFormData {
  nome: string
  logo_url?: string
  link?: string
  nivel: 'master' | 'ouro' | 'prata' | 'bronze'
  ativo?: boolean
}

export async function createPatrocinador(formData: FormData) {
  try {
    // ✅ Verificar autenticação
    const authResult = await requireAuthForAction()
    if (!authResult.isAuthenticated) {
      throw new Error(authResult.error || 'Não autorizado')
    }

    const supabase = createSupabaseAdmin()

    // Extrair campos do formulário
    const nome = formData.get('nome') as string
    const logo = formData.get('logo') as string
    const link = formData.get('link') as string
    const nivel = formData.get('nivel') as 'master' | 'ouro' | 'prata' | 'bronze'

    // Validar campos obrigatórios
    if (!nome || nome.trim() === '') {
      throw new Error('Nome é obrigatório')
    }

    if (!nivel || !['master', 'ouro', 'prata', 'bronze'].includes(nivel)) {
      throw new Error('Nível de patrocínio é obrigatório e deve ser válido')
    }

    // Dados para inserção
    const insertData: PatrocinadorFormData = {
      nome: nome.trim(),
      logo_url: logo?.trim() || undefined,
      link: link?.trim() || undefined,
      nivel: nivel,
      ativo: true
    }

    const { error } = await supabase
      .from('patrocinadores')
      .insert([insertData])

    if (error) {
      console.error('Erro ao criar patrocinador:', error)
      throw new Error('Erro ao criar patrocinador')
    }

    revalidatePath('/admin/patrocinadores')
  } catch (error) {
    console.error('Error creating patrocinador:', error)
    throw error
  }

  redirect('/admin/patrocinadores')
}

export async function updatePatrocinador(id: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    // ✅ Verificar autenticação
    const authResult = await requireAuthForAction()
    if (!authResult.isAuthenticated) {
      return { success: false, error: authResult.error || 'Não autorizado' }
    }

    const supabase = createSupabaseAdmin()

    // Extrair campos do formulário
    const nome = formData.get('nome') as string
    const logo = formData.get('logo') as string
    const link = formData.get('link') as string
    const nivel = formData.get('nivel') as 'master' | 'ouro' | 'prata' | 'bronze'
    const ativo = formData.get('ativo') === 'true'

    // Validar campos obrigatórios
    if (!nome || nome.trim() === '') {
      return { 
        success: false, 
        error: 'Nome é obrigatório'
      }
    }

    if (!nivel || !['master', 'ouro', 'prata', 'bronze'].includes(nivel)) {
      return { 
        success: false, 
        error: 'Nível de patrocínio é obrigatório e deve ser válido'
      }
    }

    // Dados para atualização
    const updateData: PatrocinadorFormData = {
      nome: nome.trim(),
      logo_url: logo?.trim() || undefined,
      link: link?.trim() || undefined,
      nivel: nivel,
      ativo: ativo
    }

    const { error } = await supabase
      .from('patrocinadores')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Erro ao atualizar patrocinador:', error)
      return { 
        success: false, 
        error: error.message || 'Erro ao atualizar patrocinador'
      }
    }

    revalidatePath('/admin/patrocinadores')
    revalidatePath(`/admin/patrocinadores/${id}`)

    return { success: true }
  } catch (error) {
    console.error('Error updating patrocinador:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    }
  }
}

export async function deletePatrocinador(id: string) {
  try {
    // ✅ Verificar autenticação
    const authResult = await requireAuthForAction()
    if (!authResult.isAuthenticated) {
      return { success: false, error: authResult.error || 'Não autorizado' }
    }

    const supabase = createSupabaseAdmin()

    const { error } = await supabase
      .from('patrocinadores')
      .update({ 
        ativo: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) {
      throw error
    }

    revalidatePath('/admin/patrocinadores')

    return { success: true }
  } catch (error) {
    console.error('Error deleting patrocinador:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    }
  }
}