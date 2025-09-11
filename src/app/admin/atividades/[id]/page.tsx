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
    .eq('ativo', true)
    .single();

  if (error || !activity) {
    console.error('Erro ao buscar atividade:', error);
    return null;
  }

  // Mapear campos do banco para o que o formulário espera
  const mappedActivity = {
    id: activity.id,
    nome: activity.titulo, // titulo -> nome
    descricao: activity.detalhes, // detalhes -> descricao  
    data_inicio: activity.data,
    data_fim: activity.data, // usar a mesma data
    hora_inicio: activity.horario?.split(' às ')[0] || activity.horario,
    hora_fim: activity.horario?.split(' às ')[1] || '',
    local: activity.local,
    tipo_atividade: mapTipoAtividade(activity.tipo),
    pessoa_id: activity.pessoa_id,
    preco: 0, // campo não existe no banco atual
    capacidade_maxima: 0, // campo não existe no banco atual
    observacoes: '', // campo não existe no banco atual
    pessoa_festival: activity.pessoa_festival ? {
      id: activity.pessoa_festival.id,
      nome: activity.pessoa_festival.nome,
      tipo_pessoa: activity.pessoa_festival.tipo
    } : undefined
  };

  return mappedActivity;
}

function mapTipoAtividade(tipo: string): 'palestra' | 'workshop' | 'competicao' | 'social' | 'cultural' {
  const tipoMap: Record<string, 'palestra' | 'workshop' | 'competicao' | 'social' | 'cultural'> = {
    'palestra': 'palestra',
    'workshop': 'workshop', 
    'regata': 'competicao',
    'competicao': 'competicao',
    'show': 'cultural',
    'cultura': 'cultural',
    'premiacao': 'social',
    'abertura': 'social',
    'encerramento': 'social',
    'homenagem': 'social',
    'kids': 'social'
  };
  
  return tipoMap[tipo] || 'palestra';
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

  // Mapear tipo para tipo_pessoa para compatibilidade
  return (pessoas || []).map(pessoa => ({
    ...pessoa,
    tipo_pessoa: pessoa.tipo
  }));
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