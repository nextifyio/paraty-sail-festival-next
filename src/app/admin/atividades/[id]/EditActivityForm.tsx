'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateAtividade } from '../actions';
import { useNotifications } from '@/components/notifications/NotificationProvider';

const editActivitySchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  tipo: z.enum(['palestra', 'show', 'workshop', 'competicao', 'regata', 'cultura', 'premiacao', 'abertura', 'encerramento', 'homenagem', 'kids']),
  dia: z.string().min(1, 'Dia é obrigatório'),
  data: z.string().min(1, 'Data é obrigatória'),
  horario: z.string().min(1, 'Horário é obrigatório'),
  detalhes: z.string().min(1, 'Detalhes são obrigatórios'),
  local: z.string().optional(),
  pessoa_id: z.string().optional(),
  ativo: z.boolean()
});

type EditActivityFormData = z.infer<typeof editActivitySchema>;

interface EditActivityFormProps {
  activity: {
    id: string;
    titulo: string;
    tipo: 'palestra' | 'show' | 'workshop' | 'competicao' | 'regata' | 'cultura' | 'premiacao' | 'abertura' | 'encerramento' | 'homenagem' | 'kids';
    dia: string;
    data: string;
    horario: string;
    detalhes: string;
    local?: string;
    pessoa_id?: string;
    ativo: boolean;
    pessoa_festival?: {
      id: string;
      nome: string;
      tipo: string;
    };
  };
  pessoas: Array<{
    id: string;
    nome: string;
    tipo: string;
  }>;
}

const tiposAtividade = [
  { value: 'palestra', label: 'Palestra', color: 'bg-blue-100 text-blue-800' },
  { value: 'show', label: 'Show Musical', color: 'bg-purple-100 text-purple-800' },
  { value: 'workshop', label: 'Workshop', color: 'bg-green-100 text-green-800' },
  { value: 'competicao', label: 'Competição', color: 'bg-red-100 text-red-800' },
  { value: 'regata', label: 'Regata', color: 'bg-blue-100 text-blue-800' },
  { value: 'cultura', label: 'Atividade Cultural', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'premiacao', label: 'Premiação', color: 'bg-amber-100 text-amber-800' },
  { value: 'abertura', label: 'Abertura', color: 'bg-emerald-100 text-emerald-800' },
  { value: 'encerramento', label: 'Encerramento', color: 'bg-rose-100 text-rose-800' },
  { value: 'homenagem', label: 'Homenagem', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'kids', label: 'Atividade Kids', color: 'bg-pink-100 text-pink-800' },
];

// Função para converter data brasileira (DD/MM/YYYY) para formato ISO (YYYY-MM-DD)
function formatDateForInput(dateStr?: string): string {
  if (!dateStr) return '';
  
  // Se já está no formato ISO, retorna como está
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return dateStr;
  }
  
  // Se está no formato brasileiro DD/MM/YYYY
  if (dateStr.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  
  // Tenta fazer parse da data e converter
  try {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
  } catch (error) {
    console.warn('Erro ao converter data:', dateStr, error);
  }
  
  return '';
}

export function EditActivityForm({ activity, pessoas }: EditActivityFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { success, error: showError } = useNotifications();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditActivityFormData>({
    resolver: zodResolver(editActivitySchema),
    defaultValues: {
      titulo: activity.titulo,
      tipo: activity.tipo,
      dia: activity.dia,
      data: formatDateForInput(activity.data),
      horario: activity.horario,
      detalhes: activity.detalhes,
      local: activity.local || '',
      pessoa_id: activity.pessoa_id || '',
      ativo: activity.ativo,
    },
  });

  const onSubmit = async (data: EditActivityFormData) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('titulo', data.titulo);
      formData.append('tipo', data.tipo);
      formData.append('dia', data.dia);
      formData.append('data', data.data);
      formData.append('horario', data.horario);
      formData.append('detalhes', data.detalhes);
      formData.append('local', data.local || '');
      formData.append('pessoa_id', data.pessoa_id || '');
      formData.append('ativo', data.ativo.toString());

      const result = await updateAtividade(activity.id, formData);
      
      if (result && !result.success) {
        showError('Erro ao atualizar atividade', result.error || 'Tente novamente mais tarde.');
        return;
      }
      
      success('Atividade atualizada!', 'As informações foram salvas com sucesso.');
      router.push('/admin/atividades');
      router.refresh();
    } catch (error) {
      console.error('Erro ao atualizar atividade:', error);
      showError('Erro ao atualizar atividade', error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/atividades');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
          Título *
        </label>
        <input
          {...register('titulo')}
          type="text"
          id="titulo"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Ex: Palestra sobre Navegação Oceânica"
        />
        {errors.titulo && (
          <p className="mt-1 text-sm text-red-600">{errors.titulo.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-2">
            Tipo *
          </label>
          <select
            {...register('tipo')}
            id="tipo"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            {tiposAtividade.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
          {errors.tipo && (
            <p className="mt-1 text-sm text-red-600">{errors.tipo.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="pessoa_id" className="block text-sm font-medium text-gray-700 mb-2">
            Participante Responsável
          </label>
          <select
            {...register('pessoa_id')}
            id="pessoa_id"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">Nenhum participante específico</option>
            {pessoas.map((pessoa) => (
              <option key={pessoa.id} value={pessoa.id}>
                {pessoa.nome} ({pessoa.tipo})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="dia" className="block text-sm font-medium text-gray-700 mb-2">
            Dia *
          </label>
          <select
            {...register('dia')}
            id="dia"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">Selecione...</option>
            <option value="Quinta-feira">Quinta-feira</option>
            <option value="Sexta-feira">Sexta-feira</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
          {errors.dia && (
            <p className="mt-1 text-sm text-red-600">{errors.dia.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-2">
            Data *
          </label>
          <input
            {...register('data')}
            type="date"
            id="data"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          {errors.data && (
            <p className="mt-1 text-sm text-red-600">{errors.data.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="horario" className="block text-sm font-medium text-gray-700 mb-2">
            Horário *
          </label>
          <input
            {...register('horario')}
            type="text"
            id="horario"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Ex: 10:00h às 12:00h"
          />
          {errors.horario && (
            <p className="mt-1 text-sm text-red-600">{errors.horario.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="local" className="block text-sm font-medium text-gray-700 mb-2">
          Local
        </label>
        <input
          {...register('local')}
          type="text"
          id="local"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Ex: Palco Principal, Praia do Jabaquara, etc."
        />
      </div>

      <div>
        <label htmlFor="detalhes" className="block text-sm font-medium text-gray-700 mb-2">
          Detalhes *
        </label>
        <textarea
          {...register('detalhes')}
          id="detalhes"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Descreva os detalhes da atividade..."
        />
        {errors.detalhes && (
          <p className="mt-1 text-sm text-red-600">{errors.detalhes.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          {...register('ativo')}
          type="checkbox"
          id="ativo"
          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
        />
        <label htmlFor="ativo" className="ml-2 block text-sm text-gray-900">
          Ativo (aparece no site público)
        </label>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  );
}