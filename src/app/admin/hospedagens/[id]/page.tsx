import { createClient } from '@/lib/supabase-server'
import { Hospedagem } from '@/types'
import { notFound } from 'next/navigation'
import EditHospedagemForm from './EditHospedagemForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditHospedagem({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: hospedagem, error } = await supabase
    .from('hospedagens')
    .select('*')
    .eq('id', id)
    .single() as { data: Hospedagem | null, error: Error | null }

  if (error || !hospedagem) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <EditHospedagemForm hospedagem={hospedagem} />
    </div>
  )
}