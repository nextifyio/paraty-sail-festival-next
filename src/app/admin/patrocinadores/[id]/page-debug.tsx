import { requireAuth } from '@/lib/auth-guard'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPatrocinador({ params }: Props) {
  console.log('DEBUG: Página carregada')
  
  // Verificar autenticação primeiro
  await requireAuth()
  console.log('DEBUG: Auth verificada')
  
  const { id } = await params
  console.log('DEBUG: ID recebido:', id)
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">DEBUG - Editar Patrocinador</h1>
      <p>ID recebido: {id}</p>
      <p>Se você consegue ver essa página, o problema estava na consulta ao banco</p>
    </div>
  )
}