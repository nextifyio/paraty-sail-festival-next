'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateAtividade } from '../../actions';

const editActivitySchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().optional(),
  data_inicio: z.string().min(1, 'Data de início é obrigatória'),
  data_fim: z.string().optional(),
  hora_inicio: z.string().optional(),
  hora_fim: z.string().optional(),
  local: z.string().optional(),
  tipo_atividade: z.enum(['palestra', 'workshop', 'competicao', 'social', 'cultural']),
  pessoa_id: z.string().optional(),
  preco: z.string().optional(),
  capacidade_maxima: z.string().optional(),
  observacoes: z.string().optional(),
});

type EditActivityFormData = z.infer<typeof editActivitySchema>;

interface EditActivityFormProps {
  activity: {
    id: string;
    nome: string;
    descricao?: string;
    data_inicio: string;
    data_fim?: string;
    hora_inicio?: string;
    hora_fim?: string;
    local?: string;
    tipo_atividade: 'palestra' | 'workshop' | 'competicao' | 'social' | 'cultural';
    pessoa_id?: string;
    preco?: number;
    capacidade_maxima?: number;
    observacoes?: string;
    pessoa_festival?: {
      id: string;
      nome: string;
      tipo_pessoa: string;
    };
  };
  pessoas: Array<{
    id: string;
    nome: string;
    tipo_pessoa: string;
  }>;
}

const tiposAtividade = [
  { value: 'palestra', label: 'Palestra', color: 'bg-blue-100 text-blue-800' },
  { value: 'workshop', label: 'Workshop', color: 'bg-green-100 text-green-800' },
  { value: 'competicao', label: 'Competição', color: 'bg-red-100 text-red-800' },
  { value: 'social', label: 'Social', color: 'bg-purple-100 text-purple-800' },
  { value: 'cultural', label: 'Cultural', color: 'bg-yellow-100 text-yellow-800' },
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditActivityFormData>({
    resolver: zodResolver(editActivitySchema),
    defaultValues: {
      nome: activity.nome,
      descricao: activity.descricao || '',
      data_inicio: formatDateForInput(activity.data_inicio),
      data_fim: formatDateForInput(activity.data_fim),
      hora_inicio: activity.hora_inicio || '',
      hora_fim: activity.hora_fim || '',
      local: activity.local || '',
      tipo_atividade: activity.tipo_atividade,
      pessoa_id: activity.pessoa_id || '',
      preco: activity.preco?.toString() || '',
      capacidade_maxima: activity.capacidade_maxima?.toString() || '',
      observacoes: activity.observacoes || '',
    },
  });

  const onSubmit = async (data: EditActivityFormData) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('nome', data.nome);
      formData.append('descricao', data.descricao || '');
      formData.append('data_inicio', data.data_inicio);
      formData.append('data_fim', data.data_fim || '');
      formData.append('hora_inicio', data.hora_inicio || '');
      formData.append('hora_fim', data.hora_fim || '');
      formData.append('local', data.local || '');
      formData.append('tipo_atividade', data.tipo_atividade);
      formData.append('pessoa_id', data.pessoa_id || '');
      formData.append('preco', data.preco || '');
      formData.append('capacidade_maxima', data.capacidade_maxima || '');
      formData.append('observacoes', data.observacoes || '');

      await updateAtividade(activity.id, formData);
      
      router.push('/admin/atividades');
      router.refresh();
    } catch (error) {
      console.error('Erro ao atualizar atividade:', error);
      alert('Erro ao atualizar atividade');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/atividades');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
            Nome da Atividade *
          </label>
          <input
            {...register('nome')}
            type="text"
            id="nome"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nome da atividade"
          />
          {errors.nome && (
            <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="tipo_atividade" className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Atividade *
          </label>
          <select
            {...register('tipo_atividade')}
            id="tipo_atividade"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {tiposAtividade.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
          {errors.tipo_atividade && (
            <p className="mt-1 text-sm text-red-600">{errors.tipo_atividade.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            {...register('descricao')}
            id="descricao"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Descrição da atividade"
          />
        </div>

        <div>
          <label htmlFor="data_inicio" className="block text-sm font-medium text-gray-700 mb-2">
            Data de Início *
          </label>
          <input
            {...register('data_inicio')}
            type="date"
            id="data_inicio"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.data_inicio && (
            <p className="mt-1 text-sm text-red-600">{errors.data_inicio.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="data_fim" className="block text-sm font-medium text-gray-700 mb-2">
            Data de Fim
          </label>
          <input
            {...register('data_fim')}
            type="date"
            id="data_fim"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="hora_inicio" className="block text-sm font-medium text-gray-700 mb-2">
            Hora de Início
          </label>
          <input
            {...register('hora_inicio')}
            type="time"
            id="hora_inicio"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="hora_fim" className="block text-sm font-medium text-gray-700 mb-2">
            Hora de Fim
          </label>
          <input
            {...register('hora_fim')}
            type="time"
            id="hora_fim"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="local" className="block text-sm font-medium text-gray-700 mb-2">
            Local
          </label>
          <input
            {...register('local')}
            type="text"
            id="local"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Local da atividade"
          />
        </div>

        <div>
          <label htmlFor="pessoa_id" className="block text-sm font-medium text-gray-700 mb-2">
            Pessoa Responsável
          </label>
          <select
            {...register('pessoa_id')}
            id="pessoa_id"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecione uma pessoa</option>
            {pessoas.map((pessoa) => (
              <option key={pessoa.id} value={pessoa.id}>
                {pessoa.nome} ({pessoa.tipo_pessoa})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-2">
            Preço (R$)
          </label>
          <input
            {...register('preco')}
            type="number"
            step="0.01"
            id="preco"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="capacidade_maxima" className="block text-sm font-medium text-gray-700 mb-2">
            Capacidade Máxima
          </label>
          <input
            {...register('capacidade_maxima')}
            type="number"
            id="capacidade_maxima"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Número máximo de participantes"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-2">
            Observações
          </label>
          <textarea
            {...register('observacoes')}
            id="observacoes"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Observações adicionais"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  );
}