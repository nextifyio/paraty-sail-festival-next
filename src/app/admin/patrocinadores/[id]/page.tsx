import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import EditPatrocinadorForm from './EditPatrocinadorForm'

interface Props {
  params: Promise<{ id: string }>
}

// Tipo para patrocinador do banco
interface PatrocinadorDB {
  id: string
  nome: string
  logo?: string
  link?: string
  nivel: 'master' | 'ouro' | 'prata' | 'bronze'
  ativo: boolean
  created_at: string
  updated_at: string
}

export default async function EditPatrocinador({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: patrocinador, error } = await supabase
    .from('patrocinadores')
    .select(`
      *,
      patrocinios(*)
    `)
    .eq('id', id)
    .single() as { data: PatrocinadorDB | null, error: Error | null }

  if (error || !patrocinador) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <EditPatrocinadorForm patrocinador={patrocinador} />
    </div>
  )
}