'use server'

import { createSupabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { requireAuthForAction } from '@/lib/auth-guard'

export async function createHospedagem(formData: FormData) {
  try {
    // ✅ Verificar autenticação
    const authResult = await requireAuthForAction()
    if (!authResult.isAuthenticated) {
      return { success: false, error: authResult.error || 'Não autorizado' }
    }

    const supabase = createSupabaseAdmin()

  const ativo = formData.get('ativo') === 'on' || formData.get('ativo') === 'true' || true

  const data = {
    nome: formData.get('nome') as string,
    descricao: formData.get('descricao') as string,
    desconto: formData.get('desconto') as string || null,
    contato: formData.get('contato') as string,
    localizacao: formData.get('localizacao') as string,
    ativo: ativo,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  const { error } = await supabase
    .from('hospedagens')
    .insert([data])

  if (error) {
    console.error('Erro ao criar hospedagem:', error)
    return { success: false, error: 'Erro ao criar hospedagem' }
  }

  revalidatePath('/admin/hospedagens')
  return { success: true, message: 'Hospedagem criada com sucesso!' }
  } catch (error) {
    console.error('Erro na função createHospedagem:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}

export async function updateHospedagem(id: string, formData: FormData) {
  try {
    // ✅ Verificar autenticação
    const authResult = await requireAuthForAction()
    if (!authResult.isAuthenticated) {
      return { success: false, error: authResult.error || 'Não autorizado' }
    }

    const supabase = createSupabaseAdmin()

  const ativo = formData.get('ativo') === 'on' || formData.get('ativo') === 'true'

  const data = {
    nome: formData.get('nome') as string,
    descricao: formData.get('descricao') as string,
    desconto: formData.get('desconto') as string || null,
    contato: formData.get('contato') as string,
    localizacao: formData.get('localizacao') as string,
    ativo: ativo,
    updated_at: new Date().toISOString()
  }

  const { error } = await supabase
    .from('hospedagens')
    .update(data)
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar hospedagem:', error)
    return { success: false, error: 'Erro ao atualizar hospedagem' }
  }

  revalidatePath('/admin/hospedagens')
  return { success: true, message: 'Hospedagem atualizada com sucesso!' }
  } catch (error) {
    console.error('Erro na função updateHospedagem:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}

export async function deleteHospedagem(id: string) {
  try {
    // ✅ Verificar autenticação
    const authResult = await requireAuthForAction()
    if (!authResult.isAuthenticated) {
      return { success: false, error: authResult.error || 'Não autorizado' }
    }

    const supabase = createSupabaseAdmin()

  const { error } = await supabase
    .from('hospedagens')
    .update({ ativo: false })
    .eq('id', id)

  if (error) {
    console.error('Erro ao excluir hospedagem:', error)
    return { success: false, error: 'Erro ao excluir hospedagem' }
  }

  revalidatePath('/admin/hospedagens')
  return { success: true, message: 'Hospedagem excluída com sucesso!' }
  } catch (error) {
    console.error('Erro na função deleteHospedagem:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}