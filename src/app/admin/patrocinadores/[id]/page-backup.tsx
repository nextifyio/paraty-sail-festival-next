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
  const supabase = await createClient()
  
  console.log('Tentando buscar patrocinador com ID:', id)
  
  const { data: patrocinador, error } = await supabase
    .from('patrocinadores')
    .select('*')
    .eq('id', id)
    .single() as { data: Patrocinador | null, error: Error | null }

  console.log('Resultado da busca:', { patrocinador, error })

  if (error || !patrocinador) {
    console.error('Erro ao buscar patrocinador:', error)
    notFound()
  }

  return (
    <div className="space-y-6">
      <EditPatrocinadorForm patrocinador={patrocinador} />
    </div>
  )
}