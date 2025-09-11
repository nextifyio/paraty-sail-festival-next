'use server'

import { createSupabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

interface UpdateAtividadeData {
  nome: string
  descricao?: string
  data_inicio: string
  data_fim?: string
  hora_inicio?: string
  hora_fim?: string
  local?: string
  tipo_atividade: 'palestra' | 'workshop' | 'competicao' | 'social' | 'cultural'
  pessoa_id?: string
  preco?: string
  capacidade_maxima?: string
  observacoes?: string
}

function mapTipoAtividadeToDb(tipo: 'palestra' | 'workshop' | 'competicao' | 'social' | 'cultural'): string {
  const tipoMap: Record<string, string> = {
    'palestra': 'palestra',
    'workshop': 'workshop',
    'competicao': 'regata',
    'social': 'premiacao',
    'cultural': 'show'
  };
  
  return tipoMap[tipo] || 'palestra';
}

export async function updateAtividade(id: string, data: UpdateAtividadeData) {
  try {
    const supabase = createSupabaseAdmin()

    // Mapear campos do formulário para campos do banco
    const updateData = {
      titulo: data.nome, // nome -> titulo
      detalhes: data.descricao, // descricao -> detalhes
      data: data.data_inicio,
      horario: data.hora_inicio && data.hora_fim 
        ? `${data.hora_inicio} às ${data.hora_fim}`
        : data.hora_inicio,
      local: data.local,
      tipo: mapTipoAtividadeToDb(data.tipo_atividade),
      pessoa_id: data.pessoa_id || null,
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('atividades_festival')
      .update(updateData)
      .eq('id', id)

    if (error) {
      throw error
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
    const supabase = createSupabaseAdmin()

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