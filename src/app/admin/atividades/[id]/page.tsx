import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { EditActivityForm } from './EditActivityForm';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getActivity(id: string) {
  const supabase = await createClient();
  
  const { data: activity, error } = await supabase
    .from('atividades_festival')
    .select(`
      *,
      pessoa_festival:pessoa_id (
        id,
        nome,
        tipo
      )
    `)
    .eq('id', id)
    .single();

  if (error || !activity) {
    console.error('Erro ao buscar atividade:', error);
    return null;
  }

  return {
    id: activity.id,
    titulo: activity.titulo,
    tipo: activity.tipo,
    dia: activity.dia,
    data: activity.data,
    horario: activity.horario,
    detalhes: activity.detalhes,
    local: activity.local,
    pessoa_id: activity.pessoa_id,
    ativo: activity.ativo,
    pessoa_festival: activity.pessoa_festival ? {
      id: activity.pessoa_festival.id,
      nome: activity.pessoa_festival.nome,
      tipo: activity.pessoa_festival.tipo
    } : undefined
  };
}

async function getPessoas() {
  const supabase = await createClient();
  
  const { data: pessoas, error } = await supabase
    .from('pessoas_festival')
    .select('id, nome, tipo')
    .eq('ativo', true)
    .order('nome');

  if (error) {
    console.error('Erro ao buscar pessoas:', error);
    return [];
  }

  return pessoas || [];
}

export default async function EditActivityPage({ params }: PageProps) {
  const { id } = await params;
  
  const [activity, pessoas] = await Promise.all([
    getActivity(id),
    getPessoas()
  ]);

  if (!activity) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar Atividade</h1>
          <p className="text-gray-600">Atualize as informações da atividade</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <EditActivityForm activity={activity} pessoas={pessoas} />
      </div>
    </div>
  );
}