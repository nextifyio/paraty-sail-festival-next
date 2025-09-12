import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import EditPatrocinadorForm from './EditPatrocinadorForm'
import type { Patrocinador } from '@/types'
import { requireAuth } from '@/lib/auth-guard'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPatrocinador({ params }: Props) {
  // Verificar autenticação primeiro
  await requireAuth()
  
  const { id } = await params
  
  try {
    const supabase = await createClient()
    
    console.log('Buscando patrocinador com ID:', id)
    
    const { data: patrocinadorData, error } = await supabase
      .from('patrocinadores')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    console.log('Resultado da consulta:', { patrocinadorData, error })

    if (error) {
      console.error('Erro na consulta Supabase:', error)
      throw error
    }

    if (!patrocinadorData) {
      console.log('Patrocinador não encontrado para ID:', id)
      notFound()
    }

    console.log('Dados completos do patrocinador:', patrocinadorData)

    // Mapear os campos do banco para a interface
    const patrocinador: Patrocinador = {
      id: patrocinadorData.id,
      nome: patrocinadorData.nome,
      logo: patrocinadorData.logo_url || patrocinadorData.logo || '',
      link: patrocinadorData.website || patrocinadorData.link || '',
      nivel: patrocinadorData.nivel,
      created_at: patrocinadorData.created_at,
      updated_at: patrocinadorData.updated_at
    }

    return (
      <div className="space-y-6">
        <EditPatrocinadorForm patrocinador={patrocinador} />
      </div>
    )
  } catch (error) {
    console.error('Erro ao carregar página de edição:', error)
    notFound()
  }
}