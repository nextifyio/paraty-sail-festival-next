import { createClient } from '@/lib/supabase-server'
import { Restaurante } from '@/types'
import { notFound } from 'next/navigation'
import EditRestauranteForm from './EditRestauranteForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditRestaurante({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: restaurante, error } = await supabase
    .from('restaurantes')
    .select('*')
    .eq('id', id)
    .single() as { data: Restaurante | null, error: any }

  if (error || !restaurante) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <EditRestauranteForm restaurante={restaurante} />
    </div>
  )
}